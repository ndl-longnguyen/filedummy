"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShieldCheck, Zap, ExternalLink } from "lucide-react";

export function Footer() {
  const pathname = usePathname() || "/";
  const isVi = pathname.startsWith("/vi/") || pathname === "/vi";
  const prefix = isVi ? "/vi" : "";

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Exactly 4 balanced columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: FileDummy */}
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
              {isVi
                ? "Nền tảng tải tệp mẫu và file dummy chuẩn hóa hàng đầu. Cung cấp file sạch, chuẩn cấu trúc cho lập trình viên và kỹ sư QA toàn cầu."
                : "Global sample and dummy file download platform. Clean, standardized files in multiple formats and sizes for developers, QA testers, and designers worldwide."}
            </p>
            <div className="space-y-1.5 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />{" "}
                {isVi ? "Cloudflare R2 Toàn Cầu" : "Cloudflare R2 Global Edge"}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />{" "}
                {isVi ? "100% Sạch & An Toàn" : "100% Virus & Malware Free"}
              </span>
            </div>
          </div>

          {/* Col 2: Sample Files */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              {isVi ? "Danh Mục Tệp Mẫu" : "Sample Files"}
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm">
              <Link href={`${prefix}/pdf`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Tệp PDF" : "PDF Files"}
              </Link>
              <Link href={`${prefix}/jpg`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Ảnh JPG" : "JPG Images"}
              </Link>
              <Link href={`${prefix}/docx`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Tệp DOCX" : "DOCX Word"}
              </Link>
              <Link href={`${prefix}/png`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Ảnh PNG" : "PNG Assets"}
              </Link>
              <Link href={`${prefix}/txt`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Văn Bản TXT" : "TXT Text"}
              </Link>
              <Link href={`${prefix}/csv`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Dữ Liệu CSV" : "CSV Data"}
              </Link>
              <Link href={`${prefix}/zip`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Tệp Nén ZIP" : "ZIP Archive"}
              </Link>
              <Link href={`${prefix}/json`} className="hover:text-blue-400 transition-colors">
                {isVi ? "Dữ Liệu JSON" : "JSON Data"}
              </Link>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex flex-col gap-1.5">
              <Link
                href={`${prefix}/generator`}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1"
              >
                <span>{isVi ? "⚡ Tạo Dung Lượng Tùy Chỉnh →" : "⚡ Custom Size Generator →"}</span>
              </Link>
              <Link
                href={`${prefix}/blog`}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center gap-1"
              >
                <span>{isVi ? "📚 Blog Kỹ Thuật Lập Trình →" : "📚 Developer Technical Blog →"}</span>
              </Link>
            </div>
          </div>

          {/* Col 3: NDL Ecosystem */}
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

          {/* Col 4: Resources & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              {isVi ? "Tài Nguyên & Pháp Lý" : "Resources & Legal"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href={`${prefix}/blog`} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  {isVi ? "Blog Lập Trình Viên" : "Technical Blog"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/about`} className="hover:text-blue-400 transition-colors">
                  {isVi ? "Về Chúng Tôi" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/privacy`} className="hover:text-blue-400 transition-colors">
                  {isVi ? "Chính Sách Bảo Mật" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/terms`} className="hover:text-blue-400 transition-colors">
                  {isVi ? "Điều Khoản Sử Dụng" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/contact`} className="hover:text-blue-400 transition-colors">
                  {isVi ? "Liên Hệ & Hỗ Trợ" : "Contact & Support"}
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
            © {new Date().getFullYear()} FileDummy — {isVi ? "Một sản phẩm thuộc" : "Part of"}{" "}
            <a
              href="https://ndlong.site"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold underline"
            >
              NDL Ecosystem
            </a>
            . {isVi ? "Bảo lưu mọi quyền." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
