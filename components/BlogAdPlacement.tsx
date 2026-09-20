import { AdUnit } from "./AdUnit";

interface BlogAdPlacementProps {
  position: "top" | "mid" | "bottom" | "sidebar";
  className?: string;
}

export function BlogAdPlacement({ position, className = "" }: BlogAdPlacementProps) {
  const slotMap = {
    top: "blog-top-slot",
    mid: "blog-mid-slot",
    bottom: "blog-bottom-slot",
    sidebar: "blog-sidebar-slot",
  };

  const labelMap = {
    top: "Sponsored",
    mid: "Advertisement",
    bottom: "Advertisement",
    sidebar: "Sponsored Content",
  };

  return (
    <div className={`blog-ad-container my-6 ${className}`}>
      <AdUnit slot={slotMap[position]} label={labelMap[position]} />
    </div>
  );
}
