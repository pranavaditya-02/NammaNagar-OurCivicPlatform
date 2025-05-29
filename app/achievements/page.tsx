"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Target, FileText, Users, Camera, Trophy } from "lucide-react"

export default function AchievementsPage() {
  const achievements = [
    {
      title: "RTI Expert",
      description: "Filed and tracked 10 RTI applications",
      progress: 100,
      icon: FileText,
      earned: true,
      date: "March 15, 2024"
    },
    {
      title: "Community Leader",
      description: "Engaged 100 citizens in civic initiatives",
      progress: 75,
      icon: Users,
      earned: false,
      current: 75,
      total: 100
    },
    {
      title: "Infrastructure Guardian",
      description: "Reported 50 infrastructure issues",
      progress: 94,
      icon: Camera,
      earned: false,
      current: 47,
      total: 50
    }
    // Add more achievements...
  ]

  const stats = {
    totalPoints: 2450,
    rank: 123,
    issuesReported: 47,
    issuesResolved: 38,
    badges: 12
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Stats Overview */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4">
              <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
            {/* Add more stats */}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className={achievement.earned ? "border-yellow-200" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  achievement.earned ? "bg-yellow-100" : "bg-gray-100"
                }`}>
                  <achievement.icon className={`h-6 w-6 ${
                    achievement.earned ? "text-yellow-600" : "text-gray-600"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-yellow-100">
                        Earned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.description}
                  </p>
                  <div className="space-y-2">
                    <Progress value={achievement.progress} className="h-2" />
                    {!achievement.earned && achievement.current && (
                      <div className="text-sm text-gray-500">
                        {achievement.current} / {achievement.total}
                      </div>
                    )}
                    {achievement.earned && achievement.date && (
                      <div className="text-sm text-gray-500">
                        Earned on {achievement.date}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}