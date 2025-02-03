"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CampaignConfigDialog } from "./campaign-config-dialog"

interface EditCampaignDialogProps {
  isOpen: boolean
  onClose: () => void
  campaign: {
    id: string
    name: string
    description: string
    channels: string[]
  }
}

export function EditCampaignDialog({ isOpen, onClose, campaign }: EditCampaignDialogProps) {
  const [name, setName] = useState(campaign.name)
  const [description, setDescription] = useState(campaign.description)
  const [showConfig, setShowConfig] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    // Here you would typically update the campaign in your state or make an API call
    toast({
      title: "Campaign updated",
      description: "Your campaign has been successfully updated.",
    })
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-black text-white">
          <h2 className="text-2xl font-bold mb-4">Edit Campaign</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <Button onClick={() => setShowConfig(true)} className="w-full bg-white text-black hover:bg-white/90">
              View Configurations
            </Button>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CampaignConfigDialog isOpen={showConfig} onClose={() => setShowConfig(false)} campaignId={campaign.id} />
    </>
  )
}

