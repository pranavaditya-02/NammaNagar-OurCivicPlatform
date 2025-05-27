"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Brain, Users, Clock } from "lucide-react"

export function FraudDetectionDashboard() {
  const fraudStats = {
    totalReports: 12847,
    flaggedReports: 156,
    confirmedFraud: 23,
    falsePositives: 45,
    accuracyRate: 94.2,
  }

  const recentFraudCases = [
    {
      id: "NNG-001250",
      title: "Duplicate pothole report with manipulated image",
      riskScore: 0.89,
      status: "Confirmed Fraud",
      detectedBy: "AI + Manual Review",
      date: "2024-01-15",
      reasons: ["Image metadata manipulation", "Duplicate location", "Inconsistent shadows"],
    },
    {
      id: "NNG-001248",
      title: "Staged water leak photo",
      riskScore: 0.76,
      status: "Under Investigation",
      detectedBy: "AI Analysis",
      date: "2024-01-14",
      reasons: ["Artificial water placement", "No infrastructure damage visible"],
    },
    {
      id: "NNG-001245",
      title: "False streetlight damage claim",
      riskScore: 0.68,
      status: "False Positive",
      detectedBy: "Community Verification",
      date: "2024-01-13",
      reasons: ["Lighting inconsistency flagged incorrectly"],
    },
  ]

  const aiMetrics = [
    { name: "Image Classification Accuracy", value: 96.8, trend: "+2.1%" },
    { name: "Fraud Detection Precision", value: 94.2, trend: "+1.8%" },
    { name: "Location Verification Rate", value: 98.5, trend: "+0.5%" },
    { name: "Processing Speed (avg)", value: 2.3, unit: "seconds", trend: "-0.8s" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed Fraud":
        return "bg-red-100 text-red-800"
      case "Under Investigation":
        return "bg-yellow-100 text-yellow-800"
      case "False Positive":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 0.8) return "text-red-600"
    if (score >= 0.6) return "text-orange-600"
    if (score >= 0.4) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Fraud Detection Center</h2>
          <p className="text-gray-600">AI-powered fraud detection and prevention system</p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Security Settings
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold">{fraudStats.totalReports.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flagged Reports</p>
                <p className="text-2xl font-bold text-orange-600">{fraudStats.flaggedReports}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed Fraud</p>
                <p className="text-2xl font-bold text-red-600">{fraudStats.confirmedFraud}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">False Positives</p>
                <p className="text-2xl font-bold text-green-600">{fraudStats.falsePositives}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
                <p className="text-2xl font-bold text-blue-600">{fraudStats.accuracyRate}%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">Recent Cases</TabsTrigger>
          <TabsTrigger value="metrics">AI Metrics</TabsTrigger>
          <TabsTrigger value="patterns">Fraud Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Fraud Detection Cases</CardTitle>
              <CardDescription>Latest reports flagged by our AI fraud detection system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFraudCases.map((case_) => (
                  <div key={case_.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{case_.title}</h4>
                        <p className="text-sm text-gray-600">Report ID: {case_.id}</p>
                      </div>
                      <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Risk Score: </span>
                        <span className={`font-bold ${getRiskColor(case_.riskScore)}`}>
                          {(case_.riskScore * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Detected By: </span>
                        <span className="font-medium">{case_.detectedBy}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Date: </span>
                        <span className="font-medium">{case_.date}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Detection Reasons:</p>
                      <div className="flex flex-wrap gap-2">
                        {case_.reasons.map((reason, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Review Evidence
                      </Button>
                      {case_.status === "Under Investigation" && <Button size="sm">Take Action</Button>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Performance Metrics</CardTitle>
                <CardDescription>Real-time performance of our fraud detection AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {metric.value}
                          {metric.unit || "%"}
                        </span>
                        <span className="text-xs text-green-600">{metric.trend}</span>
                      </div>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detection Methods</CardTitle>
                <CardDescription>How fraud is being detected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Image Metadata Analysis</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Duplicate Detection</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Location Verification</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Community Reports</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Fraud Patterns</CardTitle>
                <CardDescription>Most frequently detected fraud types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium">Duplicate Image Submissions</p>
                      <p className="text-sm text-gray-600">Same image used for multiple reports</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">38%</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Manipulated Metadata</p>
                      <p className="text-sm text-gray-600">Altered location or timestamp data</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">25%</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium">Staged Scenarios</p>
                      <p className="text-sm text-gray-600">Artificially created problems</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">22%</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">False Location Claims</p>
                      <p className="text-sm text-gray-600">Incorrect location information</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">15%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prevention Measures</CardTitle>
                <CardDescription>Active fraud prevention strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Real-time Analysis:</strong> Every uploaded image is analyzed within 2-3 seconds for
                      potential fraud indicators.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Brain className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Machine Learning:</strong> Our AI model continuously learns from new fraud patterns and
                      improves detection accuracy.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Community Verification:</strong> High-risk reports are cross-verified by trusted community
                      members.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Temporal Analysis:</strong> Reports are checked against historical data for suspicious
                      patterns.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
