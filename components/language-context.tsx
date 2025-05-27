"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type SupportedLanguage, defaultLanguage, getLanguageConfig, detectBrowserLanguage } from "@/lib/i18n-config"
import { getTranslation, type TranslationKeys } from "@/lib/translations"

interface LanguageContextType {
  currentLanguage: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  t: TranslationKeys
  isRTL: boolean
  fontFamily: string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(defaultLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved language or detect browser language
    const savedLang = localStorage.getItem("preferred-language") as SupportedLanguage
    const detectedLang = detectBrowserLanguage()
    const initialLang = savedLang || detectedLang || defaultLanguage

    setCurrentLanguage(initialLang)
    setMounted(true)

    // Apply language-specific font and direction to document
    const config = getLanguageConfig(initialLang)
    document.documentElement.style.fontFamily = config.fontFamily || ""
    document.documentElement.dir = config.direction
    document.documentElement.lang = initialLang
  }, [])

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang)
    localStorage.setItem("preferred-language", lang)

    // Update document attributes
    const config = getLanguageConfig(lang)
    document.documentElement.style.fontFamily = config.fontFamily || ""
    document.documentElement.dir = config.direction
    document.documentElement.lang = lang

    // Trigger a page reload for proper font loading
    window.location.reload()
  }

  const config = getLanguageConfig(currentLanguage)
  const translations = getTranslation(currentLanguage)

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t: translations,
        isRTL: config.direction === "rtl",
        fontFamily: config.fontFamily || "",
        dir: config.direction,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
