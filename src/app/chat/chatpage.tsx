"use client"
import { useRef, useEffect, useState } from "react";
import { Sidebar, SidebarBody, MobileSidebar, SidebarProvider } from "../../components/chat/Sidebar";
import MessageInput from "../../components/chat/MessageInput";
import { fetchAIResponse } from "../../utils/api";
import MessageCard from "../../components/chat/messagecard";

export default function ChatPage() {
  const [open, setOpen] = useState(true); // for desktop sidebar
  const [mobileOpen, setMobileOpen] = useState(false); // for mobile sidebar
  const [messages, setMessages] = useState<{ role: 'user' | 'gemini', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (value: string) => {
    console.log('handleSend called with:', value);
    if (!value.trim()) return;
    // Add user message and a placeholder for Gemini's response
    setMessages((msgs) => [...msgs, { role: 'user', content: value }, { role: 'gemini', content: '__LOADING__' }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetchAIResponse(value);
      console.log('Gemini API raw response:', res);
      // For OpenRouter, extract the assistant's message:
      const assistantText = res.choices?.[0]?.message?.content || JSON.stringify(res);
      setMessages((msgs) => {
        // Replace the last Gemini placeholder with the real response
        const updated = [...msgs];
        const idx = updated.findIndex((m, i) => m.role === 'gemini' && m.content === '__LOADING__' && i === updated.length - 1);
        if (idx !== -1) updated[idx] = { role: 'gemini', content: assistantText };
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

  // Handler to scroll input into view on focus (for mobile)
  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar container (desktop only) */}
      <div className="relative h-screen hidden md:block" style={{ width: open ? 300 : 60 }}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody />
        </Sidebar>
      </div>
      {/* Main content */}
      <SidebarProvider open={open} setOpen={setOpen} animate={true}>
        <div className="flex-1 h-full flex flex-col">
          {/* Mobile sidebar menu button at the top for mobile view */}
          <MobileSidebar open={mobileOpen} setOpen={setMobileOpen} />
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4 flex flex-col items-center justify-center">
            {messages.map((msg, idx) => (
              <MessageCard
                key={idx}
                text={msg.content === '__LOADING__' ? 'NOVA is typing...' : msg.content}
                from={msg.role === 'user' ? 'user' : 'ai'}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input box at the bottom */}
          <div ref={inputRef as any}>
            <MessageInput
              value={input}
              onChange={e => setInput(e.target.value)}
              onSend={handleSend}
              disabled={loading}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
} 