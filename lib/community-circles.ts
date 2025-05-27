// Community Infrastructure Circles System
export interface CommunityCircle {
  id: string
  name: string
  description: string
  location: {
    area: string
    ward: string
    coordinates: { lat: number; lng: number }
    radius: number // in meters
  }
  category: "infrastructure" | "environment" | "safety" | "education" | "health" | "general"
  createdBy: string
  createdDate: Date
  members: CircleMember[]
  moderators: string[]
  status: "active" | "inactive" | "suspended"
  rules: string[]
  activities: CircleActivity[]
  challenges: WeeklyChallenge[]
  achievements: CircleAchievement[]
  statistics: CircleStats
}

export interface CircleMember {
  userId: string
  username: string
  joinDate: Date
  role: "member" | "moderator" | "admin"
  contributionScore: number
  badges: string[]
  reportsSubmitted: number
  verificationsCompleted: number
  lastActive: Date
  status: "active" | "inactive"
}

export interface CircleActivity {
  id: string
  type: "report" | "verification" | "discussion" | "challenge" | "event" | "meeting"
  title: string
  description: string
  createdBy: string
  createdDate: Date
  participants: string[]
  status: "active" | "completed" | "cancelled"
  results?: any
  points: number
}

export interface WeeklyChallenge {
  id: string
  title: string
  description: string
  category: string
  startDate: Date
  endDate: Date
  targetMetric: string
  targetValue: number
  currentValue: number
  participants: ChallengeParticipant[]
  rewards: ChallengeReward[]
  status: "upcoming" | "active" | "completed"
}

export interface ChallengeParticipant {
  userId: string
  username: string
  contribution: number
  rank: number
  completionDate?: Date
}

export interface ChallengeReward {
  type: "points" | "badge" | "certificate" | "recognition"
  value: string
  criteria: string
  recipients: string[]
}

export interface CircleAchievement {
  id: string
  title: string
  description: string
  icon: string
  category: string
  criteria: string
  unlockedDate: Date
  unlockedBy: string[]
}

export interface CircleStats {
  totalMembers: number
  activeMembers: number
  reportsSubmitted: number
  issuesResolved: number
  verificationAccuracy: number
  engagementScore: number
  impactScore: number
  averageResponseTime: number
}

