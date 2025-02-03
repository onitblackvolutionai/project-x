"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SIPTrunkingDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: {
    phoneNumber: string
    terminationUri: string
    username?: string
    password?: string
    nickname?: string
  }) => void
}

export function SIPTrunkingDialog({ isOpen, onClose, onSave }: SIPTrunkingDialogProps) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    terminationUri: "",
    username: "",
    password: "",
    nickname: "",
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-white/10 bg-[#1C1C1C] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Connect to your number via SIP trunking</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="text-lg text-white">Phone Number</label>
            <Input
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              className="h-12 border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg text-white">Termination URI</label>
            <Input
              placeholder="Enter termination URI"
              value={formData.terminationUri}
              onChange={(e) => setFormData((prev) => ({ ...prev, terminationUri: e.target.value }))}
              className="h-12 border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg text-white">
              SIP Trunk User Name <span className="text-white/60">(Optional)</span>
            </label>
            <Input
              placeholder="Enter SIP Trunk User Name"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              className="h-12 border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg text-white">
              SIP Trunk Password <span className="text-white/60">(Optional)</span>
            </label>
            <Input
              type="password"
              placeholder="Enter SIP Trunk Password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="h-12 border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg text-white">
              Nickname <span className="text-white/60">(Optional)</span>
            </label>
            <Input
              placeholder="Enter Nickname"
              value={formData.nickname}
              onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
              className="h-12 border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSave(formData)}
              disabled={!formData.phoneNumber || !formData.terminationUri}
              className="bg-white text-black hover:bg-white/90"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

