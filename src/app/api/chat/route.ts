import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  const { message } = await request.json();
  const apiKey = process.env.GEMINI_API_KEY;

  // Initialize the AI client with your API key
  const ai = new GoogleGenAI({ apiKey });

  // Call the Gemini model
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ parts: [{ text: message }] }],
  });

  // Extract the answer (adjust as needed based on actual response structure)
  const answer = response.text || "No answer";

  return NextResponse.json({ answer });
} 