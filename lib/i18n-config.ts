// Simplified Internationalization Configuration for English, Tamil, and Hindi
export const supportedLanguages = [
  { code: "en", name: "English", nativeName: "English", script: "Latin" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil" },
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]["code"]

export const defaultLanguage: SupportedLanguage = "en"

export interface LanguageConfig {
  code: SupportedLanguage
  name: string
  nativeName: string
  script: string
  direction: "ltr" | "rtl"
  fontFamily?: string
}

export const getLanguageConfig = (langCode: SupportedLanguage): LanguageConfig => {
  const lang = supportedLanguages.find((l) => l.code === langCode) || supportedLanguages[0]
  return {
    ...lang,
    direction: "ltr", // All three languages are LTR
    fontFamily: getLanguageFontFamily(langCode),
  }
}

export const getLanguageFontFamily = (langCode: SupportedLanguage): string => {
  const fontMap: Record<SupportedLanguage, string> = {
    en: '"Inter", "Segoe UI", sans-serif',
    hi: '"Noto Sans Devanagari", "Mangal", serif',
    ta: '"Noto Sans Tamil", "Latha", serif',
  }
  return fontMap[langCode]
}

// Language detection utilities
export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") return defaultLanguage

  const browserLang = navigator.language.split("-")[0]
  const supportedCodes = supportedLanguages.map((l) => l.code)

  return supportedCodes.includes(browserLang as SupportedLanguage)
    ? (browserLang as SupportedLanguage)
    : defaultLanguage
}

export const detectLocationLanguage = (state?: string): SupportedLanguage => {
  const stateLanguageMap: Record<string, SupportedLanguage> = {
    "Tamil Nadu": "ta",
    Puducherry: "ta",
    Karnataka: "en", // Bangalore is cosmopolitan
    "Andhra Pradesh": "en",
    Telangana: "en",
    Kerala: "en",
    // Hindi belt states
    "Uttar Pradesh": "hi",
    Bihar: "hi",
    "Madhya Pradesh": "hi",
    Rajasthan: "hi",
    Haryana: "hi",
    Jharkhand: "hi",
    Chhattisgarh: "hi",
    Uttarakhand: "hi",
    "Himachal Pradesh": "hi",
    Delhi: "hi",
  }

  return state ? stateLanguageMap[state] || defaultLanguage : defaultLanguage
}