// Sample Community Circles
export const communityCircles: CommunityCircle[] = [
  {
    id: "koramangala-watchdogs",
    name: "Koramangala Infrastructure Watchdogs",
    description: "Dedicated community monitoring infrastructure issues in Koramangala area",
    location: {
      area: "Koramangala",
      ward: "Ward 68",
      coordinates: { lat: 12.9352, lng: 77.6245 },
      radius: 2000,
    },
    category: "infrastructure",
    createdBy: "user_001",
    createdDate: new Date("2023-08-15"),
    members: [
      {
        userId: "user_001",
        username: "RajeshK_Infra",
        joinDate: new Date("2023-08-15"),
        role: "admin",
        contributionScore: 2450,
        badges: ["founder", "infrastructure_expert", "community_leader"],
        reportsSubmitted: 156,
        verificationsCompleted: 89,
        lastActive: new Date("2024-01-15"),
        status: "active",
      },
      {
        userId: "user_002",
        username: "PriyaWatch",
        joinDate: new Date("2023-08-20"),
        role: "moderator",
        contributionScore: 1890,
        badges: ["early_adopter", "road_specialist", "mentor"],
        reportsSubmitted: 98,
        verificationsCompleted: 134,
        lastActive: new Date("2024-01-14"),
        status: "active",
      },
      {
        userId: "user_003",
        username: "CitizenSarah",
        joinDate: new Date("2023-09-01"),
        role: "member",
        contributionScore: 1245,
        badges: ["active_reporter", "verification_hero"],
        reportsSubmitted: 67,
        verificationsCompleted: 45,
        lastActive: new Date("2024-01-13"),
        status: "active",
      },
    ],
    moderators: ["user_001", "user_002"],
    status: "active",
    rules: [
      "Be respectful and constructive in all interactions",
      "Verify information before sharing or reporting",
      "Focus on infrastructure and civic issues within the area",
      "No spam, promotional content, or off-topic discussions",
      "Maintain confidentiality of sensitive information",
      "Support fellow members and collaborate effectively",
    ],
    activities: [
      {
        id: "activity_001",
        type: "challenge",
        title: "Weekly Pothole Patrol",
        description: "Identify and report all potholes in assigned sectors",
        createdBy: "user_001",
        createdDate: new Date("2024-01-08"),
        participants: ["user_001", "user_002", "user_003"],
        status: "active",
        points: 100,
      },
    ],
    challenges: [
      {
        id: "challenge_001",
        title: "January Infrastructure Audit",
        description: "Complete comprehensive infrastructure audit of Koramangala 5th Block",
        category: "infrastructure",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
        targetMetric: "issues_reported",
        targetValue: 50,
        currentValue: 34,
        participants: [
          {
            userId: "user_001",
            username: "RajeshK_Infra",
            contribution: 15,
            rank: 1,
          },
          {
            userId: "user_002",
            username: "PriyaWatch",
            contribution: 12,
            rank: 2,
          },
          {
            userId: "user_003",
            username: "CitizenSarah",
            contribution: 7,
            rank: 3,
          },
        ],
        rewards: [
          {
            type: "badge",
            value: "Infrastructure Auditor 2024",
            criteria: "Complete 15+ verified reports",
            recipients: ["user_001"],
          },
        ],
        status: "active",
      },
    ],
    achievements: [
      {
        id: "achievement_001",
        title: "First 100 Reports",
        description: "Circle reached 100 verified infrastructure reports",
        icon: "🏆",
        category: "milestone",
        criteria: "Submit and verify 100 infrastructure reports",
        unlockedDate: new Date("2023-12-15"),
        unlockedBy: ["user_001", "user_002", "user_003"],
      },
    ],
    statistics: {
      totalMembers: 3,
      activeMembers: 3,
      reportsSubmitted: 321,
      issuesResolved: 234,
      verificationAccuracy: 94.5,
      engagementScore: 8.7,
      impactScore: 9.2,
      averageResponseTime: 4.2,
    },
  },
  {
    id: "hsr-green-guardians",
    name: "HSR Layout Green Guardians",
    description: "Environmental and infrastructure monitoring for HSR Layout with focus on parks and green spaces",
    location: {
      area: "HSR Layout",
      ward: "Ward 185",
      coordinates: { lat: 12.9116, lng: 77.6473 },
      radius: 3000,
    },
    category: "environment",
    createdBy: "user_004",
    createdDate: new Date("2023-09-10"),
    members: [
      {
        userId: "user_004",
        username: "EcoWarriorAnja",
        joinDate: new Date("2023-09-10"),
        role: "admin",
        contributionScore: 2100,
        badges: ["eco_champion", "park_protector", "green_leader"],
        reportsSubmitted: 89,
        verificationsCompleted: 156,
        lastActive: new Date("2024-01-15"),
        status: "active",
      },
      {
        userId: "user_005",
        username: "TreeHuggerRavi",
        joinDate: new Date("2023-09-15"),
        role: "moderator",
        contributionScore: 1567,
        badges: ["tree_specialist", "waste_warrior"],
        reportsSubmitted: 67,
        verificationsCompleted: 78,
        lastActive: new Date("2024-01-14"),
        status: "active",
      },
    ],
    moderators: ["user_004", "user_005"],
    status: "active",
    rules: [
      "Focus on environmental and green infrastructure issues",
      "Promote sustainable practices and solutions",
      "Collaborate with local authorities and NGOs",
      "Share knowledge about environmental best practices",
      "Organize community clean-up and plantation drives",
    ],
    activities: [],
    challenges: [
      {
        id: "challenge_002",
        title: "Green Space Monitoring",
        description: "Monitor and report on all parks and green spaces in HSR Layout",
        category: "environment",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-31"),
        targetMetric: "green_spaces_monitored",
        targetValue: 25,
        currentValue: 18,
        participants: [
          {
            userId: "user_004",
            username: "EcoWarriorAnja",
            contribution: 12,
            rank: 1,
          },
          {
            userId: "user_005",
            username: "TreeHuggerRavi",
            contribution: 6,
            rank: 2,
          },
        ],
        rewards: [
          {
            type: "certificate",
            value: "Green Guardian Certificate",
            criteria: "Monitor 10+ green spaces",
            recipients: ["user_004"],
          },
        ],
        status: "active",
      },
    ],
    achievements: [],
    statistics: {
      totalMembers: 2,
      activeMembers: 2,
      reportsSubmitted: 156,
      issuesResolved: 89,
      verificationAccuracy: 91.2,
      engagementScore: 7.8,
      impactScore: 8.5,
      averageResponseTime: 5.1,
    },
  },
]

