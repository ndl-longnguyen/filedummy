import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy — FileDummy",
  description: "FileDummy Privacy Policy: How we handle user data, analytics, cookies, and Google AdSense compliance.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-300">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: September 19, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed glass-panel p-8 rounded-3xl border border-slate-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Introduction</h2>
          <p>
            Welcome to FileDummy (accessible from <code>https://filedummy.ndlong.site</code>). We respect your privacy and are committed to protecting any information that may be gathered while you visit our website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
          <p>
            FileDummy does not require user registration, logins, or payment details. We collect anonymous technical logs when you visit our website or download files, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Browser type, operating system, and referring URL</li>
            <li>Requested file keys and download timestamps to maintain download counters</li>
            <li>Aggregated analytics through Google Analytics 4 (anonymized IP addresses)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Google AdSense & Cookies</h2>
          <p>
            We use Google AdSense to display advertisements when you visit our site. Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on prior visits to our website or other websites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Google Ads Settings
            </a>{" "}
            or by visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              aboutads.info
            </a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Local Browser Generation Security</h2>
          <p>
            When you use our Custom Dummy File Generator, all file construction occurs 100% locally within your browser using JavaScript Blob APIs. No data or generated content is transmitted to our servers during custom file generation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, please reach out through our Contact page or email us at <code>privacy@ndlong.site</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
