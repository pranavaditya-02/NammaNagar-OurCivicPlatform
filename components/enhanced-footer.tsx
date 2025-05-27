"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Youtube,
  Linkedin,
  Heart,
  Award,
  Users,
  TrendingUp,
  Shield,
  Globe,
} from "lucide-react"
import { useLanguage } from "@/components/language-context"

export function EnhancedFooter() {
  const { t, currentLanguage } = useLanguage()

  const quickLinks = [
    { href: "/report", label: "Report Issue" },
    { href: "/projects", label: "Track Projects" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/community", label: "Community" },
    { href: "/engagement", label: "Engagement Hub" },
  ]

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/api", label: "API Documentation" },
    { href: "/tutorials", label: "Video Tutorials" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Support" },
  ]

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/accessibility", label: "Accessibility" },
    { href: "/transparency", label: "Transparency Report" },
  ]

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/nammanagar", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/nammanagar", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/nammanagar", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/nammanagar", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/nammanagar", label: "YouTube" },
    { icon: Github, href: "https://github.com/nammanagar", label: "GitHub" },
  ]

  const achievements = [
    { icon: "🏆", title: "Digital India Award 2024", desc: "Best Civic Tech Platform" },
    { icon: "🌟", title: "UN Recognition", desc: "Sustainable Cities Initiative" },
    { icon: "🎖️", title: "Government Partnership", desc: "Official Integration" },
  ]

  const stats = [
    { icon: Users, value: "45,000+", label: "Active Citizens" },
    { icon: TrendingUp, value: "12,847", label: "Issues Resolved" },
    { icon: MapPin, value: "156", label: "Cities Covered" },
    { icon: Award, value: "2.3Cr", label: "Budget Saved" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Stats Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">NammaNagar</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-600 text-white text-xs">Verified Platform</Badge>
                  <Badge className="bg-blue-600 text-white text-xs">Government Partner</Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              India's leading civic engagement platform empowering citizens to monitor, track, and improve their
              communities through transparency, accountability, and collaborative action.
            </p>

            {/* Language Support */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Available in:</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  English
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  हिंदी
                </Badge>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  தமிழ்
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">hello@nammanagar.in</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">+91 80 1234 5678</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Stay Updated</h4>
              <p className="text-xs text-gray-400">Get weekly updates on civic improvements in your area</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <Separator className="my-8 bg-gray-800" />
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white text-center">Recognition & Awards</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-white text-sm">{achievement.title}</h4>
                <p className="text-xs text-gray-400">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Trust */}
        <Separator className="my-8 bg-gray-800" />
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-400" />
              <span className="text-sm text-gray-300">Made with ❤️ for India</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>ISO 27001 Certified</span>
            <span>•</span>
            <span>GDPR Compliant</span>
            <span>•</span>
            <span>Government Approved</span>
          </div>
        </div>

        {/* Copyright */}
        <Separator className="my-8 bg-gray-800" />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; 2024 NammaNagar. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span>Version 2.1.0</span>
            <span>•</span>
            <span>Last updated: January 2024</span>
            <span>•</span>
            <Link href="/status" className="hover:text-white transition-colors">
              System Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
