"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Bell, Shield, Smartphone, Globe, Mail, User, Key, Eye, 
  Languages, MapPin, Moon, Sun, Volume2, BellRing, MessageSquare,
  Trash2, Download, LogOut, HelpCircle
} from "lucide-react"

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    updates: false,
    reportStatus: true,
    communityAlerts: true,
    mentions: true,
    responses: true
  })

  const [profileSettings, setProfileSettings] = useState({
    name: "Priya Sharma",
    email: "priya.s@example.com",
    phone: "+91 9876543210",
    location: "Bangalore",
    bio: "Passionate about urban development"
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showLocation: true,
    showActivity: true,
    allowMessages: true,
    allowTags: false
  })

  const [preferences, setPreferences] = useState({
    language: "english",
    theme: "light",
    radius: "5",
    soundEnabled: true,
    autoTranslate: false
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <div className="border-b">
            <TabsList className="grid grid-cols-4 w-full">
              {[
                { value: 'notifications', icon: Bell, label: 'Notifications' },
                { value: 'account', icon: User, label: 'Account' },
                { value: 'privacy', icon: Shield, label: 'Privacy' },
                { value: 'preferences', icon: Globe, label: 'Preferences' }
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="flex items-center justify-center gap-2 py-2.5"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sr-only">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications about civic updates and reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive updates about your reports via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <BellRing className="h-4 w-4" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Get real-time updates on your device
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>

                {/* Community Alerts */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Community Alerts
                    </Label>
                    <p className="text-sm text-gray-500">
                      Updates about community activities and events
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.communityAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings(prev => ({ ...prev, communityAlerts: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Information */}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileSettings.name}
                      onChange={(e) =>
                        setProfileSettings(prev => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) =>
                        setProfileSettings(prev => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileSettings.bio}
                      onChange={(e) =>
                        setProfileSettings(prev => ({ ...prev, bio: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-gray-500">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Visibility */}
                <div className="space-y-4">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) =>
                      setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Sharing */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Show Location
                    </Label>
                    <p className="text-sm text-gray-500">
                      Allow others to see your location on reports
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showLocation}
                    onCheckedChange={(checked) =>
                      setPrivacySettings(prev => ({ ...prev, showLocation: checked }))
                    }
                  />
                </div>

                {/* Activity Visibility */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Activity Visibility
                    </Label>
                    <p className="text-sm text-gray-500">
                      Show your activity in the community feed
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showActivity}
                    onCheckedChange={(checked) =>
                      setPrivacySettings(prev => ({ ...prev, showActivity: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your app experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Language
                  </Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) =>
                      setPreferences(prev => ({ ...prev, language: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी</SelectItem>
                      <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Theme
                    </Label>
                    <p className="text-sm text-gray-500">
                      Choose your preferred theme
                    </p>
                  </div>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) =>
                      setPreferences(prev => ({ ...prev, theme: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Sound Effects
                    </Label>
                    <p className="text-sm text-gray-500">
                      Enable sound effects for notifications
                    </p>
                  </div>
                  <Switch
                    checked={preferences.soundEnabled}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, soundEnabled: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}