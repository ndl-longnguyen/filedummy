import { Locale, Dictionary } from "./types";
import { enDictionary } from "./dictionaries/en";
import { viDictionary } from "./dictionaries/vi";

export * from "./types";
export * from "./seo";

export function getDictionary(locale: Locale = "en"): Dictionary {
  return locale === "vi" ? viDictionary : enDictionary;
}
