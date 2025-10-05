import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;

    console.log('🔍 API Route Debug Info:');
    console.log('  - Prompt length:', prompt?.length || 0);
    console.log('  - OpenRouter API Key present:', !!openrouterApiKey);
    console.log('  - API Key prefix:', openrouterApiKey?.substring(0, 10) + '...');

    if (!openrouterApiKey) {
      console.error('❌ OpenRouter API key is missing');
      return NextResponse.json(
        { error: 'Server configuration error - API key missing' },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      console.error('❌ Invalid prompt received');
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
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
        model: 'openai/gpt-oss-20b:free',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log('📡 OpenRouter response status:', response.status);
    console.log('📡 OpenRouter response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log('✅ OpenRouter API success');
      return NextResponse.json(data);
    }

    // Get the full error response
    let errorText = '';
    try {
      errorText = await response.text();
    } catch (e) {
      errorText = 'Failed to read error response';
    }

    console.error('❌ OpenRouter API error:', {
      status: response.status,
      statusText: response.statusText,
      errorText: errorText.substring(0, 500) // Limit error text length
    });

    return NextResponse.json(
      {
        error: 'Failed to get response from AI',
        details: errorText,
        status: response.status
      },
      { status: response.status }
    );

  } catch (error) {
    console.error('❌ API route error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}