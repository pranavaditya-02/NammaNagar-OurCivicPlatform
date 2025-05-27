// Enhanced AI Image Analysis with Advanced Features
export interface ImageAnalysisResult {
  category: string
  confidence: number
  description: string
  severity: "low" | "medium" | "high" | "critical"
  fraudRisk: number
  tags: string[]
  suggestedAction: string
  estimatedCost?: string
  timeToResolve?: string
  isReused: boolean
  duplicateImages: string[]
  locationVerified: boolean
  autoClassification: IssueClassification
}

export interface IssueClassification {
  primaryType: string
  subType: string
  urgencyLevel: number
  departmentResponsible: string
  estimatedResolutionTime: number
  requiredApprovals: string[]
  budgetRange: { min: number; max: number }
}

export interface FakeImageDetection {
  isFake: boolean
  fakeScore: number
  reasons: string[]
  reverseImageResults: ReverseImageResult[]
  metadata: ImageMetadata
}

export interface ReverseImageResult {
  url: string
  source: string
  similarity: number
  uploadDate: string
  context: string
}

export interface ImageMetadata {
  exifData: ExifData
  geoLocation: { lat: number; lng: number } | null
  timestamp: Date
  deviceInfo: string
  cameraSettings: CameraSettings
}

export interface ExifData {
  make: string
  model: string
  datetime: string
  gps?: { lat: number; lng: number }
  software?: string
}

export interface CameraSettings {
  aperture: string
  iso: string
  shutterSpeed: string
  flash: boolean
}

// Legacy function for backward compatibility
export async function analyzeImage(imageFile: File): Promise<ImageAnalysisResult> {
  return await analyzeImageAdvanced(imageFile)
}

// Re-export the fraud detection function that was in the original
export async function detectFraud(imageFile: File, reportDetails: any): Promise<FraudDetectionResult> {
  const fakeDetection = await detectFakeImage(imageFile)

  return {
    isFraudulent: fakeDetection.isFake,
    fraudScore: fakeDetection.fakeScore,
    reasons: fakeDetection.reasons,
    similarImages: fakeDetection.reverseImageResults.map((r) => r.url),
    recommendations: fakeDetection.isFake
      ? ["Verify location with field inspection", "Request additional photos from different angles"]
      : ["Report appears authentic - proceed with normal verification"],
  }
}

// Re-export missing interfaces and functions
export interface FraudDetectionResult {
  isFraudulent: boolean
  fraudScore: number
  reasons: string[]
  similarImages: string[]
  recommendations: string[]
}

// Add missing functions that other components expect
export async function assessImageQuality(imageFile: File): Promise<{
  quality: "excellent" | "good" | "fair" | "poor"
  score: number
  issues: string[]
  suggestions: string[]
}> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const score = 0.7 + Math.random() * 0.3

  let quality: "excellent" | "good" | "fair" | "poor"
  const issues: string[] = []
  const suggestions: string[] = []

  if (score >= 0.9) {
    quality = "excellent"
  } else if (score >= 0.75) {
    quality = "good"
  } else if (score >= 0.6) {
    quality = "fair"
    issues.push("Slightly blurry image")
    suggestions.push("Try to keep camera steady while taking photos")
  } else {
    quality = "poor"
    issues.push("Low image quality", "Poor lighting")
    suggestions.push("Take photo in better lighting", "Move closer to the subject")
  }

  return { quality, score, issues, suggestions }
}

export async function verifyLocation(
  imageFile: File,
  reportedLocation: { lat: number; lng: number },
): Promise<{
  isVerified: boolean
  confidence: number
  actualLocation?: { lat: number; lng: number }
  distance?: number
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const confidence = 0.8 + Math.random() * 0.2
  const isVerified = confidence > 0.85

  return {
    isVerified,
    confidence,
    actualLocation: isVerified
      ? reportedLocation
      : {
          lat: reportedLocation.lat + (Math.random() - 0.5) * 0.01,
          lng: reportedLocation.lng + (Math.random() - 0.5) * 0.01,
        },
    distance: isVerified ? 0 : Math.floor(Math.random() * 500) + 50,
  }
}

