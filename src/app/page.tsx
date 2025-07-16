"use client";
import Image from "next/image";
import { StarsBackground } from "../components/ui/stars-background";
import { Globe } from "../components/magicui/globe";
import Input from "../components/ui/input";
import Button from "../components/ui/Button";
import Features from "../components/landing/Features";
import Pricing from "../components/landing/Pricing";
import { FloatingDock } from "../components/Footer";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
} from "@tabler/icons-react";
import { TextHoverEffect } from "../components/ui/text-hover-effect";
import { useEffect, useState } from "react";

const dockItems = [
  { title: "Home", icon: <IconHome />, href: "#home" },
  { title: "About", icon: <IconBrandGithub />, href: "#about" },
  { title: "Pricing", icon: <IconBrandX />, href: "#pricing" },
];

export default function LandingPage() {
  const [currentHash, setCurrentHash] = useState("#home");

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fullscreen animated stars background */}
      <StarsBackground className="fixed inset-0 w-screen h-screen -z-10" />

      {/* Header (logo + navbar) */}
      <div className="w-full flex flex-row items-center justify-between px-2 pt-2 z-10 gap-2 sm:hidden">
        <div className="logo-container flex-shrink-0 flex items-center">
          <Image
            src="/logo.png"
            alt="nova.ai logo"
            width={60}
            height={60}
            className="max-w-[60px] h-auto m-0 p-0"
            priority
          />
        </div>
        <div className="flex flex-row items-center gap-2 w-auto justify-end ml-auto">
          <Button className="px-2 py-1 text-xs">LOGIN</Button>
          <Button className="px-2 py-1 text-xs">Sign Up</Button>
        </div>
      </div>

      {/* Desktop/Laptop Header */}
      <div className="hidden sm:flex w-full max-w-5xl mx-auto items-center justify-between pt-3 px-10 z-30 relative">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="nova.ai logo"
            width={100}
            height={100}
            className="max-w-[72px] sm:max-w-[110px] h-auto m-0 p-0"
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
          <Button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm">LOGIN</Button>
          <Button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm">Sign Up</Button>
        </div>
      </div>

      {/* 1. Home Section */}
      <section
  id="home"
  className="relative flex flex-col items-center justify-between min-h-screen w-full pt-12 pb-8 px-4"
>
  {/* Globe */}
  <div className="w-full flex justify-center -mt-20 sm:-mt-28 md:-mt-32">
    <div className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px]">
      <Globe />
    </div>
  </div>

  {/* Text effect */}
  <div className="absolute w-full max-w-3xl flex justify-center z-20 bottom-56">
    <div className="w-full">
      <TextHoverEffect text="N O V A" />
    </div>
  </div>

  {/* Input absolutely positioned */}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-32 w-full max-w-3xl flex justify-center px-4 z-30">
    <Input />
  </div>
</section>


      {/* 2. About Section */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center">
        <Features />
      </section>

      {/* 3. Pricing + Footer Section */}
      <section id="pricing" className="min-h-screen flex flex-col items-center justify-center">
        <Pricing />
        <FloatingDock items={dockItems} />
      </section>
    </div>
  );
}
