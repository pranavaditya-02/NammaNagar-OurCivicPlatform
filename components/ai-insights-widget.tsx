"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react"

export function AIInsightsWidget() {
  const insights = [
    {
      title: "Peak Issue Hours",
      description: "Most infrastructure issues are reported between 8-10 AM and 6-8 PM",
      confidence: 94,
      actionable: true,
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Seasonal Patterns",
      description: "Water-related issues increase by 340% during monsoon season",
      confidence: 89,
      actionable: true,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Resolution Efficiency",
      description: "Issues with photos are resolved 60% faster than text-only reports",
      confidence: 96,
      actionable: false,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Fraud Prevention",
      description: "AI has prevented ₹2.3 Cr in fraudulent claims this quarter",
      confidence: 98,
      actionable: false,
      icon: Zap,
      color: "text-purple-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI-Generated Insights
        </CardTitle>
        <CardDescription>Machine learning insights from infrastructure data analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <insight.icon className={`h-5 w-5 ${insight.color}`} />
                <h4 className="font-semibold">{insight.title}</h4>
              </div>
              {insight.actionable && (
                <Badge variant="outline" className="text-xs">
                  Actionable
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-600">{insight.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">AI Confidence</span>
              <div className="flex items-center gap-2">
                <Progress value={insight.confidence} className="w-16 h-2" />
                <span className="text-xs font-medium">{insight.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