// Community Circle Functions
export async function createCommunityCircle(
  circleData: Partial<CommunityCircle>,
  creatorId: string,
): Promise<CommunityCircle> {
  const circle: CommunityCircle = {
    id: `circle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: circleData.name || "New Community Circle",
    description: circleData.description || "",
    location: circleData.location || {
      area: "Unknown",
      ward: "Unknown",
      coordinates: { lat: 0, lng: 0 },
      radius: 1000,
    },
    category: circleData.category || "general",
    createdBy: creatorId,
    createdDate: new Date(),
    members: [
      {
        userId: creatorId,
        username: "CircleCreator",
        joinDate: new Date(),
        role: "admin",
        contributionScore: 0,
        badges: ["founder"],
        reportsSubmitted: 0,
        verificationsCompleted: 0,
        lastActive: new Date(),
        status: "active",
      },
    ],
    moderators: [creatorId],
    status: "active",
    rules: [
      "Be respectful and constructive",
      "Focus on community infrastructure issues",
      "Verify information before sharing",
      "Support fellow members",
    ],
    activities: [],
    challenges: [],
    achievements: [],
    statistics: {
      totalMembers: 1,
      activeMembers: 1,
      reportsSubmitted: 0,
      issuesResolved: 0,
      verificationAccuracy: 0,
      engagementScore: 0,
      impactScore: 0,
      averageResponseTime: 0,
    },
  }

  return circle
}

export async function joinCommunityCircle(circleId: string, userId: string): Promise<boolean> {
  const circle = communityCircles.find((c) => c.id === circleId)
  if (!circle) return false

  const isAlreadyMember = circle.members.some((member) => member.userId === userId)
  if (isAlreadyMember) return false

  const newMember: CircleMember = {
    userId,
    username: `User_${userId.slice(-4)}`,
    joinDate: new Date(),
    role: "member",
    contributionScore: 0,
    badges: ["new_member"],
    reportsSubmitted: 0,
    verificationsCompleted: 0,
    lastActive: new Date(),
    status: "active",
  }

  circle.members.push(newMember)
  circle.statistics.totalMembers += 1
  circle.statistics.activeMembers += 1

  return true
}

export async function createWeeklyChallenge(
  circleId: string,
  challengeData: Partial<WeeklyChallenge>,
): Promise<WeeklyChallenge> {
  const challenge: WeeklyChallenge = {
    id: `challenge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: challengeData.title || "Weekly Challenge",
    description: challengeData.description || "",
    category: challengeData.category || "general",
    startDate: challengeData.startDate || new Date(),
    endDate: challengeData.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    targetMetric: challengeData.targetMetric || "reports",
    targetValue: challengeData.targetValue || 10,
    currentValue: 0,
    participants: [],
    rewards: challengeData.rewards || [],
    status: "upcoming",
  }

  const circle = communityCircles.find((c) => c.id === circleId)
  if (circle) {
    circle.challenges.push(challenge)
  }

  return challenge
}

export function getCircleLeaderboard(circleId: string): CircleMember[] {
  const circle = communityCircles.find((c) => c.id === circleId)
  if (!circle) return []

  return circle.members
    .sort((a, b) => b.contributionScore - a.contributionScore)
    .map((member, index) => ({
      ...member,
      rank: index + 1,
    }))
}

