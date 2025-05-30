"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Heart,
  Users,
  Calendar,
  IndianRupee,
  Phone,
  Mail,
  Star,
  Camera,
  FileText,
  CheckCircle,
  TrendingUp,
  HelpCircle,
} from "lucide-react"
import { adoptableSpots, type AdoptableSpot } from "@/lib/adopt-a-spot"
import { useLanguage } from "@/components/language-context"

export function AdoptASpotDashboard() {
  const { t } = useLanguage()
  const [selectedSpot, setSelectedSpot] = useState<AdoptableSpot | null>(null)
  const [filterType, setFilterType] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSpots = adoptableSpots.filter((spot) => {
    const matchesType = !filterType || spot.type === filterType
    const matchesStatus = !filterStatus || spot.adoptionStatus === filterStatus
    const matchesSearch =
      !searchTerm ||
      spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.location.address.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesStatus && matchesSearch
  })

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "adopted":
        return "bg-blue-100 text-blue-800"
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "park":
        return "🌳"
      case "school":
        return "🏫"
      case "road":
        return "🛣️"
      case "hospital":
        return "🏥"
      case "library":
        return "📚"
      case "bus_stop":
        return "🚌"
      case "market":
        return "🏪"
      default:
        return "📍"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🛠️ Adopt a Spot Initiative</h1>
        <p className="text-xl text-gray-600">Take ownership of public spaces and drive long-term change</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
            <p className="text-sm text-gray-600">Available Spots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
            <p className="text-sm text-gray-600">Adopted Spots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">456</div>
            <p className="text-sm text-gray-600">Active Adopters</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">₹2.3Cr</div>
            <p className="text-sm text-gray-600">Impact Generated</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="available" className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Available Spots</span>
            <span className="sr-only">Available Spots</span>
          </TabsTrigger>
          <TabsTrigger value="my-adoptions" className="flex items-center justify-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">My Adoptions</span>
            <span className="sr-only">My Adoptions</span>
          </TabsTrigger>
          <TabsTrigger value="success-stories" className="flex items-center justify-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Success Stories</span>
            <span className="sr-only">Success Stories</span>
          </TabsTrigger>
          <TabsTrigger value="how-it-works" className="flex items-center justify-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">How It Works</span>
            <span className="sr-only">How It Works</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  placeholder="Search spots..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="park">Parks</SelectItem>
                    <SelectItem value="school">Schools</SelectItem>
                    <SelectItem value="road">Roads</SelectItem>
                    <SelectItem value="hospital">Hospitals</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="adopted">Adopted</SelectItem>
                    <SelectItem value="pending_approval">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Spots Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot) => (
              <Card key={spot.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getTypeIcon(spot.type)}</span>
                      <div>
                        <CardTitle className="text-lg">{spot.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {spot.location.ward}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(spot.adoptionStatus)}>
                      {spot.adoptionStatus.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{spot.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Condition</span>
                    <Badge className={getConditionColor(spot.currentCondition)}>{spot.currentCondition}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Key Metrics</span>
                      <span>{spot.keyMetrics.length} tracked</span>
                    </div>
                    {spot.keyMetrics.slice(0, 2).map((metric, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{metric.name}</span>
                          <span>
                            {metric.currentValue}/{metric.targetValue} {metric.unit}
                          </span>
                        </div>
                        <Progress value={(metric.currentValue / metric.targetValue) * 100} className="h-1" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />₹{(spot.estimatedBudget / 100000).toFixed(1)}L/year
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Min 2 years
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="flex-1"
                          onClick={() => setSelectedSpot(spot)}
                          disabled={spot.adoptionStatus === "adopted"}
                        >
                          {spot.adoptionStatus === "adopted" ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Adopted
                            </>
                          ) : (
                            <>
                              <Heart className="mr-2 h-4 w-4" />
                              Adopt This Spot
                            </>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="text-2xl">{getTypeIcon(spot.type)}</span>
                            {spot.name}
                          </DialogTitle>
                        </DialogHeader>
                        <SpotDetailView spot={spot} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-adoptions" className="space-y-6">
          <MyAdoptionsView />
        </TabsContent>

        <TabsContent value="success-stories" className="space-y-6">
          <SuccessStoriesView />
        </TabsContent>

        <TabsContent value="how-it-works" className="space-y-6">
          <HowItWorksView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SpotDetailView({ spot }: { spot: AdoptableSpot }) {
  return (
    <div className="space-y-6">
      {/* Images */}
      <div className="grid grid-cols-2 gap-4">
        {spot.images.map((image, index) => (
          <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <Camera className="h-8 w-8 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Location Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Address:</strong> {spot.location.address}
            </p>
            <p>
              <strong>Ward:</strong> {spot.location.ward}
            </p>
            <p>
              <strong>District:</strong> {spot.location.district}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Government Contact</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>{spot.governmentContact.name}</strong>
            </p>
            <p>{spot.governmentContact.designation}</p>
            <p className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {spot.governmentContact.phone}
            </p>
            <p className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {spot.governmentContact.email}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div>
        <h3 className="font-semibold mb-3">Key Performance Metrics</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {spot.keyMetrics.map((metric, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{metric.name}</span>
                <Badge variant="outline">{metric.category}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Current: {metric.currentValue} {metric.unit}
                  </span>
                  <span>
                    Target: {metric.targetValue} {metric.unit}
                  </span>
                </div>
                <Progress value={(metric.currentValue / metric.targetValue) * 100} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adoption Requirements */}
      <div>
        <h3 className="font-semibold mb-3">Adoption Requirements</h3>
        <ul className="space-y-2">
          {spot.adoptionRequirements.map((requirement, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {requirement}
            </li>
          ))}
        </ul>
      </div>

      {/* Budget Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Estimated Annual Budget</h4>
          <p className="text-2xl font-bold text-blue-600">₹{(spot.estimatedBudget / 100000).toFixed(1)} Lakhs</p>
          <p className="text-sm text-blue-700">Includes maintenance, improvements, and activities</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Expected Impact</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Improved community health & safety</li>
            <li>• Enhanced property values</li>
            <li>• Increased civic engagement</li>
            <li>• Environmental benefits</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="flex-1">
          <Heart className="mr-2 h-4 w-4" />
          Submit Adoption Application
        </Button>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Form Adoption Group
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Download Details
        </Button>
      </div>
    </div>
  )
}

function MyAdoptionsView() {
  const myAdoptions = [
    {
      id: "my-park-1",
      name: "Lalbagh Rose Garden Section",
      type: "park",
      adoptionDate: new Date("2023-06-15"),
      progress: 75,
      nextMilestone: "Install new benches",
      monthlyBudget: 45000,
      communityRating: 4.2,
      recentActivity: "Planted 50 new rose bushes",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Adopted Spots</h2>
        <Button>
          <Heart className="mr-2 h-4 w-4" />
          Adopt New Spot
        </Button>
      </div>

      {myAdoptions.length > 0 ? (
        <div className="grid gap-6">
          {myAdoptions.map((adoption) => (
            <Card key={adoption.id} className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">🌳 {adoption.name}</CardTitle>
                    <CardDescription>Adopted on {adoption.adoptionDate.toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{adoption.progress}%</div>
                    <p className="text-xs text-gray-600">Overall Progress</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{(adoption.monthlyBudget / 1000).toFixed(0)}K
                    </div>
                    <p className="text-xs text-gray-600">Monthly Budget</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
                      {adoption.communityRating} <Star className="h-4 w-4" />
                    </div>
                    <p className="text-xs text-gray-600">Community Rating</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <p className="text-xs text-gray-600">Months Active</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Milestone: {adoption.nextMilestone}</span>
                    <span>{adoption.progress}% complete</span>
                  </div>
                  <Progress value={adoption.progress} className="h-2" />
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm">
                    <strong>Recent Activity:</strong> {adoption.recentActivity}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No Adopted Spots Yet</h3>
            <p className="text-gray-600 mb-4">
              Start making a difference by adopting a public space in your community!
            </p>
            <Button>
              <Heart className="mr-2 h-4 w-4" />
              Browse Available Spots
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function SuccessStoriesView() {
  const successStories = [
    {
      id: "story-1",
      title: "Cubbon Park Transformation",
      adopter: "Green Bengaluru Foundation",
      duration: "18 months",
      impact: "Increased visitor satisfaction by 85%",
      beforeImage: "/success/cubbon-before.jpg",
      afterImage: "/success/cubbon-after.jpg",
      description:
        "Complete renovation of walking paths, installation of eco-friendly lighting, and creation of dedicated cycling tracks.",
      metrics: [
        { name: "Trees Planted", value: 150 },
        { name: "Benches Added", value: 25 },
        { name: "Waste Reduced", value: "60%" },
      ],
    },
    {
      id: "story-2",
      title: "Government School Revival",
      adopter: "Tech for Education NGO",
      duration: "24 months",
      impact: "Student enrollment increased by 120%",
      beforeImage: "/success/school-before.jpg",
      afterImage: "/success/school-after.jpg",
      description:
        "Complete infrastructure overhaul including new classrooms, digital learning center, and improved sanitation facilities.",
      metrics: [
        { name: "Classrooms Renovated", value: 12 },
        { name: "Students Benefited", value: 450 },
        { name: "Pass Rate Improvement", value: "40%" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Success Stories</h2>

      <div className="grid gap-8">
        {successStories.map((story) => (
          <Card key={story.id} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Before</p>
                  </div>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">After</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">{story.title}</CardTitle>
                  <CardDescription>
                    Adopted by {story.adopter} • {story.duration}
                  </CardDescription>
                </CardHeader>

                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-800">Key Impact</p>
                    <p className="text-green-700">{story.impact}</p>
                  </div>

                  <p className="text-gray-600">{story.description}</p>

                  <div className="grid grid-cols-3 gap-3">
                    {story.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600">{metric.value}</div>
                        <p className="text-xs text-blue-700">{metric.name}</p>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Read Full Story
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function HowItWorksView() {
  const steps = [
    {
      step: 1,
      title: "Browse & Select",
      description:
        "Explore available public spaces in your area and choose one that matches your interests and capacity.",
      icon: "🔍",
      details: [
        "Filter by type, location, and budget",
        "Review current condition and requirements",
        "Check government contact details",
      ],
    },
    {
      step: 2,
      title: "Submit Application",
      description: "Fill out the adoption application with your plan, budget, and commitment timeline.",
      icon: "📝",
      details: ["Provide detailed improvement plan", "Commit to minimum 2-year period", "Submit budget and timeline"],
    },
    {
      step: 3,
      title: "Government Approval",
      description: "Local authorities review your application and provide necessary approvals and permissions.",
      icon: "✅",
      details: ["Background verification", "Plan feasibility review", "Legal documentation"],
    },
    {
      step: 4,
      title: "Implementation",
      description: "Begin implementing your improvement plan with regular monitoring and community engagement.",
      icon: "🚀",
      details: ["Execute planned improvements", "Submit monthly progress reports", "Engage with local community"],
    },
    {
      step: 5,
      title: "Monitor & Report",
      description: "Track progress through our platform and share updates with the community.",
      icon: "📊",
      details: ["Upload photos and updates", "Track key performance metrics", "Receive community feedback"],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">How Adopt-a-Spot Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our streamlined process makes it easy for individuals, NGOs, and organizations to adopt and improve public
          spaces.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card key={step.step} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-blue-100 text-blue-800">Step {step.step}</Badge>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of citizens, NGOs, and organizations who are transforming public spaces across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Start Adopting
            </Button>
            <Button size="lg" variant="outline">
              <Users className="mr-2 h-5 w-5" />
              Join Community
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
