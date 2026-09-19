"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

interface CliSnippetProps {
  r2Key: string;
  filename: string;
}

export function CliSnippet({ r2Key, filename }: CliSnippetProps) {
  const [activeTab, setActiveTab] = useState<"curl" | "wget" | "python" | "node">("curl");
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://filedummy.ndlong.site";
  const downloadUrl = `${siteUrl}/api/download?file=${encodeURIComponent(r2Key)}`;

  const snippets = {
    curl: `curl -L "${downloadUrl}" -o "${filename}"`,
    wget: `wget --content-disposition "${downloadUrl}"`,
    python: `import requests\n\nurl = "${downloadUrl}"\nresp = requests.get(url, allow_redirects=True, stream=True)\nwith open("${filename}", "wb") as f:\n    for chunk in resp.iter_content(chunk_size=8192):\n        f.write(chunk)\nprint("Downloaded ${filename}")`,
    node: `import { createWriteStream } from 'node:fs';\nimport { pipeline } from 'node:stream/promises';\n\nconst response = await fetch("${downloadUrl}");\nif (!response.ok) throw new Error(\`Failed to fetch: \${response.statusText}\`);\nawait pipeline(response.body, createWriteStream("${filename}"));\nconsole.log("Downloaded ${filename}");`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
      {/* Tab Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/70 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <div className="flex gap-1">
            {(["curl", "wget", "python", "node"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 bg-slate-950 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
        <pre className="whitespace-pre">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}
