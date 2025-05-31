"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { supportedLanguages, type SupportedLanguage, getLanguageConfig } from "@/lib/i18n-config"
import { useLanguage } from "@/components/language-context"
import { Languages, Globe, MapPin, Users } from "lucide-react"

interface LanguageSelectorProps {
  variant?: "dropdown" | "grid" | "compact"
}

export function LanguageSelector({ variant = "dropdown" }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  const getLanguageStats = (langCode: SupportedLanguage) => {
    // Mock stats for the three languages
    const stats = {
      en: { users: 45000, reports: 8500, availability: 100 },
      hi: { users: 32000, reports: 6200, availability: 100 },
      ta: { users: 18000, reports: 3400, availability: 100 },
    }
    return stats[langCode] || { users: 1000, reports: 100, availability: 95 }
  }

  if (variant === "compact") {
    return (
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span>{lang.nativeName}</span>
                <span className="text-xs text-gray-500">({lang.name})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (variant === "dropdown") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">
              {supportedLanguages.find((l) => l.code === currentLanguage)?.nativeName}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t.ui.chooseLanguage}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {supportedLanguages.map((lang) => {
              const config = getLanguageConfig(lang.code)
              const stats = getLanguageStats(lang.code)
              const isSelected = lang.code === currentLanguage

              return (
                <Card
                  key={lang.code}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                    isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg" style={{ fontFamily: config.fontFamily }}>
                          {lang.nativeName}
                        </h3>
                        <p className="text-sm text-gray-600">{lang.name}</p>
                      </div>
                      {isSelected && <Badge className="bg-blue-500 text-white">Current</Badge>}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {stats.users.toLocaleString()} users
                      </span>
                      <span>{stats.availability}% complete</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Grid variant
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {t.ui.chooseLanguage}
        </CardTitle>
        <CardDescription>Select your preferred language for the best experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportedLanguages.map((lang) => {
            const config = getLanguageConfig(lang.code)
            const stats = getLanguageStats(lang.code)
            const isSelected = lang.code === currentLanguage

            return (
              <Card
                key={lang.code}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <h3 className="font-semibold text-2xl mb-1" style={{ fontFamily: config.fontFamily }}>
                      {lang.nativeName}
                    </h3>
                    <p className="text-sm text-gray-600">{lang.name}</p>
                  </div>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{stats.users.toLocaleString()} users</span>
                    </div>

                    <div className="flex items-center justify-center gap-1">
                      <span>{stats.reports.toLocaleString()} reports</span>
                    </div>

                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${stats.availability}%` }} />
                      </div>
                      <span className="text-xs">{stats.availability}% complete</span>
                    </div>
                  </div>

                  {isSelected && <Badge className="mt-3 bg-blue-500 text-white">Current Language</Badge>}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Regional language suggestions based on location
export function RegionalLanguageSuggestion({ state }: { state?: string }) {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const [dismissed, setDismissed] = useState(false)

  // Check localStorage on component mount
  useEffect(() => {
    const isDismissed = localStorage.getItem(`lang-suggestion-${state}`) === 'true'
    setDismissed(isDismissed)
  }, [state])

  const handleDismiss = () => {
    localStorage.setItem(`lang-suggestion-${state}`, 'true')
    setDismissed(true)
  }

  const handleLanguageSwitch = () => {
    if (suggestedLang) {
      setLanguage(suggestedLang)
      localStorage.setItem(`selected-language`, suggestedLang)
      localStorage.setItem(`lang-suggestion-${state}`, 'true')
    }
  }

  const getRegionalLanguage = (state?: string): SupportedLanguage | null => {
    const stateLanguageMap: Record<string, SupportedLanguage> = {
      "Tamil Nadu": "ta",
      Puducherry: "ta",
      // Hindi belt states
      "Uttar Pradesh": "hi",
      Bihar: "hi",
      "Madhya Pradesh": "hi",
      Rajasthan: "hi",
      Haryana: "hi",
      Delhi: "hi",
    }

    return state ? stateLanguageMap[state] || null : null
  }

  const suggestedLang = getRegionalLanguage(state)
  const shouldShow = suggestedLang && 
    suggestedLang !== currentLanguage && 
    !dismissed && 
    currentLanguage === "en"

  if (!shouldShow) return null

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-3">
          <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
            <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1 sm:mt-0" />
            <div className="flex-1">
              <p className="font-semibold text-blue-900 text-sm sm:text-base">
                Switch to {supportedLanguages.find((l) => l.code === suggestedLang)?.name}?
              </p>
              <p className="text-xs sm:text-sm text-blue-700">
                We detected you're in {state}. Would you like to use the local language?
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              onClick={handleLanguageSwitch}
              className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none text-xs sm:text-sm py-2 h-auto"
            >
              Switch
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDismiss}
              className="flex-1 sm:flex-none text-xs sm:text-sm py-2 h-auto"
            >
              Not now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
