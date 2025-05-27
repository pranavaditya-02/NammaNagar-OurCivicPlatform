"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MapPin, Camera, BarChart3, Users } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useLanguage()

  const navItems = [
    { href: "/report", label: t.nav.report, icon: Camera },
    { href: "/projects", label: t.nav.projects, icon: MapPin },
    { href: "/dashboard", label: t.nav.dashboard, icon: BarChart3 },
    { href: "/community", label: t.nav.community, icon: Users },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NammaNagar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-6 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className={`hidden md:flex items-center space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <LanguageSelector variant="compact" />
            <Link href="/login">
              <Button variant="ghost">{t.nav.login}</Button>
            </Link>
            <Link href="/register">
              <Button>{t.nav.signup}</Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector variant="compact" />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "left" : "right"} className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t.nav.login}
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">{t.nav.signup}</Button>
                    </Link>
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
