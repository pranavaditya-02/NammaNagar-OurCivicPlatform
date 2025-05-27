// Comprehensive Leaderboard and Gamification System
export interface UserRanking {
  userId: string
  username: string
  displayName: string
  avatar?: string
  location: string
  rank: number
  previousRank?: number
  score: number
  level: UserLevel
  badges: Badge[]
  statistics: UserStatistics
  recentActivity: RecentActivity[]
  achievements: Achievement[]
}

export interface UserLevel {
  id: string
  name: string
  icon: string
  minScore: number
  maxScore: number
  color: string
  benefits: string[]
  nextLevel?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: "reporting" | "verification" | "community" | "leadership" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
  earnedDate: Date
  criteria: string
}

export interface UserStatistics {
  totalReports: number
  verifiedReports: number
  issuesResolved: number
  verificationsCompleted: number
  verificationAccuracy: number
  communityContributions: number
  daysActive: number
  averageResponseTime: number
  impactScore: number
  reliabilityScore: number
}

export interface RecentActivity {
  id: string
  type: "report" | "verification" | "achievement" | "community"
  title: string
  description: string
  date: Date
  points: number
  icon: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: string
  earnedDate: Date
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
}

export interface LeaderboardCategory {
  id: string
  name: string
  description: string
  icon: string
  timeframe: "weekly" | "monthly" | "yearly" | "all_time"
  rankingCriteria: string
  users: UserRanking[]
}

// User Levels Configuration
export const userLevels: UserLevel[] = [
  {
    id: "newcomer",
    name: "Civic Newcomer",
    icon: "🌱",
    minScore: 0,
    maxScore: 99,
    color: "text-green-600",
    benefits: ["Basic reporting", "Community access"],
    nextLevel: "engaged",
  },
  {
    id: "engaged",
    name: "Engaged Citizen",
    icon: "👤",
    minScore: 100,
    maxScore: 499,
    color: "text-blue-600",
    benefits: ["Report verification", "Community discussions", "Basic analytics"],
    nextLevel: "contributor",
  },
  {
    id: "contributor",
    name: "Active Contributor",
    icon: "🤝",
    minScore: 500,
    maxScore: 999,
    color: "text-purple-600",
    benefits: ["Advanced reporting", "Community moderation", "Priority support"],
    nextLevel: "expert",
  },
  {
    id: "expert",
    name: "Infrastructure Expert",
    icon: "⭐",
    minScore: 1000,
    maxScore: 2499,
    color: "text-orange-600",
    benefits: ["Expert verification", "Community leadership", "Government liaison"],
    nextLevel: "champion",
  },
  {
    id: "champion",
    name: "Civic Champion",
    icon: "🏆",
    minScore: 2500,
    maxScore: 4999,
    color: "text-yellow-600",
    benefits: ["All features", "Policy consultation", "Mentorship privileges"],
    nextLevel: "guardian",
  },
  {
    id: "guardian",
    name: "Democracy Guardian",
    icon: "🏛️",
    minScore: 5000,
    maxScore: 999999,
    color: "text-red-600",
    benefits: ["Platform governance", "Strategic partnerships", "Exclusive events"],
  },
]

