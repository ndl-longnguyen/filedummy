"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

function extractText(node: React.ReactNode): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as any) && (node as any).props?.children) {
    return extractText((node as any).props.children);
  }
  return "";
}

function getLanguageLabel(lang: string): string {
  const map: Record<string, string> = {
    typescript: "TypeScript",
    ts: "TypeScript",
    javascript: "JavaScript",
    js: "JavaScript",
    bash: "Terminal",
    sh: "Terminal",
    shell: "Terminal",
    json: "JSON",
    hex: "Hex / Binary",
    python: "Python",
    py: "Python",
    html: "HTML",
    css: "CSS",
    sql: "SQL",
  };
  return map[lang.toLowerCase()] || lang.toUpperCase() || "Code";
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const isVi = pathname?.startsWith("/vi");

  // Extract language from code element className (e.g. language-typescript)
  const codeElement = React.isValidElement(children) ? children : null;
  const codeClassName = (codeElement?.props as { className?: string })?.className || "";
  const match = /language-([a-zA-Z0-9_-]+)/.exec(codeClassName);
  const rawLang = match ? match[1] : "";
  const displayLang = getLanguageLabel(rawLang);

  const rawCode = extractText(children).trim();

  const handleCopy = async () => {
    if (!rawCode) return;
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  return (
    <div className="my-7 rounded-2xl border border-slate-800/90 bg-[#0a0f1d] shadow-2xl overflow-hidden group">
      {/* Mac Terminal Chrome Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 select-none">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50 shadow-sm" />
          </div>

          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800/80 text-blue-400 border border-blue-500/20">
            {displayLang}
          </span>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 transition-all duration-150 active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px] font-medium">
                {isVi ? "Đã chép!" : "Copied!"}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">{isVi ? "Sao chép" : "Copy"}</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre
        {...props}
        className="p-4 sm:p-5 overflow-x-auto text-[13px] sm:text-[14px] leading-relaxed font-mono text-slate-200 bg-transparent m-0 rounded-none border-0"
      >
        {children}
      </pre>
    </div>
  );
}
