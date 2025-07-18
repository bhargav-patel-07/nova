import React from 'react';

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
      <div className="flex items-center justify-center w-10 h-10 mr-2">
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

  return (
    <div className="flex items-center" style={{ margin: 4 }}>
      {/* Icon on the left */}
      {icon}
      <div
        className="relative bg-white/10 border border-white/20 rounded-xl shadow-md p-4 mx-auto"
        style={{ width: 400, minHeight: 60, wordBreak: 'break-word' }}
      >
        {/* Copy button at top left */}
        <button
          className="absolute top-2 left-2 bg-white/20 hover:bg-white/30 text-xs px-2 py-1 rounded transition-colors"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          Copy
        </button>
        <div className="pr-12 pl-2 py-2 text-white font-mono whitespace-pre-wrap break-words text-right">
          {text}
        </div>
      </div>
    </div>
  );
};

export default MessageCard; 