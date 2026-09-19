"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, Sliders, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/pdf", label: "PDF" },
    { href: "/docx", label: "DOCX" },
    { href: "/txt", label: "TXT" },
    { href: "/jpg", label: "JPG" },
    { href: "/png", label: "PNG" },
    { href: "/csv", label: "CSV" },
    { href: "/json", label: "JSON" },
    { href: "/zip", label: "ZIP" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-1.5 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 group-hover:border-blue-500/40 transition-all overflow-hidden">
            <Image
              src="/logo-icon.png"
              width={32}
              height={32}
              alt="FileDummy Logo"
              className="w-auto h-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight group-hover:text-blue-400 transition-colors">
                FileDummy
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-slate-400 -mt-1 hidden sm:inline">
              Sample File Templates
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Custom Generator */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/generator"
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Custom Generator</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-5 space-y-2">
          <div className="grid grid-cols-4 gap-2 pb-3 border-b border-slate-800/60">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-1 text-xs font-semibold rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/generator"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-lg bg-blue-600 text-white"
          >
            <Sparkles className="w-4 h-4" />
            <span>Custom Dummy Generator</span>
          </Link>
        </div>
      )}
    </header>
  );
}
