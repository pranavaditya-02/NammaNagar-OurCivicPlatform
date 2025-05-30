"use client";

import dynamic from "next/dynamic";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter, // Add this import
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  IndianRupee,
  Calendar,
  Filter,
  FileText, // Changed from FileText2
  Building2,
  BarChart2,
  ShieldAlert,
} from "lucide-react";
import { FraudDetectionDashboard } from "@/components/fraud-detection-dashboard";
import { AIInsightsWidget } from "@/components/ai-insights-widget";
import { RealTimeSyncIndicator } from "@/components/real-time-sync-indicator";

const PredictedIssuesDashboard = dynamic(
  () => import("@/components/ai-predicted-issues-dashboard"),
  { ssr: false }
);

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Reports",
      value: "12,847",
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Resolved Issues",
      value: "8,923",
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "In Progress",
      value: "2,156",
      change: "-3%",
      trend: "down",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Pending",
      value: "1,768",
      change: "+5%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const recentReports = [
    {
      id: "NNG-001247",
      title: "Pothole on Koramangala 5th Block",
      category: "Roads",
      status: "In Progress",
      priority: "High",
      date: "2024-01-15",
      location: "Koramangala, Bengaluru",
    },
    {
      id: "NNG-001246",
      title: "Broken streetlight near bus stop",
      category: "Electricity",
      status: "Resolved",
      priority: "Medium",
      date: "2024-01-14",
      location: "Indiranagar, Bengaluru",
    },
    {
      id: "NNG-001245",
      title: "Water logging during rain",
      category: "Water",
      status: "Assigned",
      priority: "High",
      date: "2024-01-13",
      location: "HSR Layout, Bengaluru",
    },
    {
      id: "NNG-001244",
      title: "Garbage not collected for 3 days",
      category: "Sanitation",
      status: "Pending",
      priority: "Medium",
      date: "2024-01-12",
      location: "Whitefield, Bengaluru",
    },
  ];

  const projects = [
    {
      name: "Koramangala Road Widening",
      budget: "₹15.2 Cr",
      progress: 75,
      status: "On Track",
      deadline: "March 2024",
      contractor: "ABC Infrastructure Ltd.",
    },
    {
      name: "HSR Layout Drainage System",
      budget: "₹8.5 Cr",
      progress: 45,
      status: "Delayed",
      deadline: "April 2024",
      contractor: "XYZ Constructions",
    },
    {
      name: "Indiranagar Park Development",
      budget: "₹3.2 Cr",
      progress: 90,
      status: "On Track",
      deadline: "February 2024",
      contractor: "Green Spaces Pvt Ltd",
    },
  ];

  const fraudCases = [
    {
      title: "Suspicious Transaction at ATM",
      reportId: "FRAUD-20240101",
      status: "Reviewed",
      riskScore: 85,
      reasons: ["Multiple withdrawals", "Location deviation"],
      detectedBy: "AI System",
      date: "2024-01-01",
    },
    {
      title: "Unusual Login Attempt",
      reportId: "FRAUD-20240102",
      status: "Pending",
      riskScore: 90,
      reasons: ["Unknown device", "Geographic anomaly"],
      detectedBy: "AI System",
      date: "2024-01-02",
    },
    {
      title: "Large Fund Transfer",
      reportId: "FRAUD-20240103",
      status: "Reviewed",
      riskScore: 75,
      reasons: ["High amount", "New payee"],
      detectedBy: "AI System",
      date: "2024-01-03",
    },
    {
      title: "Suspicious Account Activity",
      reportId: "FRAUD-20240104",
      status: "Pending",
      riskScore: 80,
      reasons: ["Frequent transactions", "IP address change"],
      detectedBy: "AI System",
      date: "2024-01-04",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Assigned":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Civic Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Real-time insights into your city's infrastructure with live
            government data
          </p>
        </div>

        {/* Real-time Sync Indicator */}
        <div className="mb-8">
          <RealTimeSyncIndicator />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reports" className="flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Citizen Reports</span>
              <span className="sr-only">Citizen Reports</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Infrastructure Projects</span>
              <span className="sr-only">Infrastructure Projects</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center justify-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sr-only">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="fraud" className="flex items-center justify-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span className="hidden sm:inline">Fraud Detection</span>
              <span className="sr-only">Fraud Detection</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Reports</h2>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {report.id}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {report.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {report.location}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={getPriorityColor(report.priority)}
                            >
                              {report.priority}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {report.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <h2 className="text-lg sm:text-2xl font-bold">
                Active Infrastructure Projects
              </h2>
              <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9">
                <MapPin className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                View on Map
              </Button>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-base sm:text-xl">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="grid grid-cols-2 sm:flex items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="flex items-center gap-1 sm:gap-1.5">
                            <IndianRupee className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                            {project.budget}
                          </span>
                          <span className="flex items-center gap-1 sm:gap-1.5">
                            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                            {project.deadline}
                          </span>
                          <span className="flex items-center gap-1 sm:gap-1.5 col-span-2 sm:col-span-1">
                            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{project.contractor}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${
                          project.status === "On Track"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } text-[10px] sm:text-xs px-1.5 sm:px-2 h-5 sm:h-6 whitespace-nowrap w-fit`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5 sm:h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Issue Categories</CardTitle>
                  <CardDescription>
                    Distribution of reported issues by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Roads & Transportation</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20 h-2" />
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Water Supply</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-20 h-2" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sanitation</span>
                      <div className="flex items-center gap-2">
                        <Progress value={15} className="w-20 h-2" />
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Electricity</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-20 h-2" />
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Others</span>
                      <div className="flex items-center gap-2">
                        <Progress value={5} className="w-20 h-2" />
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resolution Time</CardTitle>
                  <CardDescription>
                    Average time to resolve issues by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Roads</span>
                      <span className="text-sm font-medium">12 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Water</span>
                      <span className="text-sm font-medium">8 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Electricity</span>
                      <span className="text-sm font-medium">5 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sanitation</span>
                      <span className="text-sm font-medium">7 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add AI Insights Widget */}
            <AIInsightsWidget />
          </TabsContent>
          <TabsContent value="fraud" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-6">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold">Recent Fraud Detection Cases</h2>
                <p className="text-sm text-gray-600">Latest reports flagged by our AI fraud detection system</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fraudCases.map((fraud, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1.5">
                        <CardTitle className="text-base font-semibold leading-tight">
                          {fraud.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Report ID: {fraud.reportId}
                        </CardDescription>
                      </div>
                      <Badge 
                        className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 font-medium"
                      >
                        {fraud.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Risk Score:</span>
                        <span className="text-red-600">{fraud.riskScore}%</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">Detection Reasons:</p>
                        <div className="flex flex-wrap gap-2">
                          {fraud.reasons.map((reason, idx) => (
                            <Badge 
                              key={idx}
                              variant="outline" 
                              className="text-[10px] px-1.5 py-0.5"
                            >
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">Detected By:</p>
                        <p className="text-xs">{fraud.detectedBy}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">Date:</p>
                        <p className="text-xs">{fraud.date}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs h-8"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs h-8"
                    >
                      Review Evidence
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Predicted Issues Dashboard */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Predicted Civic Issues</h2>
          <PredictedIssuesDashboard />
        </div>
      </div>
    </div>
  );
}
