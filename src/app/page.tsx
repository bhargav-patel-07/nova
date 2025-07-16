"use client";
import Image from "next/image";
import { StarsBackground } from "../components/ui/stars-background";
import { Globe } from "../components/magicui/globe";
import Input from "../components/ui/input";
import Features from "../components/landing/Features";
import Pricing from "../components/landing/Pricing";
import { FloatingDock } from "../components/Footer";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from '@clerk/nextjs'
import { ScriptCopyBtn } from "../components/ui/script-copy-btn";

import './globals.css'

import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
} from "@tabler/icons-react";
import { TextHoverEffect } from "../components/ui/text-hover-effect";
import { useEffect, useState, useRef } from "react";

const dockItems = [
  { title: "Home", icon: <IconHome />, href: "#home" },
  { title: "About", icon: <IconBrandGithub />, href: "#about" },
  { title: "Pricing", icon: <IconBrandX />, href: "#pricing" },
];

export default function LandingPage() {
  const [currentHash, setCurrentHash] = useState("#home");
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const customCommandMap = {
    GIT: "https://github.com/bhargav-patel-07/nova.ai.git",
    
  };
  
  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const handleInputFocus = () => {
    if (inputWrapperRef.current) {
      inputWrapperRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fullscreen animated stars background */}
      <StarsBackground className="fixed inset-0 w-screen h-screen -z-10" />
      <section
  id="home"
  className="flex flex-col items-center md:items-stretch min-h-screen w-full pt-1 pb-1 px-1 sm:pt-0 sm:pb-0 sm:px-0 md:pt-2 md:pb-2 md:px-0 md:max-w-[1280px] md:mx-auto md:gap-y-0 gap-y-0 overflow-y-auto pb-24"
>
  {/* Mobile Header */}
  <div className="w-full flex flex-row items-center justify-between px-2 pt-0 z-10 gap-2 sm:hidden">
    <div className="logo-container flex-shrink-0 flex items-center">
      <Image
        src="/logo.png"
        alt="nova.ai logo"
        width={100}
        height={100}
        className="max-w-[100px] h-auto m-0 p-0"
        priority
      />
    </div>
    
<div className="flex flex-row items-center gap-2 w-auto justify-end ml-auto">
  <SignedIn>
    <SignOutButton redirectUrl="/">
      <button className="...">Sign Out</button>
    </SignOutButton>
  </SignedIn>
  <SignedOut>
    <SignInButton mode="modal" redirectUrl="/chat">
      <button className="...">LOGIN</button>
    </SignInButton>
    <SignUpButton mode="modal" redirectUrl="/chat">
      <button className="...">Sign Up</button>
    </SignUpButton>
  </SignedOut>
</div>
</div>    
  {/* Desktop/Laptop Header */}
  <div className="hidden sm:flex w-full max-w-5xl mx-auto items-center justify-between pt-1 px-4 z-30 relative">
    {/* Logo */}
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="nova.ai logo"
        width={100}
        height={100}
        className="max-w-[100px] sm:max-w-[110px] h-auto m-0 p-0"
        priority
      />
    </div>
    {/* Navbar - absolutely centered */}
    <nav className="absolute left-1/2 -translate-x-1/2 flex bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-8 py-2 space-x-2 font-mono text-base shadow-lg items-center" style={{gap: '2px'}}>
      {[
        { label: 'HOME', href: '#home' },
        { label: 'USE', href: '#about' },
        { label: 'PRICING', href: '#pricing' },
      ].map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={
            `px-4 py-1 rounded-lg transition-colors duration-200 hover:bg-white/20 focus:bg-white/30 active:bg-white/30 text-white/80 hover:text-white focus:text-white` +
            (currentHash === item.href ? ' bg-white/20 text-white font-bold' : '')
          }
        >
          {item.label}
        </a>
      ))}
    </nav>
    {/* Auth Buttons */}
    <div className="flex gap-2 ml-8">
      <SignedIn>
        <SignOutButton redirectUrl="/">
          <button className="px-2 py-1 text-xs font-mono rounded-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors">
            Sign Out
          </button>
        </SignOutButton>
      </SignedIn>
      <SignInButton mode="modal" redirectUrl="/chat">
        <button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-mono rounded-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors">LOGIN</button>
      </SignInButton>
      <SignUpButton mode="modal" redirectUrl="/chat">
        <button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-mono rounded-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors">Sign Up</button>
      </SignUpButton>
    </div>
  </div>

  {/* Homepage Header */}

  {/* Globe */}
  <div className="w-full flex justify-center mt-1 sm:mt-0 md:mt-0 md:mb-0">
    <div className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[220px] lg:max-w-[320px]">
      <Globe />
    </div>
  </div>

  {/* Text effect */}
  <div className="flex flex-col items-center justify-center w-full">
    <div className="w-full max-w-3xl flex justify-center z-20">
      <div className="w-full flex justify-center">
        <TextHoverEffect text="N O V A" />
      </div>
    </div>
    <Input
      value={input}
      onChange={e => setInput(e.target.value)}
      onFocus={handleInputFocus}
      placeholder=""
    />
  </div>
</section>


      {/* 2. About Section */}
<section id="about" className="min-h-screen flex flex-col items-center justify-center">
        <Features />
        <ScriptCopyBtn
    showMultiplePackageOptions={true}
    codeLanguage="shell"
    lightTheme="nord"
    darkTheme="vitesse-dark"
    commandMap={customCommandMap}
  />
</section>

      {/* 3. Pricing + Footer Section */}
<section id="pricing" className="min-h-screen flex flex-col items-center justify-center">
        <Pricing />
        <FloatingDock items={dockItems} />
</section>
    </div>
  );
}
