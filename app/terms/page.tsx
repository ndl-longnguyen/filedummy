import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Terms of Service — FileDummy | NDL Ecosystem",
  description:
    "Terms of Service, acceptable use guidelines, disclaimer of warranties, and legal conditions for using FileDummy sample file download services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-300">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">
          Effective date: September 19, 2026 | Last modified: September 19, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using FileDummy (accessible at{" "}
            <code className="text-blue-400 font-mono">https://filedummy.ndlong.site</code>
            ), you confirm that you have read, understood, and agree to be bound by these Terms of Service. FileDummy operates as a member utility of the <strong className="text-white font-semibold">NDL Ecosystem</strong> (
            <a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
              ndlong.site
            </a>
            ), engineered and maintained by Nguyen Dai Long.
          </p>
          <p>
            If you do not agree to these Terms, please discontinue use of our site and download endpoints immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Purpose &amp; Permitted Use</h2>
          <p>
            FileDummy provides standardized dummy files and client-side generation tools intended solely for software engineering, QA testing, educational purposes, storage benchmarking, and automated continuous integration (CI/CD) pipelines.
          </p>
          <p>You are explicitly permitted to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Download test files individually for manual verification of web/mobile upload forms.</li>
            <li>Incorporate download endpoints into automated CI/CD test scripts via cURL, Wget, Python, or Node.js.</li>
            <li>Utilize the Custom Dummy File Generator to construct synthetic testing buffers in your local browser environment.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Dummy Data Nature &amp; Prohibited Real-World Usage</h2>
          <p className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
            <strong>Critical Notice:</strong> All documents, tables, images, and datasets on FileDummy are generated synthetically using placeholder text (Lorem Ipsum), random bytes, or fictional tabular records. They do not represent authentic legal, medical, corporate, or financial documentation.
          </p>
          <p>
            You agree NOT to use any sample file provided on this website to commit fraud, mislead authorities, forge identity, or present dummy documents as genuine legal agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Acceptable Network Use &amp; Anti-Abuse</h2>
          <p>When interacting with our infrastructure, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Launch Distributed Denial of Service (DDoS) attacks or intentionally flood download APIs beyond reasonable testing limits.</li>
            <li>Attempt to reverse-engineer, exploit vulnerabilities, or compromise the integrity of the Cloudflare R2 storage edge.</li>
            <li>Transmit malicious code, viruses, or Trojan payloads disguised as FileDummy requests.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Third-Party Advertisements &amp; Google AdSense</h2>
          <p>
            FileDummy displays third-party advertisements served primarily by <strong className="text-white font-semibold">Google AdSense</strong>. Advertisements are governed by Google&apos;s advertising policies. FileDummy does not endorse, guarantee, or assume responsibility for any products, services, claims, or transactions occurring on third-party advertiser websites.
          </p>
          <p>
            Users interact with third-party advertisements at their own discretion and subject to the privacy and terms of the respective advertiser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Intellectual Property Rights</h2>
          <p>
            The software architecture, brand assets, UI design, text explanations, and custom client-side generation engines of FileDummy are the intellectual property of Nguyen Dai Long and the NDL Ecosystem.
          </p>
          <p>
            The placeholder binary contents and generated dummy files themselves are dedicated to the public domain (CC0 / Unlicense equivalents) for frictionless use in private and commercial software testing without attribution requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">7. Disclaimer of Warranties (&quot;AS IS&quot;)</h2>
          <p>
            FileDummy and all associated file services are provided on an <strong className="text-white font-semibold">&quot;AS IS&quot;</strong> and <strong className="text-white font-semibold">&quot;AS AVAILABLE&quot;</strong> basis without warranties of any kind, whether express, statutory, or implied, including but not limited to implied warranties of merchantability, fitness for a particular testing purpose, or non-infringement.
          </p>
          <p>
            While we take rigorous measures to ensure 100% virus-free programmatic generation, we do not warrant that file downloads will be uninterrupted, error-free, or compatible with obsolete legacy parsers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">8. Limitation of Liability</h2>
          <p>
            In no event shall FileDummy, its founder Nguyen Dai Long, or the NDL Ecosystem be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to, use of, or inability to use our services or sample files.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white">9. Inquiries &amp; Legal Notices</h2>
          <p>
            For legal inquiries, copyright notices, or questions regarding these Terms, please contact our team via:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <p><strong className="text-white">Legal Entity:</strong> NDL Ecosystem Network</p>
            <p><strong className="text-white">Representative:</strong> Nguyen Dai Long</p>
            <p><strong className="text-white">Official Email:</strong> <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline">ndl.long.nguyendai@gmail.com</a></p>
            <p><strong className="text-white">Support Center:</strong> <Link href="/contact" className="text-blue-400 underline">filedummy.ndlong.site/contact</Link></p>
          </div>
        </section>
      </div>
    </div>
  );
}
