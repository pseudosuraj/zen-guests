"use client"

import { use, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"

interface CheckInPageProps {
  params: Promise<{
    bookingId: string
  }>
}

export default function CheckInPage({ params }: CheckInPageProps) {
  // Unwrap the params Promise using React.use()
  const { bookingId } = use(params)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [guestData, setGuestData] = useState({
    fullName: "Rajesh Kumar",
    phoneNumber: "+91 98765 43210",
    idDocument: null as File | null,
  })

  const totalSteps = 2
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setGuestData({ ...guestData, idDocument: file })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log("Form submitted with data:", guestData)
    alert("Check-in submitted successfully! (Demo mode)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Online Check-in for The Grand Mumbai
          </h1>
          <p className="text-slate-600">
            Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-slate-700">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                currentStep >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              1
            </div>
            <span className="text-xs mt-2 font-medium text-slate-600">Guest Details</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${currentStep > 1 ? "bg-blue-600" : "bg-slate-200"}`} />
          </div>
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                currentStep >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              2
            </div>
            <span className="text-xs mt-2 font-medium text-slate-600">ID Verification</span>
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Guest Details"}
              {currentStep === 2 && "ID Verification"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please confirm your details below"}
              {currentStep === 2 && "Upload a clear photo of your government-issued ID"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Guest Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={guestData.fullName}
                    onChange={(e) =>
                      setGuestData({ ...guestData, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="text-base"
                  />
                  <p className="text-xs text-slate-500">
                    As it appears on your government-issued ID
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={guestData.phoneNumber}
                    onChange={(e) =>
                      setGuestData({ ...guestData, phoneNumber: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    className="text-base"
                  />
                  <p className="text-xs text-slate-500">
                    We'll send your check-in confirmation to this number
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: ID Verification */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idUpload">Upload ID Document</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <Label
                          htmlFor="idUpload"
                          className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Click to upload
                        </Label>
                        <p className="text-sm text-slate-500 mt-1">
                          or drag and drop your ID here
                        </p>
                      </div>
                      <Input
                        id="idUpload"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <p className="text-xs text-slate-400">
                        Aadhaar, Passport, Driving License, or Voter ID
                      </p>
                    </div>
                  </div>
                  {guestData.idDocument && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800 font-medium">
                        ✓ File uploaded: {guestData.idDocument.name}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Size: {(guestData.idDocument.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="w-32"
              >
                Back
              </Button>
              <Button
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
                className="w-32 bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === totalSteps ? "Submit" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            🔒 Your information is encrypted and secure. We comply with all data protection regulations.
          </p>
        </div>
      </div>
    </div>
  )
}