// Sample Leaderboard Data
export const leaderboardCategories: LeaderboardCategory[] = [
  {
    id: "overall",
    name: "Overall Champions",
    description: "Top contributors across all categories and timeframes",
    icon: "🏆",
    timeframe: "all_time",
    rankingCriteria: "Total contribution score",
    users: [
      {
        userId: "user_001",
        username: "InfraHero2024",
        displayName: "Rajesh Kumar",
        avatar: "/avatars/user_001.jpg",
        location: "Koramangala, Bengaluru",
        rank: 1,
        previousRank: 1,
        score: 4850,
        level: userLevels[4], // Civic Champion
        badges: [
          {
            id: "founder_badge",
            name: "Platform Founder",
            description: "Among the first 100 users to join NammaNagar",
            icon: "🌟",
            category: "special",
            rarity: "legendary",
            earnedDate: new Date("2023-08-15"),
            criteria: "Join within first 100 users",
          },
          {
            id: "report_master",
            name: "Report Master",
            description: "Submitted 100+ verified infrastructure reports",
            icon: "📊",
            category: "reporting",
            rarity: "epic",
            earnedDate: new Date("2023-12-10"),
            criteria: "Submit 100+ verified reports",
          },
          {
            id: "community_leader",
            name: "Community Leader",
            description: "Led and organized 10+ community initiatives",
            icon: "👑",
            category: "leadership",
            rarity: "epic",
            earnedDate: new Date("2024-01-05"),
            criteria: "Lead 10+ community initiatives",
          },
        ],
        statistics: {
          totalReports: 245,
          verifiedReports: 238,
          issuesResolved: 189,
          verificationsCompleted: 456,
          verificationAccuracy: 97.2,
          communityContributions: 89,
          daysActive: 156,
          averageResponseTime: 2.4,
          impactScore: 94.5,
          reliabilityScore: 96.8,
        },
        recentActivity: [
          {
            id: "activity_001",
            type: "achievement",
            title: "Community Leader Badge Earned",
            description: "Led 10th community initiative",
            date: new Date("2024-01-05"),
            points: 500,
            icon: "👑",
          },
          {
            id: "activity_002",
            type: "report",
            title: "Pothole Reported",
            description: "Major pothole on Koramangala 5th Block",
            date: new Date("2024-01-04"),
            points: 50,
            icon: "🕳️",
          },
        ],
        achievements: [
          {
            id: "ach_001",
            title: "First Report",
            description: "Submitted your first infrastructure report",
            icon: "🎯",
            category: "milestone",
            earnedDate: new Date("2023-08-16"),
            rarity: "common",
            points: 50,
          },
          {
            id: "ach_002",
            title: "Verification Expert",
            description: "Achieved 95%+ verification accuracy",
            icon: "✅",
            category: "verification",
            earnedDate: new Date("2023-11-20"),
            rarity: "rare",
            points: 200,
          },
        ],
      },
      {
        userId: "user_002",
        username: "CivicChampion",
        displayName: "Priya Sharma",
        avatar: "/avatars/user_002.jpg",
        location: "HSR Layout, Bengaluru",
        rank: 2,
        previousRank: 3,
        score: 4210,
        level: userLevels[4], // Civic Champion
        badges: [
          {
            id: "water_warrior",
            name: "Water Warrior",
            description: "Specialized in water infrastructure issues",
            icon: "💧",
            category: "reporting",
            rarity: "rare",
            earnedDate: new Date("2023-10-15"),
            criteria: "Report 50+ water-related issues",
          },
          {
            id: "rapid_responder",
            name: "Rapid Responder",
            description: "Consistently fast response times",
            icon: "⚡",
            category: "verification",
            rarity: "rare",
            earnedDate: new Date("2023-12-01"),
            criteria: "Maintain <2 hour average response time",
          },
        ],
        statistics: {
          totalReports: 198,
          verifiedReports: 192,
          issuesResolved: 156,
          verificationsCompleted: 378,
          verificationAccuracy: 94.8,
          communityContributions: 67,
          daysActive: 134,
          averageResponseTime: 1.8,
          impactScore: 91.2,
          reliabilityScore: 93.5,
        },
        recentActivity: [],
        achievements: [],
      },
      {
        userId: "user_003",
        username: "RoadGuardian",
        displayName: "Suresh Reddy",
        avatar: "/avatars/user_003.jpg",
        location: "Indiranagar, Bengaluru",
        rank: 3,
        previousRank: 2,
        score: 3890,
        level: userLevels[3], // Infrastructure Expert
        badges: [
          {
            id: "road_specialist",
            name: "Road Specialist",
            description: "Expert in road infrastructure issues",
            icon: "🛣️",
            category: "reporting",
            rarity: "rare",
            earnedDate: new Date("2023-11-10"),
            criteria: "Report 75+ road-related issues",
          },
        ],
        statistics: {
          totalReports: 167,
          verifiedReports: 161,
          issuesResolved: 134,
          verificationsCompleted: 298,
          verificationAccuracy: 92.1,
          communityContributions: 45,
          daysActive: 112,
          averageResponseTime: 3.2,
          impactScore: 87.8,
          reliabilityScore: 90.3,
        },
        recentActivity: [],
        achievements: [],
      },
    ],
  },
  {
    id: "monthly",
    name: "This Month's Stars",
    description: "Top performers for the current month",
    icon: "📅",
    timeframe: "monthly",
    rankingCriteria: "Monthly contribution score",
    users: [], // Would be populated with current month's data
  },
  {
    id: "ward_champions",
    name: "Ward Champions",
    description: "Leading contributors from each ward",
    icon: "🏘️",
    timeframe: "all_time",
    rankingCriteria: "Ward-wise contribution score",
    users: [], // Would be populated with ward-specific data
  },
  {
    id: "verification_heroes",
    name: "Verification Heroes",
    description: "Most accurate and helpful verifiers",
    icon: "✅",
    timeframe: "all_time",
    rankingCriteria: "Verification accuracy and volume",
    users: [], // Would be populated with verification-specific data
  },
]

