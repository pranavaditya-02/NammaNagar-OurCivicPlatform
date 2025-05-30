"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MapPin,
  Search,
  Calendar,
  IndianRupee,
  Users,
  Clock,
  Building,
  Droplets,
  Database,
  ExternalLink,
} from "lucide-react"
import { GovernmentDataDashboard } from "@/components/government-data-dashboard"
import { fetchTenderData } from "@/lib/government-api-integration"
import type { TenderData } from "@/lib/government-api-integration"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [governmentProjects, setGovernmentProjects] = useState<TenderData[]>([])
  const [loading, setLoading] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)

  // Local projects data (existing)
  const localProjects = [
    {
      id: "PRJ-001",
      name: "Koramangala Road Widening Project",
      description: "Widening of main road from 2 lanes to 4 lanes with proper drainage and footpaths",
      category: "Roads",
      status: "In Progress",
      progress: 75,
      budget: "₹15.2 Cr",
      allocated: "₹11.4 Cr",
      startDate: "2023-06-15",
      endDate: "2024-03-30",
      contractor: "ABC Infrastructure Ltd.",
      ward: "Koramangala Ward 68",
      icon: Building,
      color: "text-blue-600",
      source: "Local Tracking",
    },
    {
      id: "PRJ-002",
      name: "HSR Layout Drainage System Upgrade",
      description: "Complete overhaul of drainage system to prevent waterlogging during monsoons",
      category: "Water",
      status: "In Progress",
      progress: 45,
      budget: "₹8.5 Cr",
      allocated: "₹3.8 Cr",
      startDate: "2023-09-01",
      endDate: "2024-04-15",
      contractor: "XYZ Constructions",
      ward: "HSR Layout Ward 185",
      icon: Droplets,
      color: "text-blue-500",
      source: "Local Tracking",
    },
  ]

  useEffect(() => {
    loadGovernmentProjects()
  }, [])

  const loadGovernmentProjects = async () => {
    setLoading(true)
    try {
      const data = await fetchTenderData()
      setGovernmentProjects(data)
      setLastSyncTime(new Date()) // Set the last sync time
    } catch (error) {
      console.error("Failed to load government projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
      case "Work in Progress":
        return "bg-blue-100 text-blue-800"
      case "Near Completion":
        return "bg-purple-100 text-purple-800"
      case "Planning":
      case "Published":
        return "bg-yellow-100 text-yellow-800"
      case "Delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Convert government tender data to project format
  const convertedGovProjects = governmentProjects.map((tender) => ({
    id: tender.tenderId,
    name: tender.title,
    description: tender.description,
    category: tender.category.replace(" Infrastructure", ""),
    status: tender.status,
    progress:
      tender.status === "Completed"
        ? 100
        : tender.status === "Work in Progress"
          ? 65
          : tender.status === "Awarded"
            ? 25
            : 10,
    budget: tender.estimatedCost,
    allocated: tender.estimatedCost, // Simplified
    startDate: tender.publishDate,
    endDate: tender.workCompletionDate,
    contractor: tender.contractor?.name || "TBD",
    ward: `${tender.location.area}, ${tender.location.district}`,
    icon: Building,
    color: "text-green-600",
    source: "Government Portal",
    tenderId: tender.tenderId,
    department: tender.department,
  }))

  // Combine local and government projects
  const allProjects = [...localProjects, ...convertedGovProjects]

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.ward.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || project.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesStatus = selectedStatus === "all" || project.status.toLowerCase().replace(" ", "-") === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Responsive Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Infrastructure Projects</h1>
          <p className="text-sm sm:text-xl text-gray-600">Track public infrastructure projects from multiple data sources</p>
        </div>

        {/* Responsive Alert */}
        <Alert className="mb-4 sm:mb-6">
          <Database className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${loading ? "animate-spin" : ""}`} />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1 sm:gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-sm font-medium">Live Data Integration:</span>
              <span className="text-[10px] sm:text-sm text-gray-600 hidden sm:inline">
                Projects synced from government portals
              </span>
              <span className="text-[10px] sm:text-sm text-gray-600 inline sm:hidden">
                Govt. portal sync
              </span>
            </div>
            {lastSyncTime && (
              <span className="text-[10px] sm:text-xs text-gray-500">
                Last sync: {lastSyncTime.toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            )}
          </AlertDescription>
        </Alert>

        {/* Responsive Tabs and Filters */}
        <Tabs defaultValue="projects" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects" className="text-xs sm:text-sm py-2">All Projects</TabsTrigger>
            <TabsTrigger value="government" className="text-xs sm:text-sm py-2">Government Data</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4 sm:space-y-6">
            {/* Mobile-friendly Filters */}
            <Card className="mb-4 sm:mb-8">
              <CardContent className="p-3 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 h-9 text-sm"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="roads">Roads</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="parks">Parks</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="near-completion">Near Completion</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-9">
                    <MapPin className="mr-2 h-4 w-4" />
                    View Map
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile-optimized Project Cards */}
            <div className="grid gap-3 sm:gap-6">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="hover:shadow-lg transition-shadow mx-auto sm:mx-0 w-[380px] sm:w-full"
                >
                  <CardHeader className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {/* Project Header */}
                      <div className="flex items-start gap-2 sm:gap-3 w-full">
                        <div className="p-1.5 sm:p-3 rounded-full bg-gray-100">
                          <project.icon className={`h-3.5 w-3.5 sm:h-6 sm:w-6 ${project.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="space-y-1 sm:space-y-1.5">
                              <h3 className="font-semibold text-sm sm:text-xl truncate">{project.name}</h3>
                              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                <Badge variant="outline" className="text-[10px] sm:text-xs">
                                  {project.source}
                                </Badge>
                                {project.source === "Government Portal" && (
                                  <Badge variant="outline" className="text-[10px] sm:text-xs bg-green-50 text-green-700">
                                    <Database className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                    Live
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Badge 
                              className={`
                                ${getStatusColor(project.status)} 
                                text-[10px] sm:text-xs 
                                shrink-0 
                                px-2 sm:px-3
                                w-fit sm:w-auto
                              `}
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="mt-2 sm:mt-4 space-y-3">
                      <p className="text-xs sm:text-base text-gray-600 line-clamp-2">{project.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                          <span className="truncate">{project.ward}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                          <span className="truncate">{project.contractor}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                          <span className="truncate">Due: {project.endDate}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                          <span className="truncate">{project.budget}</span>
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-3 sm:p-6 pt-0">
                    {/* Progress and Actions */}
                    <div className="grid sm:flex sm:items-center gap-3 sm:gap-6">
                      <div className="flex-1 space-y-1 sm:space-y-2">
                        <div className="flex justify-between text-[10px] sm:text-sm mb-1">
                          <span className="font-medium">Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1 sm:h-2" />
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto h-6 sm:h-9 text-[10px] sm:text-sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="government" className="space-y-6">
            <GovernmentDataDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
