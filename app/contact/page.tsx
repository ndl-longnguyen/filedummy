import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Support — FileDummy",
  description: "Get in touch with the FileDummy team for inquiries, format suggestions, or support.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact & Support
        </h1>
        <p className="text-sm text-slate-400">
          Have a question, feedback, or need a specific file format or size added to FileDummy? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">General Inquiries</h3>
          <p className="text-xs text-slate-400">
            For questions, business partnerships, or general feedback:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Inquiry"
            className="inline-block text-xs font-semibold text-blue-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Feature Requests</h3>
          <p className="text-xs text-slate-400">
            Need specialized formats, sizes, or new tool integrations?
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Feature%20Request"
            className="inline-block text-xs font-semibold text-cyan-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">DMCA & Legal</h3>
          <p className="text-xs text-slate-400">
            For copyright, privacy, or policy-related inquiries:
          </p>
          <a
            href="mailto:ndl.long.nguyendai@gmail.com?subject=FileDummy%20Legal"
            className="inline-block text-xs font-semibold text-indigo-400 hover:underline break-all"
          >
            ndl.long.nguyendai@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
