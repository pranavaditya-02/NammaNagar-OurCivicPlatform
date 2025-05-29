"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Target, FileText, Users, Camera, Trophy } from "lucide-react"

const achievementTiers = [
	{ name: "Bronze", minPoints: 0, maxPoints: 1000, color: "amber" },
	{ name: "Silver", minPoints: 1001, maxPoints: 2500, color: "gray" },
	{ name: "Gold", minPoints: 2501, maxPoints: 5000, color: "yellow" },
	{ name: "Platinum", minPoints: 5001, maxPoints: 10000, color: "purple" }
]

const achievementCategories = {
	civic: {
		name: "Civic Engagement",
		description: "Participate and lead community initiatives",
		achievements: [
			{
				title: "Voice of Change",
				description: "Submit 5 policy improvement suggestions",
				progress: 60,
				current: 3,
				total: 5,
				points: 100,
				icon: FileText
			},
			// Add more civic achievements
		]
	},
	infrastructure: {
		name: "Infrastructure Guardian",
		description: "Monitor and improve local infrastructure",
		achievements: [
			{
				title: "Road Warrior",
				description: "Report 20 road issues",
				progress: 75,
				current: 15,
				total: 20,
				points: 200,
				icon: Camera
			},
			// Add more infrastructure achievements
		]
	},
	enviromental: {
		name: "Environmental Hero",
		description: "Protect and enhance the environment",
		achievements: [
			{
				title: "Green Guardian",
				description: "Participate in 5 clean-up drives",
				progress: 40,
				current: 2,
				total: 5,
				points: 150,
				icon: Target
			},
			// Add more environmental achievements
		]
	}
}

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
			{/* Achievement Progress Banner */}
			<Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
				<CardContent className="p-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						<div>
							<h1 className="text-2xl font-bold mb-2">Silver Tier Achievement Hunter</h1>
							<p className="text-gray-600">Next tier: Gold (2,501 points needed)</p>
							<div className="mt-4 w-full max-w-md">
								<Progress value={85} className="h-2.5" />
								<div className="flex justify-between mt-2 text-sm text-gray-500">
									<span>2,450 points</span>
									<span>2,501 points</span>
								</div>
							</div>
						</div>
						<div className="flex gap-4">
							{achievementTiers.map((tier, index) => (
								<div
									key={index}
									className={`text-center p-3 rounded-lg ${
										stats.totalPoints >= tier.minPoints
											? `bg-${tier.color}-100 text-${tier.color}-700`
											: 'bg-gray-100 text-gray-400'
									}`}
								>
									<Trophy className="h-6 w-6 mx-auto mb-1" />
									<div className="text-sm font-medium">{tier.name}</div>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Enhanced Stats Overview */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Achievement Statistics</CardTitle>
				</CardHeader>
				<CardContent className="p-6">
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
						<div className="text-center p-4">
							<Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
							<div className="text-2xl font-bold">{stats.totalPoints}</div>
							<div className="text-sm text-gray-600">Total Points</div>
						</div>
						<div className="text-center p-4">
							<Star className="h-6 w-6 text-blue-500 mx-auto mb-2" />
							<div className="text-2xl font-bold">#{stats.rank}</div>
							<div className="text-sm text-gray-600">City Rank</div>
						</div>
						<div className="text-center p-4">
							<Award className="h-6 w-6 text-purple-500 mx-auto mb-2" />
							<div className="text-2xl font-bold">{stats.badges}</div>
							<div className="text-sm text-gray-600">Badges Earned</div>
						</div>
						<div className="text-center p-4">
							<Camera className="h-6 w-6 text-green-500 mx-auto mb-2" />
							<div className="text-2xl font-bold">{stats.issuesReported}</div>
							<div className="text-sm text-gray-600">Issues Reported</div>
						</div>
						<div className="text-center p-4">
							<Target className="h-6 w-6 text-red-500 mx-auto mb-2" />
							<div className="text-2xl font-bold">{stats.issuesResolved}</div>
							<div className="text-sm text-gray-600">Issues Resolved</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Achievement Categories */}
			{Object.entries(achievementCategories).map(([key, category]) => (
				<Card key={key} className="mb-8">
					<CardHeader>
						<CardTitle>{category.name}</CardTitle>
						<CardDescription>{category.description}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{category.achievements.map((achievement, index) => (
								<Card key={index} className="border-2 border-gray-100">
									<CardContent className="p-4">
										<div className="flex items-start gap-4">
											<div className="p-2 rounded-lg bg-blue-50">
												<achievement.icon className="h-5 w-5 text-blue-500" />
											</div>
											<div className="flex-1">
												<h3 className="font-semibold mb-1">{achievement.title}</h3>
												<p className="text-sm text-gray-600 mb-3">
													{achievement.description}
												</p>
												<div className="space-y-2">
													<Progress value={achievement.progress} className="h-2" />
													<div className="flex justify-between text-sm">
														<span className="text-gray-500">
															{achievement.current} / {achievement.total}
														</span>
														<span className="text-blue-600">
															+{achievement.points} pts
														</span>
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}