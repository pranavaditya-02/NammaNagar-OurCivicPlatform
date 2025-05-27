// Smart Alert System for Automatic Authority Notification
export interface Authority {
  id: string
  name: string
  designation: string
  department: string
  jurisdiction: string
  contactInfo: {
    email: string
    phone: string
    whatsapp?: string
  }
  responsibleFor: string[]
  escalationLevel: number
  responseTimeTarget: number // in hours
  currentWorkload: number
  availability: "available" | "busy" | "unavailable"
}

export interface AlertRule {
  id: string
  issueType: string
  severity: string
  location: string
  primaryAuthority: string
  escalationChain: string[]
  timeoutHours: number
  notificationMethods: ("email" | "sms" | "whatsapp" | "app")[]
  autoEscalate: boolean
}

export interface AlertHistory {
  id: string
  reportId: string
  authorityId: string
  sentAt: Date
  method: string
  status: "sent" | "delivered" | "read" | "acknowledged" | "responded"
  responseTime?: number
  escalationLevel: number
}

export interface EscalationMatrix {
  level: number
  title: string
  authorities: string[]
  timeoutHours: number
  description: string
  urgencyMultiplier: number
}

// Authority Database
export const authorities: Authority[] = [
  {
    id: "ward-officer-001",
    name: "Rajesh Kumar",
    designation: "Ward Officer",
    department: "BBMP Ward 68",
    jurisdiction: "Koramangala Ward 68",
    contactInfo: {
      email: "rajesh.kumar@bbmp.gov.in",
      phone: "+91 9876543210",
      whatsapp: "+91 9876543210",
    },
    responsibleFor: ["general complaints", "sanitation", "street lighting", "parks"],
    escalationLevel: 1,
    responseTimeTarget: 24,
    currentWorkload: 15,
    availability: "available",
  },
  {
    id: "pwd-engineer-001",
    name: "Priya Sharma",
    designation: "Assistant Executive Engineer",
    department: "Public Works Department",
    jurisdiction: "South Bengaluru",
    contactInfo: {
      email: "priya.sharma@pwd.kar.gov.in",
      phone: "+91 9876543211",
      whatsapp: "+91 9876543211",
    },
    responsibleFor: ["roads", "bridges", "drainage", "construction"],
    escalationLevel: 2,
    responseTimeTarget: 48,
    currentWorkload: 23,
    availability: "busy",
  },
  {
    id: "water-engineer-001",
    name: "Suresh Reddy",
    designation: "Water Supply Engineer",
    department: "BWSSB",
    jurisdiction: "Koramangala Division",
    contactInfo: {
      email: "suresh.reddy@bwssb.gov.in",
      phone: "+91 9876543212",
    },
    responsibleFor: ["water supply", "sewerage", "water leaks", "pipe maintenance"],
    escalationLevel: 1,
    responseTimeTarget: 12,
    currentWorkload: 8,
    availability: "available",
  },
  {
    id: "bescom-officer-001",
    name: "Anita Reddy",
    designation: "Assistant Engineer",
    department: "BESCOM",
    jurisdiction: "HSR Layout Division",
    contactInfo: {
      email: "anita.reddy@bescom.gov.in",
      phone: "+91 9876543213",
      whatsapp: "+91 9876543213",
    },
    responsibleFor: ["electricity", "street lights", "power lines", "transformers"],
    escalationLevel: 1,
    responseTimeTarget: 24,
    currentWorkload: 12,
    availability: "available",
  },
  {
    id: "corporator-001",
    name: "Dr. Meera Nair",
    designation: "Corporator",
    department: "BBMP Council",
    jurisdiction: "Ward 68 & 69",
    contactInfo: {
      email: "meera.nair@bbmp.gov.in",
      phone: "+91 9876543214",
      whatsapp: "+91 9876543214",
    },
    responsibleFor: ["policy decisions", "budget allocation", "major projects"],
    escalationLevel: 3,
    responseTimeTarget: 72,
    currentWorkload: 45,
    availability: "busy",
  },
]

