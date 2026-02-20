import { ui } from "./ui";

export const defaultLang = "vi";

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return (ui[lang] as any)[key] || (ui[defaultLang] as any)[key];
  };
}
