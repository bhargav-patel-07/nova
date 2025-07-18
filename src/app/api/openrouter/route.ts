import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const groqApiKey = process.env.GROQ_API_KEY;
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;

    // Try Groq first
    if (groqApiKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: 'llama3-70b-8192',
            messages: [
              { role: 'user', content: prompt }
            ],
            max_tokens: 1024,
          }),
        });
        if (groqRes.ok) {
          const data = await groqRes.json();
          return NextResponse.json(data);
        } else {
          const errorText = await groqRes.text();
          console.error('Groq API error:', errorText);
        }
      } catch (err) {
        console.error('Groq fetch error:', err);
        // If Groq fails, fall through to OpenRouter
      }
    }

    // Fallback: OpenRouter
    if (openrouterApiKey) {
      try {
        const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openrouterApiKey}`,
          },
          body: JSON.stringify({
            messages: [
              { role: 'user', content: prompt }
            ],
            max_tokens: 1024,
          }),
        });
        if (orRes.ok) {
          const data = await orRes.json();
          return NextResponse.json(data);
        } else {
          const errorText = await orRes.text();
          console.error('OpenRouter API error:', errorText);
          return NextResponse.json({ error: 'OpenRouter API error', details: errorText }, { status: 500 });
        }
      } catch (err) {
        console.error('OpenRouter fetch error:', err);
        return NextResponse.json({ error: 'Both Groq and OpenRouter failed', details: String(err) }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'No API keys configured' }, { status: 500 });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Unexpected server error', details: String(err) }, { status: 500 });
  }
} 