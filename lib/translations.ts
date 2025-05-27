// Complete Translation Management System for English, Tamil, and Hindi

export type SupportedLanguage = "en" | "hi" | "ta"
const defaultLanguage: SupportedLanguage = "en"

export interface TranslationKeys {
  // Navigation & Common
  nav: {
    home: string
    report: string
    projects: string
    dashboard: string
    community: string
    login: string
    signup: string
  }

  // Homepage
  home: {
    heroTitle: string
    heroSubtitle: string
    heroDescription: string
    reportIssue: string
    viewDashboard: string
    totalReports: string
    resolvedIssues: string
    citiesCovered: string
    activeCitizens: string
    snapReport: string
    snapReportDesc: string
    liveTracker: string
    liveTrackerDesc: string
    communityEngagement: string
    communityEngagementDesc: string
    revolutionizing: string
    revolutionizingDesc: string
    awardWinning: string
    awardWinningDesc: string
    readyToTransform: string
    readyToTransformDesc: string
    getStarted: string
    exploreProjects: string
  }

  // Report Page
  report: {
    title: string
    subtitle: string
    category: string
    location: string
    issueTitle: string
    description: string
    uploadPhotos: string
    submitReport: string
    successMessage: string
    reportId: string
    nextSteps: string
    aiAnalysis: string
    estimatedCost: string
    estimatedTime: string
    reportingTips: string
    recentReports: string
    needTranslation: string
    chooseFiles: string
    currentLocation: string
    yourName: string
    phoneNumber: string
    issueDetails: string
    detailedDescription: string
  }

  // Projects Page
  projects: {
    title: string
    subtitle: string
    searchPlaceholder: string
    allCategories: string
    allStatus: string
    viewOnMap: string
    progress: string
    totalBudget: string
    allocated: string
    viewDetails: string
    trackProgress: string
    contractor: string
    startDate: string
    endDate: string
    liveData: string
    governmentData: string
    allProjects: string
  }

  // Community Page
  community: {
    title: string
    subtitle: string
    topContributors: string
    localGroups: string
    discussions: string
    reports: string
    resolved: string
    score: string
    members: string
    joinGroup: string
    startDiscussion: string
    communityChampions: string
    localCivicGroups: string
    recentDiscussions: string
    connect: string
    viewPosts: string
    createGroup: string
  }

  // Dashboard
  dashboard: {
    title: string
    subtitle: string
    totalReports: string
    resolvedIssues: string
    inProgress: string
    pending: string
    recentReports: string
    activeProjects: string
    analytics: string
    fraudDetection: string
    citizenReports: string
    infrastructureProjects: string
    analyticsInsights: string
  }

  // AI Features
  ai: {
    analyzing: string
    analysisComplete: string
    imageQuality: string
    fraudRisk: string
    issueCategory: string
    confidence: string
    severity: string
    suggestions: string
    locationVerified: string
    aiPoweredAnalysis: string
    aiTranslationAssistant: string
    translateMessage: string
    quickPhrases: string
    translateTo: string
    translate: string
    translating: string
    translation: string
    useTranslation: string
  }

  // Government Integration
  government: {
    liveData: string
    dataSync: string
    lastSync: string
    tenderPortal: string
    gemPortal: string
    pfmsData: string
    budgetUtilization: string
    ongoingProjects: string
    governmentDataIntegration: string
    realTimeData: string
    liveTenders: string
    projectProgress: string
    eProcurement: string
    dataAnalytics: string
  }

  // Common Actions
  actions: {
    submit: string
    cancel: string
    save: string
    edit: string
    delete: string
    view: string
    download: string
    share: string
    filter: string
    search: string
    refresh: string
    sync: string
    apply: string
    back: string
    next: string
    continue: string
  }

  // Status & Categories
  status: {
    pending: string
    inProgress: string
    resolved: string
    completed: string
    delayed: string
    cancelled: string
    assigned: string
    verified: string
  }

  categories: {
    roads: string
    water: string
    electricity: string
    sanitation: string
    healthcare: string
    education: string
    parks: string
    other: string
  }

  // Time & Dates
  time: {
    today: string
    yesterday: string
    thisWeek: string
    thisMonth: string
    ago: string
    hours: string
    days: string
    weeks: string
    months: string
    justNow: string
  }

  // Common UI Elements
  ui: {
    loading: string
    error: string
    success: string
    warning: string
    info: string
    close: string
    open: string
    menu: string
    settings: string
    profile: string
    logout: string
    language: string
    chooseLanguage: string
  }
}

