"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Camera,
  Users,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Brain,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Globe,
  BarChart3,
  Target,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { LanguageSelector, RegionalLanguageSuggestion } from "@/components/language-selector"
import { useLanguage } from "@/components/language-context"
import { ChatBot } from "@/components/ChatBot"

export default function HomePage() {
  const { t, currentLanguage } = useLanguage()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [liveStats, setLiveStats] = useState({
    reports: 12847,
    resolved: 8923,
    cities: 156,
    users: 45000,
  })

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        reports: prev.reports + Math.floor(Math.random() * 3),
        resolved: prev.resolved + Math.floor(Math.random() * 2),
        cities: prev.cities,
        users: prev.users + Math.floor(Math.random() * 5),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Community Leader, Bengaluru",
      content: "NammaNagar helped us get 15 potholes fixed in our area within 2 weeks. The transparency is amazing!",
      avatar: "/testimonials/priya.jpg",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Software Engineer, Mumbai",
      content:
        "Finally, a platform where citizen voices are heard. Tracked a water pipeline project from start to finish.",
      avatar: "/testimonials/rajesh.jpg",
      rating: 5,
    },
    {
      name: "Dr. Anita Reddy",
      role: "Doctor, Chennai",
      content: "The AI-powered reporting made it so easy to document healthcare infrastructure issues in our hospital.",
      avatar: "/testimonials/anita.jpg",
      rating: 5,
    },
  ]

  const features = [
    {
      icon: Camera,
      title: "AI-Powered Reporting",
      description: "Snap photos and let AI categorize issues automatically with fraud detection",
      color: "blue",
      stats: "95% accuracy",
      demo: "/demos/ai-reporting.mp4",
    },
    {
      icon: MapPin,
      title: "Live Project Tracking",
      description: "Monitor government projects from tender to completion with real-time updates",
      color: "green",
      stats: "₹2.3Cr tracked",
      demo: "/demos/project-tracking.mp4",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Build local civic circles and collaborate for lasting infrastructure improvements",
      color: "purple",
      stats: "45K+ citizens",
      demo: "/demos/community.mp4",
    },
    {
      icon: Brain,
      title: "Civic Education",
      description: "Learn about budgets, RTI, and governance through gamified modules",
      color: "orange",
      stats: "15 modules",
      demo: "/demos/education.mp4",
    },
    {
      icon: Heart,
      title: "Adopt-a-Spot",
      description: "Take long-term ownership of public spaces and drive sustainable change",
      color: "red",
      stats: "2.8K spots",
      demo: "/demos/adopt-spot.mp4",
    },
    {
      icon: Star,
      title: "Seasonal Campaigns",
      description: "Join targeted initiatives like Monsoon Watch and School Readiness drives",
      color: "yellow",
      stats: "3 active",
      demo: "/demos/campaigns.mp4",
    },
  ]

  const impactMetrics = [
    { label: "Issues Resolved", value: liveStats.resolved, change: "+8%", icon: CheckCircle, color: "green" },
    { label: "Active Citizens", value: liveStats.users, change: "+12%", icon: Users, color: "blue" },
    { label: "Cities Covered", value: liveStats.cities, change: "+15%", icon: MapPin, color: "purple" },
    { label: "Budget Saved", value: "₹2.3Cr", change: "+25%", icon: TrendingUp, color: "orange" },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      red: "bg-red-100 text-red-600 border-red-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Regional Language Suggestion */}
      <div className="container mx-auto px-4 pt-4">
        <RegionalLanguageSuggestion state="Tamil Nadu" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 px-4 py-2">
                    🏆 Award-Winning Civic Platform
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    Namma
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                      Nagar
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium">From Potholes to Promises</p>
                  <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    India's most comprehensive civic engagement platform empowering citizens to monitor, track, and
                    transform their communities through AI-powered transparency and real-time accountability.
                  </p>
                </div>

                {/* Language Support */}
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Available in:</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      English
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      हिंदी
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      தமிழ்
                    </Badge>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/report">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 h-auto"
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      Report an Issue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 text-lg px-8 py-4 h-auto"
                    >
                      <BarChart3 className="mr-2 h-5 w-5" />
                      View Dashboard
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Government Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm text-gray-600">Digital India Award</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">45K+ Citizens</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Live Impact Dashboard</h3>
                      <Badge className="bg-green-100 text-green-800">Live</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {impactMetrics.map((metric, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${metric.color}-100`}>
                              <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${metric.color}-100 text-${metric.color}-600`}>
                              {metric.change}
                            </span>
                          </div>
                          <div className="mt-1">
                            <div className="text-2xl font-bold text-gray-900">
                              {typeof metric.value === "number" ? metric.value.toLocaleString() : metric.value}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{metric.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Monthly Resolution Rate</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-600 text-white p-3 rounded-full shadow-lg">
                  <Target className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Language</h2>
            <p className="text-xl text-gray-600">
              NammaNagar speaks your language - Available in English, Hindi, and Tamil
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <LanguageSelector variant="grid" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Platform Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Civic Engagement Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered reporting to long-term community ownership, our platform provides everything needed for
              effective civic participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`border-2 hover:shadow-xl transition-all duration-300 group ${getColorClasses(feature.color)}`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${getColorClasses(feature.color)}`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-sm font-medium">
                      {feature.stats}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-white">
                    <Play className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Innovation</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Award-Winning Technology</h2>
            <p className="text-xl text-gray-600">Cutting-edge features that set us apart</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analytics</h3>
              <p className="text-gray-600">
                Machine learning for issue classification, fraud detection, and predictive maintenance
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Language AI</h3>
              <p className="text-gray-600">
                Complete support for English, Hindi, and Tamil with AI translation and voice input
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Government Integration</h3>
              <p className="text-gray-600">
                Direct integration with tender portals, e-procurement systems, and PFMS for real-time data
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Campaigns</h3>
              <p className="text-gray-600">
                Seasonal and targeted campaigns with gamification, rewards, and measurable impact tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Voices of Change</h2>
            <p className="text-xl text-gray-600">Real stories from citizens making a difference</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-gray-700 mb-6 italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                      <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your City?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of citizens already making a difference through transparent, accountable governance and
            community action.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto">
                <Users className="mr-2 h-5 w-5" />
                Join the Movement
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 h-auto"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Explore Projects
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Secure & verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Multi-language support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  )
}
