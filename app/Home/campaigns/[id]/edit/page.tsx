"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { EditCampaignDialog } from "@/components/campaigns/edit-campaign-dialog"

export default function EditCampaignPage() {
  const params = useParams()
  const router = useRouter()
  const [campaign, setCampaign] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  useEffect(() => {
    // In a real application, you would fetch the campaign data here
    // For now, we'll use mock data
    setCampaign({
      id: params.id,
      name: "Sample Campaign",
      description: "This is a sample campaign description",
      channels: ["email", "phone"],
    })
  }, [params.id])

  const handleClose = () => {
    setIsDialogOpen(false)
    router.push("/campaigns")
  }

  if (!campaign) {
    return <div>Loading...</div>
  }

  return <EditCampaignDialog isOpen={isDialogOpen} onClose={handleClose} campaign={campaign} />
}