export function calculateMemberContribution(member: CircleMember): {
  totalScore: number
  breakdown: { reports: number; verifications: number; bonus: number }
  level: string
  nextLevelThreshold: number
} {
  const reportPoints = member.reportsSubmitted * 10
  const verificationPoints = member.verificationsCompleted * 5
  const bonusPoints = member.badges.length * 25

  const totalScore = reportPoints + verificationPoints + bonusPoints

  let level = "Newcomer"
  let nextLevelThreshold = 100

  if (totalScore >= 2000) {
    level = "Community Champion"
    nextLevelThreshold = 5000
  } else if (totalScore >= 1000) {
    level = "Infrastructure Expert"
    nextLevelThreshold = 2000
  } else if (totalScore >= 500) {
    level = "Active Contributor"
    nextLevelThreshold = 1000
  } else if (totalScore >= 100) {
    level = "Engaged Member"
    nextLevelThreshold = 500
  }

  return {
    totalScore,
    breakdown: {
      reports: reportPoints,
      verifications: verificationPoints,
      bonus: bonusPoints,
    },
    level,
    nextLevelThreshold,
  }
}

export async function verifyReportByCommunity(
  reportId: string,
  circleId: string,
  verifications: { userId: string; verdict: boolean; comments: string }[],
): Promise<{
  isVerified: boolean
  confidence: number
  consensusReached: boolean
  verificationDetails: any
}> {
  // Simulate community verification process
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const circle = communityCircles.find((c) => c.id === circleId)
  if (!circle) throw new Error("Circle not found")

  const positiveVerifications = verifications.filter((v) => v.verdict).length
  const totalVerifications = verifications.length
  const confidence = totalVerifications > 0 ? positiveVerifications / totalVerifications : 0

  const isVerified = confidence >= 0.67 && totalVerifications >= 3 // 2/3 majority with minimum 3 verifications
  const consensusReached = totalVerifications >= Math.min(5, circle.statistics.activeMembers)

  // Award points to verifiers
  verifications.forEach((verification) => {
    const member = circle.members.find((m) => m.userId === verification.userId)
    if (member) {
      member.verificationsCompleted += 1
      member.contributionScore += 5
      member.lastActive = new Date()
    }
  })

  return {
    isVerified,
    confidence,
    consensusReached,
    verificationDetails: {
      totalVerifications,
      positiveVerifications,
      verifierContributions: verifications,
    },
  }
}

export function getCirclesByLocation(userLocation: { lat: number; lng: number }, radiusKm = 5): CommunityCircle[] {
  return communityCircles.filter((circle) => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      circle.location.coordinates.lat,
      circle.location.coordinates.lng,
    )
    return distance <= radiusKm
  })
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function generateCircleInsights(circleId: string): {
  performanceMetrics: any
  trends: any
  recommendations: string[]
  achievements: any
} {
  const circle = communityCircles.find((c) => c.id === circleId)
  if (!circle) throw new Error("Circle not found")

  const performanceMetrics = {
    engagementRate: (circle.statistics.activeMembers / circle.statistics.totalMembers) * 100,
    resolutionRate: (circle.statistics.issuesResolved / circle.statistics.reportsSubmitted) * 100,
    averageResponseTime: circle.statistics.averageResponseTime,
    verificationAccuracy: circle.statistics.verificationAccuracy,
  }

  const trends = {
    memberGrowth: "Steady increase over past 3 months",
    activityLevel: "High engagement during weekends",
    reportTypes: "Road infrastructure issues most common",
    seasonalPatterns: "Increased drainage reports during monsoon",
  }

  const recommendations = [
    "Organize monthly community meetings to boost engagement",
    "Create specialized sub-groups for different infrastructure types",
    "Implement mentor system for new members",
    "Establish partnerships with local government officials",
  ]

  const achievements = {
    recentUnlocks: circle.achievements.slice(-3),
    nextMilestones: [
      { title: "500 Reports", progress: 64, target: 500 },
      { title: "95% Accuracy", progress: 94.5, target: 95 },
    ],
  }

  return {
    performanceMetrics,
    trends,
    recommendations,
    achievements,
  }
}
