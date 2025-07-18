export async function fetchAIResponse(message: string) {
  const res = await fetch('/api/openrouter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: message }),
  });
  if (!res.ok) throw new Error('Failed to fetch OpenRouter response');
  return res.json();
} 