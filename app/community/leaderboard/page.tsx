"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MapPin, Trophy, Award, Medal } from "lucide-react"
import Link from "next/link"

// Add this function before the component
const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Civic Champion":
      return "bg-yellow-100 text-yellow-800"
    case "Infrastructure Hero":
      return "bg-blue-100 text-blue-800"
    case "Community Leader":
      return "bg-purple-100 text-purple-800"
    case "Active Citizen":
      return "bg-green-100 text-green-800"
    case "Rising Star":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Add this function for rank styling
const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-yellow-500"
    case 2:
      return "text-gray-400"
    case 3:
      return "text-amber-600"
    default:
      return "text-gray-600"
  }
}

export default function LeaderboardPage() {
  const leaderboardData = [
    {
      rank: 1,
      name: "Priya Sharma",
      avatar: "/placeholder.svg",
      score: 950,
      badge: "Civic Champion",
      reports: 47,
      resolved: 38,
      location: "Koramangala"
    },
    {
      rank: 2,
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg",
      score: 780,
      badge: "Infrastructure Hero",
      reports: 32,
      resolved: 28,
      location: "HSR Layout"
    },
    {
      rank: 3,
      name: "Anita Reddy",
      avatar: "/placeholder.svg",
      score: 680,
      badge: "Community Leader",
      reports: 28,
      resolved: 25,
      location: "Indiranagar"
    },
    {
      rank: 4,
      name: "Vikram Singh",
      avatar: "/placeholder.svg",
      score: 590,
      badge: "Active Citizen",
      reports: 23,
      resolved: 19,
      location: "Whitefield"
    },
    {
      rank: 5,
      name: "Meera Patel",
      avatar: "/placeholder.svg",
      score: 520,
      badge: "Rising Star",
      reports: 20,
      resolved: 15,
      location: "JP Nagar"
    },
    {
      rank: 6,
      name: "Suresh Menon",
      avatar: "/placeholder.svg",
      score: 480,
      badge: "Active Citizen",
      reports: 18,
      resolved: 14,
      location: "Marathahalli"
    },
    {
      rank: 7,
      name: "Kavita Rao",
      avatar: "/placeholder.svg",
      score: 450,
      badge: "Rising Star",
      reports: 16,
      resolved: 12,
      location: "BTM Layout"
    },
    {
      rank: 8,
      name: "Mohammed Khan",
      avatar: "/placeholder.svg",
      score: 420,
      badge: "Active Citizen",
      reports: 15,
      resolved: 11,
      location: "Jayanagar"
    },
    {
      rank: 9,
      name: "Lakshmi Iyer",
      avatar: "/placeholder.svg",
      score: 380,
      badge: "Rising Star",
      reports: 14,
      resolved: 10,
      location: "Electronic City"
    },
    {
      rank: 10,
      name: "Arun Verma",
      avatar: "/placeholder.svg",
      score: 350,
      badge: "Active Citizen",
      reports: 12,
      resolved: 9,
      location: "Bellandur"
    }
  ]

  // Update the return section with responsive classes
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <Link href="/community">
              <Button variant="outline" size="sm" className="h-8 sm:h-9">
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm">Back to Community</span>
              </Button>
            </Link>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Community Leaderboard
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Our top contributors making a difference
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {leaderboardData.map((user, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-2 sm:gap-4 p-3 sm:p-6">
                {/* Rank */}
                <div className={`flex items-center justify-center w-8 sm:w-12 text-xl sm:text-2xl font-bold ${getRankStyle(user.rank)}`}>
                  {user.rank}
                </div>
                
                {/* Avatar */}
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {user.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={`${getBadgeColor(user.badge)} text-[10px] sm:text-xs w-fit`}
                    >
                      {user.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{user.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 sm:gap-8">
                  <div className="hidden sm:block text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {user.reports}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      Reports
                    </div>
                  </div>
                  <div className="hidden sm:block text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {user.resolved}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      Resolved
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-purple-600">
                      {user.score}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      Score
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}