// English translations (default)
export const enTranslations: TranslationKeys = {
  nav: {
    home: "Home",
    report: "Report Issue",
    projects: "Projects",
    dashboard: "Dashboard",
    community: "Community",
    login: "Login",
    signup: "Sign Up",
  },
  home: {
    heroTitle: "NammaNagar",
    heroSubtitle: "From Potholes to Promises",
    heroDescription:
      "Empowering India's citizens to monitor, track, and fix their streets, schools, and civic systems through real-time transparency and accountability.",
    reportIssue: "Report an Issue",
    viewDashboard: "View Dashboard",
    totalReports: "Issues Reported",
    resolvedIssues: "Issues Resolved",
    citiesCovered: "Cities Covered",
    activeCitizens: "Active Citizens",
    snapReport: "Snap & Report",
    snapReportDesc: "Instantly report infrastructure issues with geo-tagged photos and AI-powered categorization",
    liveTracker: "Live Project Tracker",
    liveTrackerDesc: "Monitor public infrastructure projects from tender to completion with real-time updates",
    communityEngagement: "Community Engagement",
    communityEngagementDesc: "Build local civic circles and collaborate with neighbors for better infrastructure",
    revolutionizing: "Revolutionizing Civic Engagement",
    revolutionizingDesc:
      "Our platform bridges the gap between citizens and government through technology, transparency, and real-time accountability.",
    awardWinning: "Award-Winning Innovation",
    awardWinningDesc: "Cutting-edge technology meets grassroots civic engagement",
    readyToTransform: "Ready to Transform Your City?",
    readyToTransformDesc:
      "Join thousands of citizens already making a difference in their communities through transparent, accountable governance.",
    getStarted: "Get Started Today",
    exploreProjects: "Explore Projects",
  },
  report: {
    title: "Report Infrastructure Issue",
    subtitle: "Help improve your community by reporting infrastructure problems",
    category: "Issue Category",
    location: "Location",
    issueTitle: "Issue Title",
    description: "Detailed Description",
    uploadPhotos: "Upload Photos",
    submitReport: "Submit Report",
    successMessage: "Report Submitted Successfully!",
    reportId: "Report ID",
    nextSteps: "What happens next?",
    aiAnalysis: "AI Analysis",
    estimatedCost: "Estimated Cost",
    estimatedTime: "Estimated Time",
    reportingTips: "Reporting Tips",
    recentReports: "Recent Reports in Your Area",
    needTranslation: "Need Translation?",
    chooseFiles: "Choose Files",
    currentLocation: "Current location",
    yourName: "Your Name",
    phoneNumber: "Phone Number",
    issueDetails: "Issue Details",
    detailedDescription: "Provide more details about the issue, when you noticed it, severity, etc.",
  },
  projects: {
    title: "Infrastructure Projects",
    subtitle: "Track public infrastructure projects from multiple data sources",
    searchPlaceholder: "Search projects...",
    allCategories: "All Categories",
    allStatus: "All Status",
    viewOnMap: "View on Map",
    progress: "Progress",
    totalBudget: "Total Budget",
    allocated: "Allocated",
    viewDetails: "View Details",
    trackProgress: "Track Progress",
    contractor: "Contractor",
    startDate: "Start Date",
    endDate: "End Date",
    liveData: "Live Data Integration",
    governmentData: "Government Data",
    allProjects: "All Projects",
  },
  community: {
    title: "Community Hub",
    subtitle: "Connect with fellow citizens and make a difference together",
    topContributors: "Top Contributors",
    localGroups: "Local Groups",
    discussions: "Discussions",
    reports: "Reports",
    resolved: "Resolved",
    score: "Score",
    members: "Members",
    joinGroup: "Join Group",
    startDiscussion: "Start Discussion",
    communityChampions: "Community Champions",
    localCivicGroups: "Local Civic Groups",
    recentDiscussions: "Recent Discussions",
    connect: "Connect",
    viewPosts: "View Posts",
    createGroup: "Create Group",
  },
  dashboard: {
    title: "Civic Dashboard",
    subtitle: "Real-time insights into your city's infrastructure with live government data",
    totalReports: "Total Reports",
    resolvedIssues: "Resolved Issues",
    inProgress: "In Progress",
    pending: "Pending",
    recentReports: "Recent Reports",
    activeProjects: "Active Infrastructure Projects",
    analytics: "Analytics & Insights",
    fraudDetection: "Fraud Detection",
    citizenReports: "Citizen Reports",
    infrastructureProjects: "Infrastructure Projects",
    analyticsInsights: "Analytics",
  },
  ai: {
    analyzing: "Analyzing...",
    analysisComplete: "Analysis Complete!",
    imageQuality: "Image Quality",
    fraudRisk: "Fraud Risk",
    issueCategory: "Issue Category",
    confidence: "Confidence",
    severity: "Severity",
    suggestions: "Suggestions",
    locationVerified: "Location Verified",
    aiPoweredAnalysis: "AI-Powered Analysis",
    aiTranslationAssistant: "AI Translation Assistant",
    translateMessage: "Translate your message into any language with AI assistance",
    quickPhrases: "Quick phrases",
    translateTo: "Translate to",
    translate: "Translate",
    translating: "Translating...",
    translation: "Translation",
    useTranslation: "Use This Translation",
  },
  government: {
    liveData: "Live Government Data",
    dataSync: "Data Synchronization",
    lastSync: "Last Sync",
    tenderPortal: "Tender Portal",
    gemPortal: "GeM Portal",
    pfmsData: "PFMS Data",
    budgetUtilization: "Budget Utilization",
    ongoingProjects: "Ongoing Projects",
    governmentDataIntegration: "Government Data Integration",
    realTimeData: "Real-time data from official tender portals and e-procurement systems",
    liveTenders: "Live Tenders",
    projectProgress: "Project Progress",
    eProcurement: "E-Procurement",
    dataAnalytics: "Data Analytics",
  },
  actions: {
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    download: "Download",
    share: "Share",
    filter: "Filter",
    search: "Search",
    refresh: "Refresh",
    sync: "Sync",
    apply: "Apply",
    back: "Back",
    next: "Next",
    continue: "Continue",
  },
  status: {
    pending: "Pending",
    inProgress: "In Progress",
    resolved: "Resolved",
    completed: "Completed",
    delayed: "Delayed",
    cancelled: "Cancelled",
    assigned: "Assigned",
    verified: "Verified",
  },
  categories: {
    roads: "Roads & Transportation",
    water: "Water Supply",
    electricity: "Electricity",
    sanitation: "Sanitation",
    healthcare: "Healthcare",
    education: "Education",
    parks: "Parks & Recreation",
    other: "Other",
  },
  time: {
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    ago: "ago",
    hours: "hours",
    days: "days",
    weeks: "weeks",
    months: "months",
    justNow: "Just now",
  },
  ui: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
    close: "Close",
    open: "Open",
    menu: "Menu",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
    language: "Language",
    chooseLanguage: "Choose Language",
  },
}

