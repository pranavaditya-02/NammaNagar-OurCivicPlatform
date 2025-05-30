"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Building2,
  FileText,
  IndianRupee,
  Calendar,
  MapPin,
  Users,
  RefreshCw,
  Download,
  ExternalLink,
  Database,
  FolderSync,
  Activity,
  ShoppingCart,
  BarChart2
} from "lucide-react"
import { fetchTenderData, fetchProjectProgress, syncGovernmentData } from "@/lib/government-api-integration"
import type { TenderData as APITenderData, ProjectProgress as APIProjectProgress } from "@/lib/government-api-integration"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

// Add these interfaces before the SAMPLE_TENDERS data
interface Location {
  state?: string
  district?: string
  area: string
  pincode?: string
}

interface Contractor {
  name: string
  registrationNumber?: string
  contactInfo?: string
}

interface Milestone {
  description: string
  targetDate: string
  completionDate?: string
  status: string
  amount: string
}

interface TenderData {
  tenderId: string
  title: string
  description: string
  department: string
  location: Location
  status: string
  estimatedCost: string
  workCompletionDate: string
  contractor?: Contractor
  milestones: Milestone[]
}

interface ProjectProgress {
  tenderId: string
  physicalProgress: number
  financialProgress: number
  timeProgress: number
  qualityRating: number
  lastUpdated: string
  issues: {
    type: string
    description: string
    severity: string
  }[]
}

const SAMPLE_TENDERS: TenderData[] = [
  {
    tenderId: "TND-2025-001",
    title: "Smart Traffic Management System Implementation",
    description: "Installation of AI-powered traffic signals and monitoring systems across major junctions",
    department: "Urban Transportation",
    location: { area: "Central Business District" },
    status: "Published",
    estimatedCost: "12.5 Cr",
    workCompletionDate: "2025-12-31",
    contractor: { name: "SmartCity Solutions Ltd." },
    milestones: [
      {
        description: "System Design and Planning",
        targetDate: "2025-06-30",
        status: "In Progress",
        amount: "₹2.5 Cr"
      },
      {
        description: "Hardware Installation",
        targetDate: "2025-09-30",
        status: "Pending",
        amount: "₹6 Cr"
      }
    ]
  },
  {
    tenderId: "TND-2025-002",
    title: "Urban Water Conservation Project",
    description: "Implementation of rainwater harvesting systems in public buildings",
    department: "Water Resources",
    location: {
      state: "Karnataka",
      district: "Bangalore Urban",
      area: "Multiple Wards",
      pincode: "560001"
    },
    status: "Work in Progress",
    estimatedCost: "8.3 Cr",
    workCompletionDate: "2025-08-15",
    contractor: { 
      name: "EcoWater Systems",
      registrationNumber: "REG-2024-789",
      contactInfo: "contact@ecowater.com"
    },
    milestones: [
      {
        description: "Site Assessment",
        targetDate: "2025-04-15",
        completionDate: "2025-04-10",
        status: "Completed",
        amount: "₹1.2 Cr"
      }
    ]
  },
  {
    tenderId: "TND-2025-003",
    title: "Public Park Renovation",
    description: "Comprehensive renovation of city parks with modern amenities",
    department: "Parks and Recreation",
    location: { area: "South Zone" },
    status: "Awarded",
    estimatedCost: "5.7 Cr",
    workCompletionDate: "2025-07-30",
    contractor: { name: "GreenSpace Developers" },
    milestones: [
      {
        description: "Design Approval",
        targetDate: "2025-05-01",
        status: "In Progress",
        amount: "₹0.8 Cr"
      }
    ]
  }
]

const SAMPLE_PROGRESS: ProjectProgress[] = [
  {
    tenderId: "TND-2025-002",
    physicalProgress: 45,
    financialProgress: 38,
    timeProgress: 42,
    qualityRating: 4.2,
    lastUpdated: new Date().toISOString(),
    issues: [
      {
        type: "Material Delay",
        description: "Delay in raw material delivery affecting timeline",
        severity: "Medium"
      }
    ]
  },
  {
    tenderId: "TND-2025-003",
    physicalProgress: 22,
    financialProgress: 25,
    timeProgress: 20,
    qualityRating: 4.5,
    lastUpdated: new Date().toISOString(),
    issues: [
      {
        type: "Weather Impact",
        description: "Recent rains causing minor delays",
        severity: "Low"
      }
    ]
  }
]

