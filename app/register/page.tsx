"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { MapPin } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    interests: [] as string[],
  })

  const cities = ["Bengaluru", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"]

  const interests = [
    "Roads & Transportation",
    "Water Supply",
    "Sanitation",
    "Electricity",
    "Healthcare",
    "Education",
    "Parks & Recreation",
    "Environment",
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests.filter((i) => i !== interest),
      }))
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join the Movement</h1>
          <p className="text-gray-600">Create your account and start making a difference</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Step {step} of 3 - {step === 1 ? "Basic Information" : step === 2 ? "Location Details" : "Preferences"}
            </CardDescription>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>

                <Button type="button" onClick={handleNext} className="w-full">
                  Continue
                </Button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area/Locality</Label>
                  <Input
                    id="area"
                    placeholder="e.g., Koramangala, HSR Layout"
                    value={formData.area}
                    onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" onClick={handleBack} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext} className="flex-1">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Areas of Interest (Select all that apply)</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <Label htmlFor={interest} className="text-sm font-normal">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button type="button" onClick={handleBack} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create Account
                  </Button>
                </div>
              </div>
            )}

            {step === 1 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    Continue with Aadhaar
                  </Button>
                </div>
              </>
            )}

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
