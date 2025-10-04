export async function fetchAIResponse(message: string) {
  try {
    console.log('Sending request to /api/openrouter with prompt:', message);
    const res = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error', status: res.status }));
      console.error('API error response:', errorData);
      throw new Error(`API Error (${res.status}): ${errorData.error || 'Failed to fetch OpenRouter response'}`);
    }

    const data = await res.json();
    console.log('API response received successfully');
    return data;
  } catch (error) {
    console.error('fetchAIResponse error:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to fetch OpenRouter response');
    }
  }
}