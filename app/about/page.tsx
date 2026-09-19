import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShieldCheck, HardDrive, Terminal, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — FileDummy",
  description:
    "Learn about FileDummy, our mission to provide developers and QA engineers with standardized, clean sample files for software testing worldwide.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About FileDummy
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          FileDummy (<code className="text-blue-400">filedummy.ndlong.site</code>) was built to solve a simple yet persistent frustration faced by software developers, QA testers, system administrators, and students worldwide: finding reliable, cleanly padded dummy files of specific formats and exact sizes without spam, sketchy downloads, or malware risks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Safe & Clean Files</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All files are programmatically generated using verified structural headers and clean data padding. They contain no macros, malicious scripts, or tracking beacons.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Exact Byte Precision</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every sample file is measured to exact byte standards (e.g. 10MB is exactly 10,485,760 bytes), providing accurate boundary conditions for upload quotas and storage testing.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Developer-First CLI</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We provide pre-formatted `curl`, `wget`, Python, and Node.js download commands so you can pull test files directly in terminal pipelines and automated CI/CD runners.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Cloudflare Edge CDN</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Files are hosted on Cloudflare R2 object storage with global edge replication, ensuring rapid and dependable transfer speeds anywhere in the world.
          </p>
        </div>
      </div>
    </div>
  );
}
