// RTI & Complaint Filing Assistant System
export interface RTIApplication {
  id: string
  applicantName: string
  applicantAddress: string
  contactInfo: {
    email: string
    phone: string
  }
  targetDepartment: string
  informationSought: string
  reasonForInformation: string
  applicationDate: Date
  applicationFee: number
  paymentMode: string
  status: "draft" | "submitted" | "under_process" | "first_appeal" | "information_provided" | "rejected"
  trackingNumber?: string
  responseDate?: Date
  documents: RTIDocument[]
  timeline: RTITimelineEntry[]
}

export interface RTIDocument {
  id: string
  name: string
  type: "application" | "fee_receipt" | "response" | "appeal" | "supporting_doc"
  url: string
  uploadDate: Date
}

export interface RTITimelineEntry {
  date: Date
  status: string
  description: string
  officer?: string
  remarks?: string
}

export interface RTITemplate {
  id: string
  title: string
  category: string
  description: string
  informationSought: string
  department: string
  suggestedFee: number
  difficulty: "easy" | "medium" | "complex"
  successRate: number
  averageResponseTime: number
  relatedCases: string[]
}

export interface ComplaintApplication {
  id: string
  complainantName: string
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  complaintType: string
  targetDepartment: string
  issueDescription: string
  evidenceFiles: string[]
  requestedAction: string
  submissionDate: Date
  status: "submitted" | "acknowledged" | "under_investigation" | "resolved" | "closed"
  trackingNumber?: string
  assignedOfficer?: string
  updates: ComplaintUpdate[]
}

export interface ComplaintUpdate {
  date: Date
  status: string
  description: string
  officerRemarks?: string
  actionTaken?: string
}

// RTI Templates Database
export const rtiTemplates: RTITemplate[] = [
  {
    id: "municipal-budget",
    title: "Municipal Budget Information",
    category: "Financial Transparency",
    description: "Request detailed municipal budget allocation and expenditure information",
    informationSought: `1. Total budget allocation for the financial year [YEAR] for [WARD/AREA]
2. Detailed breakdown of infrastructure spending
3. List of approved projects with allocated amounts
4. Actual expenditure vs budgeted amounts for completed projects
5. Details of any budget revisions or reallocations`,
    department: "Municipal Corporation Finance Department",
    suggestedFee: 10,
    difficulty: "easy",
    successRate: 89,
    averageResponseTime: 25,
    relatedCases: ["Budget variance analysis", "Infrastructure spend tracking"],
  },
  {
    id: "road-work-details",
    title: "Road Construction Project Details",
    category: "Infrastructure Development",
    description: "Information about road construction and maintenance projects",
    informationSought: `1. Complete list of road construction/repair projects approved for [AREA] in [YEAR]
2. Tender documents for [SPECIFIC PROJECT NAME]
3. Name and details of awarded contractor
4. Project timeline with milestones
5. Quality inspection reports
6. Payment details to contractors
7. Details of any project delays and reasons`,
    department: "Public Works Department",
    suggestedFee: 10,
    difficulty: "medium",
    successRate: 76,
    averageResponseTime: 30,
    relatedCases: ["Contractor performance", "Project delays"],
  },
  {
    id: "water-supply-data",
    title: "Water Supply Infrastructure",
    category: "Public Utilities",
    description: "Information about water supply systems and quality",
    informationSought: `1. Water supply schedule for [AREA/WARD]
2. Water quality test reports for the last 6 months
3. Details of water treatment plants serving the area
4. Infrastructure upgrade plans
5. Complaints register related to water supply
6. Budget allocation for water supply improvements`,
    department: "Water Supply and Sewerage Board",
    suggestedFee: 10,
    difficulty: "easy",
    successRate: 82,
    averageResponseTime: 22,
    relatedCases: ["Water quality issues", "Supply schedule"],
  },
  {
    id: "sanitation-management",
    title: "Waste Management and Sanitation",
    category: "Public Health",
    description: "Information about waste collection and sanitation facilities",
    informationSought: `1. Waste collection schedule and routes for [AREA]
2. Details of waste processing facilities
3. Sanitation infrastructure (public toilets) in [AREA]
4. Contractor details for waste management
5. Citizen complaints related to sanitation
6. Budget allocation for sanitation improvements`,
    department: "Health and Sanitation Department",
    suggestedFee: 10,
    difficulty: "easy",
    successRate: 85,
    averageResponseTime: 20,
    relatedCases: ["Waste collection delays", "Public toilet maintenance"],
  },
  {
    id: "land-records",
    title: "Land and Property Records",
    category: "Revenue Administration",
    description: "Information about land records and property documentation",
    informationSought: `1. Survey settlement records for Survey No. [NUMBER]
2. Revenue records for property bearing [PROPERTY DETAILS]
3. Encumbrance certificate details
4. Land classification and usage permissions
5. Details of any pending litigation
6. Property tax assessment details`,
    department: "Revenue Department / Sub-Registrar Office",
    suggestedFee: 10,
    difficulty: "complex",
    successRate: 68,
    averageResponseTime: 35,
    relatedCases: ["Property disputes", "Tax assessments"],
  },
  {
    id: "education-infrastructure",
    title: "Educational Institution Infrastructure",
    category: "Education",
    description: "Information about school/college infrastructure and facilities",
    informationSought: `1. Infrastructure details of [SCHOOL/COLLEGE NAME]
2. Student enrollment and teacher strength
3. Facilities available (library, laboratory, playground)
4. Government grants and fund utilization
5. Infrastructure development plans
6. Details of any ongoing construction projects`,
    department: "Department of Public Instruction / Education",
    suggestedFee: 10,
    difficulty: "medium",
    successRate: 79,
    averageResponseTime: 28,
    relatedCases: ["School infrastructure", "Educational grants"],
  },
]

