import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Privacy Policy — FileDummy | Google AdSense & GDPR Compliance",
  description:
    "FileDummy Privacy Policy: How we handle user data, analytics, third-party cookies, Google AdSense compliance, GDPR, and CCPA protections.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-300">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Effective date: September 19, 2026 | Last modified: September 19, 2026
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Introduction &amp; Ownership</h2>
          <p>
            Welcome to FileDummy (accessible at{" "}
            <code className="text-blue-400 font-mono">https://filedummy.ndlong.site</code>
            ). FileDummy operates as part of the <strong className="text-white font-semibold">NDL Ecosystem</strong> (
            <a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
              ndlong.site
            </a>
            ), founded and maintained by software engineer Nguyen Dai Long.
          </p>
          <p>
            Your privacy is of the utmost importance to us. This Privacy Policy documents the types of information that is collected and recorded by FileDummy and how we use and protect it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
          <p>
            FileDummy is designed as a friction-free utility. <strong className="text-white font-semibold">We do not require user registration, account logins, passwords, or payment details.</strong> You can access, browse, and download sample files completely anonymously.
          </p>
          <p>
            Like most modern web services, we automatically collect certain technical log data when you interact with our website:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Browser type, user agent version, and operating system.</li>
            <li>Date, time, and referring/exit pages.</li>
            <li>Internet Protocol (IP) addresses (anonymized for geolocation and rate limiting).</li>
            <li>Requested file identifiers (to serve download redirects via Cloudflare R2).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Google AdSense &amp; Third-Party Advertising Cookies</h2>
          <p>
            We partner with third-party advertising networks, primarily <strong className="text-white font-semibold">Google AdSense</strong>, to display advertisements when you visit our website. Google and its advertising partners use cookies (such as the DoubleClick cookie) to serve relevant advertisements based on a user&apos;s prior visits to FileDummy and other websites across the Internet.
          </p>
          <p className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <strong className="text-white">Important Cookie Notice:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
          </p>
          <p>
            Users may choose to opt out of personalized advertising by visiting:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-blue-400">
            <li>
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-blue-300"
              >
                Google Ads Settings (opt-out of personalized Google ads)
              </a>
            </li>
            <li>
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-blue-300"
              >
                AboutAds.info Consumer Choice Tool
              </a>
            </li>
            <li>
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-blue-300"
              >
                Network Advertising Initiative (NAI) Opt-Out
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Web Analytics (Google Analytics 4)</h2>
          <p>
            We use Google Analytics to analyze aggregated visitor trends, traffic sources, and popular file formats. Google Analytics uses cookies to gather anonymous engagement data. We have enabled <strong className="text-white font-semibold">IP Anonymization / IP Masking</strong>, ensuring that your full IP address is never stored on Google servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Client-Side Generator Privacy Guarantee</h2>
          <p>
            When utilizing our <strong className="text-white font-semibold">Custom Dummy File Generator</strong> tool (at <code className="text-blue-400">/generator</code>), all file content generation is executed <strong className="text-white font-semibold">100% locally within your browser sandbox</strong> using JavaScript ArrayBuffer and Blob APIs.
          </p>
          <p className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl">
            ✓ Zero bytes of custom generated file data or parameters are uploaded, logged, or sent to any remote server.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. GDPR Compliance (EEA Users)</h2>
          <p>
            If you reside in the European Economic Area (EEA), you possess statutory data protection rights under the General Data Protection Regulation (GDPR), including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>The right to access, update, or request deletion of your information.</li>
            <li>The right of rectification and data portability.</li>
            <li>The right to withdraw cookie consent at any time via your browser settings.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">7. CCPA / CPRA Notice (California Residents)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have the right to request disclosure of categories of personal data collected and request deletion. <strong className="text-white font-semibold">FileDummy does not sell or share personal information with third parties for monetary consideration.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">8. Children&apos;s Privacy (COPPA Compliance)</h2>
          <p>
            Protecting children&apos;s online privacy is paramount. FileDummy does not knowingly collect any Personal Identifiable Information from children under the age of 13. If a parent or guardian believes that a child has provided personal information on our website, please contact us immediately and we will promptly remove such information from our records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">9. Links to NDL Ecosystem &amp; Third-Party Sites</h2>
          <p>
            FileDummy contains links to other developer tools in the NDL Ecosystem (such as <code className="text-blue-400">tools.ndlong.site</code>, <code className="text-blue-400">image.ndlong.site</code>, <code className="text-blue-400">s.ndlong.site</code>). Each site maintains its respective privacy terms adhering to NDL Network standards. We advise users to review the privacy policy of any external website they visit.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white">10. Contacting Our Data Privacy Team</h2>
          <p>
            For any questions, requests regarding your data rights, or clarification regarding our AdSense compliance policies, please reach out to:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <p><strong className="text-white">Organization:</strong> NDL Ecosystem Network</p>
            <p><strong className="text-white">Maintainer:</strong> Nguyen Dai Long</p>
            <p><strong className="text-white">Email:</strong> <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline">ndl.long.nguyendai@gmail.com</a></p>
            <p><strong className="text-white">Website:</strong> <a href="https://filedummy.ndlong.site" className="text-blue-400 underline">filedummy.ndlong.site</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