// Alert Rules Configuration
export const alertRules: AlertRule[] = [
  {
    id: "road-emergency",
    issueType: "roads",
    severity: "critical",
    location: "any",
    primaryAuthority: "pwd-engineer-001",
    escalationChain: ["ward-officer-001", "corporator-001"],
    timeoutHours: 6,
    notificationMethods: ["email", "sms", "whatsapp", "app"],
    autoEscalate: true,
  },
  {
    id: "water-emergency",
    issueType: "water",
    severity: "critical",
    location: "any",
    primaryAuthority: "water-engineer-001",
    escalationChain: ["ward-officer-001", "corporator-001"],
    timeoutHours: 3,
    notificationMethods: ["email", "sms", "whatsapp", "app"],
    autoEscalate: true,
  },
  {
    id: "electricity-routine",
    issueType: "electricity",
    severity: "medium",
    location: "any",
    primaryAuthority: "bescom-officer-001",
    escalationChain: ["ward-officer-001"],
    timeoutHours: 24,
    notificationMethods: ["email", "app"],
    autoEscalate: true,
  },
  {
    id: "general-complaint",
    issueType: "general",
    severity: "low",
    location: "any",
    primaryAuthority: "ward-officer-001",
    escalationChain: ["corporator-001"],
    timeoutHours: 72,
    notificationMethods: ["email"],
    autoEscalate: false,
  },
]

// Escalation Matrix
export const escalationMatrix: EscalationMatrix[] = [
  {
    level: 1,
    title: "Primary Response",
    authorities: ["ward-officer", "department-engineer"],
    timeoutHours: 24,
    description: "Initial response from relevant department officer",
    urgencyMultiplier: 1.0,
  },
  {
    level: 2,
    title: "Supervisory Escalation",
    authorities: ["assistant-engineer", "section-officer"],
    timeoutHours: 48,
    description: "Escalation to supervisory level for persistent issues",
    urgencyMultiplier: 1.5,
  },
  {
    level: 3,
    title: "Administrative Escalation",
    authorities: ["corporator", "executive-engineer"],
    timeoutHours: 72,
    description: "Administrative intervention for unresolved critical issues",
    urgencyMultiplier: 2.0,
  },
  {
    level: 4,
    title: "Political Escalation",
    authorities: ["mla", "district-collector"],
    timeoutHours: 96,
    description: "High-level political intervention for systemic issues",
    urgencyMultiplier: 3.0,
  },
]

// Smart Alert Functions
export async function sendSmartAlert(
  reportId: string,
  issueType: string,
  severity: string,
  location: string,
  description: string,
): Promise<{
  alertsSent: number
  authorities: Authority[]
  estimatedResponseTime: number
  escalationScheduled: boolean
}> {
  // Find applicable alert rule
  const rule = alertRules.find((r) => r.issueType === issueType && r.severity === severity) || alertRules[3]

  // Get primary authority
  const primaryAuth = authorities.find((a) => a.id === rule.primaryAuthority)
  if (!primaryAuth) throw new Error("Primary authority not found")

  // Calculate estimated response time based on workload and availability
  let estimatedResponseTime = primaryAuth.responseTimeTarget
  if (primaryAuth.availability === "busy") estimatedResponseTime *= 1.5
  if (primaryAuth.currentWorkload > 20) estimatedResponseTime *= 1.2

  // Send notifications
  const notificationResults = await sendNotifications(primaryAuth, rule, reportId, description)

  // Schedule escalation if enabled
  let escalationScheduled = false
  if (rule.autoEscalate) {
    await scheduleEscalation(reportId, rule, 0)
    escalationScheduled = true
  }

  return {
    alertsSent: notificationResults.length,
    authorities: [primaryAuth],
    estimatedResponseTime,
    escalationScheduled,
  }
}

