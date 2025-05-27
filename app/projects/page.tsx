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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Infrastructure Projects</h1>
          <p className="text-xl text-gray-600">Track public infrastructure projects from multiple data sources</p>
        </div>

        {/* Data Source Alert */}
        <Alert className="mb-6">
          <Database className="h-4 w-4" />
          <AlertDescription>
            <strong>Live Data Integration:</strong> Projects are automatically synced from government tender portals,
            e-procurement systems, and local tracking. Last updated: {new Date().toLocaleString()}
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">All Projects</TabsTrigger>
            <TabsTrigger value="government">Government Data</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            {/* Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
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
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
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
                  <Button variant="outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div className="grid gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full bg-gray-100`}>
                          <project.icon className={`h-6 w-6 ${project.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {project.source}
                            </Badge>
                            {project.source === "Government Portal" && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                <Database className="h-3 w-3 mr-1" />
                                Live Data
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-base mb-3">{project.description}</CardDescription>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {project.ward}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {project.contractor}
                            </span>
                            {(project as any).department && (
                              <span className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {(project as any).department}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Progress and Timeline */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Start: {new Date(project.startDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            End: {new Date(project.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Budget Information */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Total Budget</p>
                            <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                              <IndianRupee className="h-4 w-4" />
                              {project.budget}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Allocated</p>
                            <p className="text-lg font-semibold text-blue-600 flex items-center gap-1">
                              <IndianRupee className="h-4 w-4" />
                              {project.allocated}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Track Progress
                          </Button>
                          {project.source === "Government Portal" && (
                            <Button variant="outline" size="sm">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Portal
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setSelectedStatus("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="government" className="space-y-6">
            <GovernmentDataDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