// Leaderboard Functions
export function getUserLevel(score: number): UserLevel {
  return userLevels.find((level) => score >= level.minScore && score <= level.maxScore) || userLevels[0]
}

export function calculateUserScore(statistics: UserStatistics): number {
  const reportScore = statistics.totalReports * 20
  const verificationScore = statistics.verificationsCompleted * 5
  const accuracyBonus = statistics.verificationAccuracy > 90 ? statistics.verificationAccuracy * 2 : 0
  const resolutionBonus = statistics.issuesResolved * 25
  const communityBonus = statistics.communityContributions * 15
  const reliabilityBonus = statistics.reliabilityScore > 85 ? statistics.reliabilityScore * 3 : 0

  return Math.round(
    reportScore + verificationScore + accuracyBonus + resolutionBonus + communityBonus + reliabilityBonus,
  )
}

export function generateMonthlyLeaderboard(): UserRanking[] {
  // Simulate monthly leaderboard generation
  const monthlyScores = [
    { userId: "user_001", monthlyScore: 850 },
    { userId: "user_002", monthlyScore: 720 },
    { userId: "user_003", monthlyScore: 680 },
    { userId: "user_004", monthlyScore: 540 },
    { userId: "user_005", monthlyScore: 420 },
  ]

  return monthlyScores.map((entry, index) => ({
    userId: entry.userId,
    username: `User${entry.userId.slice(-3)}`,
    displayName: `Monthly Star ${index + 1}`,
    location: "Bengaluru",
    rank: index + 1,
    score: entry.monthlyScore,
    level: getUserLevel(entry.monthlyScore),
    badges: [],
    statistics: {
      totalReports: Math.floor(entry.monthlyScore / 20),
      verifiedReports: Math.floor(entry.monthlyScore / 22),
      issuesResolved: Math.floor(entry.monthlyScore / 30),
      verificationsCompleted: Math.floor(entry.monthlyScore / 8),
      verificationAccuracy: 85 + Math.random() * 10,
      communityContributions: Math.floor(entry.monthlyScore / 50),
      daysActive: 20 + Math.floor(Math.random() * 10),
      averageResponseTime: 1 + Math.random() * 4,
      impactScore: 70 + Math.random() * 25,
      reliabilityScore: 80 + Math.random() * 15,
    },
    recentActivity: [],
    achievements: [],
  }))
}

export function getWardLeaderboard(wardId: string): UserRanking[] {
  // Simulate ward-specific leaderboard
  return leaderboardCategories[0].users.filter((user) => user.location.includes("Bengaluru")).slice(0, 10)
}

export function calculateRankingChange(
  userId: string,
  category: string,
): {
  currentRank: number
  previousRank: number
  change: number
  changeType: "up" | "down" | "same"
} {
  const leaderboard = leaderboardCategories.find((cat) => cat.id === category)
  const user = leaderboard?.users.find((u) => u.userId === userId)

  if (!user) {
    return {
      currentRank: 0,
      previousRank: 0,
      change: 0,
      changeType: "same",
    }
  }

  const change = (user.previousRank || user.rank) - user.rank
  const changeType = change > 0 ? "up" : change < 0 ? "down" : "same"

  return {
    currentRank: user.rank,
    previousRank: user.previousRank || user.rank,
    change: Math.abs(change),
    changeType,
  }
}

