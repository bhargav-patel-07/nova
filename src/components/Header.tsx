import React from 'react';

export default function Header() {
  return (
    <header className="w-full flex justify-center pt-6">
      <nav className="w-[90vw] max-w-5xl flex items-center justify-between px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          {/* Replace with your own SVG/logo if desired */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="24" height="4" rx="2" fill="#111" />
            <rect x="4" y="16" width="24" height="4" rx="2" fill="#111" />
            <rect x="4" y="24" width="24" height="4" rx="2" fill="#111" />
          </svg>
          <span className="tracking-tight">YourBrand</span>
        </div>
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
