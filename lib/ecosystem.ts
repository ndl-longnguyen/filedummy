export interface NdlApp {
  id: string;
  name: string;
  shortDesc: string;
  url: string;
  category: "Dev Tools" | "Finance" | "Games & Arcade" | "Utilities";
  iconName: "Wrench" | "Coins" | "Gamepad2" | "Share2" | "Image" | "TrendingUp" | "Dices" | "Tv";
  badge?: string;
  badgeColor?: string;
  isCurrent?: boolean;
}

export const NDL_PORTAL_URL = "https://ndlong.site";

export const NDL_ECOSYSTEM_APPS: NdlApp[] = [
  // Dev Tools
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
    badge: "Free",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "short-link",
    name: "NDL Short Link",
    shortDesc: "High-speed URL shortener with analytics and click tracking",
    url: "https://s.ndlong.site",
    category: "Dev Tools",
    iconName: "Share2",
  },

  // Finance
  {
    id: "laisuat",
    name: "Tính Lãi Ngân Hàng",
    shortDesc: "Bảng tính lãi suất vay mua nhà, mua xe và gửi tiết kiệm ngân hàng",
    url: "https://laisuat.ndlong.site",
    category: "Finance",
    iconName: "Coins",
    badge: "Phổ Biến",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  {
    id: "tygia",
    name: "Tỷ Giá & Vàng Hub",
    shortDesc: "Tra cứu tỷ giá ngoại tệ, giá vàng và tiền tệ thời gian thực",
    url: "https://tygia.ndlong.site",
    category: "Finance",
    iconName: "TrendingUp",
  },

  // Games & Arcade
  {
    id: "clicker2top",
    name: "Click 2 Top (Nations Cup)",
    shortDesc: "Trò chơi coin clicker đối kháng trực tuyến, né bom & leo bảng xếp hạng quốc gia",
    url: "https://click.ndlong.site",
    category: "Games & Arcade",
    iconName: "Gamepad2",
    badge: "Hot Game",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
  {
    id: "random-choices",
    name: "Random Choices Wheel",
    shortDesc: "Vòng quay may mắn & công cụ đưa ra lựa chọn ngẫu nhiên tức thì",
    url: "https://choice.ndlong.site",
    category: "Games & Arcade",
    iconName: "Dices",
  },

  // Utilities
  {
    id: "fb-download",
    name: "Facebook Media Downloader",
    shortDesc: "Tải video, reels Facebook chất lượng cao nhanh chóng",
    url: "https://fb.ndlong.site",
    category: "Utilities",
    iconName: "Share2",
  },
  {
    id: "remote-tv",
    name: "Universal TV Remote",
    shortDesc: "Ứng dụng điều khiển Smart TV trực tiếp qua trình duyệt web",
    url: "https://tv.ndlong.site",
    category: "Utilities",
    iconName: "Tv",
  },
];
