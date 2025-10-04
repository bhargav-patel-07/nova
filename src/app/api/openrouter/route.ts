import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;

    console.log('🔍 API Route Debug Info:');
    console.log('  - Prompt received:', prompt?.substring(0, 50) + '...');
    console.log('  - OpenRouter API Key present:', !!openrouterApiKey);

    if (!openrouterApiKey) {
      console.error('❌ OpenRouter API key is missing');
      return NextResponse.json(
        { error: 'Server configuration error - API key missing' },
        { status: 500 }
      );
    }

    console.log('🚀 Sending request to OpenRouter...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouterApiKey}`,
        'HTTP-Referer': req.nextUrl?.origin || 'http://localhost:3000',
        'X-Title': 'Nova Chat App',
      },
      body: JSON.stringify({
        model: 'microsoft/wizardlm-2-8x22b:nitro',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ OpenRouter API success');
      return NextResponse.json(data);
    }

    const errorText = await response.text();
    console.error('❌ OpenRouter API error:', response.status, errorText);
    return NextResponse.json(
      { error: 'Failed to get response from AI', details: errorText },
      { status: response.status }
    );

  } catch (error) {
    console.error('❌ API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}