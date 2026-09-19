import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Zap, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Exactly 4 balanced columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: FileDummy (compact 1 column) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 p-1 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo-icon.png"
                  width={24}
                  height={24}
                  alt="FileDummy Logo"
                  className="w-auto h-auto object-contain"
                />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">FileDummy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global sample and dummy file download platform. Clean, standardized files in multiple formats and sizes for developers, QA testers, and designers worldwide.
            </p>
            <div className="space-y-1.5 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> Cloudflare R2 Global Edge
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> 100% Virus & Malware Free
              </span>
            </div>
          </div>

          {/* Col 2: Sample Files */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Sample Files
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm">
              <Link href="/pdf" className="hover:text-blue-400 transition-colors">
                PDF Files
              </Link>
              <Link href="/jpg" className="hover:text-blue-400 transition-colors">
                JPG Images
              </Link>
              <Link href="/docx" className="hover:text-blue-400 transition-colors">
                DOCX Word
              </Link>
              <Link href="/png" className="hover:text-blue-400 transition-colors">
                PNG Assets
              </Link>
              <Link href="/txt" className="hover:text-blue-400 transition-colors">
                TXT Text
              </Link>
              <Link href="/csv" className="hover:text-blue-400 transition-colors">
                CSV Data
              </Link>
              <Link href="/zip" className="hover:text-blue-400 transition-colors">
                ZIP Archive
              </Link>
              <Link href="/json" className="hover:text-blue-400 transition-colors">
                JSON Data
              </Link>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80">
              <Link
                href="/generator"
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1"
              >
                <span>⚡ Custom Size Generator →</span>
              </Link>
            </div>
          </div>

          {/* Col 3: NDL Ecosystem (Developer Tools only) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
              <span>NDL Ecosystem</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://tools.ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-400 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-white group-hover:text-purple-400 transition-colors">NDL ToolsKit</span>
                    <span className="block text-[11px] text-slate-500">Developer Toolbox &amp; Utilities</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://image.ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-white group-hover:text-cyan-400 transition-colors">NDL Image Tools</span>
                    <span className="block text-[11px] text-slate-500">Image Compressor &amp; WebP</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://link.ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-white group-hover:text-blue-400 transition-colors">NDL Short Link</span>
                    <span className="block text-[11px] text-slate-500">Fast URL Shortener &amp; API</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-white group-hover:text-indigo-400 transition-colors">NDL Developer Hub</span>
                    <span className="block text-[11px] text-slate-500">Engineering Portfolio &amp; Tools</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Trust (Side by side on the same row with NDL Ecosystem) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <a
                  href="/ads.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors text-xs text-slate-500"
                >
                  ads.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Centered NDL Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex items-center justify-center text-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} FileDummy — Part of{" "}
            <a
              href="https://ndlong.site"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold underline"
            >
              NDL Ecosystem
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
