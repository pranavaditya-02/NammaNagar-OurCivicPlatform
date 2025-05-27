"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Shield, CheckCircle, AlertTriangle, XCircle, Eye, MapPin, Clock, IndianRupee, Zap } from "lucide-react"
import { analyzeImage, detectFraud, assessImageQuality, verifyLocation } from "@/lib/ai-image-analysis"
import type { ImageAnalysisResult, FraudDetectionResult } from "@/lib/ai-image-analysis"

interface AIImageAnalyzerProps {
  imageFile: File | null
  onAnalysisComplete: (result: ImageAnalysisResult) => void
  reportLocation?: { lat: number; lng: number }
}

export function AIImageAnalyzer({ imageFile, onAnalysisComplete, reportLocation }: AIImageAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null)
  const [fraudResult, setFraudResult] = useState<FraudDetectionResult | null>(null)
  const [qualityResult, setQualityResult] = useState<any>(null)
  const [locationResult, setLocationResult] = useState<any>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const runAnalysis = async () => {
    if (!imageFile) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setCurrentStep("Initializing AI analysis...")

    try {
      // Step 1: Image Quality Assessment
      setCurrentStep("Assessing image quality...")
      setAnalysisProgress(20)
      const quality = await assessImageQuality(imageFile)
      setQualityResult(quality)

      // Step 2: Location Verification
      if (reportLocation) {
        setCurrentStep("Verifying location data...")
        setAnalysisProgress(40)
        const location = await verifyLocation(imageFile, reportLocation)
        setLocationResult(location)
      }

      // Step 3: Issue Categorization
      setCurrentStep("Analyzing infrastructure issue...")
      setAnalysisProgress(60)
      const analysis = await analyzeImage(imageFile)
      setAnalysisResult(analysis)

      // Step 4: Fraud Detection
      setCurrentStep("Running fraud detection...")
      setAnalysisProgress(80)
      const fraud = await detectFraud(imageFile, analysis)
      setFraudResult(fraud)

      setCurrentStep("Analysis complete!")
      setAnalysisProgress(100)

      // Pass result to parent component
      onAnalysisComplete(analysis)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getFraudRiskColor = (risk: number) => {
    if (risk < 0.1) return "text-green-600"
    if (risk < 0.2) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Trigger */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Powered Analysis
          </CardTitle>
          <CardDescription>Advanced image recognition for automatic categorization and fraud detection</CardDescription>
        </CardHeader>
        <CardContent>
          {!imageFile ? (
            <Alert>
              <Eye className="h-4 w-4" />
              <AlertDescription>Upload an image to enable AI analysis</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{currentStep}</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                </div>
              )}

              <Button onClick={runAnalysis} disabled={isAnalyzing} className="w-full">
                <Zap className="mr-2 h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Issue Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Category & Confidence</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Category:</span>
                    <Badge variant="outline">{analysisResult.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confidence:</span>
                    <span className="font-medium">{(analysisResult.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Severity:</span>
                    <Badge className={getSeverityColor(analysisResult.severity)}>
                      {analysisResult.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Cost & Timeline</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      Est. Cost:
                    </span>
                    <span className="font-medium text-sm">{analysisResult.estimatedCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Timeline:
                    </span>
                    <span className="font-medium text-sm">{analysisResult.timeToResolve}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">AI Description</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{analysisResult.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Suggested Action</h4>
              <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">{analysisResult.suggestedAction}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">AI Tags</h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fraud Detection Results */}
      {fraudResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Fraud Detection Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Fraud Risk Score:</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${getFraudRiskColor(fraudResult.fraudScore)}`}>
                  {(fraudResult.fraudScore * 100).toFixed(1)}%
                </span>
                {fraudResult.isFraudulent ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>

            {fraudResult.isFraudulent && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Potential fraud detected!</strong> This report requires manual verification.
                </AlertDescription>
              </Alert>
            )}

            {fraudResult.reasons.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Detection Reasons:</h4>
                <ul className="text-sm space-y-1">
                  {fraudResult.reasons.map((reason, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2">Recommendations:</h4>
              <ul className="text-sm space-y-1">
                {fraudResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Quality Assessment */}
      {qualityResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Image Quality Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Quality Score:</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${getQualityColor(qualityResult.quality)}`}>
                  {qualityResult.quality.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">({(qualityResult.score * 100).toFixed(0)}%)</span>
              </div>
            </div>

            {qualityResult.issues.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Quality Issues:</h4>
                <ul className="text-sm space-y-1">
                  {qualityResult.issues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="h-3 w-3" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {qualityResult.suggestions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Suggestions:</h4>
                <ul className="text-sm space-y-1">
                  {qualityResult.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-blue-600">
                      <CheckCircle className="h-3 w-3" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Location Verification */}
      {locationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Location Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Location Verified:</span>
              <div className="flex items-center gap-2">
                {locationResult.isVerified ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                )}
                <span className="font-medium">{locationResult.isVerified ? "Verified" : "Needs Review"}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">Confidence:</span>
              <span className="font-bold">{(locationResult.confidence * 100).toFixed(1)}%</span>
            </div>

            {!locationResult.isVerified && locationResult.distance && (
              <Alert>
                <MapPin className="h-4 w-4" />
                <AlertDescription>
                  Location mismatch detected. Reported location is approximately {locationResult.distance}m away from
                  image metadata.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
