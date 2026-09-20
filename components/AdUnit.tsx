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
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-9166964727480227";
  const isRealAdsense = adsenseId && !adsenseId.includes("XXXXXXXX");
  // Only render ad slot when a valid numeric slot is provided, keeping the site 100% clean for Google review
  const isRealSlot = slot && /^\d{9,12}$/.test(slot) && !slot.includes("1234567890") && !slot.includes("1122334455");

  useEffect(() => {
    if (!isRealAdsense || !isRealSlot) return;
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
  }, [isRealAdsense, isRealSlot]);

  // If no real slot ID is configured yet, render nothing to maintain a 100% clean, professional site for AdSense review
  if (!isRealAdsense || !isRealSlot) {
    return null;
  }

  return (
    <div className={`my-6 mx-auto flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 font-medium">
        {label}
      </span>
      <div className="w-full max-w-full overflow-hidden flex justify-center items-center">
        <ins
          ref={adRef}
          className="adsbygoogle block w-full text-center"
          data-ad-client={adsenseId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
