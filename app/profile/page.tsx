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

  const achievements = {
    total: 15,
    recent: [
      {
        title: "Infrastructure Guardian",
        description: "Successfully resolved 50 infrastructure issues",
        progress: 76,
        current: 38,
        target: 50,
        icon: Camera,
        rewards: ["500 points", "Special Badge"],
        color: "blue"
      },
      {
        title: "Community Leader",
        description: "Engaged 100+ citizens in civic initiatives",
        progress: 100,
        icon: Users,
        dateEarned: "March 15, 2024",
        rewards: ["1000 points", "Verified Status"],
        color: "green"
      },
      {
        title: "RTI Champion",
        description: "Filed and tracked 25 successful RTI applications",
        progress: 88,
        current: 22,
        target: 25,
        icon: FileText,
        rewards: ["750 points"],
        color: "purple"
      }
    ],
    milestones: [
      { points: 1000, label: "Bronze", earned: true },
      { points: 2500, label: "Silver", earned: false },
      { points: 5000, label: "Gold", earned: false }
    ]
  }

  const impactMetrics = {
    overview: {
      issuesResolved: 38,
      peopleImpacted: "2,500+",
      areasImproved: 12,
      governmentActions: 5
    },
    timeline: [
      {
        title: "Water Supply Improvement",
        impact: "Benefited 500+ households",
        date: "March 2024",
        status: "Implemented",
        icon: Activity
      },
      {
        title: "Road Safety Initiative",
        impact: "Reduced accidents by 40%",
        date: "February 2024",
        status: "In Progress",
        icon: Activity
      }
    ]
  }

  const networkData = {
    followers: userProfile.followers,
    following: userProfile.following,
    connections: [
      {
        name: "Amit Kumar",
        role: "Ward Committee Member",
        avatar: "/avatars/amit.jpg",
        isFollowing: true,
        mutualConnections: 12
      },
      {
        name: "Deepa Reddy",
        role: "Environmental Activist",
        avatar: "/avatars/deepa.jpg",
        isFollowing: true,
        mutualConnections: 8
      }
      // Add more connections...
    ]
  }

  const analyticsData = {
    engagement: {
      daily: [65, 45, 75, 50, 80, 45, 70],
      weekly: [320, 280, 350, 290, 410],
      monthly: [1200, 980, 1400, 1100]
    },
    categories: {
      infrastructure: 45,
      water: 25,
      sanitation: 15,
      roads: 10,
      other: 5
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Enhanced Profile Header */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="p-4 sm:p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="text-lg sm:text-xl">PS</AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-2">
                <h1 className="text-xl sm:text-2xl font-bold">{userProfile.name}</h1>
                <Badge variant="secondary" className="font-medium text-xs sm:text-sm">
                  {userProfile.role}
                </Badge>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-2">{userProfile.bio}</p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  {userProfile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  Joined {userProfile.joined}
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4 w-full sm:w-auto">
              <Card className="w-full sm:w-32">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">{userProfile.points}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Points</div>
                </CardContent>
              </Card>
              <Card className="w-full sm:w-32">
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-green-600">{userProfile.resolved}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Resolved</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
              Share
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <Flag className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
            </Button>
          </div>

          {/* Tags and Badges */}
          <div className="space-y-3 sm:space-y-4 mt-4">
            {/* Expertise Tags */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {userProfile.expertise.map((tag, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="text-xs sm:text-sm px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {userProfile.badges.map((badge, i) => (
                <Badge 
                  key={i} 
                  className={`${badge.color} text-xs sm:text-sm px-2 py-0.5`}
                >
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tabs Section */}
      <Tabs defaultValue="activity" className="space-y-4 sm:space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          {[
            { value: 'activity', label: 'Activity', icon: Activity },
            { value: 'reports', label: 'Reports', icon: FileText },
            { value: 'achievements', label: 'Achievements', icon: Award },
            { value: 'impact', label: 'Impact', icon: ChartBar },
            { value: 'following', label: 'Following', icon: Users },
            { value: 'analytics', label: 'Analytics', icon: BarChart2 }
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">{tab.label}</span>
              <span className="sr-only">{tab.label}</span>
            </TabsTrigger>
          ))}
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

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Achievement Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Level Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Current Level: Champion</span>
                      <span className="text-sm text-gray-500">{userProfile.points} / 5000 points</span>
                    </div>
                    <Progress value={(userProfile.points / 5000) * 100} className="h-2" />
                    <div className="flex justify-between mt-2">
                      {achievements.milestones.map((milestone, i) => (
                        <div key={i} className="text-center">
                          <div className={`text-sm font-medium ${milestone.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                            {milestone.label}
                          </div>
                          <div className="text-xs text-gray-500">{milestone.points}pts</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.recent.map((achievement, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-${achievement.color}-100`}>
                        <achievement.icon className={`h-6 w-6 text-${achievement.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        
                        {achievement.progress < 100 ? (
                          <>
                            <Progress value={achievement.progress} className="h-2 mb-2" />
                            <p className="text-sm text-gray-500">
                              {achievement.current} / {achievement.target}
                            </p>
                          </>
                        ) : (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Completed on {achievement.dateEarned}
                          </Badge>
                        )}

                        <div className="mt-3 flex flex-wrap gap-2">
                          {achievement.rewards.map((reward, j) => (
                            <Badge key={j} variant="outline" className="text-xs">
                              {reward}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Impact Tab */}
        <TabsContent value="impact">
          <div className="space-y-6">
            {/* Impact Overview */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(impactMetrics.overview).map(([key, value], i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <ChartBar className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Impact Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Timeline</CardTitle>
                <CardDescription>Track the real-world changes from your contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {impactMetrics.timeline.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-blue-100">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.impact}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{item.status}</Badge>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Following Tab */}
        <TabsContent value="following">
          <div className="space-y-6">
            {/* Network Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{networkData.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{networkData.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </CardContent>
              </Card>
            </div>

            {/* Connections List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkData.connections.map((connection, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={connection.avatar} alt={connection.name} />
                          <AvatarFallback>{connection.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{connection.name}</h4>
                          <p className="text-sm text-gray-600">{connection.role}</p>
                        </div>
                      </div>
                      <Button variant={connection.isFollowing ? "outline" : "default"}>
                        {connection.isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="space-y-6">
            {/* Engagement Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add a chart component here */}
                  <div className="h-[200px] w-full bg-gray-50 rounded flex items-center justify-center">
                    Chart Placeholder
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium">This Week</div>
                      <div className="text-2xl font-bold text-blue-600">+15%</div>
                      <div className="text-sm text-gray-500">vs last week</div>
                    </div>
                    {/* Add more stats */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.categories).map(([category, percentage], i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{category}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Add other tab contents for Analytics */}
      </Tabs>
    </div>
  )
}