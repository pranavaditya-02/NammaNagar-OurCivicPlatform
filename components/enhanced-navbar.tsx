"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  MapPin,
  Camera,
  BarChart3,
  Users,
  Bell,
  Search,
  Brain,
  Settings,
  LogOut,
  User,
  Award,
} from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-context"

export function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state
  const { t, isRTL } = useLanguage()
  const pathname = usePathname()

  const navItems = [
    { href: "/report", label: t.nav.report, icon: Camera, badge: null },
    { href: "/projects", label: t.nav.projects, icon: MapPin, badge: "Live" },
    { href: "/dashboard", label: t.nav.dashboard, icon: BarChart3, badge: null },
    { href: "/community", label: t.nav.community, icon: Users, badge: null },
    { href: "/engagement", label: "Engagement", icon: Brain, badge: "New" },
  ]

  const userStats = {
    name: "Priya Sharma",
    level: "Civic Champion",
    points: 2450,
    badge: "🏆",
    avatar: "/avatars/priya.jpg",
  }

  const recentNotifications = [
    { id: 1, title: "Your report was resolved", time: "2 hours ago", type: "success" },
    { id: 2, title: "New campaign: Monsoon Watch", time: "1 day ago", type: "info" },
    { id: 3, title: "Achievement unlocked: RTI Expert", time: "2 days ago", type: "achievement" },
  ]

  const isActiveRoute = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="container  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">NammaNagar</span>
              <span className="text-xs text-gray-500 hidden sm:block">Civic Engagement Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center space-x-1 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActiveRoute(item.href) ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className={`flex items-center space-x-3 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector variant="compact" />
            </div>

            {/* Notifications */}
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  {recentNotifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-3">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "success"
                              ? "bg-green-500"
                              : notification.type === "achievement"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3 text-center">
                    <span className="text-sm text-blue-600">View all notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userStats.avatar || "/placeholder.svg"} alt={userStats.name} />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{userStats.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        {userStats.badge} {userStats.level}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-3 border-b">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={userStats.avatar || "/placeholder.svg"} alt={userStats.name} />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{userStats.name}</p>
                        <p className="text-sm text-gray-600">{userStats.level}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs font-medium">{userStats.points} points</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/achievements" className="flex items-center space-x-2">
                      <Award className="h-4 w-4" />
                      <span>Achievements</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="flex items-center space-x-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div
                className={`hidden md:flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <Link href="/login">
                  <Button variant="ghost">{t.nav.login}</Button>
                </Link>
                <Link href="/register">
                  <Button>{t.nav.signup}</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-4 border-b">
                    {isLoggedIn ? (
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={userStats.avatar} alt={userStats.name} />
                          <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{userStats.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {userStats.level}
                            </Badge>
                            <span className="text-xs text-gray-500">{userStats.points} points</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Link href="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">{t.nav.login}</Button>
                        </Link>
                        <Link href="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">{t.nav.signup}</Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-2">
                      {/* Main Navigation Items in Rows */}
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 p-3 mb-1 rounded-lg transition-colors ${
                            isActiveRoute(item.href) 
                              ? "bg-blue-50 text-blue-600" 
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium flex-1">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Quick Actions Grid remains the same */}
                    <div className="p-2 border-t">
                      <p className="px-2 py-1 text-xs font-medium text-gray-500 uppercase">
                        Quick Actions
                      </p>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { icon: User, label: 'Profile', href: '/profile' },
                          { icon: Award, label: 'Achievements', href: '/achievements' },
                       
                          { icon: Settings, label: 'Settings', href: '/settings' }
                        ].map((action) => (
                          <Link
                            key={action.href}
                            href={action.href}
                            onClick={() => setIsOpen(false)}
                            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                          >
                            <action.icon className="h-5 w-5 mb-1" />
                            <span className="text-[10px] text-center">{action.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-2 border-t mt-auto">
                      <div className="space-y-2">
                        <LanguageSelector variant="compact" />
                        {isLoggedIn && (
                          <Button 
                            variant="ghost" 
                            className="w-full justify-center text-red-600 text-sm"
                            onClick={() => setIsOpen(false)}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
