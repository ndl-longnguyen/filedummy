import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, HardDrive, Terminal, Zap, Globe, Code2, Users, ArrowRight } from "lucide-react";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";

import { getAlternateLanguages } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "About Us — FileDummy | Part of NDL Ecosystem",
  description:
    "Learn about FileDummy, our engineering mission, infrastructure, and role in the NDL Ecosystem (ndlong.site) providing standardized sample files for global software testing.",
  alternates: getAlternateLanguages("/about", "en"),
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>Part of NDL Ecosystem (<a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="underline hover:text-blue-300">ndlong.site</a>)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About FileDummy
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          FileDummy (<code className="text-blue-400 font-mono">filedummy.ndlong.site</code>) is a specialized developer tooling platform built to provide software engineers, QA testers, security auditors, and system administrators worldwide with instant, clean, and standardized dummy files for upload and performance testing.
        </p>
      </div>

      {/* Mission & Story */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 leading-relaxed text-sm text-slate-300">
        <h2 className="text-xl font-bold text-white tracking-tight">Our Mission &amp; Purpose</h2>
        <p>
          Testing file upload limits, multi-part form handlers, CDN pipelines, and media transcoding services is a daily necessity for software teams. Yet finding reliable test files usually means browsing suspicious download portals filled with pop-ups, trackers, and potential malware risks.
        </p>
        <p>
          FileDummy was engineered to eliminate this friction. Every file available on our platform is generated programmatically with valid format headers, zero malicious payload, and strict byte-exact precision.
        </p>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Valid File Structures</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All files are synthesized in isolated build pipelines using standard dummy content and authentic magic bytes. They contain no macros, executables, external scripts, or tracking beacons.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Exact Byte Precision</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every sample file is engineered to strict binary boundary standards (e.g., a 10MB test file contains exactly 10,485,760 bytes), providing dependable boundary testing for form quotas and backend file size validators.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">CI/CD &amp; CLI Ready</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every file page provides ready-to-run terminal snippets for cURL, Wget, Python, and Node.js so automated CI/CD build scripts can pull test fixtures reliably without manual downloads.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">High-Throughput Storage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All sample assets are served from low-latency edge caching networks, ensuring rapid transfer speeds for load testing and benchmark pipelines.
          </p>
        </div>
      </div>

      {/* About NDL Ecosystem */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">The NDL Ecosystem Network</h2>
            <p className="text-xs text-slate-400">Created and maintained by developer Nguyen Dai Long</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          FileDummy is an integral member of the <strong className="text-white font-semibold">NDL Ecosystem</strong> (<a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">ndlong.site</a>), an interconnected network of fast, free, and privacy-respecting online web applications. Sister tools in our network include:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="https://tools.ndlong.site"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all group"
          >
            <span className="font-bold text-white group-hover:text-purple-400 transition-colors block">
              NDL ToolsKit
            </span>
            <span className="text-slate-400 mt-1 block">
              All-in-one developer toolbox, code formatters, regex, and encoding utilities.
            </span>
          </a>

          <a
            href="https://image.ndlong.site"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
          >
            <span className="font-bold text-white group-hover:text-cyan-400 transition-colors block">
              NDL Image Tools
            </span>
            <span className="text-slate-400 mt-1 block">
              Client-side image compressor &amp; WebP format converter.
            </span>
          </a>

          <a
            href="https://s.ndlong.site"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all group"
          >
            <span className="font-bold text-white group-hover:text-blue-400 transition-colors block">
              NDL Short Link
            </span>
            <span className="text-slate-400 mt-1 block">
              Fast, privacy-friendly URL shortener with link metrics.
            </span>
          </a>
        </div>
      </div>

      {/* Editorial & Transparency Guidelines */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white tracking-tight">Publisher Information &amp; Ethics</h2>
        <p>
          We are committed to full transparency, digital safety, and strict compliance with Google Webmaster and AdSense policies. We never host deceptive download buttons, misleading advertisements, or pirated copyrighted materials.
        </p>
        <p>
          For inquiries, format suggestions, or technical support, you can reach out directly via our{" "}
          <Link href="/contact" className="text-blue-400 underline hover:text-blue-300">
            Contact &amp; Support page
          </Link>{" "}
          or by emailing{" "}
          <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline hover:text-blue-300">
            ndl.long.nguyendai@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}
