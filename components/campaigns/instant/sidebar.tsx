import { cn } from "@/lib/utils"

type StepType = "blueprint" | "knowledge" | "source" | "channels" | "craft" | "voice" | "calendar" | "launch"

interface InstantCampaignSidebarProps {
  currentStep: StepType
  onStepClick: (step: StepType) => void
}

const steps = [
  { id: "blueprint", label: "Blueprint" },
  { id: "knowledge", label: "Knowledge Vault" },
  { id: "source", label: "Connect Source" },
  { id: "channels", label: "Select Channels" },
  { id: "craft", label: "Craft Center" },
  { id: "voice", label: "Select AI Voice Agent" },
  { id: "calendar", label: "Choose Calendar" },
  { id: "launch", label: "Launch" },
] as const

export function InstantCampaignSidebar({ currentStep, onStepClick }: InstantCampaignSidebarProps) {
  return (
    <div className="w-64 space-y-2">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          className={cn(
            "w-full px-4 py-2 text-left rounded-lg transition-colors",
            currentStep === step.id
              ? "bg-white text-black font-medium"
              : "text-white/70 hover:bg-white/10 hover:text-white",
          )}
        >
          {step.label}
        </button>
      ))}
    </div>
  )
}

