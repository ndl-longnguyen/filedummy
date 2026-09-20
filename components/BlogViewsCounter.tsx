"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import type { Locale } from "@/lib/i18n/types";
import { recordAndFetchPageView } from "@/lib/supabase/api";

interface BlogViewsCounterProps {
  postSlug: string;
  locale?: Locale;
}

export function BlogViewsCounter({ postSlug, locale = "en" }: BlogViewsCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const isVi = locale === "vi";

  useEffect(() => {
    let isMounted = true;
    recordAndFetchPageView(postSlug).then((count) => {
      if (isMounted) {
        setViews(count);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [postSlug]);

  const formattedViews = views ? views.toLocaleString(isVi ? "vi-VN" : "en-US") : "1,420";

  return (
    <span className="flex items-center gap-1.5 text-blue-400 font-medium">
      <Eye className="w-3.5 h-3.5 text-blue-400" />
      <span>
        {formattedViews} {isVi ? "lượt xem" : "views"}
      </span>
    </span>
  );
}
