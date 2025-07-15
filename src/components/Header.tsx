import React from 'react';

export default function Header() {
  return (
    <header className="w-full flex justify-center pt-0">
      <nav className="w-[90vw] max-w-5xl flex items-center justify-between px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 shadow-lg">
        {/* Logo */}
       
        {/* Nav Links */}
        <div className="hidden md:flex gap-2 bg-white/60 rounded-xl px-2 py-1 border border-white/40 shadow-inner backdrop-blur-md">
          {['PRICING', 'DOCS', 'BLOG', 'TUTORIALS', 'CHANGELOG', 'DEPLOY', 'PARTNERS'].map(link => (
            <a
              key={link}
              href="#"
              className="px-3 py-1 text-xs font-mono font-semibold tracking-wider text-black/80 hover:text-black/100 rounded transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <a href="#login" className="hidden md:inline-block px-4 py-2 text-xs font-mono font-semibold text-black/80 hover:text-black/100 rounded transition-colors">
            LOGIN
          </a>
          <a href="#signup" className="px-4 py-2 text-xs font-mono font-bold bg-black text-white rounded-lg shadow hover:bg-gray-900 transition-colors">
            SIGN UP
          </a>
        </div>
      </nav>
    </header>
  );
}
