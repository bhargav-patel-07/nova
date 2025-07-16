import React from 'react';

export default function Button({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`px-4 py-2 bg-white/10 text-white border border-white/30 rounded-lg backdrop-blur-md shadow-lg hover:bg-white/20 transition-colors duration-200 font-mono ${className}`}
    >
      {children}
    </button>
  );
} 