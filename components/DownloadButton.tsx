"use client";

import { useState, useEffect, useRef } from "react";
import { Download, CheckCircle2, RotateCcw, ExternalLink } from "lucide-react";
import { AdUnit } from "./AdUnit";

interface DownloadButtonProps {
  fileKey: string;
  label: string;
  sizeBytes: number;
}

export function DownloadButton({ fileKey, label }: DownloadButtonProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const downloadUrl = `/api/download?file=${encodeURIComponent(fileKey)}`;

  const startCountdown = () => {
    setIsCompleted(false);
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown <= 0) {
      setIsCompleted(true);
      setCountdown(null);
      // Trigger download
      window.location.href = downloadUrl;
      return;
    }

    intervalRef.current = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [countdown, downloadUrl]);

  return (
    <div className="w-full">
      {/* Initial state */}
      {countdown === null && !isCompleted && (
        <button
          onClick={startCountdown}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base sm:text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Download className="w-5 h-5 animate-bounce" />
          <span>Download {label} Sample File</span>
        </button>
      )}

      {/* Countdown Interstitial State */}
      {countdown !== null && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-blue-500/40 shadow-2xl space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 font-extrabold text-2xl animate-pulse">
              {countdown}
            </div>
            <h4 className="text-lg font-bold text-white">Preparing Your Download...</h4>
            <p className="text-sm text-slate-400">
              Your sample file will begin downloading automatically in{" "}
              <span className="text-blue-400 font-semibold">{countdown} seconds</span>.
            </p>
          </div>

          {/* High RPM Interstitial Ad Unit */}
          <div className="my-3">
            <AdUnit slot="9876543210" format="rectangle" label="Sponsored Partner" />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <button
              onClick={() => {
                if (intervalRef.current) clearTimeout(intervalRef.current);
                setCountdown(null);
              }}
              className="text-slate-400 hover:text-rose-400 transition-colors"
            >
              Cancel
            </button>
            <a
              href={downloadUrl}
              className="flex items-center gap-1 text-blue-400 hover:underline font-medium"
            >
              Skip countdown & start directly <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Download Triggered / Completed State */}
      {isCompleted && (
        <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">Download Started!</h4>
          <p className="text-xs text-slate-400">
            Your browser should prompt the download. If nothing happens,{" "}
            <a href={downloadUrl} className="text-emerald-400 font-semibold underline hover:text-emerald-300">
              click here to download manually
            </a>.
          </p>
          <button
            onClick={startCountdown}
            className="mt-2 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Download Again
          </button>
        </div>
      )}
    </div>
  );
}
