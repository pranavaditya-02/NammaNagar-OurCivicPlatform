"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MapPin, Mail, Phone } from "lucide-react"

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">NammaNagar</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue making a difference in your community</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your preferred sign-in method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Login Method Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={loginMethod === "email" ? "default" : "outline"}
                onClick={() => setLoginMethod("email")}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button
                variant={loginMethod === "phone" ? "default" : "outline"}
                onClick={() => setLoginMethod("phone")}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Phone
              </Button>
            </div>

            <form className="space-y-4">
              {loginMethod === "email" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              )}

              {loginMethod === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
              )}

              <Button type="submit" className="w-full">
                {loginMethod === "email" ? "Sign In" : "Send OTP"}
              </Button>
            </form>

            {loginMethod === "email" && (
              <div className="text-center">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full">
                Continue with Aadhaar
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By signing in, you agree to our</p>
          <div className="flex justify-center gap-4 mt-1">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
