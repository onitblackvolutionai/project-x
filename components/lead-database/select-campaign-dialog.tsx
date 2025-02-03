"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Campaign {
  id: string
  name: string
  description: string
  status: "active" | "draft" | "completed"
}

interface SelectCampaignDialogProps {
  isOpen: boolean
  onClose: () => void
  leadListId: string
}

export function SelectCampaignDialog({ isOpen, onClose, leadListId }: SelectCampaignDialogProps) {
  const { toast } = useToast()
  const [loadingCampaignId, setLoadingCampaignId] = useState<string | null>(null)
  const [successCampaignId, setSuccessCampaignId] = useState<string | null>(null)

  // Sample campaigns - in a real app, this would come from your campaign store or API
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Q4 Sales Campaign",
      description: "End of year sales push",
      status: "active",
    },
    {
      id: "2",
      name: "Holiday Marketing",
      description: "Holiday season promotions",
      status: "draft",
    },
    {
      id: "3",
      name: "New Product Launch",
      description: "Product awareness campaign",
      status: "active",
    },
  ]

  const handleUseInCampaign = async (campaignId: string) => {
    setLoadingCampaignId(campaignId)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccessCampaignId(campaignId)
      toast({
        title: "Success!",
        description: "Lead list has been added to your campaign.",
      })

      // Reset and close after a delay
      setTimeout(() => {
        setLoadingCampaignId(null)
        setSuccessCampaignId(null)
        onClose()
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add lead list to campaign. Please try again.",
        variant: "destructive",
      })
      setLoadingCampaignId(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6 bg-[#09090B] text-white">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Select Campaign</h2>
            <p className="text-white/60">Choose a campaign to use these leads with</p>
          </div>

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-white">{campaign.name}</h3>
                  <p className="text-sm text-white/60">{campaign.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : campaign.status === "draft"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>

                  <Button
                    onClick={() => handleUseInCampaign(campaign.id)}
                    disabled={loadingCampaignId === campaign.id || successCampaignId !== null}
                    className={`w-24 ${
                      successCampaignId === campaign.id
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-white text-black hover:bg-white/90"
                    }`}
                  >
                    {loadingCampaignId === campaign.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : successCampaignId === campaign.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      "Use"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

