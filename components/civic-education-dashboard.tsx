"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText,
  Video,
  Brain,
  Target,
  Trophy,
} from "lucide-react"
import {
  educationModules,
  achievements,
  userLevels,
  type EducationModule,
  type UserProgress,
} from "@/lib/civic-education"
import { useLanguage } from "@/components/language-context"

export function CivicEducationDashboard() {
  const { t } = useLanguage()
  const [selectedModule, setSelectedModule] = useState<EducationModule | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [userLevel, setUserLevel] = useState(1)
  const [totalPoints, setTotalPoints] = useState(450)

  const currentLevel =
    userLevels.find((level) => totalPoints >= level.minPoints && totalPoints <= level.maxPoints) || userLevels[0]

  const nextLevel = userLevels.find((level) => level.minPoints > totalPoints)
  const progressToNext = nextLevel
    ? ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100

  const getModuleProgress = (moduleId: string) => {
    const progress = userProgress.find((p) => p.moduleId === moduleId)
    return progress?.completionPercentage || 0
  }

  const getModuleIcon = (category: string) => {
    switch (category) {
      case "budgeting":
        return "💰"
      case "rti":
        return "📋"
      case "grievance":
        return "📢"
      case "governance":
        return "🏛️"
      case "participation":
        return "🤝"
      default:
        return "📚"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🧠 Civic Education Hub</h1>
        <p className="text-xl text-gray-600">Learn, Engage, and Become a Better Citizen</p>
      </div>

      {/* User Progress Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">{currentLevel.badge}</div>
            <h3 className="font-semibold text-lg">{currentLevel.title}</h3>
            <p className="text-sm text-gray-600">Level {currentLevel.level}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress to Next Level</span>
              <span className="text-sm text-gray-600">{Math.round(progressToNext)}%</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {nextLevel ? `${nextLevel.minPoints - totalPoints} points to ${nextLevel.title}` : "Max level reached!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{totalPoints}</div>
            <p className="text-sm text-gray-600">Total Points</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {userProgress.filter((p) => p.completionPercentage === 100).length}
            </div>
            <p className="text-sm text-gray-600">Modules Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="modules" className="flex items-center justify-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Learning Modules</span>
            <span className="sr-only">Learning Modules</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center justify-center gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Achievements</span>
            <span className="sr-only">Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center justify-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Leaderboard</span>
            <span className="sr-only">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center justify-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Certificates</span>
            <span className="sr-only">Certificates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Available Modules</h2>
            <div className="flex gap-2">
              <Badge variant="outline">🎯 Gamified Learning</Badge>
              <Badge variant="outline">🏆 Earn Certificates</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationModules.map((module) => {
              const progress = getModuleProgress(module.id)
              const isCompleted = progress === 100

              return (
                <Card key={module.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="text-3xl mb-2">{getModuleIcon(module.category)}</div>
                      <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {module.points} points
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1"
                            onClick={() => setSelectedModule(module)}
                            variant={isCompleted ? "outline" : "default"}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Review
                              </>
                            ) : (
                              <>
                                <PlayCircle className="mr-2 h-4 w-4" />
                                {progress > 0 ? "Continue" : "Start"}
                              </>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <span className="text-2xl">{getModuleIcon(module.category)}</span>
                              {module.title}
                            </DialogTitle>
                          </DialogHeader>
                          <ModuleDetailView module={module} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <h2 className="text-2xl font-bold">Your Achievements</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const isEarned = Math.random() > 0.7 // Mock earned status

              return (
                <Card key={achievement.id} className={`${isEarned ? "bg-yellow-50 border-yellow-200" : "opacity-60"}`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">{achievement.points} points</span>
                    </div>

                    <Badge
                      className={
                        achievement.rarity === "legendary"
                          ? "bg-purple-100 text-purple-800"
                          : achievement.rarity === "epic"
                            ? "bg-orange-100 text-orange-800"
                            : achievement.rarity === "rare"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {achievement.rarity}
                    </Badge>

                    {isEarned && (
                      <div className="mt-3">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Earned
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <h2 className="text-2xl font-bold">Learning Leaderboard</h2>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Learner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modules</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { rank: 1, name: "Priya Sharma", points: 2450, modules: 8, level: "Civic Champion", badge: "🏆" },
                      { rank: 2, name: "Rajesh Kumar", points: 2100, modules: 7, level: "Civic Champion", badge: "🥈" },
                      { rank: 3, name: "Anita Reddy", points: 1890, modules: 6, level: "Engaged Citizen", badge: "🥉" },
                      { rank: 4, name: "You", points: totalPoints, modules: 3, level: currentLevel.title, badge: "👤" },
                    ].map((entry) => (
                      <tr key={entry.rank} className={entry.name === "You" ? "bg-blue-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{entry.badge}</span>
                            <span className="font-medium">#{entry.rank}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{entry.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-semibold">{entry.points}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{entry.modules}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{entry.level}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <h2 className="text-2xl font-bold">Your Certificates</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationModules
              .filter((module) => module.certificate && getModuleProgress(module.id) === 100)
              .map((module) => (
                <Card key={module.id} className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">🏆</div>
                    <h3 className="font-semibold text-lg mb-2">{module.certificate?.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{module.certificate?.description}</p>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Certificate
                      </Button>
                      <Button variant="ghost" className="w-full">
                        Share on LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {educationModules.filter((module) => module.certificate && getModuleProgress(module.id) === 100).length ===
              0 && (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📜</div>
                  <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Complete modules to earn certificates and showcase your civic knowledge!
                  </p>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ModuleDetailView({ module }: { module: EducationModule }) {
  const [currentLesson, setCurrentLesson] = useState(0)

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
          <p className="font-semibold">{module.duration} minutes</p>
          <p className="text-sm text-gray-600">Total Duration</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Award className="h-6 w-6 mx-auto mb-2 text-green-600" />
          <p className="font-semibold">{module.points} points</p>
          <p className="text-sm text-gray-600">Completion Reward</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <BookOpen className="h-6 w-6 mx-auto mb-2 text-purple-600" />
          <p className="font-semibold">{module.lessons.length} lessons</p>
          <p className="text-sm text-gray-600">Learning Modules</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Course Content</h3>
        {module.lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              index === currentLesson ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
            }`}
            onClick={() => setCurrentLesson(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {lesson.type === "video" ? (
                    <Video className="h-4 w-4 text-blue-600" />
                  ) : lesson.type === "interactive" ? (
                    <Brain className="h-4 w-4 text-blue-600" />
                  ) : (
                    <FileText className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{lesson.title}</h4>
                  <p className="text-sm text-gray-600">
                    {lesson.duration} min • {lesson.type}
                  </p>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button className="flex-1">
          <PlayCircle className="mr-2 h-4 w-4" />
          Start Module
        </Button>
        <Button variant="outline">
          <Target className="mr-2 h-4 w-4" />
          View Requirements
        </Button>
      </div>
    </div>
  )
}
