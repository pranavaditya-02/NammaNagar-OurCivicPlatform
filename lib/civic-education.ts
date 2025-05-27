// Civic Education System - Complete Implementation
export interface EducationModule {
  id: string
  title: string
  description: string
  category: "budgeting" | "rti" | "grievance" | "governance" | "participation"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in minutes
  points: number
  lessons: Lesson[]
  certificate?: Certificate
  prerequisites?: string[]
  tags: string[]
}

export interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "interactive" | "quiz"
  duration: number
  content: string
  resources?: Resource[]
  quiz?: Quiz
}

export interface Quiz {
  id: string
  questions: Question[]
  passingScore: number
  timeLimit?: number
}

export interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "fill-blank"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  points: number
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "link" | "video" | "document"
  url: string
  description: string
}

export interface Certificate {
  id: string
  name: string
  description: string
  issuer: string
  validityPeriod?: number // in months
  requirements: string[]
}

export interface UserProgress {
  moduleId: string
  userId: string
  completionPercentage: number
  lessonsCompleted: string[]
  quizScores: { [quizId: string]: number }
  timeSpent: number
  lastAccessed: Date
  certificateEarned?: boolean
  certificateDate?: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "participation" | "leadership" | "community"
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
  requirements: string[]
  unlockedBy?: string[]
}

export interface UserLevel {
  level: number
  title: string
  badge: string
  minPoints: number
  maxPoints: number
  benefits: string[]
  color: string
}

