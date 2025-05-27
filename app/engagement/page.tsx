"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Star } from "lucide-react"
import { CivicEducationDashboard } from "@/components/civic-education-dashboard"
import { AdoptASpotDashboard } from "@/components/adopt-a-spot-dashboard"
import { SeasonalCampaignsDashboard } from "@/components/seasonal-campaigns-dashboard"
import { useLanguage } from "@/components/language-context"

export default function EngagementPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Engagement & Expansion Hub</h1>
          <p className="text-xl text-gray-600">Learn, Adopt, and Campaign for lasting civic change</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-sm text-gray-600">Education Modules</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🛠️</div>
              <div className="text-2xl font-bold text-green-600">2,847</div>
              <p className="text-sm text-gray-600">Adoptable Spots</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">🌟</div>
              <div className="text-2xl font-bold text-purple-600">3</div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-orange-600">58,921</div>
              <p className="text-sm text-gray-600">Engaged Citizens</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="education" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="education" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Civic Education
            </TabsTrigger>
            <TabsTrigger value="adoption" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Adopt-a-Spot
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Seasonal Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education">
            <CivicEducationDashboard />
          </TabsContent>

          <TabsContent value="adoption">
            <AdoptASpotDashboard />
          </TabsContent>

          <TabsContent value="campaigns">
            <SeasonalCampaignsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
