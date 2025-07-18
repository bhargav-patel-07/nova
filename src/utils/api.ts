export async function fetchAIResponse(message: string) {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: message }),
  });
  if (!res.ok) throw new Error('Failed to fetch Gemini response');
  return res.json();
} 