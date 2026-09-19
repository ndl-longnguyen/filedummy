"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

export function AdUnit({
  slot = "1234567890",
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isRealAdsense = adsenseId && !adsenseId.includes("XXXXXXXX") && !adsenseId.includes("1234567890");

  useEffect(() => {
    if (!isRealAdsense) return;
    if (isLoadedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
        isLoadedRef.current = true;
      }
    } catch (e) {
      console.warn("AdSense push error:", e);
    }
  }, [isRealAdsense]);

  return (
    <div className={`my-6 mx-auto flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 font-medium">
        {label}
      </span>
      <div className="w-full max-w-full overflow-hidden flex justify-center items-center min-h-[90px] rounded-xl bg-slate-900/40 border border-slate-800/80 p-2">
        {isRealAdsense ? (
          <ins
            ref={adRef}
            className="adsbygoogle block w-full text-center"
            data-ad-client={adsenseId}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="w-full py-6 px-4 text-center border border-dashed border-slate-800 rounded-lg">
            <p className="text-xs text-slate-400 font-medium">
              Google AdSense Placement Area
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Slot: {slot} • Format: {format}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