// Sample Data
export const educationModules: EducationModule[] = [
  {
    id: "budget-basics",
    title: "Understanding Municipal Budgets",
    description: "Learn how your city's budget works, where money comes from, and how it's spent on infrastructure",
    category: "budgeting",
    difficulty: "beginner",
    duration: 45,
    points: 100,
    tags: ["budget", "municipal", "finance", "transparency"],
    lessons: [
      {
        id: "budget-intro",
        title: "What is a Municipal Budget?",
        type: "video",
        duration: 15,
        content: "Introduction to municipal budgeting concepts and importance for citizens",
      },
      {
        id: "budget-sources",
        title: "Revenue Sources",
        type: "interactive",
        duration: 20,
        content: "Explore different sources of municipal revenue including taxes, grants, and fees",
      },
      {
        id: "budget-quiz",
        title: "Budget Knowledge Check",
        type: "quiz",
        duration: 10,
        content: "Test your understanding of municipal budget basics",
        quiz: {
          id: "budget-quiz-1",
          questions: [
            {
              id: "q1",
              type: "multiple-choice",
              question: "What is the largest source of revenue for most Indian municipalities?",
              options: ["Property Tax", "Central Grants", "User Charges", "Commercial Tax"],
              correctAnswer: 0,
              explanation: "Property tax is typically the largest own-source revenue for municipalities",
              points: 10,
            },
          ],
          passingScore: 70,
          timeLimit: 15,
        },
      },
    ],
    certificate: {
      id: "budget-cert",
      name: "Municipal Budget Literacy Certificate",
      description: "Certified understanding of municipal budgeting processes",
      issuer: "NammaNagar Civic Academy",
      validityPeriod: 24,
      requirements: ["Complete all lessons", "Score 80% on final quiz", "Submit budget analysis"],
    },
  },
  {
    id: "rti-mastery",
    title: "Right to Information (RTI) Mastery",
    description: "Master the RTI Act to access government information and ensure transparency",
    category: "rti",
    difficulty: "intermediate",
    duration: 60,
    points: 150,
    tags: ["rti", "transparency", "information", "rights"],
    lessons: [
      {
        id: "rti-basics",
        title: "RTI Act Fundamentals",
        type: "text",
        duration: 20,
        content: "Understanding the Right to Information Act 2005 and its provisions",
      },
      {
        id: "filing-rti",
        title: "How to File an RTI Application",
        type: "interactive",
        duration: 25,
        content: "Step-by-step guide to filing effective RTI applications",
      },
      {
        id: "rti-appeals",
        title: "RTI Appeals Process",
        type: "video",
        duration: 15,
        content: "Understanding the appeals process when RTI requests are denied",
      },
    ],
    certificate: {
      id: "rti-cert",
      name: "RTI Expert Certificate",
      description: "Certified expertise in using RTI for transparency and accountability",
      issuer: "NammaNagar Civic Academy",
      validityPeriod: 36,
      requirements: ["Complete all modules", "File 3 practice RTI applications", "Score 85% on assessment"],
    },
  },
  {
    id: "grievance-redressal",
    title: "Effective Grievance Redressal",
    description: "Learn the formal and informal channels for addressing civic grievances",
    category: "grievance",
    difficulty: "beginner",
    duration: 40,
    points: 120,
    tags: ["grievance", "complaints", "redressal", "process"],
    lessons: [
      {
        id: "grievance-types",
        title: "Types of Civic Grievances",
        type: "text",
        duration: 15,
        content: "Understanding different categories of civic issues and appropriate channels",
      },
      {
        id: "formal-channels",
        title: "Formal Complaint Channels",
        type: "interactive",
        duration: 20,
        content: "Navigate official grievance portals and procedures",
      },
      {
        id: "follow-up",
        title: "Following Up on Complaints",
        type: "video",
        duration: 5,
        content: "Best practices for tracking and following up on submitted grievances",
      },
    ],
  },
  {
    id: "local-governance",
    title: "Local Governance Structure",
    description: "Understand how local government works and your role as a citizen",
    category: "governance",
    difficulty: "intermediate",
    duration: 55,
    points: 140,
    tags: ["governance", "local", "democracy", "participation"],
    lessons: [
      {
        id: "governance-structure",
        title: "Municipal Corporation Structure",
        type: "interactive",
        duration: 25,
        content: "Explore the hierarchy and functions of local government bodies",
      },
      {
        id: "elected-officials",
        title: "Elected Representatives",
        type: "text",
        duration: 15,
        content: "Understanding roles of Mayor, Corporators, and other elected officials",
      },
      {
        id: "citizen-participation",
        title: "Citizen Participation Mechanisms",
        type: "video",
        duration: 15,
        content: "Ways citizens can participate in local governance beyond voting",
      },
    ],
  },
  {
    id: "civic-participation",
    title: "Active Civic Participation",
    description: "Transform from passive observer to active participant in civic life",
    category: "participation",
    difficulty: "advanced",
    duration: 70,
    points: 180,
    tags: ["participation", "engagement", "activism", "community"],
    lessons: [
      {
        id: "participation-methods",
        title: "Methods of Civic Engagement",
        type: "interactive",
        duration: 30,
        content: "Explore various ways to engage with local governance and community issues",
      },
      {
        id: "organizing-campaigns",
        title: "Organizing Community Campaigns",
        type: "video",
        duration: 25,
        content: "Learn to organize effective campaigns for civic issues",
      },
      {
        id: "working-with-govt",
        title: "Collaborating with Government",
        type: "text",
        duration: 15,
        content: "Best practices for productive engagement with government officials",
      },
    ],
    certificate: {
      id: "participation-cert",
      name: "Civic Leadership Certificate",
      description: "Certified civic leader with advanced participation skills",
      issuer: "NammaNagar Civic Academy",
      validityPeriod: 24,
      requirements: ["Complete all modules", "Lead a community initiative", "Mentor 3 new participants"],
    },
  },
]

