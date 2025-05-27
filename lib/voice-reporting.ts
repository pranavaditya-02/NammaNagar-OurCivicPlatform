// Voice Reporting & Multi-language Support System
export interface VoiceReport {
  id: string
  audioUrl: string
  transcript: string
  language: string
  confidence: number
  translatedText?: string
  targetLanguage?: string
  processingStatus: "processing" | "completed" | "failed"
  issueDetails?: ExtractedIssueDetails
}

export interface ExtractedIssueDetails {
  issueType: string
  location: string
  description: string
  severity: string
  keywords: string[]
  entities: NamedEntity[]
}

export interface NamedEntity {
  text: string
  type: "LOCATION" | "ORGANIZATION" | "PERSON" | "DATE" | "TIME"
  confidence: number
}

export interface LanguageSupport {
  code: string
  name: string
  nativeName: string
  voiceSupported: boolean
  translationSupported: boolean
  rtlSupport: boolean
  commonPhrases: CommonPhrase[]
  voiceCommands: VoiceCommand[]
}

export interface CommonPhrase {
  english: string
  translated: string
  category: "greeting" | "issue" | "location" | "severity" | "thanks"
  usage: string
}

export interface VoiceCommand {
  command: string
  action: string
  parameters?: string[]
}

// Supported Languages Configuration
export const supportedLanguages: LanguageSupport[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    voiceSupported: true,
    translationSupported: true,
    rtlSupport: false,
    commonPhrases: [
      {
        english: "Report an issue",
        translated: "Report an issue",
        category: "issue",
        usage: "To start reporting a problem",
      },
      {
        english: "Road has potholes",
        translated: "Road has potholes",
        category: "issue",
        usage: "Common road issue",
      },
    ],
    voiceCommands: [
      { command: "start report", action: "begin_report" },
      { command: "submit", action: "submit_report" },
      { command: "cancel", action: "cancel_report" },
    ],
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिंदी",
    voiceSupported: true,
    translationSupported: true,
    rtlSupport: false,
    commonPhrases: [
      {
        english: "Report an issue",
        translated: "समस्या की रिपोर्ट करें",
        category: "issue",
        usage: "समस्या रिपोर्ट करने के लिए",
      },
      {
        english: "Road has potholes",
        translated: "सड़क में गड्ढे हैं",
        category: "issue",
        usage: "आम सड़क की समस्या",
      },
      {
        english: "Water not coming",
        translated: "पानी नहीं आ रहा",
        category: "issue",
        usage: "पानी की आपूर्ति की समस्या",
      },
      {
        english: "Street light broken",
        translated: "स्ट्रीट लाइट टूटी है",
        category: "issue",
        usage: "बिजली की समस्या",
      },
    ],
    voiceCommands: [
      { command: "रिपोर्ट शुरू करें", action: "begin_report" },
      { command: "जमा करें", action: "submit_report" },
      { command: "रद्द करें", action: "cancel_report" },
    ],
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    voiceSupported: true,
    translationSupported: true,
    rtlSupport: false,
    commonPhrases: [
      {
        english: "Report an issue",
        translated: "ஒரு பிரச்சனையை தெரிவிக்கவும்",
        category: "issue",
        usage: "பிரச்சனையை தெரிவிக்க",
      },
      {
        english: "Road has potholes",
        translated: "சாலையில் குழிகள் உள்ளன",
        category: "issue",
        usage: "பொதுவான சாலை பிரச்சனை",
      },
      {
        english: "Water not coming",
        translated: "தண்ணீர் வரவில்லை",
        category: "issue",
        usage: "நீர் வழங்கல் பிரச்சனை",
      },
      {
        english: "Garbage not collected",
        translated: "குப்பை அகற்றப்படவில்லை",
        category: "issue",
        usage: "கழிவு மேலாண்மை பிரச்சனை",
      },
    ],
    voiceCommands: [
      { command: "அறிக்கை தொடங்கு", action: "begin_report" },
      { command: "சமர்ப்பிக்கவும்", action: "submit_report" },
      { command: "ரத்து செய்", action: "cancel_report" },
    ],
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    voiceSupported: true,
    translationSupported: true,
    rtlSupport: false,
    commonPhrases: [
      {
        english: "Report an issue",
        translated: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
        category: "issue",
        usage: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಲು",
      },
      {
        english: "Road has potholes",
        translated: "ರಸ್ತೆಯಲ್ಲಿ ಗುಂಡಿಗಳಿವೆ",
        category: "issue",
        usage: "ಸಾಮಾನ್ಯ ರಸ್ತೆ ಸಮಸ್ಯೆ",
      },
      {
        english: "Water supply problem",
        translated: "ನೀರು ಸರಬರಾಜು ಸಮಸ್ಯೆ",
        category: "issue",
        usage: "ನೀರಿನ ಸಮಸ್ಯೆ",
      },
    ],
    voiceCommands: [
      { command: "ವರದಿ ಪ್ರಾರಂಭಿಸಿ", action: "begin_report" },
      { command: "ಸಲ್ಲಿಸಿ", action: "submit_report" },
      { command: "ರದ್ದುಗೊಳಿಸಿ", action: "cancel_report" },
    ],
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    voiceSupported: true,
    translationSupported: true,
    rtlSupport: false,
    commonPhrases: [
      {
        english: "Report an issue",
        translated: "సమస్యను నివేదించండి",
        category: "issue",
        usage: "సమస్యను నివేదించడానికి",
      },
      {
        english: "Road damaged",
        translated: "రోడ్డు దెబ్బతింది",
        category: "issue",
        usage: "రోడ్డు సమస్య",
      },
    ],
    voiceCommands: [
      { command: "నివేదిక ప్రారంభించండి", action: "begin_report" },
      { command: "సమర్పించండి", action: "submit_report" },
    ],
  },
]

