// Adopt-a-Spot System - Complete Implementation
export interface AdoptableSpot {
  id: string
  name: string
  type: "park" | "school" | "road" | "hospital" | "library" | "bus_stop" | "market" | "community_center"
  description: string
  location: {
    address: string
    ward: string
    district: string
    state: string
    pincode: string
    coordinates: { lat: number; lng: number }
  }
  currentCondition: "excellent" | "good" | "fair" | "poor" | "critical"
  adoptionStatus: "available" | "adopted" | "pending_approval" | "under_review"
  estimatedBudget: number // annual budget in INR
  keyMetrics: Metric[]
  images: string[]
  adoptionRequirements: string[]
  governmentContact: {
    name: string
    designation: string
    department: string
    phone: string
    email: string
  }
  adoptionHistory?: AdoptionRecord[]
  communityRating?: number
  lastInspection?: Date
  urgencyLevel: "low" | "medium" | "high" | "critical"
}

export interface Metric {
  id: string
  name: string
  category: "cleanliness" | "safety" | "infrastructure" | "accessibility" | "environment"
  currentValue: number
  targetValue: number
  unit: string
  measurementMethod: string
  updateFrequency: "daily" | "weekly" | "monthly"
  lastUpdated: Date
}

export interface AdoptionRecord {
  id: string
  adopterId: string
  adopterName: string
  adopterType: "individual" | "ngo" | "corporate" | "community_group"
  startDate: Date
  endDate?: Date
  status: "active" | "completed" | "terminated" | "suspended"
  achievements: string[]
  budgetUtilized: number
  communityFeedback: number
  governmentRating: number
  impactMetrics: { [key: string]: number }
}

export interface AdoptionApplication {
  id: string
  spotId: string
  applicantId: string
  applicantName: string
  applicantType: "individual" | "ngo" | "corporate" | "community_group"
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  proposedPlan: {
    title: string
    description: string
    timeline: string
    budget: number
    milestones: Milestone[]
    sustainabilityPlan: string
  }
  teamMembers?: TeamMember[]
  experience: string
  references: Reference[]
  documents: Document[]
  submissionDate: Date
  status: "submitted" | "under_review" | "approved" | "rejected" | "needs_revision"
  reviewComments?: string[]
  approvalDate?: Date
}

export interface Milestone {
  id: string
  title: string
  description: string
  targetDate: Date
  budget: number
  deliverables: string[]
  successCriteria: string[]
  status: "pending" | "in_progress" | "completed" | "delayed"
  completionDate?: Date
  evidence?: string[]
}

export interface TeamMember {
  name: string
  role: string
  experience: string
  contactInfo: string
}

export interface Reference {
  name: string
  organization: string
  designation: string
  contactInfo: string
  relationship: string
}

export interface Document {
  id: string
  name: string
  type: "plan" | "budget" | "experience" | "reference" | "legal" | "other"
  url: string
  uploadDate: Date
}

