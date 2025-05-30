"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Calendar, 
  Users, 
  Target, 
  TrendingUp, 
  Share2, 
  Camera, 
  MapPin, 
  CheckCircle, 
  Heart,
  Flag,      // Add this
  UserCheck, // Add this
  Trophy    // Add this
} from "lucide-react"
import { activeCampaigns, type Campaign } from "@/lib/seasonal-campaigns"
import { useLanguage } from "@/components/language-context"

export function SeasonalCampaignsDashboard() {
  const { t } = useLanguage()
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)

  const getCampaignIcon = (type: string, name: string) => {
    if (name.includes("Monsoon")) return "🌧️"
    if (name.includes("School")) return "🏫"
    if (name.includes("Toilet")) return "🚻"
    if (name.includes("Festival")) return "🎉"
    return "📢"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "monsoon":
        return "bg-blue-50 border-blue-200"
      case "winter":
        return "bg-purple-50 border-purple-200"
      case "summer":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-green-50 border-green-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🌟 Seasonal Campaigns</h1>
        <p className="text-xl text-gray-600">Join targeted initiatives that drive real change in your community</p>
      </div>

      {/* Campaign Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <p className="text-sm text-gray-600">Active Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">58,921</div>
            <p className="text-sm text-gray-600">Total Participants</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">49,981</div>
            <p className="text-sm text-gray-600">Issues Reported</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">17,591</div>
            <p className="text-sm text-gray-600">Issues Resolved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active" className="flex items-center justify-center gap-2">
            <Flag className="h-4 w-4" />
            <span className="hidden sm:inline">Active Campaigns</span>
            <span className="sr-only">Active Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="my-participation" className="flex items-center justify-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">My Participation</span>
            <span className="sr-only">My Participation</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center justify-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Leaderboard</span>
            <span className="sr-only">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Impact Stories</span>
            <span className="sr-only">Impact Stories</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6">
            {activeCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className={`${getSeasonColor(campaign.season)} hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{getCampaignIcon(campaign.type, campaign.name)}</div>
                      <div>
                        <CardTitle className="text-2xl">{campaign.name}</CardTitle>
                        <CardDescription className="text-base mt-1">{campaign.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                      <Badge variant="outline">{campaign.season}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Campaign Timeline */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {campaign.participants.toLocaleString()} participants
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {campaign.reports.toLocaleString()} reports
                    </span>
                  </div>

                  {/* Progress Metrics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {campaign.targetMetrics.map((metric, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{metric.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {metric.category}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>
                              {metric.current.toLocaleString()} {metric.unit}
                            </span>
                            <span className="text-gray-500">/ {metric.target.toLocaleString()}</span>
                          </div>
                          <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                          <p className="text-xs text-gray-500">
                            {Math.round((metric.current / metric.target) * 100)}% complete
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Campaign Activities */}
                  <div>
                    <h4 className="font-semibold mb-3">Featured Activities</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {campaign.activities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="p-3 bg-white rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{activity.title}</h5>
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">{activity.points} pts</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <CheckCircle className="h-3 w-3" />
                            {activity.requirements.length} requirements
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Media & Hashtags */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium text-sm mb-1">Join the conversation</p>
                      <div className="flex gap-2">
                        {campaign.hashtags.map((hashtag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {hashtag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1" onClick={() => setSelectedCampaign(campaign)}>
                          <Heart className="mr-2 h-4 w-4" />
                          Join Campaign
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="text-2xl">{getCampaignIcon(campaign.type, campaign.name)}</span>
                            {campaign.name}
                          </DialogTitle>
                        </DialogHeader>
                        <CampaignDetailView campaign={campaign} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <Camera className="mr-2 h-4 w-4" />
                      Quick Report
                    </Button>
                    <Button variant="outline">
                      <MapPin className="mr-2 h-4 w-4" />
                      View Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-participation" className="space-y-6">
          <MyParticipationView />
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <CampaignLeaderboardView />
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <ImpactStoriesView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CampaignDetailView({ campaign }: { campaign: Campaign }) {
  return (
    <div className="space-y-6">
      {/* Campaign Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Campaign Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Duration:</strong> {campaign.startDate.toLocaleDateString()} -{" "}
              {campaign.endDate.toLocaleDateString()}
            </p>
            <p>
              <strong>Type:</strong> {campaign.type}
            </p>
            <p>
              <strong>Season:</strong> {campaign.season}
            </p>
            <p>
              <strong>Status:</strong> {campaign.status}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Current Impact</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{campaign.impact.issuesResolved}</div>
              <p className="text-xs text-blue-700">Issues Resolved</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                ₹{(campaign.impact.budgetSaved / 100000).toFixed(1)}L
              </div>
              <p className="text-xs text-green-700">Budget Saved</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{campaign.impact.citizensEngaged}</div>
              <p className="text-xs text-purple-700">Citizens Engaged</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">{campaign.impact.governmentActions}</div>
              <p className="text-xs text-orange-700">Govt Actions</p>
            </div>
          </div>
        </div>
      </div>

      {/* All Activities */}
      <div>
        <h3 className="font-semibold mb-3">Campaign Activities</h3>
        <div className="space-y-3">
          {campaign.activities.map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{activity.title}</h4>
                  <Badge className="bg-yellow-100 text-yellow-800">{activity.points} points</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">Requirements:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {activity.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button size="sm" className="mt-3">
                  <Camera className="mr-2 h-3 w-3" />
                  Start Activity
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div>
        <h3 className="font-semibold mb-3">Campaign Rewards</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {campaign.rewards.map((reward) => (
            <Card key={reward.id} className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold">{reward.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                <Badge className="bg-yellow-100 text-yellow-800 mb-2">{reward.value} points</Badge>
                <p className="text-xs text-gray-500">{reward.criteria}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function MyParticipationView() {
  const myParticipation = [
    {
      campaignName: "Monsoon Watch 2024",
      joinDate: new Date("2024-06-15"),
      pointsEarned: 450,
      activitiesCompleted: 8,
      rank: 156,
      level: "silver",
      recentActivity: "Reported 3 blocked drains in HSR Layout",
    },
    {
      campaignName: "Toilet Truth Tracker",
      joinDate: new Date("2024-02-01"),
      pointsEarned: 320,
      activitiesCompleted: 12,
      rank: 89,
      level: "gold",
      recentActivity: "Mapped 15 public toilets in Koramangala",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Campaign Participation</h2>
        <Button>
          <Heart className="mr-2 h-4 w-4" />
          Join New Campaign
        </Button>
      </div>

      {myParticipation.length > 0 ? (
        <div className="grid gap-6">
          {myParticipation.map((participation, index) => (
            <Card key={index} className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">🌟 {participation.campaignName}</CardTitle>
                    <CardDescription>Joined on {participation.joinDate.toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge
                    className={
                      participation.level === "gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : participation.level === "silver"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-orange-800"
                    }
                  >
                    {participation.level} level
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{participation.pointsEarned}</div>
                    <p className="text-xs text-gray-600">Points Earned</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{participation.activitiesCompleted}</div>
                    <p className="text-xs text-gray-600">Activities Done</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">#{participation.rank}</div>
                    <p className="text-xs text-gray-600">Leaderboard Rank</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {participation.level === "gold" ? "🥇" : participation.level === "silver" ? "🥈" : "🥉"}
                    </div>
                    <p className="text-xs text-gray-600">Achievement Level</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="text-sm">
                    <strong>Recent Activity:</strong> {participation.recentActivity}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Camera className="mr-2 h-4 w-4" />
                    New Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Progress
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Achievement
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">No Campaign Participation Yet</h3>
            <p className="text-gray-600 mb-4">Join seasonal campaigns to make targeted impact in your community!</p>
            <Button>
              <Heart className="mr-2 h-4 w-4" />
              Browse Active Campaigns
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function CampaignLeaderboardView() {
  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", points: 2450, campaigns: 3, badge: "🏆", location: "Bengaluru" },
    { rank: 2, name: "Rajesh Kumar", points: 2100, campaigns: 2, badge: "🥈", location: "Mumbai" },
    { rank: 3, name: "Anita Reddy", points: 1890, campaigns: 4, badge: "🥉", location: "Chennai" },
    { rank: 4, name: "Vikram Singh", points: 1650, campaigns: 2, badge: "⭐", location: "Delhi" },
    { rank: 5, name: "Meera Patel", points: 1420, campaigns: 3, badge: "⭐", location: "Ahmedabad" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Campaign Champions</h2>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((entry) => (
          <Card
            key={entry.rank}
            className={`text-center ${
              entry.rank === 1
                ? "border-yellow-300 bg-yellow-50"
                : entry.rank === 2
                  ? "border-gray-300 bg-gray-50"
                  : "border-orange-300 bg-orange-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="text-4xl mb-2">{entry.badge}</div>
              <h3 className="font-semibold text-lg">{entry.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{entry.location}</p>
              <div className="text-2xl font-bold text-blue-600 mb-1">{entry.points}</div>
              <p className="text-xs text-gray-600">points across {entry.campaigns} campaigns</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Full Leaderboard</CardTitle>
          <CardDescription>Top contributors across all seasonal campaigns</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Champion</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaigns</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardData.map((entry) => (
                  <tr key={entry.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{entry.badge}</span>
                        <span className="font-medium">#{entry.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{entry.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-semibold">{entry.points}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry.campaigns}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ImpactStoriesView() {
  const impactStories = [
    {
      campaign: "Monsoon Watch 2024",
      title: "Prevented Major Flooding in HSR Layout",
      description: "Community-driven drain cleaning prevented flooding during heavy rains, saving thousands of homes.",
      metrics: { reports: 156, resolved: 134, saved: "₹50L" },
      image: "/impact/monsoon-success.jpg",
    },
    {
      campaign: "Exam Ready Schools",
      title: "Improved Exam Pass Rates by 40%",
      description:
        "Infrastructure improvements in 50+ schools led to better learning environments and higher success rates.",
      metrics: { schools: 52, students: 15000, improvement: "40%" },
      image: "/impact/school-success.jpg",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Campaign Impact Stories</h2>

      <div className="grid gap-8">
        {impactStories.map((story, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="h-12 w-12 text-gray-400" />
              </div>

              <CardContent className="p-6">
                <Badge className="mb-3">{story.campaign}</Badge>
                <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
                <p className="text-gray-600 mb-4">{story.description}</p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Object.entries(story.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600">{value}</div>
                      <p className="text-xs text-blue-700 capitalize">{key}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Read Full Story
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
