import { SupportedStorage } from "@supabase/supabase-js";

/**
 * Cross-Subdomain Cookie Storage Adapter for NDL Ecosystem Single Sign-On (SSO)
 *
 * Allows sessions to be shared automatically across:
 * - ndlong.site (Main Blog & Portfolio)
 * - filedummy.ndlong.site (Sample Files & Dummy Generator)
 * - link.ndlong.site, tools.ndlong.site, image.ndlong.site, etc.
 * - localhost across all dev ports (3000, 3001, etc.)
 */
export const cookieStorageAdapter: SupportedStorage = {
  getItem: (key: string): string | null => {
    if (typeof document === "undefined") return null;

    try {
      const nameEQ = encodeURIComponent(key) + "=";
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nameEQ) === 0) {
          const raw = c.substring(nameEQ.length);
          return decodeURIComponent(raw);
        }
      }

      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("cookieStorageAdapter.getItem error:", e);
    }

    return null;
  },

  setItem: (key: string, value: string): void => {
    if (typeof document === "undefined") return;

    try {
      const hostname = window.location.hostname;
      const isNdlongDomain = hostname.endsWith("ndlong.site");
      const domainAttribute = isNdlongDomain ? "; domain=.ndlong.site" : "";
      const secureAttribute = isNdlongDomain || window.location.protocol === "https:" ? "; Secure" : "";

      const maxAge = 60 * 60 * 24 * 365;
      const encodedValue = encodeURIComponent(value);

      document.cookie = encodeURIComponent(key) + "=" + encodedValue + "; path=/; max-age=" + maxAge + "; SameSite=Lax" + domainAttribute + secureAttribute;

      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("cookieStorageAdapter.setItem error:", e);
    }
  },

  removeItem: (key: string): void => {
    if (typeof document === "undefined") return;

    try {
      const hostname = window.location.hostname;
      const isNdlongDomain = hostname.endsWith("ndlong.site");
      const domainAttribute = isNdlongDomain ? "; domain=.ndlong.site" : "";

      document.cookie = encodeURIComponent(key) + "=; path=/; max-age=0; SameSite=Lax" + domainAttribute;
      document.cookie = encodeURIComponent(key) + "=; path=/; max-age=0; SameSite=Lax";

      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn("cookieStorageAdapter.removeItem error:", e);
    }
  },
};
