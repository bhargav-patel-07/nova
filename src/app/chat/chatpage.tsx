"use client"
import { useState } from "react";
import { Sidebar, SidebarBody } from "../../components/chat/Sidebar";
import MessageInput from "../../components/chat/MessageInput";
import { fetchAIResponse } from "../../utils/api";

export default function ChatPage() {
  const [open, setOpen] = useState(true); // or false for closed
  const [messages, setMessages] = useState<{ role: 'user' | 'gemini', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (value: string) => {
    if (!value.trim()) return;
    // Add user message and a placeholder for Gemini's response
    setMessages((msgs) => [...msgs, { role: 'user', content: value }, { role: 'gemini', content: '__LOADING__' }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetchAIResponse(value);
      console.log('Gemini API raw response:', res);
      const geminiText = res.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(res);
      setMessages((msgs) => {
        // Replace the last Gemini placeholder with the real response
        const updated = [...msgs];
        const idx = updated.findIndex((m, i) => m.role === 'gemini' && m.content === '__LOADING__' && i === updated.length - 1);
        if (idx !== -1) updated[idx] = { role: 'gemini', content: geminiText };
        console.log('Updated messages:', updated);
        return updated;
      });
    } catch (err) {
      setMessages((msgs) => {
        const updated = [...msgs];
        const idx = updated.findIndex((m, i) => m.role === 'gemini' && m.content === '__LOADING__' && i === updated.length - 1);
        if (idx !== -1) updated[idx] = { role: 'gemini', content: 'Error: ' + (err as Error).message };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar container */}
      <div className="relative h-screen" style={{ width: open ? 300 : 60 }}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody />
        </Sidebar>
      </div>
      {/* Main content */}
      <div className="flex-1 h-full flex flex-col">
        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <span className={msg.role === 'user' ? 'bg-sky-600 text-white px-4 py-2 rounded-lg inline-block' : 'bg-gray-200 text-black px-4 py-2 rounded-lg inline-block'}>
                {msg.content === '__LOADING__' ? (
                  <span className="italic text-gray-400">Gemini is typing...</span>
                ) : (
                  msg.content
                )}
              </span>
            </div>
          ))}
        </div>
        {/* Input box at the bottom */}
        <MessageInput value={input} onChange={e => setInput(e.target.value)} onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
} 