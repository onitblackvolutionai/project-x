"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { BlueprintStep } from "./instant/steps/blueprint"
import { KnowledgeVaultStep } from "./instant/steps/knowledge-vault"
import { ConnectSourceStep } from "./instant/steps/connect-source"
import { SelectChannelsStep } from "./instant/steps/select-channels"
import { CraftCenterStep } from "./instant/steps/craft-center"
import { SelectAIVoiceStep } from "./instant/steps/select-ai-voice"
import { ChooseCalendarStep } from "./instant/steps/choose-calendar"
import { LaunchStep } from "./instant/steps/launch"

type Step = "blueprint" | "knowledge" | "leads" | "channels" | "craft" | "agent" | "test" | "launch"

const steps = [
  { id: "blueprint", label: "Blueprint" },
  { id: "knowledge", label: "Knowledge Vault" },
  { id: "leads", label: "Leads" },
  { id: "channels", label: "Select Channels" },
  { id: "craft", label: "Craft Center" },
  { id: "agent", label: "Select AI Agent" },
  { id: "test", label: "Test" },
  { id: "launch", label: "Launch" },
] as const

interface InstantCallingDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function InstantCallingDialog({ isOpen, onClose }: InstantCallingDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>("blueprint")

  const stepComponents = {
    blueprint: <BlueprintStep onNext={() => setCurrentStep("knowledge")} />,
    knowledge: <KnowledgeVaultStep onNext={() => setCurrentStep("leads")} onPrev={() => setCurrentStep("blueprint")} />,
    leads: <ConnectSourceStep onNext={() => setCurrentStep("channels")} onPrev={() => setCurrentStep("knowledge")} />,
    channels: <SelectChannelsStep onNext={() => setCurrentStep("craft")} onPrev={() => setCurrentStep("leads")} />,
    craft: <CraftCenterStep onNext={() => setCurrentStep("agent")} onPrev={() => setCurrentStep("channels")} />,
    agent: <SelectAIVoiceStep onNext={() => setCurrentStep("test")} onPrev={() => setCurrentStep("craft")} />,
    test: <ChooseCalendarStep onNext={() => setCurrentStep("launch")} onPrev={() => setCurrentStep("agent")} />,
    launch: <LaunchStep onPrev={() => setCurrentStep("test")} />,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 bg-[#09090B] text-white">
        <div className="flex h-[80vh]">
          {/* Sidebar */}
          <div className="w-64 border-r border-[#ffffff]/10 p-6 space-y-2">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "w-full px-4 py-3 text-left transition-all duration-200 rounded-lg flex items-center gap-3",
                  step.id === currentStep ? "bg-[#ffffff] text-[#09090b]" : "text-[#ffffff]/70 hover:bg-[#ffffff]/10",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full text-sm",
                    step.id === currentStep ? "bg-[#09090b] text-white" : "bg-[#ffffff]/10 text-white/70",
                  )}
                >
                  {index + 1}
                </div>
                <span className="text-base font-medium flex-1">{step.label}</span>
                {step.id === currentStep && <ChevronRight className="w-5 h-5" />}
              </motion.button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">{stepComponents[currentStep]}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

