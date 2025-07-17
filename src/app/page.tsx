"use client";
import Image from "next/image";
import Link from "next/link";
import { StarsBackground } from "../components/ui/stars-background";
import { Globe } from "../components/magicui/globe";
import Input from "../components/ui/input";
import { FloatingDock } from "../components/Footer";
import Button from "../components/ui/button"


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
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconHome,
  IconUser,
} from "@tabler/icons-react";
import { TextHoverEffect } from "../components/ui/text-hover-effect";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const dockItems = [
  { title: "Portfolio", icon: <IconUser />, href: "https://bhargavpatel.vercel.app/" },
  { title: "Home", icon: <IconHome />, href: "#home" },
  { title: "Github", icon: <IconBrandGithub />, href: "https://github.com/bhargav-patel-07" },
  { title: "X", icon: <IconBrandX />, href: "https://x.com/Bhargav_0710" },
  { title: "Linkedin", icon: <IconBrandLinkedin />, href: "https://www.linkedin.com/in/bhargavpatel0710/" },
  { title: "Instagram", icon: <IconBrandInstagram />, href: "https://www.instagram.com/_.bhargavv__/" },

  
];

export default function LandingPage() {
  const [currentHash, setCurrentHash] = useState("#home");
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const router = useRouter();

  const customCommandMap = {
    GIT: "git clone --recursive --force https://github.com/bhargav-patel-07/nova.ai.git",
    
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

  const handleRazorpay = useCallback(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (document.getElementById('razorpay-script')) return resolve(true);
        const script = document.createElement("script");
        script.id = 'razorpay-script';
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    loadRazorpay().then(() => {
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        alert('Razorpay Key ID is not set. Please check your environment variables.');
        return;
      }
      const options = {
        key: razorpayKey, // Use env variable
        amount: 90000, // 900.00 INR in paise (change as needed)
        currency: "INR",
        name: "Nova AI Plus",
        description: "Upgrade to Plus Plan",
        image: "/logo.png",
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          // TODO: Call your backend to verify payment and update user status
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#6366f1",
        },
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fullscreen animated stars background */}
      <StarsBackground className="fixed inset-0 w-screen h-screen -z-10" />
      <section
  id="home"
  className="flex flex-col items-center md:items-stretch min-h-screen w-full pt-1 pb-1 px-1 sm:pt-0 sm:pb-0 sm:px-0 md:pt-2 md:pb-2 md:px-0 md:max-w-[1280px] md:mx-auto md:gap-y-0 gap-y-0 overflow-y-auto pb-24"
>
  {/* Mobile Header */}
  <div className="w-full flex flex-row items-center justify-between px-2 pt-0 z-50 gap-2 sm:hidden ">
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
  <SignedOut >
    <SignInButton mode="modal">
      <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-lg px-4 py-1 font-semibold shadow hover:bg-white/30 transition-colors">LOGIN</button>
    </SignInButton>
    <SignUpButton mode="modal">
      <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-lg px-4 py-1 font-semibold shadow hover:bg-white/30 transition-colors ml-2">Sign Up</button>
    </SignUpButton>
  </SignedOut>
</div>
</div>    
  {/* Desktop/Laptop Header */}
  <div className="hidden sm:flex w-full max-w-5xl mx-auto items-center justify-between pt-1 px-4 z-30 relative">
    {/* Logo */}
    <div className="flex items-top">
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
      <SignInButton mode="modal">
        <button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-mono rounded-lg bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors">LOGIN</button>
      </SignInButton>
      <SignUpButton mode="modal">
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
      onSend={() => router.push("/chat")}
      placeholder=""
    />
  </div>
</section>


      {/* 2. About Section */}
<section id="about" className="min-h-screen flex flex-col items-start justify-start">
        <ScriptCopyBtn
    showMultiplePackageOptions={true}
    codeLanguage="shell"
    lightTheme="nord"
    darkTheme="vitesse-dark"
    commandMap={customCommandMap}
    className="mt-8 w-full max-w-xl overflow-x-auto"
  />
  {/* Pricing Section */}
  <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-stretch mt-8">
    {/* Free Plan */}
    <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 min-w-[200px] max-w-xs ring-1 ring-white/20">
      <h3 className="text-2xl font-bold mb-2 text-white text-center">Free</h3>
      <div className="text-4xl font-extrabold mb-4 text-white text-center">$0<span className="text-lg font-medium">/mo</span></div>
      <ul className="mb-6 text-white/80 space-y-2 text-sm flex-1">
        <li>✔️ Basic AI chat</li>
        <li>✔️ Limited history</li>
        <li>✔️ Community support</li>
      </ul>
      <div className="flex justify-center mt-auto">
        <Link
          href="/chat"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-500 border border-white/30 text-white font-semibold shadow-md hover:from-gray-600 hover:to-gray-400 hover:shadow-lg transition ring-1 ring-inset ring-white/10 text-center"
        >
          Get Started
        </Link>
      </div>
    </div>
    {/* Plus Plan */}
    <div className="flex-1 flex flex-col bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 min-w-[200px] max-w-xs ring-1 ring-white/20">
      <h3 className="text-2xl font-bold mb-2 text-white text-center">Plus</h3>
      <div className="text-4xl font-extrabold mb-4 text-white text-center">$9<span className="text-lg font-medium">/mo</span></div>
      <ul className="mb-6 text-white/90 space-y-2 text-sm flex-1">
        <li>✨ Priority AI access</li>
        <li>✨ Unlimited history</li>
        <li>✨ Premium support</li>
        <li>✨ Early feature access</li>
      </ul>
      <div className="flex justify-center mt-auto">
        <button
          onClick={handleRazorpay}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-400 border border-white/40 text-white font-semibold shadow-md hover:from-purple-600 hover:to-blue-500 hover:shadow-lg transition ring-1 ring-inset ring-white/10 text-center"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
  {/* Centered Custom Button in the middle of the screen after pricing */}
  <div className="w-full flex min-h-[40vh] items-center justify-center">
    <Button onClick={handleRazorpay}>BUY COFFEE</Button>
  </div>
  <div className="w-full mt-auto flex justify-center pb-2">
    <FloatingDock items={dockItems} />
  </div>
</section>
    </div>
  );
}
