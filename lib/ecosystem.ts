export interface NdlApp {
  id: string;
  name: string;
  shortDesc: string;
  url: string;
  category: "Dev Tools";
  iconName: "Wrench" | "Share2" | "Image" | "Globe" | "Code";
  badge?: string;
  badgeColor?: string;
  isCurrent?: boolean;
}

export const NDL_PORTAL_URL = "https://ndlong.site";

export const NDL_ECOSYSTEM_APPS: NdlApp[] = [
  {
    id: "filedummy",
    name: "FileDummy",
    shortDesc: "Dummy file generator & test sample downloads from 50KB to 1GB",
    url: "https://filedummy.ndlong.site",
    category: "Dev Tools",
    iconName: "Wrench",
    badge: "Active",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    isCurrent: true,
  },
  {
    id: "image-compress",
    name: "NDL Image Tools",
    shortDesc: "Fast client-side image compression & format converter (WebP, PNG, JPG)",
    url: "https://image.ndlong.site",
    category: "Dev Tools",
    iconName: "Image",
    badge: "Free Tool",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "short-link",
    name: "NDL Short Link",
    shortDesc: "High-speed URL shortener with analytics and developer link tracking",
    url: "https://link.ndlong.site",
    category: "Dev Tools",
    iconName: "Share2",
    badge: "Fast & Clean",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "toolskit",
    name: "NDL ToolsKit",
    shortDesc: "All-in-one developer toolbox: code formatters, encoders, regex & utilities",
    url: "https://tools.ndlong.site",
    category: "Dev Tools",
    iconName: "Code",
    badge: "Toolbox",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  {
    id: "ndlong-hub",
    name: "NDL Developer Hub",
    shortDesc: "Central developer portfolio, open-source utilities & engineering projects",
    url: "https://ndlong.site",
    category: "Dev Tools",
    iconName: "Globe",
    badge: "Portal",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  },
];