// Voice Processing Functions
export async function processVoiceReport(audioBlob: Blob, language: string): Promise<VoiceReport> {
  const audioUrl = URL.createObjectURL(audioBlob)
  const reportId = `voice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Simulate speech-to-text processing
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const mockTranscripts: Record<string, string> = {
    en: "There is a big pothole on Koramangala 5th Block main road near the bus stop. It's very dangerous for vehicles.",
    hi: "कोरमंगला 5वें ब्लॉक मुख्य सड़क पर बस स्टॉप के पास एक बड़ा गड्ढा है। यह वाहनों के लिए बहुत खतरनाक है।",
    ta: "கோரமங்கலா 5வது பிளாக் பிரதான சாலையில் பஸ் நிறுத்தத்திற்கு அருகில் ஒரு பெரிய குழி உள்ளது. இது வாகனங்களுக்கு மிகவும் ஆபத்தானது.",
    kn: "ಕೊರಮಂಗಲ 5ನೇ ಬ್ಲಾಕ್ ಮುಖ್ಯ ರಸ್ತೆಯಲ್ಲಿ ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿ ಒಂದು ದೊಡ್ಡ ಗುಂಡಿ ಇದೆ. ಇದು ವಾಹನಗಳಿಗೆ ಬಹಳ ಅಪಾಯಕಾರಿ.",
    te: "కోరమంగళ 5వ బ్లాక్ ప్రధాన రోడ్డులో బస్ స్టాప్ దగ్గర ఒక పెద్ద గొయ్యి ఉంది. ఇది వాహనాలకు చాలా ప్రమాదకరం.",
  }

  const transcript = mockTranscripts[language] || mockTranscripts.en
  const issueDetails = await extractIssueDetails(transcript, language)

  return {
    id: reportId,
    audioUrl,
    transcript,
    language,
    confidence: 0.92,
    processingStatus: "completed",
    issueDetails,
  }
}

export async function extractIssueDetails(transcript: string, language: string): Promise<ExtractedIssueDetails> {
  // Simulate NLP processing to extract structured information
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock extraction based on common patterns
  const issueTypes = ["pothole", "water", "electricity", "garbage", "drainage"]
  const locations = ["Koramangala", "HSR Layout", "Indiranagar", "Whitefield", "Electronic City"]
  const severities = ["low", "medium", "high", "critical"]

  const detectedIssueType = issueTypes.find((type) => transcript.toLowerCase().includes(type)) || "general"
  const detectedLocation = locations.find((loc) => transcript.toLowerCase().includes(loc.toLowerCase())) || "Unknown"
  const detectedSeverity =
    transcript.toLowerCase().includes("dangerous") || transcript.toLowerCase().includes("urgent") ? "high" : "medium"

  const entities: NamedEntity[] = [
    {
      text: detectedLocation,
      type: "LOCATION",
      confidence: 0.89,
    },
    {
      text: "bus stop",
      type: "LOCATION",
      confidence: 0.76,
    },
  ]

  return {
    issueType: detectedIssueType,
    location: detectedLocation,
    description: transcript,
    severity: detectedSeverity,
    keywords: ["pothole", "road", "dangerous", "vehicles"],
    entities,
  }
}

export async function translateVoiceReport(report: VoiceReport, targetLanguage: string): Promise<VoiceReport> {
  // Simulate translation processing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const translations: Record<string, Record<string, string>> = {
    "en-hi": {
      "There is a big pothole on Koramangala 5th Block main road near the bus stop. It's very dangerous for vehicles.":
        "कोरमंगला 5वें ब्लॉक मुख्य सड़क पर बस स्टॉप के पास एक बड़ा गड्ढा है। यह वाहनों के लिए बहुत खतरनाक है।",
    },
    "hi-en": {
      "कोरमंगला 5वें ब्लॉक मुख्य सड़क पर बस स्टॉप के पास एक बड़ा गड्ढा है। यह वाहनों के लिए बहुत खतरनाक है।":
        "There is a big pothole on Koramangala 5th Block main road near the bus stop. It's very dangerous for vehicles.",
    },
    "ta-en": {
      "கோரமங்கலா 5வது பிளாக் பிரதான சாலையில் பஸ் நிறுத்தத்திற்கு அருகில் ஒரு பெரிய குழி உள்ளது. இது வாகனங்களுக்கு மிகவும் ஆபத்தானது.":
        "There is a big pothole on Koramangala 5th Block main road near the bus stop. It's very dangerous for vehicles.",
    },
  }

  const translationKey = `${report.language}-${targetLanguage}`
  const translatedText =
    translations[translationKey]?.[report.transcript] ||
    `[Translated from ${report.language} to ${targetLanguage}] ${report.transcript}`

  return {
    ...report,
    translatedText,
    targetLanguage,
  }
}

export async function startVoiceRecording(): Promise<MediaRecorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const mediaRecorder = new MediaRecorder(stream)
  return mediaRecorder
}

export function stopVoiceRecording(mediaRecorder: MediaRecorder): Promise<Blob> {
  return new Promise((resolve) => {
    const chunks: Blob[] = []

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data)
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: "audio/wav" })
      resolve(audioBlob)
    }

    mediaRecorder.stop()
  })
}

export function detectLanguageFromAudio(audioBlob: Blob): Promise<{
  language: string
  confidence: number
  alternatives: { language: string; confidence: number }[]
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock language detection
      const detectedLanguages = [
        { language: "hi", confidence: 0.85 },
        { language: "en", confidence: 0.78 },
        { language: "ta", confidence: 0.65 },
      ]

      resolve({
        language: detectedLanguages[0].language,
        confidence: detectedLanguages[0].confidence,
        alternatives: detectedLanguages.slice(1),
      })
    }, 1000)
  })
}

// Utility Functions
export function getLanguageSupport(languageCode: string): LanguageSupport | null {
  return supportedLanguages.find((lang) => lang.code === languageCode) || null
}

export function getCommonPhrases(languageCode: string, category?: string): CommonPhrase[] {
  const language = getLanguageSupport(languageCode)
  if (!language) return []

  if (category) {
    return language.commonPhrases.filter((phrase) => phrase.category === category)
  }

  return language.commonPhrases
}

export function getVoiceCommands(languageCode: string): VoiceCommand[] {
  const language = getLanguageSupport(languageCode)
  return language?.voiceCommands || []
}
