"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface StepDialogProps {
  isOpen: boolean
  onClose: () => void
  initialStep?: string
}

const steps = [
  "Blueprint",
  "Knowledge Vault",
  "Leads",
  "Qualify Leads",
  "Select Channels",
  "Craft Center",
  "Select AI Agent",
  "Test",
  "Launch",
] as const

type Step = (typeof steps)[number]

export function StepDialog({ isOpen, onClose, initialStep = "Test" }: StepDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep as Step)

  const getStepContent = (step: Step) => {
    switch (step) {
      case "Test":
        return {
          title: "Test Campaigns",
          subtitle: "Give yourself a Quick Test",
          content: (
            <div className="space-y-6">
              <h3 className="text-lg text-[#ffffff]">Fill Out These Details:</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[#ffffff] mb-2 block">Name</label>
                  <Input className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff]" />
                </div>
                <div>
                  <label className="text-[#ffffff] mb-2 block">Phone Number</label>
                  <Input className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff]" />
                </div>
                <div>
                  <label className="text-[#ffffff] mb-2 block">Email</label>
                  <Input className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff]" />
                </div>
                <Button className="w-full bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90">Give me a Test</Button>
              </div>
            </div>
          ),
        }
      case "Blueprint":
        return {
          title: "Campaign Blueprint",
          subtitle: "Define your campaign strategy",
          content: (
            <div className="space-y-6">
              <div>
                <label className="text-[#ffffff] mb-2 block">Campaign Name</label>
                <Input className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff]" />
              </div>
              <div>
                <label className="text-[#ffffff] mb-2 block">Description</label>
                <Input className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff]" />
              </div>
              <Button className="w-full bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90">Save Blueprint</Button>
            </div>
          ),
        }
      // Similar content structure for other steps
      default:
        return {
          title: step,
          subtitle: `Configure your ${step.toLowerCase()}`,
          content: (
            <div className="space-y-6">
              <div>
                <label className="text-[#ffffff] mb-2 block">Configuration</label>
                <Input className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff]" />
              </div>
              <Button className="w-full bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90">Save {step}</Button>
            </div>
          ),
        }
    }
  }

  const handleStepClick = (step: Step) => {
    // Open a new dialog with the same layout but different content
    const newDialog = new StepDialog({
      isOpen: true,
      onClose: () => {},
      initialStep: step,
    })
    setCurrentStep(step)
  }

  const currentContent = getStepContent(currentStep)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-screen p-0 bg-[#09090b]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-[#ffffff]/10 p-6">
            <h1 className="text-2xl font-bold text-[#ffffff] mb-8">Craft a New Campaign</h1>
            <div className="space-y-2">
              {steps.map((step) => (
                <button
                  key={step}
                  onClick={() => handleStepClick(step)}
                  className={cn(
                    "w-full px-4 py-2 rounded-lg text-left transition-colors",
                    currentStep === step
                      ? "bg-[#ffffff] text-[#09090b]"
                      : "bg-[#ffffff]/10 text-[#ffffff] hover:bg-[#ffffff]/20",
                  )}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#ffffff] mb-4">{currentContent.title}</h2>
                {currentContent.subtitle && <p className="text-xl text-[#e7e7e7] mb-8">{currentContent.subtitle}</p>}
              </div>
              {currentContent.content}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

