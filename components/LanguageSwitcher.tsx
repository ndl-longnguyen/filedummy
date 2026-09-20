"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isVi = pathname.startsWith("/vi/") || pathname === "/vi";

  // Calculate target paths
  let enPath: string;
  let viPath: string;

  if (isVi) {
    enPath = pathname === "/vi" ? "/" : pathname.replace(/^\/vi/, "");
    viPath = pathname;
  } else {
    enPath = pathname;
    viPath = pathname === "/" ? "/vi" : `/vi${pathname}`;
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
        aria-label="Change language"
      >
        <span className="text-sm">{isVi ? "🇻🇳" : "🇬🇧"}</span>
        <span className="font-semibold uppercase tracking-wider">{isVi ? "VI" : "EN"}</span>
        <span className="text-slate-500 text-[10px]">▾</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-900 border border-slate-800 shadow-xl shadow-black/50 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <Link
            href={enPath}
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
              !isVi
                ? "bg-blue-600/15 text-blue-400 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🇬🇧</span>
              <span>English</span>
            </div>
            {!isVi && <Check className="w-3.5 h-3.5 text-blue-400" />}
          </Link>

          <Link
            href={viPath}
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
              isVi
                ? "bg-blue-600/15 text-blue-400 font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🇻🇳</span>
              <span>Tiếng Việt</span>
            </div>
            {isVi && <Check className="w-3.5 h-3.5 text-blue-400" />}
          </Link>
        </div>
      )}
    </div>
  );
}
