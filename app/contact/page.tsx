import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Mail, MessageSquare, HelpCircle, ShieldAlert, Globe, Clock } from "lucide-react";
import { NDL_PORTAL_URL } from "@/lib/ecosystem";
import { getAlternateLanguages } from "@/lib/i18n/seo";

export const metadata: Metadata = {
  title: "Contact & Support — FileDummy | NDL Ecosystem",
  description:
    "Official contact channels, publisher information, and support for FileDummy and NDL Ecosystem developer tools. Email ndl.long.nguyendai@gmail.com.",
  alternates: getAlternateLanguages("/contact", "en"),
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>NDL Ecosystem Network (<a href={NDL_PORTAL_URL} target="_blank" rel="noreferrer" className="underline hover:text-blue-300">ndlong.site</a>)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact &amp; Support
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          We welcome feedback from developers, QA engineers, students, and advertisers. Whether you have questions regarding our dummy files, need a specialized format or size added, or wish to inquire about partnership opportunities, our team is here to assist.
        </p>
      </div>

      {/* 4 Support Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">General &amp; Technical Support</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            For general inquiries, broken download links, API integration questions, or technical troubleshooting:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20General%20Support"
            className="inline-block text-xs font-semibold text-blue-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Feature &amp; Format Requests</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Need a specific MIME type, larger file size limits, or automated CLI flags added to the platform?
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Format%20Request"
            className="inline-block text-xs font-semibold text-cyan-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Advertising &amp; AdSense Compliance</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            For Google AdSense policy queries, direct sponsorship, ad placement feedback, or banner inquiries:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Advertising%20Inquiry"
            className="inline-block text-xs font-semibold text-purple-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">DMCA &amp; Legal Notices</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            For intellectual property questions, GDPR/CCPA data privacy requests, or formal legal correspondence:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Legal%20Notice"
            className="inline-block text-xs font-semibold text-indigo-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>
      </div>

      {/* Publisher Transparency Box */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Publisher &amp; Operator Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <p><strong className="text-white">Project:</strong> FileDummy (Free Test Files &amp; Generator)</p>
            <p><strong className="text-white">Domain:</strong> <code className="text-blue-400">filedummy.ndlong.site</code></p>
            <p><strong className="text-white">Network:</strong> NDL Ecosystem Network</p>
            <p><strong className="text-white">Founder &amp; Engineer:</strong> Nguyen Dai Long</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <p className="flex items-center gap-1.5 text-white font-semibold">
              <Clock className="w-4 h-4 text-emerald-400" /> Response Time Commitment
            </p>
            <p className="text-slate-400 leading-relaxed">
              We review and reply to all legitimate inquiries, bug reports, and format requests within <strong className="text-white font-semibold">24 to 48 business hours</strong>.
            </p>
            <p className="text-slate-400 pt-1">
              Direct inbox: <a href="mailto:ndl.long.nguyendai@gmail.com" className="text-blue-400 underline font-mono">ndl.long.nguyendai@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="pt-2 text-xs text-slate-400 flex flex-wrap gap-4">
          <span>Quick links:</span>
          <Link href="/about" className="text-blue-400 hover:underline">About Us</Link>
          <span>•</span>
          <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>
          <span>•</span>
          <a href="/ads.txt" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">ads.txt</a>
        </div>
      </div>
    </div>
  );
}
