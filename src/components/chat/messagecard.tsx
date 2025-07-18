import React from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';

interface MessageCardProps {
  text: string;
  from: 'user' | 'ai';
  iconAlt?: string;
}

const MessageCard: React.FC<MessageCardProps> = ({ text, from, iconAlt }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  // Icon rendering logic
  let icon = null;
  if (from === 'user') {
    icon = (
      <div className="flex items-center justify-center w-10 h-10 ml-2">
        {/* Simple user SVG icon */}
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white/80 bg-sky-500 rounded-full p-1" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="currentColor" />
        </svg>
      </div>
    );
  } else if (from === 'ai') {
    icon = (
      <div className="flex items-center justify-center w-10 h-10 mr-2">
        <img src="/logo2.png" alt={iconAlt || 'AI'} className="w-8 h-8 rounded-full bg-white/80 p-1" />
      </div>
    );
  }

  // Flex direction and alignment
  const isUser = from === 'user';
  return (
    <div className={`flex items-center ${isUser ? 'flex-row-reverse' : 'flex-row'}`} style={{ margin: 4 }}>
      {/* Icon on the left or right */}
      {icon}
      <div
        className="relative bg-white/10 border border-white/20 rounded-xl shadow-md p-4 mx-auto"
        style={{ width: 800, minHeight: 60, wordBreak: 'break-word' }}
      >
        {/* Copy button at top left for user, top right for ai */}
        <button
          className={`absolute top-2 ${isUser ? 'left-2' : 'right-2'} bg-white/20 hover:bg-white/30 p-2 rounded transition-colors`}
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {/* Copy icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6.75A2.25 2.25 0 0 0 14.25 4.5h-6A2.25 2.25 0 0 0 6 6.75v10.5A2.25 2.25 0 0 0 8.25 19.5h6A2.25 2.25 0 0 0 16.5 17.25v-1.5M9.75 15.75h6A2.25 2.25 0 0 0 18 13.5v-6A2.25 2.25 0 0 0 15.75 5.25h-6A2.25 2.25 0 0 0 7.5 7.5v6A2.25 2.25 0 0 0 9.75 15.75Z" />
          </svg>
        </button>
        <div className={`pr-12 pl-2 py-2 text-white font-mono whitespace-pre-wrap break-words ${isUser ? 'text-right' : 'text-left'}`}>
          {from === 'ai' && text !== 'AI is typing...' && !text.startsWith('{"error"') ? (
            <TextGenerateEffect words={text} className="text-white" fontSize={18} />
          ) : (
            text
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard; 