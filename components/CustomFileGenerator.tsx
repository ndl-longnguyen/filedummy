"use client";

import { useState } from "react";
import { Sparkles, Download, CheckCircle, RefreshCw, AlertCircle, FileType as FileIcon } from "lucide-react";
import { AdUnit } from "./AdUnit";
import type { Locale } from "@/lib/i18n/types";

interface CustomFileGeneratorProps {
  locale?: Locale;
}

export function CustomFileGenerator({ locale = "en" }: CustomFileGeneratorProps) {
  const isVi = locale === "vi";
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
      const encoder = new TextEncoder();
      const parts: (BlobPart)[] = [];

      if (format === "txt") {
        mime = "text/plain; charset=utf-8";
        const aiParagraphs = [
          "2026 GLOBAL ARTIFICIAL INTELLIGENCE & MACHINE LEARNING INDUSTRY REPORT\nPublished by Global AI Research Consortium & Enterprise Computing Council.\n================================================================================\n\n",
          "EXECUTIVE SUMMARY:\nThis document serves as an authoritative technical evaluation of frontier artificial intelligence, test-time inference compute scaling, autonomous agentic orchestration, compute silicon economics, and global regulatory governance in 2026.\n\n",
          "CHAPTER 1: THE TRANSITION TO TEST-TIME REASONING AGENTS\nThe machine learning landscape in 2026 has decisively shifted from static one-shot generative models toward dynamic reasoning agents capable of extended deliberation. Contemporary architectures leverage test-time compute scaling through Monte Carlo tree searches, recursive self-critique loops, and chain-of-thought verification at inference time.\n\n",
          "CHAPTER 2: COMPUTE INFRASTRUCTURE AND ENERGY ECONOMICS\nLeading training clusters routinely scale beyond 100,000 accelerated nodes, powered by advanced high-bandwidth memory (HBM3e and early HBM4) delivering memory bandwidth in excess of 4.8 terabytes per second. Hyperscalers have pioneered dedicated power generation strategies including nuclear small modular reactors (SMRs) and geothermal microgrids to address power constraints.\n\n",
          "CHAPTER 3: OPEN WEIGHTS PARITY AND ENTERPRISE PRIVACY\nOpen-weight architectures developed by international research consortia maintain competitive parity with proprietary frontier baselines across standard evaluations (MATH-500, HumanEval, and MMLU-Pro). Software organizations deploy open-weight models within private VPCs for data privacy and low latency, while routing complex edge-case tasks to frontier cloud APIs.\n\n",
          "CHAPTER 4: ENTERPRISE SAFETY, ALIGNMENT, AND REGULATORY COMPLIANCE\nThe enforcement of the European Union AI Act, coupled with the US NIST AI Risk Management Framework, mandates rigorous pre-deployment evaluations for high-risk cognitive applications. Automated adversarial red-teaming ensembles continuously test models against prompt injection, jailbreak attempts, and tool manipulation.\n\n"
        ];
        
        let written = 0;
        let pIndex = 0;
        while (written < totalBytes) {
          const p = aiParagraphs[pIndex % aiParagraphs.length];
          const pBytes = encoder.encode(p);
          if (written + pBytes.length <= totalBytes) {
            parts.push(pBytes);
            written += pBytes.length;
          } else {
            // Fill remaining bytes safely
            parts.push(pBytes.slice(0, totalBytes - written));
            written = totalBytes;
            break;
          }
          pIndex++;
        }
      } else if (format === "pdf") {
        mime = "application/pdf";
        const textStream = 
          "BT\n/F1 18 Tf\n50 720 Td\n(2026 Global AI & Machine Learning Industry Report) Tj\n" +
          "/F1 11 Tf\n0 -28 Td\n(FileDummy Custom Generated Test PDF - 100% Valid Structure) Tj\n" +
          "0 -22 Td\n(Authoritative test document with strict byte boundaries and valid catalog objects.) Tj\n" +
          "0 -20 Td\n(Generated directly in-browser for upload limits, PDF parsers, and QA testing.) Tj\nET";
        const streamBytes = encoder.encode(textStream);
        
        const pdfHead = encoder.encode(
          "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n" +
          "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n" +
          "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n" +
          `4 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n`
        );
        const pdfTail = encoder.encode(
          "\nendstream\nendobj\n5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n" +
          "xref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000245 00000 n \n0000000450 00000 n \n" +
          "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n520\n%%EOF\n"
        );
        
        const fixedLen = pdfHead.length + streamBytes.length + pdfTail.length;
        if (totalBytes <= fixedLen) {
          parts.push(pdfHead, streamBytes, pdfTail);
        } else {
          parts.push(pdfHead, streamBytes, pdfTail);
          let remaining = totalBytes - fixedLen;
          const chunk = new Uint8Array(Math.min(remaining, 65536));
          chunk.fill(0x30); // '0'
          while (remaining > 0) {
            const thisChunk = Math.min(remaining, 65536);
            if (thisChunk === 1) {
              parts.push(encoder.encode("\n"));
              remaining -= 1;
            } else {
              const line = encoder.encode("%" + "0".repeat(thisChunk - 2) + "\n");
              parts.push(line);
              remaining -= line.length;
            }
          }
        }
      } else if (format === "csv") {
        mime = "text/csv; charset=utf-8";
        const header = "record_id,model_name,developer,parameters_b,context_k,math500_score,humaneval_pass1,cost_input_per_m,cost_output_per_m,license,status\n";
        const headerBytes = encoder.encode(header);
        parts.push(headerBytes);
        let written = headerBytes.length;

        const sampleModels = [
          { name: "Claude 3.7 Sonnet Reasoning", dev: "Anthropic", params: 450, ctx: 200, math: 96.8, code: 94.2, cin: 3.0, cout: 15.0, lic: "Proprietary" },
          { name: "DeepSeek-R1", dev: "DeepSeek AI", params: 671, ctx: 128, math: 97.3, code: 92.8, cin: 0.55, cout: 2.19, lic: "MIT Open" },
          { name: "GPT-4.5 Orion", dev: "OpenAI", params: 800, ctx: 128, math: 95.9, code: 93.6, cin: 5.0, cout: 20.0, lic: "Proprietary" },
          { name: "Gemini 2.0 Flash Thinking", dev: "Google DeepMind", params: 350, ctx: 1000, math: 95.2, code: 91.5, cin: 0.35, cout: 1.40, lic: "Proprietary" },
          { name: "Llama-3.3-70B-Instruct", dev: "Meta AI", params: 70, ctx: 128, math: 89.4, code: 88.0, cin: 0.20, cout: 0.60, lic: "Llama Community" },
          { name: "Qwen 2.5 Max", dev: "Alibaba Cloud", params: 500, ctx: 128, math: 94.7, code: 90.9, cin: 0.80, cout: 2.40, lic: "Proprietary" },
          { name: "Mistral Large 2", dev: "Mistral AI", params: 123, ctx: 128, math: 88.9, code: 87.4, cin: 2.0, cout: 6.0, lic: "Commercial" }
        ];

        let rowId = 1;
        while (true) {
          const m = sampleModels[(rowId - 1) % sampleModels.length];
          const row = `REC-${String(rowId).padStart(6, "0")},"${m.name}","${m.dev}",${m.params},${m.ctx},${m.math},${m.code},${m.cin.toFixed(2)},${m.cout.toFixed(2)},"${m.lic}","Active"\n`;
          const rowBytes = encoder.encode(row);
          if (written + rowBytes.length > totalBytes) {
            break; // Stop cleanly at row boundary to preserve 100% valid CSV
          }
          parts.push(rowBytes);
          written += rowBytes.length;
          rowId++;
        }
      } else if (format === "json") {
        mime = "application/json";
        const prefix = '{\n  "dataset": "2026 Global AI Model Benchmark Dataset",\n  "publisher": "FileDummy (filedummy.ndlong.site)",\n  "eval_metrics": ["MATH-500", "HumanEval", "MMLU-Pro"],\n  "models": [\n';
        const suffix = '\n  ]\n}\n';
        const prefixBytes = encoder.encode(prefix);
        const suffixBytes = encoder.encode(suffix);
        parts.push(prefixBytes);

        const sampleModels = [
          { name: "Claude 3.7 Sonnet Reasoning", dev: "Anthropic", params: 450, ctx: 200, math: 96.8, code: 94.2, cost: 3.0, lic: "Proprietary" },
          { name: "DeepSeek-R1", dev: "DeepSeek AI", params: 671, ctx: 128, math: 97.3, code: 92.8, cost: 0.55, lic: "MIT Open" },
          { name: "GPT-4.5 Orion", dev: "OpenAI", params: 800, ctx: 128, math: 95.9, code: 93.6, cost: 5.0, lic: "Proprietary" },
          { name: "Gemini 2.0 Flash Thinking", dev: "Google DeepMind", params: 350, ctx: 1000, math: 95.2, code: 91.5, cost: 0.35, lic: "Proprietary" },
          { name: "Llama-3.3-70B-Instruct", dev: "Meta AI", params: 70, ctx: 128, math: 89.4, code: 88.0, cost: 0.20, lic: "Llama Community" },
          { name: "Qwen 2.5 Max", dev: "Alibaba Cloud", params: 500, ctx: 128, math: 94.7, code: 90.9, cost: 0.80, lic: "Proprietary" }
        ];

        let written = prefixBytes.length + suffixBytes.length;
        let itemIndex = 1;
        while (true) {
          const m = sampleModels[(itemIndex - 1) % sampleModels.length];
          const itemObj = {
            id: `mod-${String(itemIndex).padStart(4, "0")}`,
            model_name: m.name,
            developer: m.dev,
            parameters_billion: m.params,
            context_window_tokens: m.ctx * 1024,
            math500_score: m.math,
            humaneval_score: m.code,
            cost_input_per_m: m.cost,
            license: m.lic,
            verified: true
          };
          const comma = itemIndex > 1 ? ",\n" : "\n";
          const itemStr = "    " + JSON.stringify(itemObj);
          const chunkBytes = encoder.encode(comma + itemStr);
          if (written + chunkBytes.length > totalBytes) {
            break; // Stop cleanly so JSON remains 100% valid
          }
          parts.push(chunkBytes);
          written += chunkBytes.length;
          itemIndex++;
        }
        parts.push(suffixBytes);
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

      const rawBlob = new Blob(parts, { type: mime });
      // Strict guarantee: file size is always <= totalBytes
      const blob = rawBlob.size > totalBytes ? rawBlob.slice(0, totalBytes, mime) : rawBlob;
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
            {isVi ? "Tạo Dummy File Tùy Chỉnh Kích Thước" : "Custom Dummy File Generator"}
          </h2>
          <p className="text-xs text-slate-400">
            {isVi
              ? "Tạo file kiểm thử với kích thước chính xác ngay trên trình duyệt của bạn."
              : "Generate custom test files with exact byte sizes instantly inside your browser."}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Format selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            {isVi ? "1. Chọn Định Dạng File" : "1. Select File Format"}
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
            {isVi ? "2. Kích Thước Gợi Ý Nhanh" : "2. Quick Presets"}
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
            {isVi ? "3. Nhập Dung Lượng Chính Xác" : "3. Exact Target Size"}
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
            {isVi
              ? "Trình tạo file hỗ trợ tối đa 100MB trong RAM. Với file lớn hơn tới 1GB, vui lòng tải các file mẫu dựng sẵn."
              : "Browser generator supports up to 100MB directly. For files up to 1GB, browse our pre-built downloads."}
          </p>
        </div>

        {/* Ad unit in generator */}
        <div className="pt-2">
          <AdUnit slot="5566778899" format="horizontal" label={isVi ? "Quảng cáo" : "Advertisement"} />
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
                <span>
                  {isVi
                    ? `Đang khởi tạo file ${sizeValue} ${sizeUnit} .${format}... (${progress}%)`
                    : `Generating ${sizeValue} ${sizeUnit} .${format} file... (${progress}%)`}
                </span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>
                  {isVi
                    ? `Tạo & Tải File (${sizeValue} ${sizeUnit} .${format})`
                    : `Generate & Download (${sizeValue} ${sizeUnit} .${format})`}
                </span>
              </>
            )}
          </button>
        </div>

        {isDone && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              {isVi
                ? "Thành công! File đã được tạo và quá trình tải xuống đang bắt đầu."
                : "Success! File created and download started in your browser."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
