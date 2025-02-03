"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { FileText, BookOpen, Link2, MessageSquare, PenTool, Mic, Calendar, Rocket } from "lucide-react"

interface CampaignCreationDialogProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { id: "blueprint", label: "Blueprint", icon: FileText },
  { id: "knowledge", label: "Knowledge Vault", icon: BookOpen },
  { id: "source", label: "Connect Source", icon: Link2 },
  { id: "channels", label: "Select Channels", icon: MessageSquare },
  { id: "craft", label: "Craft Center", icon: PenTool },
  { id: "voice", label: "Select AI Voice Agent", icon: Mic },
  { id: "calendar", label: "Choose Calendar", icon: Calendar },
  { id: "launch", label: "Launch", icon: Rocket },
] as const

type StepId = (typeof steps)[number]["id"]

export function CampaignCreationDialog({ isOpen, onClose }: CampaignCreationDialogProps) {
  const [currentStep, setCurrentStep] = useState<StepId>("source")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0">
        <div className="flex min-h-[600px] bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Sidebar */}
          <div className="w-64 p-6 border-r border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">Craft a New Campaign</h2>
            <div className="space-y-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors",
                    currentStep === step.id
                      ? "bg-white text-black"
                      : "text-white/70 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <step.icon className="h-4 w-4" />
                  {step.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Connect Your Source</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-4">Ad Platforms</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "Meta Ads",
                        description: "Call Leads as soon as they Sign Up to Your Campaign",
                        icon: "/placeholder.svg",
                      },
                      {
                        name: "Google Ads",
                        description: "Turn Interest into Appointments",
                        icon: "/placeholder.svg",
                      },
                      {
                        name: "LinkedIn Ads",
                        description: "The best place for B2B professionals",
                        icon: "/placeholder.svg",
                      },
                    ].map((platform) => (
                      <button
                        key={platform.name}
                        className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center group"
                      >
                        <div className="mb-4 w-12 h-12 mx-auto bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <img src={platform.icon || "/placeholder.svg"} alt={platform.name} className="w-6 h-6" />
                        </div>
                        <h5 className="text-white font-medium mb-2">{platform.name}</h5>
                        <p className="text-sm text-white/70">{platform.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-4">Forms</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "Tally Forms",
                        description: "Simple and powerful forms",
                        icon: "/placeholder.svg",
                      },
                      {
                        name: "Typeform Forms",
                        description: "Conversational forms",
                        icon: "/placeholder.svg",
                      },
                      {
                        name: "Google Forms",
                        description: "Easy to use forms",
                        icon: "/placeholder.svg",
                      },
                    ].map((platform) => (
                      <button
                        key={platform.name}
                        className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center group"
                      >
                        <div className="mb-4 w-12 h-12 mx-auto bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <img src={platform.icon || "/placeholder.svg"} alt={platform.name} className="w-6 h-6" />
                        </div>
                        <h5 className="text-white font-medium mb-2">{platform.name}</h5>
                        <p className="text-sm text-white/70">{platform.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