export function GovernmentDataDashboard() {
  const [tenderData, setTenderData] = useState<TenderData[]>([])
  const [loading, setLoading] = useState(false)
  const [lastSync, setLastSync] = useState<string>("")
  const [filters, setFilters] = useState({
    state: "all",
    district: "all",
    category: "all",
    status: "all",
  })

  const [syncStats, setSyncStats] = useState({
    tendersUpdated: 0,
    projectsUpdated: 0,
    newTenders: 0,
    lastSyncTime: "",
  })

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call with sample data
    setTenderData(SAMPLE_TENDERS)
  }, [])

  const loadTenderData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTenderData(filters)
      setTenderData(data)
    } catch (error) {
      setError("Failed to load tender data. Please try again.")
      console.error("Failed to load tender data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    setLoading(true)
    try {
      const stats = await syncGovernmentData()
      setSyncStats(stats)
      setLastSync(new Date().toLocaleString())
      await loadTenderData()
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "work in progress":
        return "bg-blue-100 text-blue-800"
      case "awarded":
        return "bg-purple-100 text-purple-800"
      case "published":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600"
      case "in progress":
        return "text-blue-600"
      case "delayed":
        return "text-red-600"
      case "pending":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  // Filter options with non-empty values
  const filterOptions = {
    states: [
      { value: "all", label: "All States" },
      { value: "karnataka", label: "Karnataka" },
      { value: "maharashtra", label: "Maharashtra" },
      { value: "tamil-nadu", label: "Tamil Nadu" },
    ],
    categories: [
      { value: "all", label: "All Categories" },
      { value: "roads", label: "Roads" },
      { value: "water", label: "Water" },
      { value: "buildings", label: "Buildings" },
    ],
    status: [
      { value: "all", label: "All Status" },
      { value: "published", label: "Published" },
      { value: "in-progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
    ],
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900">Government Data Integration</h2>
          <p className="text-sm sm:text-base text-gray-600">Real-time data from official tender portals</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <Button onClick={handleSync} disabled={loading} className="flex-1 sm:flex-none text-xs sm:text-sm">
            <RefreshCw className={`mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 ${loading ? "animate-spin" : ""}`} />
            Sync Data
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Download className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Responsive Sync Status */}
      {lastSync && (
        <Alert className="text-xs sm:text-sm">
          <FolderSync className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span><strong>Last Sync:</strong> {lastSync}</span>
            <span className="hidden sm:inline">|</span>
            <span><strong>Updated:</strong> {syncStats.tendersUpdated} tenders, {syncStats.projectsUpdated} projects</span>
            <span className="hidden sm:inline">|</span>
            <span><strong>New:</strong> {syncStats.newTenders} tenders</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Responsive Data Sources Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        {[
          { title: "eProcurement Portal", status: "Connected" },
          { title: "GeM Portal", status: "Active" },
          { title: "PFMS", status: "Synced" },
          { title: "State Portals", status: "12 States" }
        ].map((source, index) => (
          <Card key={index}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{source.title}</p>
                  <p className="text-sm sm:text-lg font-bold text-green-600">{source.status}</p>
                </div>
                <Database className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Responsive Tabs */}
      <Tabs defaultValue="tenders" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="tenders">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline text-xs sm:text-sm">Live Tenders</span>
            <span className="sr-only sm:hidden">Live Tenders</span>
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline text-xs sm:text-sm">Project Progress</span>
            <span className="sr-only">Project Progress</span>
          </TabsTrigger>
          <TabsTrigger value="procurement">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline text-xs sm:text-sm">E-Procurement</span>
            <span className="sr-only">E-Procurement</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" >
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline text-xs sm:text-sm">Data Analytics</span>
            <span className="sr-only">Data Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tenders" className="space-y-4">
          {/* Filters Card */}
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                <Select
                  value={filters.state || "all"}
                  onValueChange={(value) => setFilters({ ...filters, state: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.states.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.category || "all"}
                  onValueChange={(value) => setFilters({ ...filters, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.categories.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.status || "all"}
                  onValueChange={(value) => setFilters({ ...filters, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.status.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button onClick={loadTenderData} disabled={loading}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tender Cards */}
          <div className="space-y-3 sm:space-y-4">
            {loading ? (
              <Card>
                <CardContent className="p-4 text-center">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                  <p className="text-sm">Loading tender data...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              tenderData.map((tender) => (
                <Card key={tender.tenderId} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-3 sm:p-4">
                    {/* Header Section */}
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-sm sm:text-lg lg:text-xl flex-1">{tender.title}</CardTitle>
                        <Badge className={`${getStatusColor(tender.status)} text-[10px] sm:text-xs whitespace-nowrap mt-0.5`}>
                          {tender.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-[11px] sm:text-sm line-clamp-2">
                        {tender.description}
                      </CardDescription>
                      
                      {/* Project Details */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] sm:text-xs text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          <span className="truncate">{tender.department}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          <span className="truncate">{tender.location.area}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                          <span className="truncate">{tender.tenderId}</span>
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-3 sm:p-4 space-y-4">
                    {/* Cost and Timeline Section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <p className="text-[10px] sm:text-xs text-gray-500">Estimated Cost</p>
                        <p className="text-xs sm:text-base font-medium text-green-600 flex items-center gap-1">
                          <IndianRupee className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {tender.estimatedCost}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] sm:text-xs text-gray-500">Due Date</p>
                        <p className="text-xs sm:text-base font-medium flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {new Date(tender.workCompletionDate).toLocaleDateString()}
                        </p>
                      </div>
                      {tender.contractor && (
                        <div className="space-y-1 col-span-2 sm:col-span-1">
                          <p className="text-[10px] sm:text-xs text-gray-500">Contractor</p>
                          <p className="text-xs sm:text-base font-medium flex items-center gap-1">
                            <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            <span className="truncate">{tender.contractor.name}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Milestones Section */}
                    {tender.milestones.length > 0 && (
                      <div className="pt-1">
                        <h4 className="text-xs sm:text-sm font-medium mb-2">Project Milestones</h4>
                        <div className="space-y-2">
                          {tender.milestones.map((milestone, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded-lg">
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-[11px] sm:text-sm font-medium flex-1">{milestone.description}</p>
                                  <Badge className={`${getMilestoneStatusColor(milestone.status)} text-[10px] sm:text-xs`} variant="outline">
                                    {milestone.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                                  <span>Target: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                                  <span className="font-medium">{milestone.amount}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-[10px] sm:text-xs h-7 sm:h-8">
                        <ExternalLink className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        View on Portal
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-[10px] sm:text-xs h-7 sm:h-8">
                        <FileText className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Documents
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-[10px] sm:text-xs h-7 sm:h-8">
                        <MapPin className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Track Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {tenderData
              .filter((t) => t.status === "Work in Progress")
              .map((project) => (
                <ProjectProgressCard key={project.tenderId} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="procurement" className="space-y-4">
          <EProcurementSection />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <DataAnalyticsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ProjectProgressCardProps {
  project: TenderData
}

function ProjectProgressCard({ project }: ProjectProgressCardProps) {
  const [progressData, setProgressData] = useState<ProjectProgress | null>(null)
  const [loading, setLoading] = useState(false)

  const loadProgress = async () => {
    setLoading(true)
    try {
      // Simulate API call with sample data
      const data = SAMPLE_PROGRESS.find(p => p.tenderId === project.tenderId)
      setProgressData(data || null)
    } catch (error) {
      console.error("Failed to load progress:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProgress()
  }, [project.tenderId])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription>{project.contractor?.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-4">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading progress data...</p>
          </div>
        ) : progressData ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Physical Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={progressData.physicalProgress} className="flex-1" />
                  <span className="text-sm font-medium">{progressData.physicalProgress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Financial Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={progressData.financialProgress} className="flex-1" />
                  <span className="text-sm font-medium">{progressData.financialProgress}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Time Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={progressData.timeProgress} className="flex-1" />
                  <span className="text-sm font-medium">{progressData.timeProgress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Quality Rating</p>
                <div className="flex items-center gap-2">
                  <Progress value={progressData.qualityRating * 20} className="flex-1" />
                  <span className="text-sm font-medium">{progressData.qualityRating}/5</span>
                </div>
              </div>
            </div>

            {progressData.issues.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Current Issues</h4>
                <div className="space-y-2">
                  {progressData.issues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <div>
                        <p className="text-sm font-medium">{issue.type}</p>
                        <p className="text-xs text-gray-600">{issue.description}</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">{issue.severity}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500">Last updated: {new Date(progressData.lastUpdated).toLocaleString()}</p>
          </>
        ) : (
          <p className="text-sm text-gray-500">No progress data available</p>
        )}
      </CardContent>
    </Card>
  )
}

function EProcurementSection() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>GeM (Government e-Marketplace) Integration</CardTitle>
          <CardDescription>Real-time procurement data from government marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">₹2,847 Cr</p>
              <p className="text-sm text-gray-600">Total Procurement Value</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">15,234</p>
              <p className="text-sm text-gray-600">Active Orders</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">1,456</p>
              <p className="text-sm text-gray-600">Registered Suppliers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>PFMS (Public Financial Management System)</CardTitle>
          <CardDescription>Financial tracking and budget utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Budget Utilization</span>
              <span className="font-bold">76.3%</span>
            </div>
            <Progress value={76.3} className="h-3" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-blue-600">₹19,000 Cr</p>
                <p className="text-xs text-gray-600">Total Allocation</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">₹14,500 Cr</p>
                <p className="text-xs text-gray-600">Utilized</p>
              </div>
              <div>
                <p className="text-lg font-bold text-orange-600">₹4,500 Cr</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DataAnalyticsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tender Analytics</CardTitle>
          <CardDescription>Insights from government tender data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Road Infrastructure</span>
              <div className="flex items-center gap-2">
                <Progress value={45} className="w-20 h-2" />
                <span className="text-sm font-medium">45%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Water Infrastructure</span>
              <div className="flex items-center gap-2">
                <Progress value={25} className="w-20 h-2" />
                <span className="text-sm font-medium">25%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Building Construction</span>
              <div className="flex items-center gap-2">
                <Progress value={20} className="w-20 h-2" />
                <span className="text-sm font-medium">20%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Others</span>
              <div className="flex items-center gap-2">
                <Progress value={10} className="w-20 h-2" />
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Project completion and efficiency stats</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">87%</p>
              <p className="text-xs text-gray-600">On-time Completion</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">92%</p>
              <p className="text-xs text-gray-600">Budget Adherence</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xl font-bold text-purple-600">4.2/5</p>
              <p className="text-xs text-gray-600">Quality Rating</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-xl font-bold text-orange-600">156</p>
              <p className="text-xs text-gray-600">Active Projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