export function awardBadge(userId: string, badgeId: string): Badge | null {
  const badgeDefinitions: Record<string, Omit<Badge, "earnedDate">> = {
    first_report: {
      id: "first_report",
      name: "First Reporter",
      description: "Submitted your first infrastructure report",
      icon: "🎯",
      category: "reporting",
      rarity: "common",
      criteria: "Submit first report",
    },
    verification_expert: {
      id: "verification_expert",
      name: "Verification Expert",
      description: "Achieved 95%+ verification accuracy",
      icon: "✅",
      category: "verification",
      rarity: "rare",
      criteria: "Maintain 95%+ verification accuracy over 50+ verifications",
    },
    community_builder: {
      id: "community_builder",
      name: "Community Builder",
      description: "Helped grow community participation",
      icon: "🏗️",
      category: "community",
      rarity: "epic",
      criteria: "Recruit 25+ active community members",
    },
    speed_demon: {
      id: "speed_demon",
      name: "Speed Demon",
      description: "Lightning-fast response times",
      icon: "⚡",
      category: "verification",
      rarity: "rare",
      criteria: "Maintain <1 hour average response time",
    },
    issue_resolver: {
      id: "issue_resolver",
      name: "Issue Resolver",
      description: "High success rate in getting issues resolved",
      icon: "🔧",
      category: "reporting",
      rarity: "epic",
      criteria: "Achieve 80%+ resolution rate on 100+ reports",
    },
  }

  const badgeDefinition = badgeDefinitions[badgeId]
  if (!badgeDefinition) return null

  return {
    ...badgeDefinition,
    earnedDate: new Date(),
  }
}

export function getEligibleBadges(statistics: UserStatistics): string[] {
  const eligible: string[] = []

  if (statistics.totalReports >= 1 && !statistics.totalReports) {
    eligible.push("first_report")
  }

  if (statistics.verificationAccuracy >= 95 && statistics.verificationsCompleted >= 50) {
    eligible.push("verification_expert")
  }

  if (statistics.averageResponseTime <= 1 && statistics.verificationsCompleted >= 100) {
    eligible.push("speed_demon")
  }

  if (statistics.issuesResolved >= 100 && statistics.issuesResolved / statistics.totalReports >= 0.8) {
    eligible.push("issue_resolver")
  }

  if (statistics.communityContributions >= 25) {
    eligible.push("community_builder")
  }

  return eligible
}

export function generateUserInsights(userId: string): {
  strengthAreas: string[]
  improvementAreas: string[]
  recommendedActions: string[]
  nextMilestones: { title: string; progress: number; target: number }[]
} {
  const user = leaderboardCategories[0].users.find((u) => u.userId === userId)
  if (!user) throw new Error("User not found")

  const stats = user.statistics

  const strengthAreas: string[] = []
  const improvementAreas: string[] = []
  const recommendedActions: string[] = []

  // Analyze strengths
  if (stats.verificationAccuracy > 90) strengthAreas.push("High verification accuracy")
  if (stats.averageResponseTime < 3) strengthAreas.push("Quick response time")
  if (stats.reliabilityScore > 85) strengthAreas.push("Consistent reliability")
  if (stats.communityContributions > 50) strengthAreas.push("Strong community engagement")

  // Identify improvement areas
  if (stats.verificationAccuracy < 85) improvementAreas.push("Verification accuracy needs improvement")
  if (stats.averageResponseTime > 6) improvementAreas.push("Response time could be faster")
  if (stats.communityContributions < 20) improvementAreas.push("Limited community participation")
  if (stats.issuesResolved / stats.totalReports < 0.6) improvementAreas.push("Issue resolution rate")

  // Generate recommendations
  if (stats.totalReports < 50) recommendedActions.push("Submit more infrastructure reports")
  if (stats.verificationsCompleted < 100) recommendedActions.push("Help verify community reports")
  if (stats.communityContributions < 30) recommendedActions.push("Join local community circles")
  if (stats.verificationAccuracy < 90) recommendedActions.push("Take time to carefully verify reports")

  const nextMilestones = [
    {
      title: "Next Level",
      progress: user.score,
      target: user.level.nextLevel ? getUserLevel(user.level.maxScore + 1).minScore : user.score,
    },
    {
      title: "100 Verified Reports",
      progress: stats.verifiedReports,
      target: 100,
    },
    {
      title: "95% Accuracy",
      progress: Math.round(stats.verificationAccuracy),
      target: 95,
    },
    {
      title: "500 Verifications",
      progress: stats.verificationsCompleted,
      target: 500,
    },
  ]

  return {
    strengthAreas,
    improvementAreas,
    recommendedActions,
    nextMilestones,
  }
}