// Government Portal Integration Endpoints
export const governmentPortals = {
  rtionline: {
    name: "RTI Online Portal",
    url: "https://rtionline.gov.in",
    departments: ["Central Government", "Ministry Level"],
    apiEndpoint: "/api/rti-online",
  },
  pgportal: {
    name: "Public Grievance Portal",
    url: "https://pgportal.gov.in",
    departments: ["All Government Departments"],
    apiEndpoint: "/api/pg-portal",
  },
  lokpal: {
    name: "Lokpal of India",
    url: "https://lokpal.gov.in",
    departments: ["Anti-Corruption"],
    apiEndpoint: "/api/lokpal",
  },
  statePgPortal: {
    name: "State Public Grievance Portal",
    url: "https://[state].gov.in/grievance",
    departments: ["State Government Departments"],
    apiEndpoint: "/api/state-pg",
  },
}

// RTI Assistant Functions
export async function generateRTIApplication(
  templateId: string,
  userDetails: any,
  customizations: any,
): Promise<RTIApplication> {
  const template = rtiTemplates.find((t) => t.id === templateId)
  if (!template) throw new Error("Template not found")

  // Replace placeholders in template
  let informationSought = template.informationSought
  Object.keys(customizations).forEach((key) => {
    informationSought = informationSought.replace(`[${key.toUpperCase()}]`, customizations[key])
  })

  const application: RTIApplication = {
    id: `RTI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    applicantName: userDetails.name,
    applicantAddress: userDetails.address,
    contactInfo: {
      email: userDetails.email,
      phone: userDetails.phone,
    },
    targetDepartment: template.department,
    informationSought,
    reasonForInformation: "For transparency and accountability in public administration",
    applicationDate: new Date(),
    applicationFee: template.suggestedFee,
    paymentMode: "online",
    status: "draft",
    documents: [],
    timeline: [
      {
        date: new Date(),
        status: "Draft Created",
        description: "RTI application draft generated using NammaNagar assistant",
      },
    ],
  }

  return application
}

export async function submitRTIApplication(application: RTIApplication): Promise<{
  success: boolean
  trackingNumber?: string
  submissionDate?: Date
  portalReference?: string
  estimatedResponseDate?: Date
}> {
  // Simulate submission to government portal
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const success = Math.random() > 0.1 // 90% success rate

  if (success) {
    const trackingNumber = `RTI${Date.now().toString().slice(-8)}`
    const submissionDate = new Date()
    const estimatedResponseDate = new Date()
    estimatedResponseDate.setDate(estimatedResponseDate.getDate() + 30) // RTI response within 30 days

    return {
      success: true,
      trackingNumber,
      submissionDate,
      portalReference: `PG${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      estimatedResponseDate,
    }
  } else {
    return {
      success: false,
    }
  }
}

export async function trackRTIApplication(trackingNumber: string): Promise<{
  status: string
  lastUpdate: Date
  timeline: RTITimelineEntry[]
  expectedResponse?: Date
  nextAction?: string
}> {
  // Simulate tracking
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mockTimeline: RTITimelineEntry[] = [
    {
      date: new Date("2024-01-15"),
      status: "Application Submitted",
      description: "RTI application submitted successfully",
      officer: "Reception Desk",
    },
    {
      date: new Date("2024-01-17"),
      status: "Under Processing",
      description: "Application forwarded to concerned department",
      officer: "RTI Officer",
    },
    {
      date: new Date("2024-01-20"),
      status: "Information Compilation",
      description: "Relevant information being compiled from records",
      officer: "Department Officer",
      remarks: "Additional verification required for some records",
    },
  ]

  return {
    status: "Under Processing",
    lastUpdate: new Date("2024-01-20"),
    timeline: mockTimeline,
    expectedResponse: new Date("2024-02-14"),
    nextAction: "Wait for response or file first appeal if no response within 30 days",
  }
}

