"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Snowflake, Flame } from "lucide-react"
import { WarmLeadsDialog } from "./warm-leads-dialog"
import { ColdCampaignDialog } from "./cold-campaign-dialog"

interface CampaignPurposeDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CampaignPurposeDialog({ isOpen, onClose }: CampaignPurposeDialogProps) {
  const [showWarmLeadsDialog, setShowWarmLeadsDialog] = useState(false)
  const [showColdCampaignDialog, setShowColdCampaignDialog] = useState(false)

  const handleColdLeads = () => {
    setShowColdCampaignDialog(true)
  }

  return (
    <>
      <Dialog open={isOpen && !showWarmLeadsDialog && !showColdCampaignDialog} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl border-0 p-0">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 p-8">
            <h2 className="mb-12 text-center text-4xl font-bold text-white">What's Your Campaign Purpose?</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <button
                onClick={handleColdLeads}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-600/50 to-gray-700/50 p-8 text-center transition-all hover:from-gray-600 hover:to-gray-700"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <Snowflake className="mb-6 h-16 w-16 text-white" />
                  <h3 className="mb-4 text-2xl font-semibold text-white">Reach Out to Cold Leads</h3>
                  <p className="text-gray-300">Leads that you have never contacted before</p>
                </div>
              </button>
              <button
                onClick={() => setShowWarmLeadsDialog(true)}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-600/50 to-gray-700/50 p-8 text-center transition-all hover:from-gray-600 hover:to-gray-700"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <Flame className="mb-6 h-16 w-16 text-white" />
                  <h3 className="mb-4 text-2xl font-semibold text-white">Reach Out to Warm Leads</h3>
                  <p className="text-gray-300">
                    Run a Reactivation Campaign or reach out to leads instantly from your Ads/Funnels
                  </p>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <WarmLeadsDialog
        isOpen={showWarmLeadsDialog}
        onClose={() => {
          setShowWarmLeadsDialog(false)
          onClose()
        }}
      />

      <ColdCampaignDialog
        isOpen={showColdCampaignDialog}
        onClose={() => {
          setShowColdCampaignDialog(false)
          onClose()
        }}
      />
    </>
  )
}