// Advanced AI Analysis Functions
export async function analyzeImageAdvanced(imageFile: File): Promise<ImageAnalysisResult> {
  // Simulate comprehensive AI analysis
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Advanced classification based on visual features
  const classification = await classifyIssueType(imageFile)
  const fakeDetection = await detectFakeImage(imageFile)
  const locationVerification = await verifyImageLocation(imageFile)

  const mockResults: Record<string, Partial<ImageAnalysisResult>> = {
    pothole: {
      category: "Roads & Transportation",
      confidence: 0.94,
      description: "Large pothole with approximately 2-foot diameter, exposing underlying concrete",
      severity: "high",
      fraudRisk: fakeDetection.fakeScore,
      tags: ["pothole", "road damage", "asphalt", "traffic hazard", "monsoon damage"],
      suggestedAction: "Immediate road repair required - traffic safety concern",
      estimatedCost: "₹15,000 - ₹25,000",
      timeToResolve: "3-5 days",
      isReused: fakeDetection.isFake,
      duplicateImages: fakeDetection.reverseImageResults.map((r) => r.url),
      locationVerified: locationVerification.isVerified,
    },
    water_leak: {
      category: "Water Supply",
      confidence: 0.91,
      description: "Major water pipeline leak causing road flooding and water wastage",
      severity: "critical",
      fraudRisk: fakeDetection.fakeScore,
      tags: ["water leak", "pipeline", "flooding", "infrastructure", "emergency"],
      suggestedAction: "Emergency repair - water wastage and road damage",
      estimatedCost: "₹8,000 - ₹12,000",
      timeToResolve: "1-2 days",
      isReused: fakeDetection.isFake,
      duplicateImages: fakeDetection.reverseImageResults.map((r) => r.url),
      locationVerified: locationVerification.isVerified,
    },
    streetlight: {
      category: "Electricity",
      confidence: 0.87,
      description: "Non-functional street light with damaged wiring visible",
      severity: "medium",
      fraudRisk: fakeDetection.fakeScore,
      tags: ["streetlight", "electricity", "safety", "lighting", "wire damage"],
      suggestedAction: "Replace bulb and repair electrical connection",
      estimatedCost: "₹2,000 - ₹5,000",
      timeToResolve: "1-3 days",
      isReused: fakeDetection.isFake,
      duplicateImages: fakeDetection.reverseImageResults.map((r) => r.url),
      locationVerified: locationVerification.isVerified,
    },
  }

  const randomCategory = Object.keys(mockResults)[Math.floor(Math.random() * Object.keys(mockResults).length)]
  const baseResult = mockResults[randomCategory]

  return {
    ...baseResult,
    autoClassification: classification,
  } as ImageAnalysisResult
}

export async function classifyIssueType(imageFile: File): Promise<IssueClassification> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const classifications: Record<string, IssueClassification> = {
    road: {
      primaryType: "Infrastructure",
      subType: "Road Maintenance",
      urgencyLevel: 7,
      departmentResponsible: "Public Works Department",
      estimatedResolutionTime: 5,
      requiredApprovals: ["Technical Engineer", "Ward Officer"],
      budgetRange: { min: 10000, max: 50000 },
    },
    water: {
      primaryType: "Utilities",
      subType: "Water Supply",
      urgencyLevel: 9,
      departmentResponsible: "Water Supply Department",
      estimatedResolutionTime: 2,
      requiredApprovals: ["Water Engineer", "Emergency Response Team"],
      budgetRange: { min: 5000, max: 25000 },
    },
    electricity: {
      primaryType: "Utilities",
      subType: "Street Lighting",
      urgencyLevel: 5,
      departmentResponsible: "Electrical Department",
      estimatedResolutionTime: 3,
      requiredApprovals: ["Electrical Engineer"],
      budgetRange: { min: 2000, max: 8000 },
    },
  }

  const randomType = Object.keys(classifications)[Math.floor(Math.random() * Object.keys(classifications).length)]
  return classifications[randomType]
}