export const achievements: Achievement[] = [
  {
    id: "first-module",
    title: "Learning Journey Begins",
    description: "Complete your first civic education module",
    icon: "🎓",
    category: "learning",
    rarity: "common",
    points: 50,
    requirements: ["Complete any education module"],
  },
  {
    id: "budget-expert",
    title: "Budget Guru",
    description: "Master municipal budgeting concepts",
    icon: "💰",
    category: "learning",
    rarity: "rare",
    points: 200,
    requirements: ["Complete budget-basics module", "Score 90%+ on budget quiz"],
  },
  {
    id: "rti-warrior",
    title: "RTI Warrior",
    description: "Become an expert in using RTI for transparency",
    icon: "⚔️",
    category: "learning",
    rarity: "epic",
    points: 300,
    requirements: ["Complete rti-mastery module", "File 5 successful RTI applications"],
  },
  {
    id: "civic-champion",
    title: "Civic Champion",
    description: "Complete all education modules and become a civic expert",
    icon: "🏆",
    category: "learning",
    rarity: "legendary",
    points: 500,
    requirements: ["Complete all 5 education modules", "Earn all module certificates"],
  },
  {
    id: "community-teacher",
    title: "Community Teacher",
    description: "Help others learn by mentoring new participants",
    icon: "👨‍🏫",
    category: "community",
    rarity: "epic",
    points: 400,
    requirements: ["Mentor 10 new learners", "Maintain 4.5+ rating"],
  },
  {
    id: "knowledge-sharer",
    title: "Knowledge Sharer",
    description: "Share civic knowledge through posts and discussions",
    icon: "📢",
    category: "community",
    rarity: "rare",
    points: 150,
    requirements: ["Create 5 educational posts", "Get 100+ likes on content"],
  },
]

export const userLevels: UserLevel[] = [
  {
    level: 1,
    title: "Civic Newbie",
    badge: "🌱",
    minPoints: 0,
    maxPoints: 199,
    benefits: ["Access to beginner modules", "Basic community features"],
    color: "green",
  },
  {
    level: 2,
    title: "Aware Citizen",
    badge: "👤",
    minPoints: 200,
    maxPoints: 499,
    benefits: ["Access to intermediate modules", "Discussion forums", "Basic mentoring"],
    color: "blue",
  },
  {
    level: 3,
    title: "Engaged Citizen",
    badge: "🤝",
    minPoints: 500,
    maxPoints: 999,
    benefits: ["Access to advanced modules", "Campaign creation", "Community leadership"],
    color: "purple",
  },
  {
    level: 4,
    title: "Civic Leader",
    badge: "⭐",
    minPoints: 1000,
    maxPoints: 1999,
    benefits: ["Mentor certification", "Expert content creation", "Government liaison"],
    color: "orange",
  },
  {
    level: 5,
    title: "Democracy Guardian",
    badge: "🏛️",
    minPoints: 2000,
    maxPoints: 4999,
    benefits: ["Platform governance", "Policy consultation", "Advanced analytics"],
    color: "gold",
  },
  {
    level: 6,
    title: "Civic Champion",
    badge: "🏆",
    minPoints: 5000,
    maxPoints: 9999,
    benefits: ["All features", "VIP support", "Government partnerships"],
    color: "platinum",
  },
]

// Helper Functions
export function calculateUserLevel(points: number): UserLevel {
  return userLevels.find((level) => points >= level.minPoints && points <= level.maxPoints) || userLevels[0]
}

export function getNextLevel(currentPoints: number): UserLevel | null {
  return userLevels.find((level) => level.minPoints > currentPoints) || null
}

export function calculateModuleProgress(moduleId: string, userProgress: UserProgress[]): number {
  const progress = userProgress.find((p) => p.moduleId === moduleId)
  return progress?.completionPercentage || 0
}

export function getEarnedAchievements(userProgress: UserProgress[], userStats: any): Achievement[] {
  const earned: Achievement[] = []

  // Check each achievement's requirements
  achievements.forEach((achievement) => {
    let meetsRequirements = true

    achievement.requirements.forEach((requirement) => {
      if (requirement.includes("Complete") && requirement.includes("module")) {
        const moduleId = requirement.toLowerCase().includes("budget")
          ? "budget-basics"
          : requirement.toLowerCase().includes("rti")
            ? "rti-mastery"
            : null
        if (moduleId) {
          const progress = userProgress.find((p) => p.moduleId === moduleId)
          if (!progress || progress.completionPercentage < 100) {
            meetsRequirements = false
          }
        }
      }
      // Add more requirement checks as needed
    })

    if (meetsRequirements) {
      earned.push(achievement)
    }
  })

  return earned
}
