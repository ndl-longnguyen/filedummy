import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service — FileDummy",
  description: "Terms of Service and conditions for using FileDummy sample file download services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-300">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Last updated: September 19, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed glass-panel p-8 rounded-3xl border border-slate-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using FileDummy (<code className="text-blue-400">filedummy.ndlong.site</code>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Permitted Use</h2>
          <p>
            All files provided on this site are intended exclusively for testing, quality assurance, educational prototyping, and software benchmarking. You are permitted to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Download files individually or through automated testing scripts (cURL, wget, CI/CD runners).</li>
            <li>Use downloaded dummy files to evaluate upload pipelines, file readers, storage services, and bandwidth throughput.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Prohibited Conduct</h2>
          <p>
            You agree not to perform Distributed Denial of Service (DDoS) attacks, flood request APIs with malicious intent, or bypass security barriers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Disclaimer of Warranties</h2>
          <p>
            FileDummy provides all sample files and tools on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without any warranty of any kind, express or implied. The files contain dummy/placeholder data and should not be used in production as authentic business documents.
          </p>
        </section>
      </div>
    </div>
  );
}
