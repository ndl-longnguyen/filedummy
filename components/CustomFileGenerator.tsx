"use client";

import { useState } from "react";
import { Sparkles, Download, CheckCircle, RefreshCw, AlertCircle, FileType as FileIcon } from "lucide-react";
import { AdUnit } from "./AdUnit";

export function CustomFileGenerator() {
  const [format, setFormat] = useState<"txt" | "pdf" | "bin" | "csv" | "json">("txt");
  const [sizeValue, setSizeValue] = useState<number>(5);
  const [sizeUnit, setSizeUnit] = useState<"KB" | "MB">("MB");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const presets = [
    { value: 500, unit: "KB" as const, label: "500 KB" },
    { value: 2, unit: "MB" as const, label: "2 MB" },
    { value: 5, unit: "MB" as const, label: "5 MB" },
    { value: 15, unit: "MB" as const, label: "15 MB" },
    { value: 30, unit: "MB" as const, label: "30 MB" },
    { value: 50, unit: "MB" as const, label: "50 MB" },
  ];

  const calculateBytes = (val: number, unit: "KB" | "MB") => {
    return val * (unit === "KB" ? 1024 : 1024 * 1024);
  };

  const handleGenerate = async () => {
    const totalBytes = calculateBytes(sizeValue, sizeUnit);
    if (totalBytes > 100 * 1024 * 1024) {
      alert("For browser safety, browser-generated files are capped at 100MB. For larger files up to 1GB, please use our pre-built downloads.");
      return;
    }

    setIsGenerating(true);
    setIsDone(false);
    setProgress(15);

    await new Promise((r) => setTimeout(r, 200));
    setProgress(45);

    // Build the blob
    try {
      let mime = "application/octet-stream";
      const parts: (BlobPart)[] = [];

      if (format === "txt") {
        mime = "text/plain; charset=utf-8";
        const sampleStr = "Sample text line for custom dummy file generation testing. ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789\n";
        const sampleBytes = new TextEncoder().encode(sampleStr);
        let written = 0;
        while (written + sampleBytes.length <= totalBytes) {
          parts.push(sampleBytes);
          written += sampleBytes.length;
        }
        if (totalBytes > written) {
          parts.push(sampleBytes.slice(0, totalBytes - written));
        }
      } else if (format === "pdf") {
        mime = "application/pdf";
        const pdfHeader = new TextEncoder().encode(
          "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000068 00000 n\n0000000125 00000 n\ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n200\n%%EOF\n"
        );
        parts.push(pdfHeader);
        const padding = Math.max(0, totalBytes - pdfHeader.length);
        const chunk = new Uint8Array(Math.min(padding, 65536));
        chunk.fill(0x30); // '0'
        let written = 0;
        while (written + chunk.length <= padding) {
          parts.push(chunk);
          written += chunk.length;
        }
        if (padding > written) {
          parts.push(chunk.slice(0, padding - written));
        }
      } else if (format === "csv") {
        mime = "text/csv; charset=utf-8";
        const header = new TextEncoder().encode("id,name,email,score,verified\n");
        parts.push(header);
        const row = new TextEncoder().encode("101,John Doe,john@test.io,98.5,true\n");
        let written = header.length;
        while (written + row.length <= totalBytes) {
          parts.push(row);
          written += row.length;
        }
        if (totalBytes > written) {
          parts.push(row.slice(0, totalBytes - written));
        }
      } else if (format === "json") {
        mime = "application/json";
        const prefix = new TextEncoder().encode('{"status":"ok","records":[');
        const suffix = new TextEncoder().encode('{"id":0}]}');
        const item = new TextEncoder().encode('{"id":1,"type":"mock"},');
        parts.push(prefix);
        let written = prefix.length + suffix.length;
        while (written + item.length <= totalBytes) {
          parts.push(item);
          written += item.length;
        }
        parts.push(suffix);
      } else {
        // Binary
        const chunk = new Uint8Array(Math.min(totalBytes, 65536));
        chunk.fill(0xAA);
        let written = 0;
        while (written + chunk.length <= totalBytes) {
          parts.push(chunk);
          written += chunk.length;
        }
        if (totalBytes > written) {
          parts.push(chunk.slice(0, totalBytes - written));
        }
      }

      setProgress(85);
      await new Promise((r) => setTimeout(r, 150));

      const blob = new Blob(parts, { type: mime });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `custom-dummy-${sizeValue}${sizeUnit.toLowerCase()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

      setProgress(100);
      setIsDone(true);
    } catch (e) {
      console.error(e);
      alert("Error generating file in browser.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl border border-slate-800 relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Custom Dummy File Generator
          </h2>
          <p className="text-xs text-slate-400">
            Generate custom test files with exact byte sizes instantly inside your browser.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Format selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            1. Select File Format
          </label>
          <div className="grid grid-cols-5 gap-2">
            {(["txt", "pdf", "csv", "json", "bin"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center gap-1 ${
                  format === fmt
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400 scale-[1.02]"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <FileIcon className="w-4 h-4" />
                <span>.{fmt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size presets */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            2. Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setSizeValue(p.value);
                  setSizeUnit(p.unit);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sizeValue === p.value && sizeUnit === p.unit
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom size input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            3. Exact Target Size
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max={sizeUnit === "MB" ? 100 : 50000}
              value={sizeValue}
              onChange={(e) => setSizeValue(Math.max(1, Number(e.target.value)))}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
              {(["KB", "MB"] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setSizeUnit(unit)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    sizeUnit === unit
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Browser generator supports up to 100MB directly. For files up to 1GB, browse our pre-built downloads.
          </p>
        </div>

        {/* Ad unit in generator */}
        <div className="pt-2">
          <AdUnit slot="5566778899" format="horizontal" label="Advertisement" />
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating {sizeValue} {sizeUnit} .{format} file... ({progress}%)</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Generate & Download ({sizeValue} {sizeUnit} .{format})</span>
              </>
            )}
          </button>
        </div>

        {isDone && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>Success! File created and download started in your browser.</span>
          </div>
        )}
      </div>
    </div>
  );
}
