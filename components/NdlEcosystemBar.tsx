"use client";

import { useState, useEffect, useRef } from "react";
import {
  LayoutGrid,
  ExternalLink,
  X,
  Wrench,
  Coins,
  Gamepad2,
  Share2,
  Image as ImageIcon,
  TrendingUp,
  Dices,
  Tv,
  Globe,
  Code,
} from "lucide-react";
import { NDL_ECOSYSTEM_APPS, NDL_PORTAL_URL } from "@/lib/ecosystem";

const ICON_MAP: Record<string, React.ElementType> = {
  Wrench,
  Share2,
  Image: ImageIcon,
  Globe,
  Code,
};

export function NdlAppLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Compact App Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
          isOpen
            ? "bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm"
            : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800"
        }`}
        title="NDL Developer Tools & Ecosystem"
        aria-label="Open NDL Developer Tools menu"
      >
        <div className="relative">
          <LayoutGrid className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
        </div>
        <span className="hidden xl:inline text-slate-300 group-hover:text-white">
          NDL Tools
        </span>
      </button>

      {/* Floating Glassmorphism Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[420px] p-4 sm:p-5 rounded-2xl bg-slate-950/95 border border-slate-800/90 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-tight">
                  NDL Developer Ecosystem
                </h3>
                <p className="text-[10px] text-slate-400">
                  Developer tools by Nguyen Dai Long (<code>*.ndlong.site</code>)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dev Apps Grid */}
          <div className="space-y-2">
            {NDL_ECOSYSTEM_APPS.map((app) => {
              const IconComponent = ICON_MAP[app.iconName] || Globe;
              return (
                <a
                  key={app.id}
                  href={app.url}
                  target={app.isCurrent ? "_self" : "_blank"}
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`p-2.5 rounded-xl flex items-start gap-3 transition-all group ${
                    app.isCurrent
                      ? "bg-blue-600/15 border border-blue-500/30"
                      : "hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:text-cyan-400 group-hover:scale-105 transition-all flex-shrink-0 mt-0.5">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {app.name}
                      </span>
                      {app.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${
                            app.badgeColor || "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {app.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 leading-tight">
                      {app.shortDesc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer Hub Link */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 text-[10px]">
              Developer suite &amp; open APIs
            </span>
            <a
              href={NDL_PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
            >
              <span>Visit ndlong.site Hub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// Backward-compatibility alias
export const NdlEcosystemBar = NdlAppLauncher;
