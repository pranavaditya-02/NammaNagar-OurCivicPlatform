"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Wifi, WifiOff, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react"

interface SyncStatus {
  isConnected: boolean
  lastSync: string
  nextSync: string
  syncProgress: number
  dataSources: {
    name: string
    status: "connected" | "syncing" | "error" | "offline"
    lastUpdate: string
    recordCount: number
  }[]
}

export function RealTimeSyncIndicator() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isConnected: true,
    lastSync: new Date().toISOString(),
    nextSync: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    syncProgress: 0,
    dataSources: [
      {
        name: "eProcurement Portal",
        status: "connected",
        lastUpdate: new Date().toISOString(),
        recordCount: 1247,
      },
      {
        name: "GeM Portal",
        status: "connected",
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        recordCount: 856,
      },
      {
        name: "PFMS",
        status: "syncing",
        lastUpdate: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        recordCount: 423,
      },
      {
        name: "State Tender Portal",
        status: "connected",
        lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        recordCount: 2156,
      },
    ],
  })

  const [isManualSync, setIsManualSync] = useState(false)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSyncStatus((prev) => ({
        ...prev,
        dataSources: prev.dataSources.map((source) => ({
          ...source,
          lastUpdate: source.status === "syncing" ? new Date().toISOString() : source.lastUpdate,
          recordCount:
            source.status === "syncing" ? source.recordCount + Math.floor(Math.random() * 5) : source.recordCount,
        })),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleManualSync = async () => {
    setIsManualSync(true)

    // Simulate sync process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setSyncStatus((prev) => ({ ...prev, syncProgress: i }))
    }

    setSyncStatus((prev) => ({
      ...prev,
      lastSync: new Date().toISOString(),
      nextSync: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      syncProgress: 0,
      dataSources: prev.dataSources.map((source) => ({
        ...source,
        status: "connected",
        lastUpdate: new Date().toISOString(),
        recordCount: source.recordCount + Math.floor(Math.random() * 20),
      })),
    }))

    setIsManualSync(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-gray-500" />
      default:
        return <Database className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "syncing":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "offline":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="space-y-4">
      {/* Main Sync Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {syncStatus.isConnected ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-semibold">Government Data Sync</p>
                <p className="text-sm text-gray-600">
                  Last sync: {formatTimeAgo(syncStatus.lastSync)} | Next: {formatTimeAgo(syncStatus.nextSync)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={syncStatus.isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {syncStatus.isConnected ? "Connected" : "Offline"}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleManualSync} disabled={isManualSync}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isManualSync ? "animate-spin" : ""}`} />
                Sync Now
              </Button>
            </div>
          </div>

          {isManualSync && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Syncing data sources...</span>
                <span>{syncStatus.syncProgress}%</span>
              </div>
              <Progress value={syncStatus.syncProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Sources Status */}
      <div className="grid md:grid-cols-2 gap-4">
        {syncStatus.dataSources.map((source, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(source.status)}
                  <span className="font-medium">{source.name}</span>
                </div>
                <Badge className={getStatusColor(source.status)}>{source.status}</Badge>
              </div>
              <div className="text-sm text-gray-600">
                <p>Records: {source.recordCount.toLocaleString()}</p>
                <p>Updated: {formatTimeAgo(source.lastUpdate)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sync Alerts */}
      {syncStatus.dataSources.some((s) => s.status === "error") && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Some data sources are experiencing connectivity issues. Data may not be up-to-date. Please check your
            network connection.
          </AlertDescription>
        </Alert>
      )}

      {syncStatus.dataSources.some((s) => s.status === "syncing") && (
        <Alert>
          <RefreshCw className="h-4 w-4" />
          <AlertDescription>
            Data synchronization in progress. New records are being fetched from government portals.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
