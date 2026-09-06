"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Eye,
  Sparkles,
  Layers,
  Timer,
  LogOut,
  ScanSearch,
  Filter,
  ChevronDown,
  Globe,
  MessageSquarePlus,
  Minimize2,
  ArrowUp,
  Gauge,
  CheckCircle2,
  AlertCircle,
  MousePointerClick,
  Laptop,
  Smartphone,
  Zap,
} from "lucide-react";

// ── 1. Real-time Dashboard Floating Mockup ────────────────────────────────────
function StatsAndLocationsMockup() {
  return (
    <div className="relative flex p-4 -m-4 sm:p-6 sm:-m-6 rounded-2xl overflow-hidden max-h-[350px] w-full select-none">
      {/* Left-Back Tilted 4-Stat Box */}
      <div className="scale-90 hidden sm:block min-w-[360px] rotate-[-2deg] -mb-8 self-end z-0">
        <div className="bg-white dark:bg-zinc-900 border border-[#e8e6e5] dark:border-zinc-800 rounded-2xl py-4 px-5 shadow-lg grid grid-cols-2 gap-y-6 max-w-[500px]">
          
          {/* Stat 1: Total Visits */}
          <div className="flex flex-col gap-2 items-start">
            <div className="text-xs font-medium text-[#78716c] dark:text-zinc-400 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#3ba6f1]" />
              <span>Total Visits</span>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="font-roobert font-bold text-lg sm:text-xl text-[#0c0a09] dark:text-white leading-none">
                1,234
              </div>
              <div className="flex gap-1 items-center text-xs font-semibold leading-none text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span>12.5%</span>
              </div>
            </div>
          </div>

          {/* Stat 2: Views per Visit */}
          <div className="sm:pl-4 sm:border-l border-dashed border-[#e8e6e5] dark:border-zinc-800 flex flex-col gap-2 items-start">
            <div className="text-xs font-medium text-[#78716c] dark:text-zinc-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-[#78716c] dark:text-zinc-400" />
              <span>Views per Visit</span>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="font-roobert font-bold text-lg sm:text-xl text-[#0c0a09] dark:text-white leading-none">
                2.45
              </div>
              <div className="flex gap-1 items-center text-xs font-semibold leading-none text-rose-500">
                <TrendingDown className="h-3 w-3" />
                <span>-5.2%</span>
              </div>
            </div>
          </div>

          {/* Stat 3: Visit Duration */}
          <div className="flex flex-col gap-2 items-start pt-1 border-t border-[#e8e6e5] dark:border-zinc-800/80">
            <div className="text-xs font-medium text-[#78716c] dark:text-zinc-400 flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5 text-[#3ba6f1]" />
              <span>Visit Duration</span>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="font-roobert font-bold text-lg sm:text-xl text-[#0c0a09] dark:text-white leading-none">
                2m 5s
              </div>
              <div className="flex gap-1 items-center text-xs font-semibold leading-none text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span>8.3%</span>
              </div>
            </div>
          </div>

          {/* Stat 4: Bounce Rate */}
          <div className="sm:pl-4 sm:border-l border-dashed border-[#e8e6e5] dark:border-zinc-800 flex flex-col gap-2 items-start pt-1 border-t border-[#e8e6e5] dark:border-zinc-800/80">
            <div className="text-xs font-medium text-[#78716c] dark:text-zinc-400 flex items-center gap-1.5">
              <LogOut className="h-3.5 w-3.5 text-[#78716c] dark:text-zinc-400" />
              <span>Bounce Rate</span>
            </div>
            <div className="flex gap-2 items-baseline">
              <div className="font-roobert font-bold text-lg sm:text-xl text-[#0c0a09] dark:text-white leading-none">
                42%
              </div>
              <div className="flex gap-1 items-center text-xs font-semibold leading-none text-rose-500">
                <TrendingDown className="h-3 w-3" />
                <span>-3.8%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Front-Right Overlapping Locations Box */}
      <div className="scale-90 min-w-[340px] sm:min-w-[380px] self-end -ml-6 sm:-ml-48 -mb-10 rotate-[-1deg] z-10">
        <div className="bg-white dark:bg-zinc-900/95 border border-[#e8e6e5] dark:border-zinc-800 rounded-2xl p-4 shadow-2xl max-w-[480px]">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#e8e6e5] dark:border-zinc-800/80 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-[#0c0a09] dark:text-white">
                Locations
              </span>
              <span className="p-0.5 rounded bg-[#f5f5f4] dark:bg-zinc-800 text-[#78716c] dark:text-zinc-400">
                <ScanSearch className="h-3.5 w-3.5" />
              </span>
            </div>
            <span className="text-[11px] font-sans text-[#78716c] dark:text-zinc-400">
              10 countries
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {[
              { code: "US", flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg", name: "United States", pct: "80%", val: 420 },
              { code: "DE", flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg", name: "Germany", pct: "59%", val: 310 },
              { code: "NL", flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/NL.svg", name: "Netherlands", pct: "53%", val: 280 },
              { code: "CA", flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg", name: "Canada", pct: "46%", val: 240 },
              { code: "FR", flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg", name: "France", pct: "42%", val: 220 },
              { code: "SE", flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/SE.svg", name: "Sweden", pct: "36%", val: 190 },
            ].map((c) => (
              <div
                key={c.code}
                className="group relative flex items-center justify-between px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {/* Background relative bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-lg bg-[#3ba6f1]/10 dark:bg-[#3ba6f1]/20 transition-all group-hover:bg-[#3ba6f1]/30 -z-0 pointer-events-none"
                  style={{ width: c.pct }}
                />

                <div className="relative z-10 flex items-center gap-2 text-xs text-[#0c0a09] dark:text-zinc-100 font-medium">
                  <div className="h-2.5 w-4 rounded-[2px] overflow-hidden shadow-sm flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.flag} alt={c.code} className="h-full w-full object-cover" />
                  </div>
                  <span>{c.name}</span>
                </div>

                <div className="relative z-10 flex items-center gap-2">
                  <span className="font-sans text-xs text-[#78716c] dark:text-zinc-400 tabular-nums group-hover:hidden">
                    {c.val}
                  </span>
                  <div className="hidden group-hover:flex items-center justify-center p-1 rounded bg-white dark:bg-zinc-800 border border-[#e8e6e5] dark:border-zinc-700 shadow-sm">
                    <Filter className="h-3 w-3 text-[#3ba6f1]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. Journeys Interactive Timeline Mockup ──────────────────────────────────
function JourneysTimelineMockup() {
  const [eventOpen, setEventOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="mt-4 sm:mt-2 relative flex justify-start rounded-2xl p-4 -m-4 sm:p-6 sm:-m-6 overflow-hidden max-h-[420px] w-full select-none">
      <div className="scale-90 max-w-[320px] sm:max-w-[400px] -mb-8 -ml-2 min-h-[340px] w-full">
        <div className="pt-2 h-full w-full border-l-2 border-[#e8e6e5] dark:border-zinc-800 pl-6 sm:pl-8 pb-8 relative">
          
          {/* Timeline Date Pill */}
          <div className="inline-flex items-center rounded-full border border-[#e8e6e5] dark:border-zinc-800 px-3 py-0.5 text-xs font-sans text-[#78716c] dark:text-zinc-400 bg-stone-100 dark:bg-zinc-900/90 mb-4 -ml-4 shadow-sm backdrop-blur-md">
            Thursday, 21 Mar 24
          </div>

          {/* Timeline Cards Container */}
          <div className="w-full max-w-[360px] space-y-2">
            
            {/* Event Block: user: signed up */}
            <div className="w-full">
              <div
                onMouseEnter={() => setEventOpen(true)}
                onMouseLeave={() => setEventOpen(false)}
                onClick={() => setEventOpen(!eventOpen)}
                className="group relative cursor-pointer w-full px-3 py-2.5 flex flex-col bg-white dark:bg-zinc-900 border border-[#e8e6e5] dark:border-zinc-800 rounded-xl shadow-sm hover:border-[#3ba6f1]/50 transition-all text-left"
              >
                <div className="w-full flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-[#0c0a09] dark:text-white truncate">
                    user: signed up
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs font-sans text-[#78716c] dark:text-zinc-400">
                    <span>2 props</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${eventOpen ? "rotate-180 text-[#3ba6f1]" : ""}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {eventOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pt-2.5 mt-2.5 border-t border-[#e8e6e5] dark:border-zinc-800/80 text-[11px] text-[#78716c] dark:text-zinc-400 font-sans space-y-1.5"
                    >
                      <div className="flex justify-between">
                        <span>email</span>
                        <span className="text-[#0c0a09] dark:text-zinc-200 font-medium">bruce@wayne.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span>referral</span>
                        <span className="text-[#0c0a09] dark:text-zinc-200 font-medium">blog</span>
                      </div>
                      <div className="text-[10px] pt-1 text-[#a8a29e] dark:text-zinc-500 font-sans">
                        Occurred at <span className="font-semibold text-[#0c0a09] dark:text-zinc-300">10:19:00 AM</span> on Desktop (macOS)
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Page Navigation Steps */}
            {[
              { path: "/sign-up", duration: "85s", time: "10:17:35 AM" },
              { path: "/", duration: "32s", time: "10:16:05 AM" },
              { path: "/blog/web-analytics", duration: "45s", time: "10:15:20 AM" },
            ].map((step, idx) => {
              const isOpen = activeStep === idx;
              return (
                <div
                  key={step.path}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(isOpen ? null : idx)}
                  className="group relative cursor-pointer w-full px-3 py-2.5 flex flex-col bg-white dark:bg-zinc-900 border border-[#e8e6e5] dark:border-zinc-800 rounded-xl shadow-sm hover:border-[#3ba6f1]/50 transition-all text-left"
                >
                  <div className="w-full flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#3ba6f1]/10 text-[#3ba6f1]">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-sans text-xs sm:text-[13px] text-[#0c0a09] dark:text-zinc-200 truncate">
                      {step.path}
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="text-xs font-sans text-[#78716c] dark:text-zinc-400 tabular-nums">
                        {step.duration}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#3ba6f1]" : "text-[#a8a29e]"}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pt-2 mt-2 border-t border-[#e8e6e5] dark:border-zinc-800/80 text-[10px] text-[#a8a29e] dark:text-zinc-500 font-sans"
                      >
                        Occurred at <span className="font-semibold text-[#0c0a09] dark:text-zinc-300">{step.time}</span> on Desktop (macOS)
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. Chat with Spectr AI Mockup (Interface Only) ───────────────────────────
function ChatWithSpectrMockup() {
  const [inputVal, setInputVal] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Press 'C' or 'c' to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const isInput = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
      if (!isInput && (e.key === "c" || e.key === "C") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const SUGGESTIONS = [
    "Which custom events should we track?",
    "What are our busiest hours?",
    "How well our blog converts?",
    "Send me a CSV with last 30 days of data",
    "Where our users drop off?",
    "What are our most popular features?",
    "How to add Spectr to my next.js app?",
    "What is bounce rate?",
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center select-none max-w-[620px]">
      <div className="w-full flex flex-col px-3 py-2.5 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0px_12px_45px_0px_rgba(17,12,46,0.12)] dark:shadow-[0px_12px_45px_0px_rgba(0,0,0,0.6)] border border-[#e8e6e5] dark:border-zinc-800 transition-all">
        
        {/* Top Controls Bar */}
        <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-stone-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-2">
            <kbd className="h-[18px] px-1.5 leading-none flex items-center justify-center rounded border border-[#e8e6e5] dark:border-zinc-700 bg-stone-100 dark:bg-zinc-800 font-sans text-[11px] text-[#78716c] dark:text-zinc-400 font-semibold shadow-2xs">
              C
            </kbd>
          </div>
          <div className="flex items-center">
            <span className="hidden sm:inline-block text-[12px] leading-[18px] h-[18px] mr-3 text-[#78716c] dark:text-zinc-400 font-normal">
              78 messages left
            </span>
            <button
              type="button"
              onClick={() => setInputVal("")}
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors mr-2 h-[20px] text-[12px] px-1.5 rounded-sm bg-stone-100 dark:bg-zinc-800 hover:text-[#3ba6f1] hover:bg-[#3ba6f1]/10 text-[#78716c] dark:text-zinc-300 cursor-pointer"
            >
              <MessageSquarePlus className="h-[13px] w-[13px] mr-1" />
              New chat
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors h-[20px] text-[12px] px-1.5 rounded-sm bg-stone-100 dark:bg-zinc-800 hover:text-[#3ba6f1] hover:bg-[#3ba6f1]/10 text-[#78716c] dark:text-zinc-300 cursor-pointer"
            >
              <Minimize2 className="h-[13px] w-[13px] mr-1" />
              {isMinimized ? "Expand" : "Minimize"}
            </button>
          </div>
        </div>

        {/* Content Area - Pure UI Interface */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-2 mb-2 min-h-[220px] flex flex-col justify-center border-b border-stone-100 dark:border-zinc-800/60">
                <div className="w-full flex flex-col items-center">
                  {/* Suggestion Chips (Non-clickable, hover effect only) */}
                  <div className="w-full flex flex-wrap gap-1 justify-center py-1">
                    {SUGGESTIONS.map((q) => (
                      <span
                        key={q}
                        className="inline-flex items-center justify-center whitespace-nowrap text-xs sm:text-[13px] font-medium transition-colors rounded-md px-2.5 h-7 border border-transparent hover:bg-[#3ba6f1]/10 text-[#0284c7] dark:text-[#3ba6f1] select-none cursor-default"
                      >
                        {q}
                      </span>
                    ))}
                  </div>

                  {/* Centered Avatar Icon */}
                  <div className="mt-3 w-full flex items-center justify-center">
                    <div className="rounded-lg min-w-8 h-8 w-8 flex items-center justify-center overflow-hidden bg-[#3ba6f1] text-white shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/mascot.jpg"
                        alt="Spectr"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Input Row */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full flex items-center gap-1 pt-0.5"
        >
          {/* AI Sparkles Icon */}
          <div className="border-r border-stone-200/70 dark:border-zinc-800 pr-1 flex items-center">
            <button
              type="button"
              className="whitespace-nowrap text-sm font-medium transition-colors h-7 w-7 min-w-7 rounded-full hover:bg-[#3ba6f1]/10 text-[#78716c] dark:text-zinc-400 hover:text-[#3ba6f1] flex items-center justify-center p-0"
              title="Spectr AI Text"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 -m-0.5 flex-shrink-0"
              >
                <title>AI Text</title>
                <path
                  d="M4.75 5.75H19.25M12.75 9.75H19.25M16.75 13.75H19.25M16.75 17.75H19.25M8.9999 10.75L7.78568 13.7855L4.75 14.9998L7.78561 16.214L8.99999 19.25L10.2144 16.2141L13.25 14.9998L10.2141 13.7854L8.9999 10.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="w-full flex items-center gap-1">
            <input
              ref={inputRef}
              type="text"
              maxLength={1000}
              placeholder="Ask Spectr..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex w-full rounded-md border-0 bg-transparent text-sm placeholder:text-[#a8a29e] dark:placeholder:text-zinc-500 focus:outline-none focus:ring-0 h-7 min-h-[28px] px-2 py-1 text-[#0c0a09] dark:text-white"
            />
            <button
              type="button"
              className="whitespace-nowrap text-sm font-medium transition-colors bg-[#3ba6f1] text-white hover:bg-[#3398e1] h-7 w-7 min-w-7 rounded-lg shadow-none flex items-center justify-center cursor-pointer"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

// ── 4. Web Vitals Interactive Mockup ────────────────────────────────────────
function WebVitalsMockup() {
  const [activeDevice, setActiveDevice] = useState<"all" | "desktop" | "mobile">("all");

  const metrics = [
    {
      id: "lcp",
      title: "Loading Speed",
      tag: "LCP",
      value: activeDevice === "mobile" ? "1.85s" : activeDevice === "desktop" ? "1.28s" : "1.42s",
      benchmark: "< 2.5s",
      icon: Zap,
      iconColor: "text-[#3ba6f1] bg-[#3ba6f1]/10 border-[#3ba6f1]/20",
      pct: "85%",
      status: "good" as const,
    },
    {
      id: "inp",
      title: "Click Response",
      tag: "INP",
      value: activeDevice === "mobile" ? "242ms" : activeDevice === "desktop" ? "168ms" : "214ms",
      benchmark: "< 200ms",
      icon: MousePointerClick,
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      pct: "65%",
      status: "needs-work" as const,
    },
    {
      id: "cls",
      title: "Visual Stability",
      tag: "CLS",
      value: activeDevice === "mobile" ? "0.021" : activeDevice === "desktop" ? "0.008" : "0.012",
      benchmark: "< 0.1",
      icon: Layers,
      iconColor: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      pct: "96%",
      status: "good" as const,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center select-none max-w-[620px]">
      <div className="w-full flex flex-col px-3 py-2.5 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0px_12px_45px_0px_rgba(17,12,46,0.12)] dark:shadow-[0px_12px_45px_0px_rgba(0,0,0,0.6)] border border-[#e8e6e5] dark:border-zinc-800 transition-all">
        
        {/* Top Controls Bar - Matches Card 3's top bar */}
        <div className="w-full flex items-center justify-between pb-2 mb-1 border-b border-stone-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-2">
            <kbd className="h-[18px] px-1.5 leading-none flex items-center justify-center rounded border border-[#e8e6e5] dark:border-zinc-700 bg-stone-100 dark:bg-zinc-800 font-sans text-[11px] text-[#78716c] dark:text-zinc-400 font-semibold shadow-2xs">
              P75
            </kbd>
            <span className="text-[12px] font-semibold text-[#0c0a09] dark:text-zinc-200">
              Live Telemetry
            </span>
          </div>

          <div className="flex items-center">
            <span className="hidden sm:inline-block text-[12px] leading-[18px] h-[18px] mr-3 text-[#3ba6f1] font-sans font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3ba6f1] mr-1.5 animate-pulse" />
              94% passing
            </span>

            {/* Device Filter Buttons */}
            <div className="flex items-center gap-0.5 bg-stone-100 dark:bg-zinc-800 p-0.5 rounded-sm">
              <button
                type="button"
                onClick={() => setActiveDevice("all")}
                className={`h-[18px] px-1.5 text-[11px] font-medium rounded-xs transition-colors cursor-pointer ${
                  activeDevice === "all"
                    ? "bg-white dark:bg-zinc-700 text-[#0c0a09] dark:text-white shadow-2xs"
                    : "text-[#78716c] dark:text-zinc-400 hover:text-[#0c0a09] dark:hover:text-white"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveDevice("desktop")}
                className={`h-[18px] px-1.5 text-[11px] font-medium rounded-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  activeDevice === "desktop"
                    ? "bg-white dark:bg-zinc-700 text-[#0c0a09] dark:text-white shadow-2xs"
                    : "text-[#78716c] dark:text-zinc-400 hover:text-[#0c0a09] dark:hover:text-white"
                }`}
                title="Desktop"
              >
                <Laptop className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setActiveDevice("mobile")}
                className={`h-[18px] px-1.5 text-[11px] font-medium rounded-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  activeDevice === "mobile"
                    ? "bg-white dark:bg-zinc-700 text-[#0c0a09] dark:text-white shadow-2xs"
                    : "text-[#78716c] dark:text-zinc-400 hover:text-[#0c0a09] dark:hover:text-white"
                }`}
                title="Mobile"
              >
                <Smartphone className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - 3 Metric Cards */}
        <div className="pt-2 pb-2 mb-2 min-h-[220px] flex flex-col justify-between border-b border-stone-100 dark:border-zinc-800/60 space-y-2">
          {metrics.map((m) => {
            const Icon = m.icon;
            const isNeedsWork = m.status === "needs-work";
            return (
              <div
                key={m.id}
                className={`group relative flex items-center justify-between p-2.5 rounded-xl border border-[#e8e6e5] dark:border-zinc-800 bg-stone-50/60 dark:bg-zinc-950/40 ${
                  isNeedsWork ? "hover:border-amber-500/40" : "hover:border-[#3ba6f1]/40"
                } hover:bg-white dark:hover:bg-zinc-800/60 transition-all overflow-hidden`}
              >
                {/* Subtle relative background fill like Card 1 */}
                <div
                  className={`absolute left-0 top-0 bottom-0 ${
                    isNeedsWork ? "bg-amber-500/5 dark:bg-amber-500/10" : "bg-[#3ba6f1]/5 dark:bg-[#3ba6f1]/10"
                  } transition-all pointer-events-none -z-0`}
                  style={{ width: m.pct }}
                />

                <div className="relative z-10 flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${m.iconColor} shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-[#0c0a09] dark:text-white">
                        {m.title}
                      </span>
                      <span className="text-[10px] font-sans font-medium text-[#78716c] dark:text-zinc-400">
                        ({m.tag})
                      </span>
                    </div>
                    <span className="text-[10px] font-sans text-[#78716c] dark:text-zinc-500">
                      Target: {m.benchmark}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2.5">
                  <span className="font-roobert font-bold text-base text-[#0c0a09] dark:text-white tabular-nums">
                    {m.value}
                  </span>
                  {isNeedsWork ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2 py-0.5 rounded-full text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20">
                      <AlertCircle className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                      Needs work
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2 py-0.5 rounded-full text-[#3ba6f1] bg-[#3ba6f1]/10 border border-[#3ba6f1]/20">
                      <CheckCircle2 className="w-3 h-3 text-[#3ba6f1]" />
                      Good
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Status Row - Matches Card 3's bottom row */}
        <div className="w-full flex items-center justify-between pt-1 pb-0.5 text-xs text-[#78716c] dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-full bg-stone-100 dark:bg-zinc-800 flex items-center justify-center text-[#3ba6f1]">
              <Gauge className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] font-sans truncate">
              Google SEO ranking signal · RUM P75
            </span>
          </div>
          <span className="text-[11px] font-sans font-medium text-[#3ba6f1] bg-[#3ba6f1]/10 px-2 py-0.5 rounded">
            Auto-sampled
          </span>
        </div>

      </div>
    </div>
  );
}

// ── 5. Main Walkthrough Section ──────────────────────────────────────────────
export function WalkthroughFeatures() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#fafaf9] dark:bg-black text-[#0c0a09] dark:text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header: Bold dark text + light gray text on same line */}
        <div className="mb-8 max-w-4xl">
          <h2 className="font-roobert text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.025em] leading-[1.12]">
            <span className="font-semibold text-[#0c0a09] dark:text-white">Why Spectr? </span>
            <span className="text-[#a8a29e] dark:text-zinc-500 font-normal">Let&apos;s walk through it.</span>
          </h2>
        </div>

        {/* 2. Two-Column Narrative Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-8 text-base sm:text-lg text-[#78716c] dark:text-zinc-400 leading-[1.68] font-normal">
          <div>
            <p>
              Spectr&apos;s cherry-picked toolkit is similar to Google Analytics, but real-time, simple, privacy-first, and designed for daily use. Including an intuitive all-in-one dashboard, packaged with visitor journey insights and funnels on top of it.
            </p>
          </div>

          <div>
            <p>
              If you have a SaaS you only need to identify your users to start with our user-centric product analytics — think Amplitude or Mixpanel, but actually digestible, easy to use, and naturally insightful.{" "}
              <span className="highlight-span font-semibold text-[#0c0a09] dark:text-white">
                Run Spectr standalone or alongside your current stack.
              </span>
            </p>
          </div>
        </div>

        {/* 3. Horizontal Note Line */}
        <div className="flex flex-wrap items-center gap-2 mb-12 text-xs sm:text-sm text-[#78716c] dark:text-zinc-400 font-normal">
          <span className="text-[#a8a29e] dark:text-zinc-500 font-bold">*</span>
          <span className="inline-flex items-center rounded-full border border-[#e8e6e5] dark:border-zinc-800 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 text-xs font-sans text-[#78716c] dark:text-zinc-300">
            no setup required
          </span>
          <span>means you only need to add our whisper-thin (~2kb) html snippet to your website for the feature to work.</span>
        </div>

        {/* 4. Two Side-by-Side Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Real-time dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-[#e8e6e5] dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#3ba6f1]/40 transition-colors duration-300"
          >
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#f5f5f4] dark:bg-zinc-900 border border-[#e8e6e5] dark:border-zinc-800 text-[#3ba6f1]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6 text-[#3ba6f1]">
                    <path d="M17.838 2H6.162c-.527 0-.981 0-1.356.03-.395.033-.789.104-1.167.297a3 3 0 0 0-1.311 1.311c-.193.378-.264.772-.296 1.167C2 5.18 2 5.635 2 6.161V6.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C2.76 8 3.04 8 3.6 8h16.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C22 7.24 22 6.96 22 6.4v-.239c0-.527 0-.981-.03-1.356-.033-.395-.104-.789-.297-1.167a3 3 0 0 0-1.311-1.311c-.378-.193-.772-.264-1.167-.296A17.9 17.9 0 0 0 17.838 2ZM22 11.6c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C21.24 10 20.96 10 20.4 10h-8.8c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C10 10.76 10 11.04 10 11.6v8.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C10.76 22 11.04 22 11.6 22h6.239c.527 0 .982 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 0 0 1.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356V11.6ZM6.4 22c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C8 21.24 8 20.96 8 20.4v-8.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C7.24 10 6.96 10 6.4 10H3.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C2 10.76 2 11.04 2 11.6v6.239c0 .527 0 .982.03 1.356.033.395.104.789.297 1.167a3 3 0 0 0 1.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031H6.4Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="inline-flex items-center rounded-full border border-[#e8e6e5] dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 px-3 py-1 text-xs font-sans text-[#78716c] dark:text-zinc-400 font-normal">
                  no setup required
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-roobert font-semibold text-2xl sm:text-3xl text-[#0c0a09] dark:text-white mb-2.5">
                Real-time dashboard
              </h3>
              <p className="text-sm sm:text-base md:text-[17px] text-[#78716c] dark:text-zinc-400 leading-[1.65] mb-3 max-w-[420px]">
                Easy-to-use website analytics. Gain a clear view of where your visitors come from and how they interact with your website. Referrers, countries, devices, UTM parameters, and more.
              </p>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#3ba6f1] hover:text-[#3398e1] transition-colors mb-6 group/link"
              >
                <span>Explore example dashboard</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>

            {/* Lower Part Mockup */}
            <div className="pt-2 mt-auto">
              <StatsAndLocationsMockup />
            </div>
          </motion.div>

          {/* Card 2: Journeys */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl border border-[#e8e6e5] dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#3ba6f1]/40 transition-colors duration-300"
          >
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#f5f5f4] dark:bg-zinc-900 border border-[#e8e6e5] dark:border-zinc-800 text-[#3ba6f1]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6 text-[#3ba6f1]">
                    <path d="M1 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0ZM15 19a4 4 0 1 1 8 0 4 4 0 0 1-8 0ZM15.353 6.065C14.57 6.001 13.477 6 11.934 6H11.5a1 1 0 1 1 0-2h.485c1.48 0 2.657 0 3.532.072.445.036.858.094 1.22.197.36.102.73.265 1.034.552a3 3 0 0 1 .88 2.767c-.082.41-.291.758-.526 1.049a6.492 6.492 0 0 1-.882.865c-.673.564-1.633 1.243-2.842 2.098l-2.064 1.46-.01.006-2.032 1.438c-1.26.89-2.151 1.522-2.753 2.027a4.59 4.59 0 0 0-.61.589.703.703 0 0 0-.122.187 1 1 0 0 0 .291.917c.006.004.057.04.208.083.182.052.45.096.838.128.783.064 1.876.065 3.419.065h.934a1 1 0 1 1 0 2h-.985c-1.48 0-2.656 0-3.532-.072a6.495 6.495 0 0 1-1.219-.197c-.36-.102-.731-.265-1.035-.552a3 3 0 0 1-.88-2.767c.082-.41.291-.757.526-1.049.236-.292.54-.577.882-.865.294-.246.642-.514 1.041-.808.038-.038.08-.072.125-.104l5.782-4.09c1.26-.89 2.151-1.522 2.753-2.027.3-.25.492-.441.61-.589a.7.7 0 0 0 .122-.187 1 1 0 0 0-.291-.917.701.701 0 0 0-.208-.083 4.587 4.587 0 0 0-.838-.128Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="inline-flex items-center rounded-full border border-[#e8e6e5] dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 px-3 py-1 text-xs font-sans text-[#78716c] dark:text-zinc-400 font-normal">
                  no setup required
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-roobert font-semibold text-2xl sm:text-3xl text-[#0c0a09] dark:text-white mb-2.5">
                Journeys
              </h3>
              <p className="text-sm sm:text-base md:text-[17px] text-[#78716c] dark:text-zinc-400 leading-[1.65] mb-6 max-w-[420px]">
                Study each individual visitor and their journey through your website. Send in custom events to gain the full picture. Once you try it, you&apos;ll wonder how you ever lived without it.
              </p>
            </div>

            {/* Lower Part Mockup */}
            <div className="pt-2 mt-auto">
              <JourneysTimelineMockup />
            </div>
          </motion.div>

          {/* Card 3: Chat with Spectr AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl border border-[#e8e6e5] dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#3ba6f1]/40 transition-colors duration-300"
          >
            <div className="relative z-10">
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#f5f5f4] dark:bg-zinc-900 border border-[#e8e6e5] dark:border-zinc-800 text-[#3ba6f1]">
                  <svg viewBox="0 0 24 24" fill="none" width="24" height="24" color="currentColor" aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6 text-[#3ba6f1]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.162 10h5.676c.528 0 .982 0 1.357.03.395.033.789.104 1.167.297a3 3 0 0 1 1.311 1.311c.193.378.264.772.296 1.167.031.375.031.83.031 1.357v2.784c0 .439 0 .817-.021 1.13-.023.33-.072.66-.207.986a3 3 0 0 1-1.624 1.624 3.07 3.07 0 0 1-.986.207 6.784 6.784 0 0 1-.162.009V22a1 1 0 0 1-1.57.821l-2.177-1.513c-.335-.233-.403-.276-.467-.305a.996.996 0 0 0-.232-.072c-.069-.013-.149-.017-.557-.017h-1.835c-.528 0-.982 0-1.357-.03-.395-.033-.789-.104-1.167-.297a3 3 0 0 1-1.311-1.31c-.193-.38-.264-.772-.296-1.168C9 17.735 9 17.28 9 16.753v-2.591c0-.528 0-.982.03-1.357.033-.395.104-.789.297-1.167a3 3 0 0 1 1.311-1.311c.378-.193.772-.264 1.167-.296.375-.031.83-.031 1.357-.031Z" fill="currentColor" />
                    <path d="M14.241 1H6.76c-.805 0-1.47 0-2.01.044-.563.046-1.08.145-1.565.392a4 4 0 0 0-1.748 1.748c-.247.485-.346 1.002-.392 1.564C1 5.29 1 5.954 1 6.758v4.763c0 .441 0 .769.042 1.059a4 4 0 0 0 3.378 3.378c.072.01.116.037.136.053v1.578c0 .273 0 .54.019.755.016.19.06.587.342.915a1.5 1.5 0 0 0 1.263.518c.43-.036.74-.286.886-.41l.13-.115a5.813 5.813 0 0 1-.159-.98C7 17.814 7 17.284 7 16.795V14.12c0-.489 0-1.018.037-1.477.043-.519.148-1.205.508-1.912A5 5 0 0 1 9.73 8.545c.707-.36 1.393-.465 1.912-.508C12.101 8 12.631 8 13.12 8h5.762c.366 0 .754 0 1.119.015V6.76c0-.805 0-1.47-.044-2.01-.046-.563-.145-1.08-.392-1.565a4 4 0 0 0-1.748-1.748c-.485-.247-1.002-.346-1.564-.392C15.71 1 15.046 1 14.242 1Z" fill="currentColor" />
                  </svg>
                </div>
                <span className="inline-flex items-center rounded-full border border-[#e8e6e5] dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 px-3 py-1 text-xs font-sans text-[#78716c] dark:text-zinc-400 font-normal">
                  no setup required
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-roobert font-semibold text-2xl sm:text-3xl text-[#0c0a09] dark:text-white mb-2.5">
                Chat with Spectr AI
              </h3>
              <p className="text-sm sm:text-base md:text-[17px] text-[#78716c] dark:text-zinc-400 leading-[1.65] mb-6 max-w-[420px]">
                Spectr can query your data, answer analytics-related questions, spit out CSVs, aggregate pageviews, create funnels, and more. In-app chat or{" "}
                <Link href="/docs/ai-readonly-role" className="text-[#3ba6f1] hover:underline font-medium">
                  MCP interface
                </Link>{" "}
                available.
              </p>
            </div>

            {/* Lower Part Mockup */}
            <div className="pt-2 mt-auto w-full flex justify-center">
              <ChatWithSpectrMockup />
            </div>
          </motion.div>

          {/* Card 4: Core Web Vitals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-3xl border border-[#e8e6e5] dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#3ba6f1]/40 transition-colors duration-300"
          >
            <div className="relative z-10">
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#f5f5f4] dark:bg-zinc-900 border border-[#e8e6e5] dark:border-zinc-800 text-[#3ba6f1]">
                  <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-[#3ba6f1]" />
                </div>
                <span className="inline-flex items-center rounded-full border border-[#e8e6e5] dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 px-3 py-1 text-xs font-sans text-[#78716c] dark:text-zinc-400 font-normal">
                  no setup required
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-roobert font-semibold text-2xl sm:text-3xl text-[#0c0a09] dark:text-white mb-2.5">
                Core Web Vitals
              </h3>
              <p className="text-sm sm:text-base md:text-[17px] text-[#78716c] dark:text-zinc-400 leading-[1.65] mb-6 max-w-[420px]">
                Monitor real-user performance metrics (LCP, INP, CLS) across all pages and devices. Automatically collected at the 75th percentile with zero performance penalty.
              </p>
            </div>

            {/* Lower Part Mockup */}
            <div className="pt-2 mt-auto w-full flex justify-center">
              <WebVitalsMockup />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default WalkthroughFeatures;
