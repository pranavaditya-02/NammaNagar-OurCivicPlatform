// Seasonal Campaigns System - Complete Implementation
export interface Campaign {
  id: string
  name: string
  description: string
  type: "seasonal" | "emergency" | "festival" | "awareness"
  season: "monsoon" | "winter" | "summer" | "year_round"
  startDate: Date
  endDate: Date
  status: "upcoming" | "active" | "completed" | "paused"
  targetMetrics: CampaignMetric[]
  activities: CampaignActivity[]
  rewards: CampaignReward[]
  participants: number
  reports: number
  hashtags: string[]
  impact: CampaignImpact
  organizer: {
    name: string
    type: "government" | "ngo" | "community" | "platform"
    contact: string
  }
  regions: string[]
  categories: string[]
}

export interface CampaignMetric {
  id: string
  name: string
  category: "reports" | "participation" | "resolution" | "awareness"
  current: number
  target: number
  unit: string
  description: string
}

export interface CampaignActivity {
  id: string
  title: string
  description: string
  type: "report" | "survey" | "photo" | "video" | "event" | "education"
  points: number
  requirements: string[]
  timeEstimate: number // in minutes
  difficulty: "easy" | "medium" | "hard"
  category: string
}

export interface CampaignReward {
  id: string
  title: string
  description: string
  type: "badge" | "certificate" | "points" | "recognition" | "prize"
  value: string
  criteria: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface CampaignImpact {
  issuesResolved: number
  budgetSaved: number
  citizensEngaged: number
  governmentActions: number
  mediaAttention: number
  policyChanges: number
}

export interface UserCampaignParticipation {
  campaignId: string
  userId: string
  joinDate: Date
  pointsEarned: number
  activitiesCompleted: string[]
  reportsSubmitted: number
  level: "bronze" | "silver" | "gold" | "platinum"
  rank: number
  achievements: string[]
  lastActivity: Date
}

// Sample Active Campaigns
export const activeCampaigns: Campaign[] = [
  {
    id: "monsoon-watch-2024",
    name: "Monsoon Watch 2024",
    description:
      "Comprehensive monsoon preparedness campaign focusing on drainage systems, flood prevention, and emergency response across Indian cities.",
    type: "seasonal",
    season: "monsoon",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-09-30"),
    status: "active",
    participants: 23456,
    reports: 18923,
    hashtags: ["#MonsoonWatch2024", "#DrainageFirst", "#FloodFreeIndia", "#CitizenAction"],
    regions: ["Bengaluru", "Mumbai", "Chennai", "Delhi", "Kolkata", "Hyderabad"],
    categories: ["drainage", "flooding", "infrastructure", "emergency"],
    targetMetrics: [
      {
        id: "drainage-reports",
        name: "Drainage Issues Reported",
        category: "reports",
        current: 15234,
        target: 25000,
        unit: "reports",
        description: "Blocked drains, poor drainage, and waterlogging issues",
      },
      {
        id: "flood-prevention",
        name: "Flood Prevention Actions",
        category: "resolution",
        current: 8945,
        target: 15000,
        unit: "actions taken",
        description: "Government actions taken based on citizen reports",
      },
      {
        id: "citizen-participation",
        name: "Active Participants",
        category: "participation",
        current: 23456,
        target: 50000,
        unit: "citizens",
        description: "Citizens actively participating in monsoon preparedness",
      },
      {
        id: "awareness-reach",
        name: "Awareness Reach",
        category: "awareness",
        current: 1200000,
        target: 2000000,
        unit: "people reached",
        description: "People reached through campaign messaging and activities",
      },
    ],
    activities: [
      {
        id: "drain-mapping",
        title: "Map Your Local Drains",
        description: "Identify and photograph all drains in your area, noting their condition and any blockages",
        type: "photo",
        points: 50,
        requirements: ["Take clear photos", "Add GPS location", "Describe current condition"],
        timeEstimate: 30,
        difficulty: "easy",
        category: "mapping",
      },
      {
        id: "blockage-reporting",
        title: "Report Drain Blockages",
        description: "Report blocked or damaged drains that could cause flooding during monsoons",
        type: "report",
        points: 75,
        requirements: ["Photo evidence", "Exact location", "Severity assessment"],
        timeEstimate: 15,
        difficulty: "easy",
        category: "reporting",
      },
      {
        id: "community-cleanup",
        title: "Organize Community Drain Cleanup",
        description: "Coordinate with neighbors to clean local drains and remove debris",
        type: "event",
        points: 200,
        requirements: ["Minimum 5 participants", "Before/after photos", "Safety measures"],
        timeEstimate: 120,
        difficulty: "medium",
        category: "action",
      },
      {
        id: "flood-preparedness-survey",
        title: "Flood Preparedness Assessment",
        description: "Survey your area's flood preparedness and emergency response capabilities",
        type: "survey",
        points: 100,
        requirements: ["Complete detailed survey", "Interview local officials", "Submit recommendations"],
        timeEstimate: 60,
        difficulty: "medium",
        category: "assessment",
      },
      {
        id: "monsoon-education",
        title: "Monsoon Safety Education",
        description: "Educate community members about monsoon safety and flood prevention",
        type: "education",
        points: 150,
        requirements: ["Conduct awareness session", "Minimum 10 attendees", "Share educational materials"],
        timeEstimate: 90,
        difficulty: "hard",
        category: "education",
      },
    ],
    rewards: [
      {
        id: "monsoon-hero",
        title: "Monsoon Hero",
        description: "Awarded to top contributors in monsoon preparedness activities",
        type: "badge",
        value: "500 points + Certificate",
        criteria: "Complete 10+ activities and help resolve 5+ drainage issues",
        rarity: "epic",
      },
      {
        id: "flood-fighter",
        title: "Flood Fighter",
        description: "Recognition for exceptional flood prevention efforts",
        type: "certificate",
        value: "Government Recognition Certificate",
        criteria: "Lead community initiatives and achieve measurable impact",
        rarity: "legendary",
      },
      {
        id: "drain-detective",
        title: "Drain Detective",
        description: "Expert in identifying and reporting drainage issues",
        type: "badge",
        value: "200 points",
        criteria: "Successfully report and help resolve 20+ drainage issues",
        rarity: "rare",
      },
    ],
    impact: {
      issuesResolved: 8945,
      budgetSaved: 45000000, // 4.5 crores
      citizensEngaged: 23456,
      governmentActions: 156,
      mediaAttention: 89,
      policyChanges: 12,
    },
    organizer: {
      name: "Ministry of Housing and Urban Affairs",
      type: "government",
      contact: "monsoonwatch@mhua.gov.in",
    },
  },
  {
    id: "exam-ready-schools-2024",
    name: "Exam Ready Schools 2024",
    description:
      "Ensuring all government schools are properly equipped and maintained for the upcoming academic year and board examinations.",
    type: "seasonal",
    season: "winter",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-31"),
    status: "active",
    participants: 15678,
    reports: 12456,
    hashtags: ["#ExamReadySchools", "#EducationFirst", "#SchoolInfrastructure", "#StudentSuccess"],
    regions: ["All States"],
    categories: ["education", "infrastructure", "student_welfare"],
    targetMetrics: [
      {
        id: "school-assessments",
        name: "School Infrastructure Assessments",
        category: "reports",
        current: 8234,
        target: 15000,
        unit: "schools assessed",
        description: "Comprehensive infrastructure and facility assessments",
      },
      {
        id: "issues-resolved",
        name: "Infrastructure Issues Resolved",
        category: "resolution",
        current: 5678,
        target: 10000,
        unit: "issues fixed",
        description: "Infrastructure problems identified and resolved",
      },
      {
        id: "student-impact",
        name: "Students Benefited",
        category: "participation",
        current: 234567,
        target: 500000,
        unit: "students",
        description: "Students benefiting from improved school infrastructure",
      },
    ],
    activities: [
      {
        id: "school-infrastructure-audit",
        title: "School Infrastructure Audit",
        description: "Comprehensive assessment of school buildings, classrooms, and facilities",
        type: "survey",
        points: 100,
        requirements: ["Visit assigned school", "Complete detailed checklist", "Photo documentation"],
        timeEstimate: 90,
        difficulty: "medium",
        category: "assessment",
      },
      {
        id: "classroom-condition-report",
        title: "Classroom Condition Report",
        description: "Detailed reporting on classroom infrastructure, furniture, and learning environment",
        type: "report",
        points: 75,
        requirements: ["Room-by-room assessment", "Photo evidence", "Priority ranking"],
        timeEstimate: 45,
        difficulty: "easy",
        category: "reporting",
      },
      {
        id: "sanitation-facility-check",
        title: "Sanitation Facility Assessment",
        description: "Evaluate toilet facilities, water supply, and hygiene infrastructure",
        type: "survey",
        points: 80,
        requirements: ["Facility inspection", "Water quality check", "Accessibility assessment"],
        timeEstimate: 30,
        difficulty: "easy",
        category: "health",
      },
      {
        id: "learning-resource-inventory",
        title: "Learning Resources Inventory",
        description: "Catalog available books, teaching materials, and educational resources",
        type: "survey",
        points: 60,
        requirements: ["Complete inventory", "Condition assessment", "Gap analysis"],
        timeEstimate: 60,
        difficulty: "medium",
        category: "education",
      },
    ],
    rewards: [
      {
        id: "education-champion",
        title: "Education Champion",
        description: "Dedicated advocate for quality education infrastructure",
        type: "certificate",
        value: "Ministry of Education Recognition",
        criteria: "Complete assessments for 10+ schools and drive measurable improvements",
        rarity: "epic",
      },
      {
        id: "school-guardian",
        title: "School Guardian",
        description: "Protector of student learning environments",
        type: "badge",
        value: "300 points",
        criteria: "Help resolve critical infrastructure issues in 5+ schools",
        rarity: "rare",
      },
    ],
    impact: {
      issuesResolved: 5678,
      budgetSaved: 28000000, // 2.8 crores
      citizensEngaged: 15678,
      governmentActions: 234,
      mediaAttention: 67,
      policyChanges: 8,
    },
    organizer: {
      name: "Ministry of Education",
      type: "government",
      contact: "examready@education.gov.in",
    },
  },
  {
    id: "toilet-truth-tracker-2024",
    name: "Toilet Truth Tracker 2024",
    description:
      "Comprehensive mapping and quality assessment of public toilet facilities to ensure dignity and accessibility for all citizens.",
    type: "awareness",
    season: "year_round",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    status: "active",
    participants: 19234,
    reports: 34567,
    hashtags: ["#ToiletTruthTracker", "#SanitationForAll", "#DignityCampaign", "#CleanIndia"],
    regions: ["All Urban Areas"],
    categories: ["sanitation", "public_health", "accessibility", "dignity"],
    targetMetrics: [
      {
        id: "toilet-mapping",
        name: "Public Toilets Mapped",
        category: "reports",
        current: 28456,
        target: 50000,
        unit: "facilities",
        description: "Public toilet facilities identified and documented",
      },
      {
        id: "quality-assessments",
        name: "Quality Assessments Completed",
        category: "reports",
        current: 19234,
        target: 35000,
        unit: "assessments",
        description: "Detailed quality and accessibility assessments",
      },
      {
        id: "improvements-made",
        name: "Facility Improvements",
        category: "resolution",
        current: 3456,
        target: 8000,
        unit: "improvements",
        description: "Documented improvements in toilet facilities",
      },
    ],
    activities: [
      {
        id: "toilet-location-mapping",
        title: "Map Public Toilet Locations",
        description: "Identify and GPS-map all public toilet facilities in your area",
        type: "photo",
        points: 40,
        requirements: ["GPS coordinates", "Exterior photo", "Operating hours"],
        timeEstimate: 20,
        difficulty: "easy",
        category: "mapping",
      },
      {
        id: "facility-quality-assessment",
        title: "Toilet Quality Assessment",
        description: "Comprehensive evaluation of cleanliness, functionality, and accessibility",
        type: "survey",
        points: 80,
        requirements: ["Complete quality checklist", "Photo documentation", "Accessibility audit"],
        timeEstimate: 30,
        difficulty: "medium",
        category: "assessment",
      },
      {
        id: "accessibility-audit",
        title: "Accessibility Audit",
        description: "Evaluate facilities for differently-abled access and women's safety",
        type: "survey",
        points: 100,
        requirements: ["Accessibility checklist", "Safety assessment", "Recommendations"],
        timeEstimate: 45,
        difficulty: "medium",
        category: "accessibility",
      },
      {
        id: "maintenance-tracking",
        title: "Maintenance Status Tracking",
        description: "Monitor and report on maintenance schedules and facility upkeep",
        type: "report",
        points: 60,
        requirements: ["Maintenance log review", "Staff interview", "Condition report"],
        timeEstimate: 25,
        difficulty: "easy",
        category: "maintenance",
      },
    ],
    rewards: [
      {
        id: "sanitation-sentinel",
        title: "Sanitation Sentinel",
        description: "Guardian of public sanitation standards",
        type: "badge",
        value: "400 points + Certificate",
        criteria: "Complete quality assessments for 50+ facilities",
        rarity: "epic",
      },
      {
        id: "dignity-defender",
        title: "Dignity Defender",
        description: "Champion of accessible and dignified sanitation",
        type: "certificate",
        value: "Government Recognition",
        criteria: "Drive improvements in 10+ facilities and advocate for policy changes",
        rarity: "legendary",
      },
    ],
    impact: {
      issuesResolved: 3456,
      budgetSaved: 15000000, // 1.5 crores
      citizensEngaged: 19234,
      governmentActions: 89,
      mediaAttention: 45,
      policyChanges: 6,
    },
    organizer: {
      name: "Swachh Bharat Mission",
      type: "government",
      contact: "toilettruth@swachhbharat.gov.in",
    },
  },
]

// Helper Functions
export function getCampaignsByStatus(status: string): Campaign[] {
  if (status === "all") return activeCampaigns
  return activeCampaigns.filter((campaign) => campaign.status === status)
}

export function getCampaignsBySeason(season: string): Campaign[] {
  if (season === "all") return activeCampaigns
  return activeCampaigns.filter((campaign) => campaign.season === season)
}

export function calculateCampaignProgress(campaign: Campaign): number {
  const totalProgress = campaign.targetMetrics.reduce((sum, metric) => {
    return sum + (metric.current / metric.target) * 100
  }, 0)
  return Math.round(totalProgress / campaign.targetMetrics.length)
}

export function getUserCampaignLevel(pointsEarned: number): "bronze" | "silver" | "gold" | "platinum" {
  if (pointsEarned >= 1000) return "platinum"
  if (pointsEarned >= 500) return "gold"
  if (pointsEarned >= 200) return "silver"
  return "bronze"
}

export function getSeasonalCampaigns(): Campaign[] {
  const currentMonth = new Date().getMonth()
  let currentSeason: string

  if (currentMonth >= 5 && currentMonth <= 8) {
    currentSeason = "monsoon"
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    currentSeason = "winter"
  } else if (currentMonth >= 2 && currentMonth <= 4) {
    currentSeason = "summer"
  } else {
    currentSeason = "winter"
  }

  return activeCampaigns.filter((campaign) => campaign.season === currentSeason || campaign.season === "year_round")
}

export function getCampaignImpactSummary(): {
  totalIssuesResolved: number
  totalBudgetSaved: number
  totalCitizensEngaged: number
  totalGovernmentActions: number
} {
  return activeCampaigns.reduce(
    (summary, campaign) => ({
      totalIssuesResolved: summary.totalIssuesResolved + campaign.impact.issuesResolved,
      totalBudgetSaved: summary.totalBudgetSaved + campaign.impact.budgetSaved,
      totalCitizensEngaged: summary.totalCitizensEngaged + campaign.impact.citizensEngaged,
      totalGovernmentActions: summary.totalGovernmentActions + campaign.impact.governmentActions,
    }),
    {
      totalIssuesResolved: 0,
      totalBudgetSaved: 0,
      totalCitizensEngaged: 0,
      totalGovernmentActions: 0,
    },
  )
}