// Hindi translations
export const hiTranslations: TranslationKeys = {
  nav: {
    home: "होम",
    report: "शिकायत दर्ज करें",
    projects: "परियोजनाएं",
    dashboard: "डैशबोर्ड",
    community: "समुदाय",
    login: "लॉगिन",
    signup: "साइन अप",
  },
  home: {
    heroTitle: "नम्मानगर",
    heroSubtitle: "गड्ढों से वादों तक",
    heroDescription:
      "भारत के नागरिकों को वास्तविक समय पारदर्शिता और जवाबदेही के माध्यम से अपनी सड़कों, स्कूलों और नागरिक व्यवस्थाओं की निगरानी, ट्रैकिंग और सुधार के लिए सशक्त बनाना।",
    reportIssue: "समस्या की रिपोर्ट करें",
    viewDashboard: "डैशबोर्ड देखें",
    totalReports: "रिपोर्ट की गई समस्याएं",
    resolvedIssues: "हल की गई समस्याएं",
    citiesCovered: "शहरों की संख्या",
    activeCitizens: "सक्रिय नागरिक",
    snapReport: "फोटो लें और रिपोर्ट करें",
    snapReportDesc: "जियो-टैग फ़ोटो और AI-संचालित वर्गीकरण के साथ तुरंत इन्फ्रास्ट्रक्चर समस्याओं की रिपोर्ट करें",
    liveTracker: "लाइव प्रोजेक्ट ट्रैकर",
    liveTrackerDesc: "वास्तविक समय अपडेट के साथ टेंडर से पूर्णता तक सार्वजनिक इन्फ्रास्ट्रक्चर परियोजनाओं की निगरानी करें",
    communityEngagement: "सामुदायिक भागीदारी",
    communityEngagementDesc: "स्थानीय नागरिक मंडल बनाएं और बेहतर इन्फ्रास्ट्रक्चर के लिए पड़ोसियों के साथ सहयोग करें",
    revolutionizing: "नागरिक भागीदारी में क्रांति",
    revolutionizingDesc:
      "हमारा प्लेटफॉर्म प्रौद्योगिकी, पारदर्शिता और वास्तविक समय जवाबदेही के माध्यम से नागरिकों और सरकार के बीच की खाई को पाटता है।",
    awardWinning: "पुरस्कार विजेता नवाचार",
    awardWinningDesc: "अत्याधुनिक तकनीक जमीनी स्तर की नागरिक भागीदारी से मिलती है",
    readyToTransform: "अपने शहर को बदलने के लिए तैयार हैं?",
    readyToTransformDesc: "पारदर्शी, जवाबदेह शासन के माध्यम से अपने समुदायों में पहले से ही बदलाव ला रहे हजारों नागरिकों से जुड़ें।",
    getStarted: "आज ही शुरू करें",
    exploreProjects: "परियोजनाओं का अन्वेषण करें",
  },
  report: {
    title: "इन्फ्रास्ट्रक्चर समस्या की रिपोर्ट करें",
    subtitle: "इन्फ्रास्ट्रक्चर समस्याओं की रिपोर्ट करके अपने समुदाय को बेहतर बनाने में मदद करें",
    category: "समस्या श्रेणी",
    location: "स्थान",
    issueTitle: "समस्या का शीर्षक",
    description: "विस्तृत विवरण",
    uploadPhotos: "फ़ोटो अपलोड करें",
    submitReport: "रिपोर्ट जमा करें",
    successMessage: "रिपोर्ट सफलतापूर्वक जमा की गई!",
    reportId: "रिपोर्ट आईडी",
    nextSteps: "आगे क्या होगा?",
    aiAnalysis: "AI विश्लेषण",
    estimatedCost: "अनुमानित लागत",
    estimatedTime: "अनुमानित समय",
    reportingTips: "रिपोर्टिंग टिप्स",
    recentReports: "आपके क्षेत्र की हाल की रिपोर्ट्स",
    needTranslation: "अनुवाद चाहिए?",
    chooseFiles: "फ़ाइलें चुनें",
    currentLocation: "वर्तमान स्थान",
    yourName: "आपका नाम",
    phoneNumber: "फोन नंबर",
    issueDetails: "समस्या विवरण",
    detailedDescription: "समस्या के बारे में अधिक विवरण प्रदान करें, आपने इसे कब देखा, गंभीरता आदि।",
  },
  projects: {
    title: "इन्फ्रास्ट्रक्चर परियोजनाएं",
    subtitle: "कई डेटा स्रोतों से सार्वजनिक इन्फ्रास्ट्रक्चर परियोजनाओं को ट्रैक करें",
    searchPlaceholder: "परियोजनाएं खोजें...",
    allCategories: "सभी श्रेणियां",
    allStatus: "सभी स्थिति",
    viewOnMap: "मानचित्र पर देखें",
    progress: "प्रगति",
    totalBudget: "कुल बजट",
    allocated: "आवंटित",
    viewDetails: "विवरण देखें",
    trackProgress: "प्रगति ट्रैक करें",
    contractor: "ठेकेदार",
    startDate: "शुरुआती तारीख",
    endDate: "समाप्ति तारीख",
    liveData: "लाइव डेटा एकीकरण",
    governmentData: "सरकारी डेटा",
    allProjects: "सभी परियोजनाएं",
  },
  community: {
    title: "समुदायिक हब",
    subtitle: "साथी नागरिकों से जुड़ें और एक साथ बदलाव लाएं",
    topContributors: "शीर्ष योगदानकर्ता",
    localGroups: "स्थानीय समूह",
    discussions: "चर्चाएं",
    reports: "रिपोर्ट्स",
    resolved: "हल हुआ",
    score: "स्कोर",
    members: "सदस्य",
    joinGroup: "समूह में शामिल हों",
    startDiscussion: "चर्चा शुरू करें",
    communityChampions: "समुदायिक चैंपियन",
    localCivicGroups: "स्थानीय नागरिक समूह",
    recentDiscussions: "हाल की चर्चाएं",
    connect: "जुड़ें",
    viewPosts: "पोस्ट देखें",
    createGroup: "समूह बनाएं",
  },
  dashboard: {
    title: "नागरिक डैशबोर्ड",
    subtitle: "लाइव सरकारी डेटा के साथ आपके शहर के इन्फ्रास्ट्रक्चर में वास्तविक समय की अंतर्दृष्टि",
    totalReports: "कुल रिपोर्ट्स",
    resolvedIssues: "हल की गई समस्याएं",
    inProgress: "प्रगति में",
    pending: "लंबित",
    recentReports: "हाल की रिपोर्ट्स",
    activeProjects: "सक्रिय इन्फ्रास्ट्रक्चर परियोजनाएं",
    analytics: "विश्लेषण और अंतर्दृष्टि",
    fraudDetection: "धोखाधड़ी का पता लगाना",
    citizenReports: "नागरिक रिपोर्ट्स",
    infrastructureProjects: "इन्फ्रास्ट्रक्चर परियोजनाएं",
    analyticsInsights: "विश्लेषण",
  },
  ai: {
    analyzing: "विश्लेषण कर रहा है...",
    analysisComplete: "विश्लेषण पूर्ण!",
    imageQuality: "छवि गुणवत्ता",
    fraudRisk: "धोखाधड़ी का जोखिम",
    issueCategory: "समस्या श्रेणी",
    confidence: "आत्मविश्वास",
    severity: "गंभीरता",
    suggestions: "सुझाव",
    locationVerified: "स्थान सत्यापित",
    aiPoweredAnalysis: "AI-संचालित विश्लेषण",
    aiTranslationAssistant: "AI अनुवाद सहायक",
    translateMessage: "AI सहायता के साथ अपने संदेश का किसी भी भाषा में अनुवाद करें",
    quickPhrases: "त्वरित वाक्य",
    translateTo: "इसमें अनुवाद करें",
    translate: "अनुवाद करें",
    translating: "अनुवाद कर रहा है...",
    translation: "अनुवाद",
    useTranslation: "इस अनुवाद का उपयोग करें",
  },
  government: {
    liveData: "लाइव सरकारी डेटा",
    dataSync: "डेटा सिंक्रोनाइज़ेशन",
    lastSync: "अंतिम सिंक",
    tenderPortal: "टेंडर पोर्टल",
    gemPortal: "GeM पोर्टल",
    pfmsData: "PFMS डेटा",
    budgetUtilization: "बजट उपयोग",
    ongoingProjects: "चालू परियोजनाएं",
    governmentDataIntegration: "सरकारी डेटा एकीकरण",
    realTimeData: "आधिकारिक टेंडर पोर्टल और ई-प्रोक्योरमेंट सिस्टम से वास्तविक समय डेटा",
    liveTenders: "लाइव टेंडर",
    projectProgress: "परियोजना प्रगति",
    eProcurement: "ई-प्रोक्योरमेंट",
    dataAnalytics: "डेटा एनालिटिक्स",
  },
  actions: {
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    download: "डाउनलोड",
    share: "साझा करें",
    filter: "फ़िल्टर",
    search: "खोजें",
    refresh: "रीफ्रेश",
    sync: "सिंक",
    apply: "लागू करें",
    back: "वापस",
    next: "अगला",
    continue: "जारी रखें",
  },
  status: {
    pending: "लंबित",
    inProgress: "प्रगति में",
    resolved: "हल हुआ",
    completed: "पूर्ण",
    delayed: "विलंबित",
    cancelled: "रद्द",
    assigned: "सौंपा गया",
    verified: "सत्यापित",
  },
  categories: {
    roads: "सड़क और परिवहन",
    water: "जल आपूर्ति",
    electricity: "बिजली",
    sanitation: "स्वच्छता",
    healthcare: "स्वास्थ्य सेवा",
    education: "शिक्षा",
    parks: "पार्क और मनोरंजन",
    other: "अन्य",
  },
  time: {
    today: "आज",
    yesterday: "कल",
    thisWeek: "इस सप्ताह",
    thisMonth: "इस महीने",
    ago: "पहले",
    hours: "घंटे",
    days: "दिन",
    weeks: "सप्ताह",
    months: "महीने",
    justNow: "अभी",
  },
  ui: {
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    warning: "चेतावनी",
    info: "जानकारी",
    close: "बंद करें",
    open: "खोलें",
    menu: "मेनू",
    settings: "सेटिंग्स",
    profile: "प्रोफ़ाइल",
    logout: "लॉगआउट",
    language: "भाषा",
    chooseLanguage: "भाषा चुनें",
  },
}

