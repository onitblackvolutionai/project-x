"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CampaignTypeSelection } from "@/components/campaigns/campaign-type-selection"
import { ColdCampaignWizard } from "@/components/campaigns/cold-campaign-wizard"
import { WarmCampaignWizard } from "@/components/campaigns/warm-campaign-wizard"

export default function NewCampaignPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [campaignType, setCampaignType] = useState<"cold" | "warm" | null>(null)

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "cold" || type === "warm") {
      setCampaignType(type)
    }
  }, [searchParams])

  if (campaignType === null) {
    return <CampaignTypeSelection />
  }

  if (campaignType === "cold") {
    return <ColdCampaignWizard onCampaignCreated={() => router.push("/campaigns")} />
  }

  if (campaignType === "warm") {
    return <WarmCampaignWizard onCampaignCreated={() => router.push("/campaigns")} />
  }

  return null
}

