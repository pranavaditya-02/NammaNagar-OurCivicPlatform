"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, Languages, Volume2, Copy, RefreshCw } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { supportedLanguages, type SupportedLanguage } from "@/lib/i18n-config"

interface AITranslationWidgetProps {
  defaultText?: string
  onTranslationSelect?: (text: string, language: SupportedLanguage) => void
  showVoiceInput?: boolean
  context?: "report" | "general" | "civic"
}

export function AITranslationWidget({
  defaultText = "",
  onTranslationSelect,
  showVoiceInput = true,
  context = "general",
}: AITranslationWidgetProps) {
  const { currentLanguage, t } = useLanguage()
  const [inputText, setInputText] = useState(defaultText)
  const [targetLanguage, setTargetLanguage] = useState<SupportedLanguage>("hi")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [alternatives, setAlternatives] = useState<string[]>([])

  // Mock AI translation function - in production, this would call actual translation API
  const translateText = async (text: string, from: SupportedLanguage, to: SupportedLanguage) => {
    setIsTranslating(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock translations for demonstration
    const mockTranslations: Record<
      string,
      Record<SupportedLanguage, { text: string; confidence: number; alternatives: string[] }>
    > = {
      "road has potholes": {
        hi: {
          text: "सड़क में गड्ढे हैं",
          confidence: 0.95,
          alternatives: ["सड़क पर गड्ढे हैं", "रास्ते में गड्ढे हैं"],
        },
        ta: {
          text: "சாலையில் குழிகள் உள்ளன",
          confidence: 0.92,
          alternatives: ["ரோட்டில் குழி இருக்கு", "வீதியில் ஓட்டைகள் உள்ளன"],
        },
      },
      "water supply problem": {
        hi: {
          text: "पानी की आपूर्ति में समस्या",
          confidence: 0.97,
          alternatives: ["जल आपूर्ति की समस्या", "पानी की कमी"],
        },
        ta: {
          text: "நீர் வழங்கல் சிக்கல்",
          confidence: 0.94,
          alternatives: ["தண்ணீர் வழங்கலில் சிக்கல்", "நீர் பற்றாக்குறை"],
        },
      },
      "streetlight not working": {
        hi: {
          text: "स्ट्रीट लाइट काम नहीं कर रही",
          confidence: 0.93,
          alternatives: ["सड़क की बत्ती खराब है", "स्ट्रीट लैंप बंद है"],
        },
        ta: {
          text: "தெரு விளக்கு வேலை செய்யவில்லை",
          confidence: 0.91,
          alternatives: ["சாலை விளக்கு கெட்டுப்போயிருக்கு", "தெரு விளக்கு அணைந்துவிட்டது"],
        },
      },
    }

    const result = mockTranslations[text.toLowerCase()]?.[to] || {
      text: `[Translation for "${text}" in ${supportedLanguages.find((l) => l.code === to)?.name}]`,
      confidence: 0.75,
      alternatives: ["Alternative translation 1", "Alternative translation 2"],
    }

    setTranslatedText(result.text)
    setConfidence(result.confidence)
    setAlternatives(result.alternatives)
    setIsTranslating(false)
  }

  const handleTranslate = () => {
    if (inputText.trim()) {
      translateText(inputText, currentLanguage, targetLanguage)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedText)
  }

  const handleVoiceInput = () => {
    // Voice input functionality would be implemented here
    console.log("Voice input triggered")
  }

  const handleSelectTranslation = (text: string) => {
    setTranslatedText(text)
    if (onTranslationSelect) {
      onTranslationSelect(text, targetLanguage)
    }
  }

  const getContextualSuggestions = () => {
    if (context === "report") {
      return [
        "Road has potholes",
        "Streetlight not working",
        "Water supply problem",
        "Garbage not collected",
        "Broken footpath",
        "No water supply",
        "Power outage since morning",
        "Drainage system blocked",
      ]
    } else if (context === "civic") {
      return [
        "Public toilet needs cleaning",
        "Park maintenance required",
        "Bus stop shelter damaged",
        "Traffic signal not working",
        "School building repair needed",
      ]
    }
    return [
      "Hello, how are you?",
      "Thank you for your help",
      "Where is the nearest hospital?",
      "How do I report this issue?",
    ]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          {t.ai.aiTranslationAssistant}
        </CardTitle>
        <CardDescription>{t.ai.translateMessage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your message:</label>
          <div className="flex gap-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1"
              rows={3}
            />
            {showVoiceInput && (
              <Button variant="outline" size="icon" onClick={handleVoiceInput}>
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.ai.quickPhrases}:</label>
          <div className="flex flex-wrap gap-2">
            {getContextualSuggestions().map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setInputText(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Translation Controls */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">{t.ai.translateTo}:</label>
            <Select value={targetLanguage} onValueChange={(value: SupportedLanguage) => setTargetLanguage(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {supportedLanguages
                  .filter((lang) => lang.code !== currentLanguage)
                  .map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.nativeName}</span>
                        <span className="text-xs text-gray-500">({lang.name})</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleTranslate} disabled={!inputText.trim() || isTranslating}>
            {isTranslating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Languages className="mr-2 h-4 w-4" />
            )}
            {isTranslating ? t.ai.translating : t.ai.translate}
          </Button>
        </div>

        {/* Translation Result */}
        {translatedText && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">{t.ai.translation}:</label>
                <p
                  className="text-lg mt-1"
                  style={{
                    fontFamily: supportedLanguages.find((l) => l.code === targetLanguage)?.code
                      ? `var(--font-${targetLanguage})`
                      : "inherit",
                  }}
                >
                  {translatedText}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* Confidence Score */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{t.ai.confidence}:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${confidence * 100}%` }} />
              </div>
              <span className="text-sm font-medium">{(confidence * 100).toFixed(0)}%</span>
            </div>

            {/* Alternative Translations */}
            {alternatives.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Alternative translations:</label>
                <div className="space-y-1">
                  {alternatives.map((alt, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSelectTranslation(alt)}
                    >
                      <span className="text-sm">{alt}</span>
                      <Button variant="ghost" size="sm">
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Usage Button */}
            {onTranslationSelect && (
              <Button onClick={() => handleSelectTranslation(translatedText)} className="w-full">
                {t.ai.useTranslation}
              </Button>
            )}
          </div>
        )}

        {/* Help Alert */}
        <Alert>
          <Languages className="h-4 w-4" />
          <AlertDescription>
            <strong>Tip:</strong> You can also type in English using transliteration. For example, type "sadak mein
            gadha" and it will be converted to Hindi script automatically.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
