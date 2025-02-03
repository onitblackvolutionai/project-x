"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { RefreshCcw, Zap } from "lucide-react"
import { CampaignCreationDialog } from "./campaign-creation-dialog"
import { ColdCampaignDialog } from "./cold-campaign-dialog"
import { InstantCallingDialog } from "./instant-calling-dialog"

interface WarmLeadsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function WarmLeadsDialog({ isOpen, onClose }: WarmLeadsDialogProps) {
  const [showCampaignCreation, setShowCampaignCreation] = useState(false)
  const [showColdCampaignDialog, setShowColdCampaignDialog] = useState(false)
  const [showInstantCallingDialog, setShowInstantCallingDialog] = useState(false)

  const handleReactivationCampaign = () => {
    setShowColdCampaignDialog(true)
  }

  const handleInstantCalling = () => {
    setShowInstantCallingDialog(true)
  }

  return (
    <>
      <Dialog
        open={isOpen && !showCampaignCreation && !showColdCampaignDialog && !showInstantCallingDialog}
        onOpenChange={onClose}
      >
        <DialogContent className="max-w-4xl border-0 p-0">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 p-8">
            <h2 className="mb-12 text-center text-4xl font-bold text-white">Choose What Best Suits You</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <button
                onClick={handleReactivationCampaign}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-600/50 to-gray-700/50 p-8 text-center transition-all hover:from-gray-600 hover:to-gray-700"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <RefreshCcw className="mb-6 h-16 w-16 text-white" />
                  <h3 className="mb-4 text-2xl font-semibold text-white">Reactivation Campaign</h3>
                  <p className="text-gray-300">
                    You Already have a lead list
                    <br />
                    and want to reach out to them
                  </p>
                </div>
              </button>
              <button
                onClick={handleInstantCalling}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-600/50 to-gray-700/50 p-8 text-center transition-all hover:from-gray-600 hover:to-gray-700"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <Zap className="mb-6 h-16 w-16 text-white" />
                  <h3 className="mb-4 text-2xl font-semibold text-white">Instant Calling</h3>
                  <p className="text-gray-300">
                    You want to reach out to people as they sign
                    <br />
                    up for your Ads/Funnels, for further
                    <br />
                    qualification, and appointment booking
                  </p>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CampaignCreationDialog
        isOpen={showCampaignCreation}
        onClose={() => {
          setShowCampaignCreation(false)
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
      <InstantCallingDialog
        isOpen={showInstantCallingDialog}
        onClose={() => {
          setShowInstantCallingDialog(false)
          onClose()
        }}
      />
    </>
  )
}

