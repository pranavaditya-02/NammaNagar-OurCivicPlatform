"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, MapPin, Upload, Send, CheckCircle } from "lucide-react"
import { AIImageAnalyzer } from "@/components/ai-image-analyzer"
import { AITranslationWidget } from "@/components/ai-translation-widget"
import { useLanguage } from "@/components/language-context"
import type { ImageAnalysisResult } from "@/lib/ai-image-analysis"

export default function ReportPage() {
  const { t, isRTL } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<ImageAnalysisResult | null>(null)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [reportDescription, setReportDescription] = useState("")
  const [showTranslation, setShowTranslation] = useState(false)

  const categories = [
    { value: "roads", label: t.categories.roads, color: "bg-red-100 text-red-800" },
    { value: "water", label: t.categories.water, color: "bg-blue-100 text-blue-800" },
    { value: "sanitation", label: t.categories.sanitation, color: "bg-green-100 text-green-800" },
    { value: "electricity", label: t.categories.electricity, color: "bg-yellow-100 text-yellow-800" },
    { value: "healthcare", label: t.categories.healthcare, color: "bg-purple-100 text-purple-800" },
    { value: "education", label: t.categories.education, color: "bg-indigo-100 text-indigo-800" },
    { value: "parks", label: t.categories.parks, color: "bg-emerald-100 text-emerald-800" },
    { value: "other", label: t.categories.other, color: "bg-gray-100 text-gray-800" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      setShowAIAnalysis(true)
    }
  }

  const handleAIAnalysisComplete = (result: ImageAnalysisResult) => {
    setAiAnalysis(result)
    setSelectedCategory(result.category.toLowerCase().replace(/\s+/g, ""))
  }

  const handleTranslationSelect = (translatedText: string) => {
    setReportDescription(translatedText)
    setShowTranslation(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">{t.report.successMessage}</CardTitle>
                <CardDescription>
                  {t.report.reportId}: <strong>NNG-2024-001247</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">{t.report.nextSteps}</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your report will be verified within 24 hours</li>
                    <li>• Relevant authorities will be automatically notified</li>
                    <li>• You'll receive SMS/email updates on progress</li>
                    <li>• Expected resolution time: 7-15 days</li>
                  </ul>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setIsSubmitted(false)}>Report Another Issue</Button>
                  <Button variant="outline">Track This Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-12 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.report.title}</h1>
            <p className="text-xl text-gray-600">{t.report.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Report Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Camera className="h-5 w-5" />
                    Issue Details
                  </CardTitle>
                  <CardDescription>
                    Provide as much detail as possible to help authorities address the issue quickly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="category">{t.report.category} *</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">{t.report.location} *</Label>
                      <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Input id="location" placeholder="Enter address or landmark" className="flex-1" />
                        <Button type="button" variant="outline" size="icon">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Current location: Koramangala, Bengaluru, Karnataka</p>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">{t.report.issueTitle} *</Label>
                      <Input id="title" placeholder="Brief description of the issue" required />
                    </div>

                    {/* Description with Translation */}
                    <div className="space-y-2">
                      <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Label htmlFor="description">{t.report.description}</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowTranslation(!showTranslation)}
                        >
                          Need Translation?
                        </Button>
                      </div>
                      <Textarea
                        id="description"
                        placeholder="Provide more details about the issue, when you noticed it, severity, etc."
                        rows={4}
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                      />
                    </div>

                    {/* AI Translation Widget */}
                    {showTranslation && (
                      <AITranslationWidget
                        defaultText={reportDescription}
                        onTranslationSelect={handleTranslationSelect}
                        context="report"
                      />
                    )}

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label>{t.report.uploadPhotos}</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 10MB each (max 5 photos)</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload">
                          <Button type="button" variant="outline" className="mt-2" asChild>
                            <span>Choose Files</span>
                          </Button>
                        </label>

                        {uploadedImage && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700">✓ Image uploaded: {uploadedImage.name}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AI Analysis Section */}
                    {showAIAnalysis && uploadedImage && (
                      <div className="mt-6">
                        <AIImageAnalyzer
                          imageFile={uploadedImage}
                          onAnalysisComplete={handleAIAnalysisComplete}
                          reportLocation={{ lat: 12.9716, lng: 77.5946 }} // Mock Bangalore coordinates
                        />
                      </div>
                    )}

                    {/* AI-Generated Summary */}
                    {aiAnalysis && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">{t.report.aiAnalysis} Summary</h3>
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>Detected Issue:</strong> {aiAnalysis.description}
                        </p>
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>Recommended Action:</strong> {aiAnalysis.suggestedAction}
                        </p>
                        <p className="text-sm text-blue-800">
                          <strong>Estimated Resolution:</strong> {aiAnalysis.timeToResolve} | <strong>Cost:</strong>{" "}
                          {aiAnalysis.estimatedCost}
                        </p>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Full name (optional)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="For updates (optional)" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                      {t.report.submitReport}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reporting Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Take clear photos showing the issue from multiple angles</p>
                  </div>
                  <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Include nearby landmarks for easy identification</p>
                  </div>
                  <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Be specific about safety concerns or urgency</p>
                  </div>
                  <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm">Use your preferred language - we support all 22 official Indian languages</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Reports in Your Area</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div>
                      <p className="text-sm font-medium">Pothole on 100 Feet Road</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">{t.status.inProgress}</Badge>
                  </div>
                  <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div>
                      <p className="text-sm font-medium">Broken streetlight</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{t.status.resolved}</Badge>
                  </div>
                  <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div>
                      <p className="text-sm font-medium">Water logging issue</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
