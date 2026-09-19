import Link from "next/link";
import Image from "next/image";
import { Heart, ShieldCheck, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
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
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Global sample and dummy file download platform. Providing clean, reliable, and standardized files in multiple formats and sizes for developers, QA engineers, designers, and testers worldwide.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Powered by Cloudflare R2 & Next.js
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Virus-Free
              </span>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Documents
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pdf" className="hover:text-blue-400 transition-colors">
                  PDF Sample Files (1MB - 1GB)
                </Link>
              </li>
              <li>
                <Link href="/docx" className="hover:text-blue-400 transition-colors">
                  DOCX Word Documents
                </Link>
              </li>
              <li>
                <Link href="/txt" className="hover:text-blue-400 transition-colors">
                  TXT Plain Text & Unicode
                </Link>
              </li>
              <li>
                <Link href="/generator" className="hover:text-blue-400 transition-colors">
                  Custom Size Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Media & Data */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Media & Datasets
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jpg" className="hover:text-blue-400 transition-colors">
                  JPEG Images (100KB - 10MB)
                </Link>
              </li>
              <li>
                <Link href="/png" className="hover:text-blue-400 transition-colors">
                  PNG Transparent Assets
                </Link>
              </li>
              <li>
                <Link href="/csv" className="hover:text-blue-400 transition-colors">
                  CSV Tabular Data
                </Link>
              </li>
              <li>
                <Link href="/json" className="hover:text-blue-400 transition-colors">
                  JSON REST Mock Data
                </Link>
              </li>
              <li>
                <Link href="/zip" className="hover:text-blue-400 transition-colors">
                  ZIP Archive Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-sm">
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
                <a href="/ads.txt" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors text-xs text-slate-500">
                  ads.txt
                </a>
              </li>
            </ul>
          </div>

          {/* NDL Ecosystem */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
              <span>NDL Ecosystem</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://click.ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-rose-400 transition-colors flex items-center gap-1"
                >
                  <span>Click 2 Top (Game)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://laisuat.ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Tính Lãi Ngân Hàng
                </a>
              </li>
              <li>
                <a
                  href="https://tygia.ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tỷ Giá & Vàng Hub
                </a>
              </li>
              <li>
                <a
                  href="https://image.ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  NDL Image Tools
                </a>
              </li>
              <li>
                <a
                  href="https://ndlong.site"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  ndlong.site Portal →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FileDummy (filedummy.ndlong.site). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for developers with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
