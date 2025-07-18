import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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
          model: 'llama3-70b-8192', // or another Groq-supported model
          messages: [
            { role: 'user', content: prompt }
          ],
          max_tokens: 1024,
        }),
      });
      if (groqRes.ok) {
        const data = await groqRes.json();
        return NextResponse.json(data);
      }
    } catch (err) {
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
          // model: 'meta-llama/llama-3-70b-instruct', // or leave blank for router
          messages: [
            { role: 'user', content: prompt }
          ],
          max_tokens: 1024,
        }),
      });
      const data = await orRes.json();
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json({ error: 'Both Groq and OpenRouter failed', details: String(err) }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'No API keys configured' }, { status: 500 });
} 