// Sample Data
export const adoptableSpots: AdoptableSpot[] = [
  {
    id: "park-cubbon-rose-garden",
    name: "Cubbon Park Rose Garden Section",
    type: "park",
    description:
      "Historic rose garden section of Cubbon Park requiring restoration and maintenance. Features 200+ rose varieties but needs systematic care and visitor facilities improvement.",
    location: {
      address: "Cubbon Park, Kasturba Road",
      ward: "Shanthinagar Ward",
      district: "Bengaluru Urban",
      state: "Karnataka",
      pincode: "560001",
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    currentCondition: "fair",
    adoptionStatus: "available",
    estimatedBudget: 500000, // 5 lakhs per year
    urgencyLevel: "medium",
    keyMetrics: [
      {
        id: "cleanliness-score",
        name: "Cleanliness Score",
        category: "cleanliness",
        currentValue: 6.5,
        targetValue: 9.0,
        unit: "out of 10",
        measurementMethod: "Weekly inspection by trained volunteers",
        updateFrequency: "weekly",
        lastUpdated: new Date("2024-01-15"),
      },
      {
        id: "visitor-satisfaction",
        name: "Visitor Satisfaction",
        category: "infrastructure",
        currentValue: 7.2,
        targetValue: 8.5,
        unit: "rating",
        measurementMethod: "Monthly visitor surveys",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-10"),
      },
      {
        id: "rose-health",
        name: "Rose Plant Health",
        category: "environment",
        currentValue: 65,
        targetValue: 90,
        unit: "percentage healthy",
        measurementMethod: "Botanical assessment",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-12"),
      },
      {
        id: "safety-incidents",
        name: "Safety Incidents",
        category: "safety",
        currentValue: 3,
        targetValue: 0,
        unit: "incidents per month",
        measurementMethod: "Security reports and visitor complaints",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-15"),
      },
    ],
    images: ["/spots/cubbon-rose-garden-1.jpg", "/spots/cubbon-rose-garden-2.jpg", "/spots/cubbon-rose-garden-3.jpg"],
    adoptionRequirements: [
      "Minimum 2-year commitment",
      "Monthly progress reports with photos",
      "Coordinate with Horticulture Department",
      "Maintain public access during daylight hours",
      "Follow organic gardening practices",
      "Engage local community in activities",
      "Provide quarterly financial reports",
    ],
    governmentContact: {
      name: "Dr. Rajesh Kumar",
      designation: "Deputy Director",
      department: "Horticulture Department, BBMP",
      phone: "+91 80 2234 5678",
      email: "rajesh.kumar@bbmp.gov.in",
    },
    communityRating: 7.8,
    lastInspection: new Date("2024-01-10"),
  },
  {
    id: "school-govt-primary-hsr",
    name: "Government Primary School, HSR Layout",
    type: "school",
    description:
      "Government primary school serving 450+ students from economically disadvantaged backgrounds. Needs infrastructure improvements, learning resources, and maintenance support.",
    location: {
      address: "27th Main Road, HSR Layout Sector 2",
      ward: "HSR Layout Ward",
      district: "Bengaluru Urban",
      state: "Karnataka",
      pincode: "560102",
      coordinates: { lat: 12.9116, lng: 77.6473 },
    },
    currentCondition: "poor",
    adoptionStatus: "available",
    estimatedBudget: 800000, // 8 lakhs per year
    urgencyLevel: "high",
    keyMetrics: [
      {
        id: "infrastructure-score",
        name: "Infrastructure Quality",
        category: "infrastructure",
        currentValue: 5.5,
        targetValue: 8.5,
        unit: "out of 10",
        measurementMethod: "Quarterly infrastructure assessment",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-08"),
      },
      {
        id: "student-attendance",
        name: "Student Attendance",
        category: "accessibility",
        currentValue: 78,
        targetValue: 95,
        unit: "percentage",
        measurementMethod: "Daily attendance records",
        updateFrequency: "weekly",
        lastUpdated: new Date("2024-01-15"),
      },
      {
        id: "learning-resources",
        name: "Learning Resources Availability",
        category: "infrastructure",
        currentValue: 60,
        targetValue: 90,
        unit: "percentage adequate",
        measurementMethod: "Teacher and student surveys",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-12"),
      },
      {
        id: "sanitation-facilities",
        name: "Sanitation Facilities",
        category: "cleanliness",
        currentValue: 6.0,
        targetValue: 9.0,
        unit: "out of 10",
        measurementMethod: "Health department inspection",
        updateFrequency: "weekly",
        lastUpdated: new Date("2024-01-14"),
      },
    ],
    images: ["/spots/govt-school-hsr-1.jpg", "/spots/govt-school-hsr-2.jpg"],
    adoptionRequirements: [
      "Minimum 3-year commitment",
      "Background verification clearance",
      "Coordinate with Education Department and school management",
      "Monthly progress reports with student impact metrics",
      "Ensure child safety protocols",
      "Provide teacher training support",
      "Maintain transparency in fund utilization",
    ],
    governmentContact: {
      name: "Mrs. Priya Sharma",
      designation: "Block Education Officer",
      department: "Department of Public Instruction, Karnataka",
      phone: "+91 80 2345 6789",
      email: "priya.sharma@dpi.kar.gov.in",
    },
    communityRating: 8.2,
    lastInspection: new Date("2024-01-05"),
  },
  {
    id: "road-koramangala-5th-block",
    name: "Koramangala 5th Block Main Road",
    type: "road",
    description:
      "Major arterial road connecting residential areas to commercial zones. Requires pothole repairs, street lighting improvements, and pedestrian safety enhancements.",
    location: {
      address: "5th Block Main Road, Koramangala",
      ward: "Koramangala Ward",
      district: "Bengaluru Urban",
      state: "Karnataka",
      pincode: "560095",
      coordinates: { lat: 12.9352, lng: 77.6245 },
    },
    currentCondition: "poor",
    adoptionStatus: "available",
    estimatedBudget: 1200000, // 12 lakhs per year
    urgencyLevel: "critical",
    keyMetrics: [
      {
        id: "road-condition",
        name: "Road Surface Quality",
        category: "infrastructure",
        currentValue: 4.5,
        targetValue: 8.5,
        unit: "out of 10",
        measurementMethod: "Engineering assessment and citizen feedback",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-14"),
      },
      {
        id: "street-lighting",
        name: "Street Lighting Coverage",
        category: "safety",
        currentValue: 70,
        targetValue: 95,
        unit: "percentage functional",
        measurementMethod: "Night-time inspection",
        updateFrequency: "weekly",
        lastUpdated: new Date("2024-01-13"),
      },
      {
        id: "pedestrian-safety",
        name: "Pedestrian Safety Score",
        category: "safety",
        currentValue: 5.8,
        targetValue: 8.5,
        unit: "out of 10",
        measurementMethod: "Safety audit and accident data",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-12"),
      },
      {
        id: "traffic-flow",
        name: "Traffic Flow Efficiency",
        category: "infrastructure",
        currentValue: 6.2,
        targetValue: 8.0,
        unit: "out of 10",
        measurementMethod: "Traffic analysis and commuter surveys",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-15"),
      },
    ],
    images: ["/spots/koramangala-road-1.jpg", "/spots/koramangala-road-2.jpg"],
    adoptionRequirements: [
      "Minimum 2-year commitment",
      "Coordinate with BBMP Roads Department",
      "Ensure minimal traffic disruption during work",
      "Monthly safety and progress reports",
      "Use approved materials and contractors",
      "Maintain emergency access at all times",
      "Community consultation for major changes",
    ],
    governmentContact: {
      name: "Mr. Suresh Reddy",
      designation: "Executive Engineer",
      department: "Roads and Infrastructure, BBMP",
      phone: "+91 80 2456 7890",
      email: "suresh.reddy@bbmp.gov.in",
    },
    communityRating: 6.5,
    lastInspection: new Date("2024-01-11"),
  },
  {
    id: "library-public-indiranagar",
    name: "Public Library, Indiranagar",
    type: "library",
    description:
      "Community library serving local residents with books, digital resources, and study spaces. Needs modernization, expanded collection, and improved facilities.",
    location: {
      address: "12th Main Road, Indiranagar",
      ward: "Indiranagar Ward",
      district: "Bengaluru Urban",
      state: "Karnataka",
      pincode: "560038",
      coordinates: { lat: 12.9719, lng: 77.6412 },
    },
    currentCondition: "fair",
    adoptionStatus: "available",
    estimatedBudget: 400000, // 4 lakhs per year
    urgencyLevel: "medium",
    keyMetrics: [
      {
        id: "book-collection",
        name: "Book Collection Quality",
        category: "infrastructure",
        currentValue: 6.8,
        targetValue: 8.5,
        unit: "out of 10",
        measurementMethod: "Library science assessment",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-10"),
      },
      {
        id: "visitor-count",
        name: "Daily Visitors",
        category: "accessibility",
        currentValue: 45,
        targetValue: 80,
        unit: "visitors per day",
        measurementMethod: "Entry register and digital counters",
        updateFrequency: "daily",
        lastUpdated: new Date("2024-01-15"),
      },
      {
        id: "digital-resources",
        name: "Digital Resources Access",
        category: "infrastructure",
        currentValue: 30,
        targetValue: 80,
        unit: "percentage availability",
        measurementMethod: "Technology audit",
        updateFrequency: "monthly",
        lastUpdated: new Date("2024-01-08"),
      },
    ],
    images: ["/spots/indiranagar-library-1.jpg", "/spots/indiranagar-library-2.jpg"],
    adoptionRequirements: [
      "Minimum 2-year commitment",
      "Library science expertise or partnership",
      "Coordinate with Department of Public Libraries",
      "Maintain free public access",
      "Monthly usage and impact reports",
      "Organize community reading programs",
      "Ensure digital literacy initiatives",
    ],
    governmentContact: {
      name: "Dr. Meera Nair",
      designation: "District Library Officer",
      department: "Department of Public Libraries, Karnataka",
      phone: "+91 80 2567 8901",
      email: "meera.nair@dpl.kar.gov.in",
    },
    communityRating: 7.5,
    lastInspection: new Date("2024-01-09"),
  },
]

// Helper Functions
export function getSpotsByType(type: string): AdoptableSpot[] {
  if (type === "all") return adoptableSpots
  return adoptableSpots.filter((spot) => spot.type === type)
}

export function getSpotsByStatus(status: string): AdoptableSpot[] {
  if (status === "all") return adoptableSpots
  return adoptableSpots.filter((spot) => spot.adoptionStatus === status)
}

export function getSpotsByUrgency(urgency: string): AdoptableSpot[] {
  if (urgency === "all") return adoptableSpots
  return adoptableSpots.filter((spot) => spot.urgencyLevel === urgency)
}

export function calculateSpotScore(spot: AdoptableSpot): number {
  const totalMetrics = spot.keyMetrics.length
  const totalScore = spot.keyMetrics.reduce((sum, metric) => {
    return sum + (metric.currentValue / metric.targetValue) * 10
  }, 0)
  return Math.round((totalScore / totalMetrics) * 10) / 10
}

export function getAdoptionRequirementsByType(type: string): string[] {
  const commonRequirements = [
    "Minimum 2-year commitment",
    "Monthly progress reports",
    "Community engagement",
    "Transparent fund utilization",
  ]

  const typeSpecificRequirements: { [key: string]: string[] } = {
    park: ["Coordinate with Horticulture Department", "Maintain public access", "Follow environmental guidelines"],
    school: ["Background verification", "Child safety protocols", "Educational impact measurement"],
    road: ["Traffic management coordination", "Use approved materials", "Safety compliance"],
    library: ["Library science expertise", "Digital literacy programs", "Free public access"],
    hospital: ["Healthcare compliance", "Medical equipment standards", "Patient safety protocols"],
  }

  return [...commonRequirements, ...(typeSpecificRequirements[type] || [])]
}
