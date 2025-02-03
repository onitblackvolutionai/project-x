"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CampaignCard } from "@/components/campaigns/campaign-card"
import { CampaignPurposeDialog } from "@/components/campaigns/campaign-purpose-dialog"
import { useRouter } from "next/navigation"
import { EditCampaignDialog } from "@/components/campaigns/edit-campaign-dialog"
import { motion, AnimatePresence } from "framer-motion"

interface Campaign {
  id: string
  name: string
  description: string
  channels: Array<"email" | "phone">
  status: "active" | "paused" | "draft"
  createdAt: Date
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Campaign 1",
      description: "Reaching out to Real Estate Professionals to offer a 24/7 AI SDR in their business",
      channels: ["email", "phone"],
      status: "active",
      createdAt: new Date(),
    },
    // Add more sample campaigns here
  ])

  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const router = useRouter()

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
  }

  const handlePurposeSelect = (purpose: "cold" | "warm", subtype?: "reactivation" | "instant") => {
    setShowNewCampaignDialog(false)
    if (purpose === "cold") {
      router.push(`/campaigns/new?type=cold`)
    } else if (subtype) {
      router.push(`/campaigns/new?type=warm&subtype=${subtype}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h1 className="text-4xl font-medium mb-2">Campaigns</h1>
            <p className="text-lg text-gray-400">Manage your outreach campaigns</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2 text-base font-medium"
              onClick={() => setShowNewCampaignDialog(true)}
            >
              Create a New Campaign
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {campaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <CampaignCard
                  key={campaign.id}
                  name={campaign.name}
                  description={campaign.description}
                  channels={campaign.channels}
                  onDelete={() => handleDelete(campaign.id)}
                  onEdit={() => setEditingCampaign(campaign)}
                  id={campaign.id}
                  status={campaign.status}
                  createdAt={campaign.createdAt}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <CampaignPurposeDialog
          isOpen={showNewCampaignDialog}
          onClose={() => setShowNewCampaignDialog(false)}
          onSelectPurpose={handlePurposeSelect}
        />

        {editingCampaign && (
          <EditCampaignDialog
            isOpen={!!editingCampaign}
            onClose={() => setEditingCampaign(null)}
            campaign={editingCampaign}
          />
        )}
      </div>
    </div>
  )
}

