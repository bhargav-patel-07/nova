import('node-fetch').then(async (fetchModule) => {
  const fetch = fetchModule.default;
  const apiKey = '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';

  console.log('🔍 Testing OpenRouter API...');
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Nova Chat App',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [{ role: 'user', content: 'Hello, test message' }],
        max_tokens: 50,
      }),
    });

    console.log('📊 Status:', response.status);
    const data = await response.json();
    console.log('✅ Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
});
