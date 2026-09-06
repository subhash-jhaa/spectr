"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  X,
  Send,
  Loader2,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { LogoMark } from "@/components/landing/Logo";
import { cn } from "@/lib/utils";

export type SourceItem = string | { type?: string; detail?: string };

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: SourceItem[];
  error?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What is Spectr & how does it work?",
  "What features does Spectr have?",
  "What is a good LCP score?",
  "How many page views did I get?",
];

// Lightweight, zero-dependency inline markdown parser for bold and code
function parseInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      tokens.push(text.substring(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      tokens.push(
        <strong key={match.index} className="font-semibold text-[#0284c7] dark:text-[#3ba6f1]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      tokens.push(
        <code
          key={match.index}
          className="rounded bg-stone-200/80 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px] text-zinc-900 dark:text-zinc-100"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    tokens.push(text.substring(lastIdx));
  }

  return tokens.length > 0 ? tokens : [text];
}

// Formatter component for assistant responses
function FormattedAssistantText({ content }: { content: string }) {
  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className="space-y-2 text-[13px] sm:text-sm">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n");
        return (
          <div key={pIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              // Bullet item (- or *)
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1">
                    <span className="mt-1.5 size-1.5 rounded-full bg-[#3ba6f1] shrink-0" />
                    <span className="leading-relaxed text-zinc-700 dark:text-zinc-200">
                      {parseInline(trimmed.slice(2))}
                    </span>
                  </div>
                );
              }

              // Numbered item
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1">
                    <span className="text-[11px] font-semibold text-[#3ba6f1] shrink-0 mt-0.5">
                      {numMatch[1]}.
                    </span>
                    <span className="leading-relaxed text-zinc-700 dark:text-zinc-200">
                      {parseInline(numMatch[2])}
                    </span>
                  </div>
                );
              }

              return (
                <p key={lIdx} className="leading-relaxed text-zinc-700 dark:text-zinc-200">
                  {parseInline(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function AskSpectrWidget() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Extract project ID if user is on /dashboard/[projectId]
  const pathMatch = pathname ? pathname.match(/^\/dashboard\/([a-zA-Z0-9_-]+)/) : null;
  const pathProjectId = pathMatch && pathMatch[1] !== "new" ? pathMatch[1] : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text:
        "Hi! I'm **Ask Spectr**, your AI assistant.\n\nYou can ask me **any question about this website**—what Spectr is, features, how it works, and privacy—or ask about your **live traffic, visitor trends**, and **Core Web Vitals** (LCP, INP, CLS)!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 60);
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Only display the Ask Spectr widget inside the logged-in dashboard
  if (!pathname?.startsWith("/dashboard") || status !== "authenticated" || !session) {
    return null;
  }

  const sendQuery = async (queryText: string) => {
    const query = queryText.trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          site_id: pathProjectId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch answer");
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.answer,
        sources: Array.isArray(data.sources) ? data.sources : [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Sorry, I couldn't reach the Ask Spectr service. Please make sure the spectr-ai backend is running.";

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: errMessage,
        error: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(question);
  };

  const handleSuggestedClick = (text: string) => {
    sendQuery(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button (Light Mode, Bottom-Right Corner, Muted Text) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full bg-white/95 dark:bg-zinc-900/95 px-4 py-2.5 shadow-lg shadow-black/[0.06] hover:shadow-xl border border-stone-200/90 dark:border-zinc-800 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none cursor-pointer"
          aria-label="Open Ask Spectr AI"
        >
          <LogoMark size={16} className="text-[#0c0a09] dark:text-zinc-100 shrink-0" />
          <span className="text-xs sm:text-sm font-medium tracking-tight text-stone-500 dark:text-zinc-400 group-hover:text-stone-800 dark:group-hover:text-zinc-200 transition-colors">
            Ask Spectr
          </span>
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ba6f1] opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-[#3ba6f1]"></span>
          </span>
        </button>
      )}

      {/* Expanded Chat Popover */}
      {isOpen && (
        <div className="flex h-[530px] max-h-[82vh] w-[360px] sm:w-[420px] flex-col overflow-hidden rounded-2xl border border-stone-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 backdrop-blur-xl shadow-2xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-zinc-800/80 bg-stone-50/90 dark:bg-zinc-900/90 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-stone-200/80 dark:border-zinc-700/60 shadow-2xs">
                <LogoMark size={16} className="text-[#0c0a09] dark:text-zinc-100" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 font-sans leading-none">
                  Ask Spectr
                  <span className="rounded-full bg-[#3ba6f1]/10 px-2 py-0.5 text-[10px] font-medium text-[#3398e1] dark:text-[#3ba6f1] border border-[#3ba6f1]/20">
                    AI
                  </span>
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1 leading-none">
                  Ask anything about this website & analytics
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-200/70 dark:hover:bg-zinc-800 hover:text-stone-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages Area with Custom Sleek Scrollbar */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col gap-1.5 max-w-[90%]",
                  msg.role === "user" ? "ml-auto items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 font-sans leading-relaxed text-xs sm:text-sm",
                    msg.role === "user"
                      ? "bg-[#3ba6f1] text-white rounded-br-xs shadow-xs"
                      : msg.error
                      ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50 rounded-bl-xs"
                      : "bg-stone-50 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border border-stone-200/80 dark:border-zinc-800/80 rounded-bl-xs shadow-2xs"
                  )}
                >
                  {msg.error && (
                    <div className="flex items-center gap-1.5 font-medium mb-1.5 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle className="size-3.5 shrink-0" />
                      <span>Connection Issue</span>
                    </div>
                  )}

                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                  ) : (
                    <FormattedAssistantText content={msg.text} />
                  )}
                </div>

                {/* Sources List */}
                {msg.role === "assistant" &&
                  msg.sources &&
                  msg.sources.length > 0 && (
                    <div className="flex flex-col gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 pl-1 mt-0.5">
                      <div className="flex items-center gap-1 font-medium text-stone-500 dark:text-zinc-400">
                        <FileText className="size-3 text-[#3ba6f1] shrink-0" />
                        <span>Sources referenced:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, i) => {
                          const label =
                            typeof src === "string"
                              ? src
                              : typeof src === "object" && src !== null
                              ? src.detail || src.type || JSON.stringify(src)
                              : String(src);
                          const title =
                            typeof src === "object" && src?.type
                              ? `Source type: ${src.type}`
                              : undefined;

                          return (
                            <span
                              key={i}
                              title={title}
                              className="inline-flex items-center rounded-md bg-stone-100 dark:bg-zinc-800/80 px-2 py-0.5 font-mono text-[10px] text-zinc-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700/60"
                            >
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-stone-50 dark:bg-zinc-900/70 py-2 px-3 rounded-2xl max-w-[75%] border border-stone-200/80 dark:border-zinc-800/80 shadow-2xs">
                <Loader2 className="size-3.5 animate-spin text-[#3ba6f1]" />
                <span className="font-medium">Ask Spectr is thinking...</span>
              </div>
            )}

            {/* Spacer for bottom clearance */}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* Quick Prompts (only if 1 welcome message) */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 pt-1 border-t border-stone-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
              <p className="text-[11px] font-medium text-stone-400 dark:text-zinc-500 mb-1.5 flex items-center gap-1">
                <Sparkles className="size-3 text-[#3ba6f1]" />
                <span>Suggested questions:</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedClick(q)}
                    className="text-left text-[11px] rounded-lg border border-stone-200/90 dark:border-zinc-800 bg-stone-50/70 dark:bg-zinc-900/60 px-2.5 py-1 text-zinc-600 dark:text-zinc-300 hover:border-[#3ba6f1]/60 hover:bg-[#3ba6f1]/5 hover:text-[#3398e1] dark:hover:text-[#3ba6f1] transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Unified Pill Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-stone-200/80 dark:border-zinc-800 bg-stone-50/60 dark:bg-zinc-900/60 p-3"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any question about this website or your metrics..."
                disabled={isLoading}
                className="w-full rounded-xl border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pl-3.5 pr-11 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-stone-400 focus:border-[#3ba6f1] focus:ring-2 focus:ring-[#3ba6f1]/20 focus:outline-none disabled:opacity-50 transition-all shadow-2xs"
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="absolute right-1.5 flex size-8 items-center justify-center rounded-lg bg-[#3ba6f1] hover:bg-[#3398e1] text-white shadow-xs disabled:opacity-30 disabled:hover:bg-[#3ba6f1] transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="size-3.5 animate-spin text-white" />
                ) : (
                  <Send className="size-3.5 text-white" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