// Tamil translations
export const taTranslations: TranslationKeys = {
  nav: {
    home: "முகப்பு",
    report: "புகார் அளிக்கவும்",
    projects: "திட்டங்கள்",
    dashboard: "டாஷ்போர்டு",
    community: "சமூகம்",
    login: "உள்நுழைவு",
    signup: "பதிவு செய்யவும்",
  },
  home: {
    heroTitle: "நம்மநகர்",
    heroSubtitle: "குழிகளிலிருந்து வாக்குறுதிகள் வரை",
    heroDescription:
      "நிகழ்நேர வெளிப்படைத்தன்மை மற்றும் பொறுப்புணர்வு மூலம் இந்தியாவின் குடிமக்கள் தங்கள் சாலைகள், பள்ளிகள் மற்றும் குடிமை அமைப்புகளை கண்காணிக்க, கண்காணிக்க மற்றும் சரிசெய்ய அதிகாரம் அளித்தல்.",
    reportIssue: "சிக்கலைப் புகாரளிக்கவும்",
    viewDashboard: "டாஷ்போர்டைப் பார்க்கவும்",
    totalReports: "புகாரளிக்கப்பட்ட சிக்கல்கள்",
    resolvedIssues: "தீர்க்கப்பட்ட சிக்கல்கள்",
    citiesCovered: "மூடப்பட்ட நகரங்கள்",
    activeCitizens: "செயலில் உள்ள குடிமக்கள்",
    snapReport: "புகைப்படம் எடுத்து புகாரளிக்கவும்",
    snapReportDesc: "ஜியோ-டேக் செய்யப்பட்ட புகைப்படங்கள் மற்றும் AI-இயங்கும் வகைப்பாடுடன் உடனடியாக உள்கட்டமைப்பு சிக்கல்களைப் புகாரளிக்கவும்",
    liveTracker: "நேரடி திட்ட கண்காணிப்பாளர்",
    liveTrackerDesc: "நிகழ்நேர புதுப்பிப்புகளுடன் டெண்டர் முதல் நிறைவு வரை பொது உள்கட்டமைப்பு திட்டங்களைக் கண்காணிக்கவும்",
    communityEngagement: "சமூக ஈடுபாடு",
    communityEngagementDesc: "உள்ளூர் குடிமை வட்டங்களை உருவாக்கி சிறந்த உள்கட்டமைப்புக்காக அண்டை வீட்டாருடன் ஒத்துழைக்கவும்",
    revolutionizing: "குடிமை ஈடுபாட்டில் புரட்சி",
    revolutionizingDesc:
      "எங்கள் தளம் தொழில்நுட்பம், வெளிப்படைத்தன்மை மற்றும் நிகழ்நேர பொறுப்புணர்வு மூலம் குடிமக்களுக்கும் அரசாங்கத்திற்கும் இடையிலான இடைவெளியைக் குறைக்கிறது.",
    awardWinning: "விருது பெற்ற கண்டுபிடிப்பு",
    awardWinningDesc: "அதிநவீன தொழில்நுட்பம் அடிமட்ட குடிமை ஈடுபாட்டைச் சந்திக்கிறது",
    readyToTransform: "உங்கள் நகரத்தை மாற்ற தயாரா?",
    readyToTransformDesc:
      "வெளிப்படையான, பொறுப்புணர்வுள்ள ஆட்சியின் மூலம் தங்கள் சமூகங்களில் ஏற்கனவே மாற்றத்தை ஏற்படுத்தும் ஆயிரக்கணக்கான குடிமக்களுடன் சேரவும்.",
    getStarted: "இன்றே தொடங்குங்கள்",
    exploreProjects: "திட்டங்களை ஆராயுங்கள்",
  },
  report: {
    title: "உள்கட்டமைப்பு சிக்கலைப் புகாரளிக்கவும்",
    subtitle: "உள்கட்டமைப்பு சிக்கல்களைப் புகாரளிப்பதன் மூலம் உங்கள் சமூகத்தை மேம்படுத்த உதவுங்கள்",
    category: "சிக்கல் வகை",
    location: "இடம்",
    issueTitle: "சிக்கல் தலைப்பு",
    description: "விரிவான விளக்கம்",
    uploadPhotos: "புகைப்படங்களைப் பதிவேற்றவும்",
    submitReport: "அறிக்கையைச் சமர்ப்பிக்கவும்",
    successMessage: "அறிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
    reportId: "அறிக்கை ஐடி",
    nextSteps: "அடுத்து என்ன நடக்கும்?",
    aiAnalysis: "AI பகுப்பாய்வு",
    estimatedCost: "மதிப்பிடப்பட்ட செலவு",
    estimatedTime: "மதிப்பிடப்பட்ட நேரம்",
    reportingTips: "புகாரளிக்கும் குறிப்புகள்",
    recentReports: "உங்கள் பகுதியில் சமீபத்திய அறிக்கைகள்",
    needTranslation: "மொழிபெயர்ப்பு தேவையா?",
    chooseFiles: "கோப்புகளைத் தேர்ந்தெடுக்கவும்",
    currentLocation: "தற்போதைய இடம்",
    yourName: "உங்கள் பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    issueDetails: "சிக்கல் விவரங்கள்",
    detailedDescription: "சிக்கல் பற்றி மேலும் விவரங்களை வழங்கவும், நீங்கள் அதை எப்போது கவனித்தீர்கள், தீவிரம் போன்றவை.",
  },
  projects: {
    title: "உள்கட்டமைப்பு திட்டங்கள்",
    subtitle: "பல தரவு ஆதாரங்களிலிருந்து பொது உள்கட்டமைப்பு திட்டங்களைக் கண்காணிக்கவும்",
    searchPlaceholder: "திட்டங்களைத் தேடுங்கள்...",
    allCategories: "அனைத்து வகைகள்",
    allStatus: "அனைத்து நிலை",
    viewOnMap: "வரைபடத்தில் பார்க்கவும்",
    progress: "முன்னேற்றம்",
    totalBudget: "மொத்த பட்ஜெட்",
    allocated: "ஒதுக்கப்பட்டது",
    viewDetails: "விவரங்களைப் பார்க்கவும்",
    trackProgress: "முன்னேற்றத்தைக் கண்காணிக்கவும்",
    contractor: "ஒப்பந்ததாரர்",
    startDate: "தொடக்க தேதி",
    endDate: "முடிவு தேதி",
    liveData: "நேரடி தரவு ஒருங்கிணைப்பு",
    governmentData: "அரசாங்க தரவு",
    allProjects: "அனைத்து திட்டங்கள்",
  },
  community: {
    title: "சமூக மையம்",
    subtitle: "சக குடிமக்களுடன் இணைந்து ஒன்றாக மாற்றத்தை ஏற்படுத்துங்கள்",
    topContributors: "முதன்மை பங்களிப்பாளர்கள்",
    localGroups: "உள்ளூர் குழுக்கள்",
    discussions: "விவாதங்கள்",
    reports: "அறிக்கைகள்",
    resolved: "தீர்க்கப்பட்டது",
    score: "மதிப்பெண்",
    members: "உறுப்பினர்கள்",
    joinGroup: "குழுவில் சேரவும்",
    startDiscussion: "விவாதத்தைத் தொடங்கவும்",
    communityChampions: "சமூக வீரர்கள்",
    localCivicGroups: "உள்ளூர் குடிமை குழுக்கள்",
    recentDiscussions: "சமீபத்திய விவாதங்கள்",
    connect: "இணைக்கவும்",
    viewPosts: "இடுகைகளைப் பார்க்கவும்",
    createGroup: "குழுவை உருவாக்கவும்",
  },
  dashboard: {
    title: "குடிமை டாஷ்போர்டு",
    subtitle: "நேரடி அரசாங்க தரவுகளுடன் உங்கள் நகரத்தின் உள்கட்டமைப்பில் நிகழ்நேர நுண்ணறிவுகள்",
    totalReports: "மொத்த அறிக்கைகள்",
    resolvedIssues: "தீர்க்கப்பட்ட சிக்கல்கள்",
    inProgress: "முன்னேற்றத்தில்",
    pending: "நிலுவையில்",
    recentReports: "சமீபத்திய அறிக்கைகள்",
    activeProjects: "செயலில் உள்ள உள்கட்டமைப்பு திட்டங்கள்",
    analytics: "பகுப்பாய்வு மற்றும் நுண்ணறிவுகள்",
    fraudDetection: "மோசடி கண்டறிதல்",
    citizenReports: "குடிமக்கள் அறிக்கைகள்",
    infrastructureProjects: "உள்கட்டமைப்பு திட்டங்கள்",
    analyticsInsights: "பகுப்பாய்வு",
  },
  ai: {
    analyzing: "பகுப்பாய்வு செய்கிறது...",
    analysisComplete: "பகுப்பாய்வு முடிந்தது!",
    imageQuality: "படத்தின் தரம்",
    fraudRisk: "மோசடி ஆபத்து",
    issueCategory: "சிக்கல் வகை",
    confidence: "நம்பிக்கை",
    severity: "தீவிரம்",
    suggestions: "பரிந்துரைகள்",
    locationVerified: "இடம் சரிபார்க்கப்பட்டது",
    aiPoweredAnalysis: "AI-இயங்கும் பகுப்பாய்வு",
    aiTranslationAssistant: "AI மொழிபெயர்ப்பு உதவியாளர்",
    translateMessage: "AI உதவியுடன் உங்கள் செய்தியை எந்த மொழியிலும் மொழிபெயர்க்கவும்",
    quickPhrases: "விரைவு சொற்றொடர்கள்",
    translateTo: "இதற்கு மொழிபெயர்க்கவும்",
    translate: "மொழிபெயர்க்கவும்",
    translating: "மொழிபெயர்க்கிறது...",
    translation: "மொழிபெயர்ப்பு",
    useTranslation: "இந்த மொழிபெயர்ப்பைப் பயன்படுத்தவும்",
  },
  government: {
    liveData: "நேரடி அரசாங்க தரவு",
    dataSync: "தரவு ஒத்திசைவு",
    lastSync: "கடைசி ஒத்திசைவு",
    tenderPortal: "டெண்டர் போர்ட்டல்",
    gemPortal: "GeM போர்ட்டல்",
    pfmsData: "PFMS தரவு",
    budgetUtilization: "பட்ஜெட் பயன்பாடு",
    ongoingProjects: "நடந்துகொண்டிருக்கும் திட்டங்கள்",
    governmentDataIntegration: "அரசாங்க தரவு ஒருங்கிணைப்பு",
    realTimeData: "அதிகாரப்பூர்வ டெண்டர் போர்ட்டல்கள் மற்றும் மின்-கொள்முதல் அமைப்புகளிலிருந்து நிகழ்நேர தரவு",
    liveTenders: "நேரடி டெண்டர்கள்",
    projectProgress: "திட்ட முன்னேற்றம்",
    eProcurement: "மின்-கொள்முதல்",
    dataAnalytics: "தரவு பகுப்பாய்வு",
  },
  actions: {
    submit: "சமர்ப்பிக்கவும்",
    cancel: "ரத்து செய்யவும்",
    save: "சேமிக்கவும்",
    edit: "திருத்தவும்",
    delete: "நீக்கவும்",
    view: "பார்க்கவும்",
    download: "பதிவிறக்கவும்",
    share: "பகிரவும்",
    filter: "வடிகட்டவும்",
    search: "தேடவும்",
    refresh: "புதுப்பிக்கவும்",
    sync: "ஒத்திசைக்கவும்",
    apply: "விண்ணப்பிக்கவும்",
    back: "பின்னால்",
    next: "அடுத்து",
    continue: "தொடரவும்",
  },
  status: {
    pending: "நிலுவையில்",
    inProgress: "முன்னேற்றத்தில்",
    resolved: "தீர்க்கப்பட்டது",
    completed: "முடிந்தது",
    delayed: "தாமதமானது",
    cancelled: "ரத்து செய்யப்பட்டது",
    assigned: "ஒதுக்கப்பட்டது",
    verified: "சரிபார்க்கப்பட்டது",
  },
  categories: {
    roads: "சாலைகள் மற்றும் போக்குவரத்து",
    water: "நீர் வழங்கல்",
    electricity: "மின்சாரம்",
    sanitation: "சுகாதாரம்",
    healthcare: "சுகாதார சேவை",
    education: "கல்வி",
    parks: "பூங்காக்கள் மற்றும் பொழுதுபோக்கு",
    other: "மற்றவை",
  },
  time: {
    today: "இன்று",
    yesterday: "நேற்று",
    thisWeek: "இந்த வாரம்",
    thisMonth: "இந்த மாதம்",
    ago: "முன்பு",
    hours: "மணிநேரங்கள்",
    days: "நாட்கள்",
    weeks: "வாரங்கள்",
    months: "மாதங்கள்",
    justNow: "இப்போதே",
  },
  ui: {
    loading: "ஏற்றுகிறது...",
    error: "பிழை",
    success: "வெற்றி",
    warning: "எச்சரிக்கை",
    info: "தகவல்",
    close: "மூடவும்",
    open: "திறக்கவும்",
    menu: "மெனு",
    settings: "அமைப்புகள்",
    profile: "சுயவிவரம்",
    logout: "வெளியேறவும்",
    language: "மொழி",
    chooseLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
  },
}

// Translation storage
export const translations: Record<SupportedLanguage, TranslationKeys> = {
  en: enTranslations,
  hi: hiTranslations,
  ta: taTranslations,
}

// Translation helper function
export const getTranslation = (lang: SupportedLanguage): TranslationKeys => {
  return translations[lang] || translations[defaultLanguage]
}
