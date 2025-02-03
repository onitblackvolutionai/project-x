"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { InstantCampaignSidebar } from "@/components/campaigns/instant/sidebar"
import { ConnectSourceStep } from "@/components/campaigns/instant/steps/connect-source"
import { BlueprintStep } from "@/components/campaigns/instant/steps/blueprint"
import { KnowledgeVaultStep } from "@/components/campaigns/instant/steps/knowledge-vault"
import { SelectChannelsStep } from "@/components/campaigns/instant/steps/select-channels"
import { CraftCenterStep } from "@/components/campaigns/instant/steps/craft-center"
import { SelectAIVoiceStep } from "@/components/campaigns/instant/steps/select-ai-voice"
import { ChooseCalendarStep } from "@/components/campaigns/instant/steps/choose-calendar"
import { LaunchStep } from "@/components/campaigns/instant/steps/launch"

type StepType = "blueprint" | "knowledge" | "source" | "channels" | "craft" | "voice" | "calendar" | "launch"

export default function InstantCampaignPage() {
  const [currentStep, setCurrentStep] = useState<StepType>("source")

  // Sample Data - Replace with actual data fetching
  const data = {
    campaign_name: "Instant Calling: Warm Leads",
    blueprint: {
      goal: "Engage warm leads with personalized calls.",
      audience: "Warm leads with previous interest.",
      key_messages: [
        "Tailored benefits based on past interactions.",
        "Address potential concerns.",
        "Clear call-to-action.",
      ],
      channels: ["Phone Calls"],
      timeline: {
        start: "2025-02-02",
        end: "2025-03-02",
      },
    },
    knowledge_vault: {
      lead_info: "Details on lead interactions and history.",
      faqs: "Key product/service FAQs.",
      competitor_data: "Basic competitor insights.",
    },
    qualify_leads: {
      criteria: ["Recent interaction within 6 months", "Interest in similar products", "Fits ideal customer profile"],
    },
    craft_center: {
      call_script: {
        greeting: "Personalized introduction referencing past interactions.",
        value_prop: "Relevant benefits.",
        objections: "Prepared responses.",
        closing: "Direct call-to-action.",
      },
    },
    launch: {
      preparation: "Train team on script and responses.",
      execution: "Call during optimal times.",
      monitoring: "Track outcomes and adjust as needed.",
    },
  }

  const stepComponents = {
    blueprint: <BlueprintStep onNext={() => setCurrentStep("knowledge")} data={data.blueprint} />,
    knowledge: (
      <KnowledgeVaultStep
        onNext={() => setCurrentStep("source")}
        onPrev={() => setCurrentStep("blueprint")}
        data={data.knowledge_vault}
      />
    ),
    source: (
      <ConnectSourceStep
        onNext={() => setCurrentStep("channels")}
        onPrev={() => setCurrentStep("knowledge")}
        data={data.qualify_leads}
      />
    ),
    channels: (
      <SelectChannelsStep
        onNext={() => setCurrentStep("craft")}
        onPrev={() => setCurrentStep("source")}
        data={data.blueprint.channels}
      />
    ),
    craft: (
      <CraftCenterStep
        onNext={() => setCurrentStep("voice")}
        onPrev={() => setCurrentStep("channels")}
        data={data.craft_center}
      />
    ),
    voice: <SelectAIVoiceStep onNext={() => setCurrentStep("calendar")} onPrev={() => setCurrentStep("craft")} />,
    calendar: <ChooseCalendarStep onNext={() => setCurrentStep("launch")} onPrev={() => setCurrentStep("voice")} />,
    launch: <LaunchStep onPrev={() => setCurrentStep("calendar")} data={data.launch} />,
  }

  return (
    <div className="min-h-screen bg-[#09090B] p-6">
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-white mb-8">Craft a New Campaign</h1>
          <div className="flex gap-6">
            <InstantCampaignSidebar currentStep={currentStep} onStepClick={setCurrentStep} />
            <div className="flex-1 bg-gray-800/50 rounded-lg p-6">{stepComponents[currentStep]}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