export async function generateComplaintApplication(
  complaintType: string,
  issueDetails: any,
  userDetails: any,
): Promise<ComplaintApplication> {
  const complaint: ComplaintApplication = {
    id: `COMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    complainantName: userDetails.name,
    contactInfo: userDetails,
    complaintType,
    targetDepartment: getDepartmentByComplaintType(complaintType),
    issueDescription: issueDetails.description,
    evidenceFiles: issueDetails.evidenceFiles || [],
    requestedAction: issueDetails.requestedAction,
    submissionDate: new Date(),
    status: "submitted",
    updates: [
      {
        date: new Date(),
        status: "Complaint Submitted",
        description: "Complaint submitted through NammaNagar platform",
      },
    ],
  }

  return complaint
}

export async function submitComplaintToPortal(
  complaint: ComplaintApplication,
  portal: string,
): Promise<{
  success: boolean
  trackingNumber?: string
  acknowledgmentNumber?: string
  expectedResolution?: Date
}> {
  // Simulate submission to government portal
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const success = Math.random() > 0.05 // 95% success rate

  if (success) {
    return {
      success: true,
      trackingNumber: `${portal.toUpperCase()}${Date.now().toString().slice(-8)}`,
      acknowledgmentNumber: `ACK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      expectedResolution: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    }
  } else {
    return {
      success: false,
    }
  }
}

// Helper Functions
function getDepartmentByComplaintType(complaintType: string): string {
  const departmentMapping: Record<string, string> = {
    road_infrastructure: "Public Works Department",
    water_supply: "Water Supply and Sewerage Board",
    electricity: "Electricity Board",
    sanitation: "Health and Sanitation Department",
    education: "Department of Public Instruction",
    healthcare: "Department of Health and Family Welfare",
    revenue: "Revenue Department",
    police: "Police Department",
    general: "General Administration Department",
  }

  return departmentMapping[complaintType] || "General Administration Department"
}

export function generateRTIFeeReceipt(application: RTIApplication): {
  receiptNumber: string
  amount: number
  paymentDate: Date
  paymentMethod: string
  applicationId: string
} {
  return {
    receiptNumber: `FEE-${Date.now().toString().slice(-8)}`,
    amount: application.applicationFee,
    paymentDate: new Date(),
    paymentMethod: application.paymentMode,
    applicationId: application.id,
  }
}

export function validateRTIApplication(application: RTIApplication): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  // Validation rules
  if (!application.applicantName.trim()) {
    errors.push("Applicant name is required")
  }

  if (!application.applicantAddress.trim()) {
    errors.push("Applicant address is required")
  }

  if (!application.contactInfo.email || !application.contactInfo.email.includes("@")) {
    errors.push("Valid email address is required")
  }

  if (!application.informationSought.trim()) {
    errors.push("Information sought cannot be empty")
  }

  if (application.informationSought.length < 50) {
    warnings.push("Information sought is quite brief. Consider adding more specific details.")
  }

  if (!application.targetDepartment.trim()) {
    errors.push("Target department must be specified")
  }

  // Check fee amount
  if (application.applicationFee < 10) {
    warnings.push("RTI application fee is typically ₹10 for most departments")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export async function getRelatedRTICases(keywords: string[]): Promise<{
  similarCases: any[]
  successTips: string[]
  commonPitfalls: string[]
}> {
  // Simulate searching for related cases
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    similarCases: [
      {
        title: "Municipal Budget Allocation Query",
        success: true,
        responseTime: 18,
        department: "Municipal Corporation",
        tip: "Be specific about financial year and ward number",
      },
      {
        title: "Road Project Details Request",
        success: true,
        responseTime: 25,
        department: "PWD",
        tip: "Include project ID or location details for faster response",
      },
    ],
    successTips: [
      "Be specific and precise in your information request",
      "Include all relevant details like dates, locations, and reference numbers",
      "Clearly state the purpose for which information is required",
      "Pay the correct fee amount through approved payment methods",
    ],
    commonPitfalls: [
      "Requesting too broad or vague information",
      "Not providing complete contact details",
      "Submitting to wrong department or officer",
      "Not following up within prescribed time limits",
    ],
  }
}
