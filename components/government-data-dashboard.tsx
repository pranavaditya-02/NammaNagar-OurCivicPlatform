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
  FolderSyncIcon as Sync,
} from "lucide-react"
import { fetchTenderData, fetchProjectProgress, syncGovernmentData } from "@/lib/government-api-integration"
import type { TenderData, ProjectProgress } from "@/lib/government-api-integration"

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

  useEffect(() => {
    loadTenderData()
  }, [])

  const loadTenderData = async () => {
    setLoading(true)
    try {
      const data = await fetchTenderData(filters)
      setTenderData(data)
    } catch (error) {
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
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Work in Progress":
        return "bg-blue-100 text-blue-800"
      case "Awarded":
        return "bg-purple-100 text-purple-800"
      case "Published":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600"
      case "In Progress":
        return "text-blue-600"
      case "Delayed":
        return "text-red-600"
      case "Pending":
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Government Data Integration</h2>
          <p className="text-gray-600">Real-time data from official tender portals and e-procurement systems</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSync} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Sync Data
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Sync Status */}
      {lastSync && (
        <Alert>
          <Sync className="h-4 w-4" />
          <AlertDescription>
            <strong>Last Sync:</strong> {lastSync} |<strong> Updated:</strong> {syncStats.tendersUpdated} tenders,{" "}
            {syncStats.projectsUpdated} projects |<strong> New:</strong> {syncStats.newTenders} tenders
          </AlertDescription>
        </Alert>
      )}

      {/* Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">eProcurement Portal</p>
                <p className="text-lg font-bold text-green-600">Connected</p>
              </div>
              <Database className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">GeM Portal</p>
                <p className="text-lg font-bold text-green-600">Active</p>
              </div>
              <Database className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">PFMS</p>
                <p className="text-lg font-bold text-green-600">Synced</p>
              </div>
              <Database className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">State Portals</p>
                <p className="text-lg font-bold text-blue-600">12 States</p>
              </div>
              <Database className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tenders">Live Tenders</TabsTrigger>
          <TabsTrigger value="projects">Project Progress</TabsTrigger>
          <TabsTrigger value="procurement">E-Procurement</TabsTrigger>
          <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tenders" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

          {/* Tender List */}
          <div className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                  <p>Loading tender data from government portals...</p>
                </CardContent>
              </Card>
            ) : (
              tenderData.map((tender) => (
                <Card key={tender.tenderId} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{tender.title}</CardTitle>
                        <CardDescription className="text-base mb-3">{tender.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {tender.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {tender.location.area}, {tender.location.district}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {tender.tenderId}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(tender.status)}>{tender.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Estimated Cost</p>
                        <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {tender.estimatedCost}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completion Date</p>
                        <p className="text-lg font-semibold flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(tender.workCompletionDate).toLocaleDateString()}
                        </p>
                      </div>
                      {tender.contractor && (
                        <div>
                          <p className="text-sm text-gray-600">Contractor</p>
                          <p className="text-lg font-semibold flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {tender.contractor.name}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Milestones */}
                    {tender.milestones.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Project Milestones</h4>
                        <div className="space-y-2">
                          {tender.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{milestone.description}</p>
                                <p className="text-sm text-gray-600">
                                  Target: {new Date(milestone.targetDate).toLocaleDateString()}
                                  {milestone.completionDate && (
                                    <span> | Completed: {new Date(milestone.completionDate).toLocaleDateString()}</span>
                                  )}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge className={getMilestoneStatusColor(milestone.status)} variant="outline">
                                  {milestone.status}
                                </Badge>
                                <p className="text-sm font-medium mt-1">{milestone.amount}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Portal
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
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

function ProjectProgressCard({ project }: { project: TenderData }) {
  const [progressData, setProgressData] = useState<ProjectProgress | null>(null)
  const [loading, setLoading] = useState(false)

  const loadProgress = async () => {
    setLoading(true)
    try {
      const data = await fetchProjectProgress(project.tenderId)
      setProgressData(data)
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
