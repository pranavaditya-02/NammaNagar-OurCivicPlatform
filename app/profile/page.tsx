"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity, Award, MapPin, Camera, BarChart2, FileText, 
  Edit2, Share2, Flag, ThumbsUp, MessageCircle, Users,
  CheckCircle, Clock, AlertTriangle, ChartBar
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const userProfile = {
    name: "Priya Sharma",
    role: "Civic Champion",
    joined: "March 2024",
    points: 2450,
    reports: 47,
    resolved: 38,
    pending: 9,
    followers: 156,
    following: 89,
    impactScore: 85,
    avatar: "/avatars/priya.jpg",
    location: "Bangalore, Karnataka",
    bio: "Passionate about urban development and citizen engagement",
    expertise: ["Infrastructure", "RTI", "Water Management"],
    badges: [
      { name: "Top Contributor", color: "bg-blue-100 text-blue-700" },
      { name: "Problem Solver", color: "bg-green-100 text-green-700" },
      { name: "Community Leader", color: "bg-purple-100 text-purple-700" }
    ],
    stats: {
      upvotes: 238,
      comments: 145,
      shared: 67
    }
  }

  const recentActivity = [
    {
      type: "report",
      title: "Reported water leakage",
      date: "2 days ago",
      status: "Resolved",
      icon: Camera
    },
    {
      type: "achievement",
      title: "Earned RTI Expert Badge",
      date: "1 week ago",
      icon: Award
    },
    {
      type: "comment",
      title: "Commented on road repair project",
      date: "3 days ago",
      icon: MessageCircle,
      engagement: 12
    },
    {
      type: "follow",
      title: "Started following Waste Management Initiative",
      date: "4 days ago",
      icon: Users
    },
    {
      type: "impact",
      title: "Project suggestion implemented by BBMP",
      date: "1 week ago",
      icon: CheckCircle,
      status: "Implemented"
    }
  ]

  const reportStats = {
    categories: [
      { name: "Infrastructure", count: 20, color: "bg-blue-500" },
      { name: "Water Supply", count: 12, color: "bg-green-500" },
      { name: "Sanitation", count: 8, color: "bg-yellow-500" },
      { name: "Roads", count: 7, color: "bg-purple-500" }
    ],
    status: {
      resolved: 38,
      inProgress: 6,
      pending: 3
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Enhanced Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                <Badge variant="secondary" className="font-medium">
                  {userProfile.role}
                </Badge>
              </div>
              <p className="text-gray-600 mb-2">{userProfile.bio}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {userProfile.location}
                </span>
                <span>Joined {userProfile.joined}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Card className="w-32">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.points}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </CardContent>
              </Card>
              <Card className="w-32">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{userProfile.resolved}</div>
                  <div className="text-sm text-gray-600">Issues Resolved</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Added Action Buttons */}
          <div className="flex gap-2 md:self-start">
            <Button variant="outline" onClick={() => setIsEditing(true)}
              className="flex items-center gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4 text-red-500" />
            </Button>
          </div>

          {/* Added Expertise Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {userProfile.expertise.map((tag, i) => (
              <Badge key={i} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Added Achievement Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {userProfile.badges.map((badge, i) => (
              <Badge key={i} className={badge.color}>{badge.name}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tabs Section */}
      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          {/* Engagement Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <ThumbsUp className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{userProfile.stats.upvotes}</div>
                <div className="text-sm text-gray-600">Upvotes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="h-5 w-5 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{userProfile.stats.comments}</div>
                <div className="text-sm text-gray-600">Comments</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Share2 className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{userProfile.stats.shared}</div>
                <div className="text-sm text-gray-600">Shared</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Activity Timeline */}
          {recentActivity.map((activity, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'report' ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}>
                    <activity.icon className={`h-5 w-5 ${
                      activity.type === 'report' ? 'text-blue-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  {activity.status && (
                    <Badge variant="secondary">{activity.status}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Report Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportStats.categories.map((category, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span>{category.count}</span>
                      </div>
                      <Progress
                        value={(category.count / userProfile.reports) * 100}
                        className={`h-2 ${category.color}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Resolution Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Resolved</span>
                    </div>
                    <span className="font-bold">{reportStats.status.resolved}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <span>In Progress</span>
                    </div>
                    <span className="font-bold">{reportStats.status.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span>Pending</span>
                    </div>
                    <span className="font-bold">{reportStats.status.pending}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Add other tab contents for Achievements, Impact, Following, and Analytics */}
      </Tabs>
    </div>
  )
}