"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface BlueprintStepProps {
  onNext: () => void
}

export function BlueprintStep({ onNext }: BlueprintStepProps) {
  const [formData, setFormData] = useState({
    campaignName: "",
    offer: "",
    targetAudience: "",
    successMetrics: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (formData.campaignName.length < 5) {
      newErrors.campaignName = "Campaign name must be at least 5 characters long."
    }
    if (formData.offer.length < 10) {
      newErrors.offer = "Please provide more details about your offer."
    }
    if (formData.targetAudience.length < 10) {
      newErrors.targetAudience = "Please describe your target audience in more detail."
    }
    if (formData.successMetrics.length < 10) {
      newErrors.successMetrics = "Please provide more specific success metrics."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Campaign Blueprint</h2>
        <p className="text-[#e7e7e7]">Define your campaign strategy and goals</p>
      </div>

      <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Campaign Name</label>
            <Input
              name="campaignName"
              placeholder="Enter campaign name"
              className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
              value={formData.campaignName}
              onChange={handleInputChange}
              error={errors.campaignName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">What specific offer are you selling?</label>
            <Textarea
              name="offer"
              placeholder="Describe your offer in detail..."
              className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white min-h-[100px]"
              value={formData.offer}
              onChange={handleInputChange}
              error={errors.offer}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Target Audience</label>
            <Textarea
              name="targetAudience"
              placeholder="Who is your ideal customer?"
              className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white min-h-[100px]"
              value={formData.targetAudience}
              onChange={handleInputChange}
              error={errors.targetAudience}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Success Metrics</label>
            <Textarea
              name="successMetrics"
              placeholder="What metrics will define success for this campaign?"
              className="bg-[#ffffff]/5 border-[#ffffff]/10 text-white min-h-[100px]"
              value={formData.successMetrics}
              onChange={handleInputChange}
              error={errors.successMetrics}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleNext} className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90">
          Next Step
        </Button>
      </div>
    </div>
  )
}

