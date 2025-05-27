"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MapPin, Calendar, MessageCircle, ThumbsUp, Award, Star, Plus } from "lucide-react"

export default function CommunityPage() {
  const topContributors = [
    {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      reports: 47,
      resolved: 38,
      score: 950,
      badge: "Civic Champion",
      location: "Koramangala",
    },
    {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      reports: 32,
      resolved: 28,
      score: 780,
      badge: "Infrastructure Hero",
      location: "HSR Layout",
    },
    {
      name: "Anita Reddy",
      avatar: "/placeholder.svg?height=40&width=40",
      reports: 28,
      resolved: 25,
      score: 680,
      badge: "Community Leader",
      location: "Indiranagar",
    },
    {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      reports: 23,
      resolved: 19,
      score: 590,
      badge: "Active Citizen",
      location: "Whitefield",
    },
  ]

  const localGroups = [
    {
      name: "Koramangala Infrastructure Watch",
      members: 156,
      recentActivity: "2 hours ago",
      description: "Monitoring road repairs and drainage issues in Koramangala area",
      category: "Roads & Drainage",
      moderator: "Priya Sharma",
    },
    {
      name: "HSR Layout Water Warriors",
      members: 89,
      recentActivity: "5 hours ago",
      description: "Ensuring clean water supply and preventing water wastage",
      category: "Water Supply",
      moderator: "Rajesh Kumar",
    },
    {
      name: "Indiranagar Green Initiative",
      members: 203,
      recentActivity: "1 day ago",
      description: "Promoting green spaces and environmental sustainability",
      category: "Environment",
      moderator: "Anita Reddy",
    },
    {
      name: "Whitefield Safety First",
      members: 134,
      recentActivity: "3 hours ago",
      description: "Improving street lighting and pedestrian safety measures",
      category: "Safety",
      moderator: "Vikram Singh",
    },
  ]

  const recentDiscussions = [
    {
      title: "Pothole repairs on 100 Feet Road - Update needed",
      author: "Priya Sharma",
      replies: 12,
      likes: 8,
      time: "2 hours ago",
      category: "Roads",
      status: "Active",
    },
    {
      title: "Water supply disruption in HSR Sector 2",
      author: "Rajesh Kumar",
      replies: 7,
      likes: 15,
      time: "4 hours ago",
      category: "Water",
      status: "Resolved",
    },
    {
      title: "New park development proposal for Indiranagar",
      author: "Anita Reddy",
      replies: 23,
      likes: 31,
      time: "1 day ago",
      category: "Parks",
      status: "Discussion",
    },
    {
      title: "Street light maintenance schedule",
      author: "Vikram Singh",
      replies: 5,
      likes: 9,
      time: "2 days ago",
      category: "Electricity",
      status: "Completed",
    },
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Civic Champion":
        return "bg-gold-100 text-gold-800"
      case "Infrastructure Hero":
        return "bg-blue-100 text-blue-800"
      case "Community Leader":
        return "bg-purple-100 text-purple-800"
      case "Active Citizen":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Discussion":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Hub</h1>
          <p className="text-xl text-gray-600">Connect with fellow citizens and make a difference together</p>
        </div>

        <Tabs defaultValue="contributors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
            <TabsTrigger value="groups">Local Groups</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="contributors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Community Champions</h2>
              <Button>
                <Award className="mr-2 h-4 w-4" />
                View Leaderboard
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topContributors.map((contributor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                        <AvatarFallback>
                          {contributor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-800" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{contributor.name}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {contributor.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Badge className={getBadgeColor(contributor.badge)} variant="secondary">
                      {contributor.badge}
                    </Badge>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{contributor.reports}</p>
                        <p className="text-xs text-gray-600">Reports</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{contributor.resolved}</p>
                        <p className="text-xs text-gray-600">Resolved</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{contributor.score}</p>
                        <p className="text-xs text-gray-600">Score</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Local Civic Groups</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {localGroups.map((group, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{group.name}</CardTitle>
                        <CardDescription className="mt-2">{group.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{group.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {group.recentActivity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Moderator:</span>
                      <span className="text-sm font-medium">{group.moderator}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Join Group</Button>
                      <Button variant="outline">View Posts</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Discussions</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Start Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                          <Badge className={getStatusColor(discussion.status)}>{discussion.status}</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>by {discussion.author}</span>
                          <span>{discussion.time}</span>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {discussion.likes} likes
                          </span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        Join Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
