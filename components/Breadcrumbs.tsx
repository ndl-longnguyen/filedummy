import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Locale } from "@/lib/i18n/types";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  locale = "en",
}: {
  items: BreadcrumbItem[];
  locale?: Locale;
}) {
  const isVi = locale === "vi";
  const homeHref = isVi ? "/vi" : "/";
  const homeLabel = isVi ? "Trang Chủ" : "Home";

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-400 py-3">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href={homeHref} className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{homeLabel}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-blue-400 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-200 font-medium" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
