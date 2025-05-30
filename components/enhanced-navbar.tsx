"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/components/language-context";

export function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false by default
  const { t, isRTL } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: "/report", label: t.nav.report, icon: Camera, badge: null },
    { href: "/projects", label: t.nav.projects, icon: MapPin, badge: "Live" },
    {
      href: "/dashboard",
      label: t.nav.dashboard,
      icon: BarChart3,
      badge: null,
    },
    { href: "/community", label: t.nav.community, icon: Users, badge: null },
    { href: "/engagement", label: "Engagement", icon: Brain, badge: "New" },
  ];

  const userStats = {
    name: "Priya Sharma",
    level: "Civic Champion",
    points: 2450,
    badge: "🏆",
    avatar: "/avatars/priya.jpg",
  };

  const recentNotifications = [
    {
      id: 1,
      title: "Your report was resolved",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "New campaign: Monsoon Watch",
      time: "1 day ago",
      type: "info",
    },
    {
      id: 3,
      title: "Achievement unlocked: RTI Expert",
      time: "2 days ago",
      type: "achievement",
    },
  ];

  const isActiveRoute = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  useEffect(() => {
    // Check login state on mount
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwtToken");
      setIsLoggedIn(!!token);
    }
  }, []);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                NammaNagar
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Civic Engagement Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex items-center space-x-1 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActiveRoute(item.href) ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    isRTL ? "flex-row-reverse space-x-reverse" : ""
                  }`}
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
          <div
            className={`flex items-center space-x-3 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
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
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3 text-center">
                    <span className="text-sm text-blue-600">
                      View all notifications
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 p-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userStats.avatar || "/placeholder.svg"}
                        alt={userStats.name}
                      />
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
                        <AvatarImage
                          src={userStats.avatar || "/placeholder.svg"}
                          alt={userStats.name}
                        />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{userStats.name}</p>
                        <p className="text-sm text-gray-600">
                          {userStats.level}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs font-medium">
                            {userStats.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/achievements"
                      className="flex items-center space-x-2"
                    >
                      <Award className="h-4 w-4" />
                      <span>Achievements</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="flex items-center space-x-2 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div
                className={`hidden md:flex items-center space-x-2 ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
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
              <SheetContent
                side={isRTL ? "left" : "right"}
                className="w-[300px] sm:w-[400px]"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile User Info */}
                  {isLoggedIn && (
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={userStats.avatar || "/placeholder.svg"}
                          alt={userStats.name}
                        />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{userStats.name}</p>
                        <p className="text-sm text-gray-600">
                          {userStats.level}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs font-medium">
                            {userStats.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation Items */}
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActiveRoute(item.href)
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      } ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <LanguageSelector variant="compact" />

                    {isLoggedIn ? (
                      <>
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                        </Link>
                        <Link href="/settings" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {t.nav.login}
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">{t.nav.signup}</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