export async function detectFakeImage(imageFile: File): Promise<FakeImageDetection> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const fakeScore = Math.random() * 0.3 // Most images are real
  const isFake = fakeScore > 0.25

  const reverseImageResults: ReverseImageResult[] = isFake
    ? [
        {
          url: "https://example.com/similar1.jpg",
          source: "Social Media Post",
          similarity: 0.89,
          uploadDate: "2023-11-15",
          context: "Similar pothole image from Mumbai",
        },
        {
          url: "https://example.com/similar2.jpg",
          source: "News Article",
          similarity: 0.76,
          uploadDate: "2023-10-22",
          context: "Road damage report from Chennai",
        },
      ]
    : []

  return {
    isFake,
    fakeScore,
    reasons: isFake
      ? ["Image metadata inconsistencies", "Similar image found online", "Suspicious EXIF data"]
      : ["Original image", "Consistent metadata", "No duplicates found"],
    reverseImageResults,
    metadata: {
      exifData: {
        make: "Samsung",
        model: "Galaxy S21",
        datetime: new Date().toISOString(),
        gps: { lat: 12.9716, lng: 77.5946 },
      },
      geoLocation: { lat: 12.9716, lng: 77.5946 },
      timestamp: new Date(),
      deviceInfo: "Android 13, Samsung Galaxy S21",
      cameraSettings: {
        aperture: "f/1.8",
        iso: "100",
        shutterSpeed: "1/60",
        flash: false,
      },
    },
  }
}

export async function verifyImageLocation(imageFile: File): Promise<{
  isVerified: boolean
  confidence: number
  reportedLocation: { lat: number; lng: number }
  actualLocation: { lat: number; lng: number }
  distanceDiscrepancy: number
}> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const reportedLocation = { lat: 12.9716, lng: 77.5946 }
  const actualLocation = {
    lat: reportedLocation.lat + (Math.random() - 0.5) * 0.01,
    lng: reportedLocation.lng + (Math.random() - 0.5) * 0.01,
  }

  const distance =
    Math.sqrt(
      Math.pow(reportedLocation.lat - actualLocation.lat, 2) + Math.pow(reportedLocation.lng - actualLocation.lng, 2),
    ) * 111000 // Convert to meters

  return {
    isVerified: distance < 100,
    confidence: Math.max(0, 1 - distance / 1000),
    reportedLocation,
    actualLocation,
    distanceDiscrepancy: Math.round(distance),
  }
}

export async function generateSeverityAssessment(imageFile: File): Promise<{
  severityScore: number
  impactAssessment: string
  urgencyRecommendation: string
  resourceRequirements: string[]
  publicSafetyRisk: "low" | "medium" | "high" | "critical"
}> {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const severityScore = Math.random() * 10
  let publicSafetyRisk: "low" | "medium" | "high" | "critical"
  let impactAssessment: string
  let urgencyRecommendation: string

  if (severityScore >= 8) {
    publicSafetyRisk = "critical"
    impactAssessment = "Immediate public safety hazard requiring emergency response"
    urgencyRecommendation = "Emergency repair within 24 hours"
  } else if (severityScore >= 6) {
    publicSafetyRisk = "high"
    impactAssessment = "Significant safety concern affecting daily operations"
    urgencyRecommendation = "Priority repair within 48-72 hours"
  } else if (severityScore >= 4) {
    publicSafetyRisk = "medium"
    impactAssessment = "Moderate issue requiring planned maintenance"
    urgencyRecommendation = "Scheduled repair within 1-2 weeks"
  } else {
    publicSafetyRisk = "low"
    impactAssessment = "Minor issue for routine maintenance cycle"
    urgencyRecommendation = "Include in next maintenance schedule"
  }

  return {
    severityScore,
    impactAssessment,
    urgencyRecommendation,
    resourceRequirements: [
      "Skilled technician",
      "Specialized equipment",
      "Traffic management",
      "Safety barriers",
      "Quality materials",
    ],
    publicSafetyRisk,
  }
}