export async function sendNotifications(
  authority: Authority,
  rule: AlertRule,
  reportId: string,
  description: string,
): Promise<AlertHistory[]> {
  const notifications: AlertHistory[] = []

  for (const method of rule.notificationMethods) {
    const alertHistory: AlertHistory = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      reportId,
      authorityId: authority.id,
      sentAt: new Date(),
      method,
      status: "sent",
      escalationLevel: 0,
    }

    try {
      switch (method) {
        case "email":
          await sendEmail(authority.contactInfo.email, reportId, description)
          alertHistory.status = "delivered"
          break
        case "sms":
          await sendSMS(authority.contactInfo.phone, reportId, description)
          alertHistory.status = "delivered"
          break
        case "whatsapp":
          if (authority.contactInfo.whatsapp) {
            await sendWhatsApp(authority.contactInfo.whatsapp, reportId, description)
            alertHistory.status = "delivered"
          }
          break
        case "app":
          await sendAppNotification(authority.id, reportId, description)
          alertHistory.status = "delivered"
          break
      }
    } catch (error) {
      console.error(`Failed to send ${method} notification:`, error)
    }

    notifications.push(alertHistory)
  }

  return notifications
}

export async function scheduleEscalation(reportId: string, rule: AlertRule, currentLevel: number): Promise<void> {
  const timeoutMs = rule.timeoutHours * 60 * 60 * 1000

  setTimeout(async () => {
    // Check if issue is still unresolved
    const isResolved = await checkReportStatus(reportId)
    if (!isResolved && currentLevel < rule.escalationChain.length) {
      await escalateToNextLevel(reportId, rule, currentLevel + 1)
    }
  }, timeoutMs)
}

export async function escalateToNextLevel(reportId: string, rule: AlertRule, escalationLevel: number): Promise<void> {
  if (escalationLevel > rule.escalationChain.length) return

  const nextAuthorityId = rule.escalationChain[escalationLevel - 1]
  const nextAuthority = authorities.find((a) => a.id === nextAuthorityId)

  if (nextAuthority) {
    const escalationMessage = `ESCALATED ISSUE: Report ${reportId} requires immediate attention. Previous level failed to respond within ${rule.timeoutHours} hours.`

    await sendNotifications(nextAuthority, rule, reportId, escalationMessage)

    // Schedule next escalation if available
    if (escalationLevel < rule.escalationChain.length) {
      await scheduleEscalation(reportId, rule, escalationLevel)
    }
  }
}

// Notification Implementations
async function sendEmail(email: string, reportId: string, description: string): Promise<void> {
  // Simulate email sending
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(`Email sent to ${email} for report ${reportId}`)
}

async function sendSMS(phone: string, reportId: string, description: string): Promise<void> {
  // Simulate SMS sending
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log(`SMS sent to ${phone} for report ${reportId}`)
}

async function sendWhatsApp(phone: string, reportId: string, description: string): Promise<void> {
  // Simulate WhatsApp sending
  await new Promise((resolve) => setTimeout(resolve, 400))
  console.log(`WhatsApp sent to ${phone} for report ${reportId}`)
}

async function sendAppNotification(authorityId: string, reportId: string, description: string): Promise<void> {
  // Simulate app notification
  await new Promise((resolve) => setTimeout(resolve, 200))
  console.log(`App notification sent to ${authorityId} for report ${reportId}`)
}

async function checkReportStatus(reportId: string): Promise<boolean> {
  // Simulate checking if report is resolved
  await new Promise((resolve) => setTimeout(resolve, 100))
  return Math.random() > 0.7 // 30% chance of being resolved
}

// Authority Management Functions
export function getAuthoritiesByJurisdiction(location: string): Authority[] {
  return authorities.filter((auth) => auth.jurisdiction.toLowerCase().includes(location.toLowerCase()))
}

export function getAuthorityByIssueType(issueType: string, location: string): Authority | null {
  const relevantAuthorities = getAuthoritiesByJurisdiction(location)
  return relevantAuthorities.find((auth) => auth.responsibleFor.includes(issueType)) || null
}

export function calculateAuthorityWorkload(authorityId: string): {
  currentLoad: number
  capacity: number
  efficiency: number
  avgResponseTime: number
} {
  const authority = authorities.find((a) => a.id === authorityId)
  if (!authority) throw new Error("Authority not found")

  return {
    currentLoad: authority.currentWorkload,
    capacity: 50, // Assume max capacity of 50 issues
    efficiency: Math.max(0, 100 - authority.currentWorkload * 2),
    avgResponseTime: authority.responseTimeTarget * (authority.currentWorkload / 30),
  }
}
