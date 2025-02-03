"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Info, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PhoneNumberDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (countryCode: string, areaCode: string) => void
}

export function PhoneNumberDialog({ isOpen, onClose, onSave }: PhoneNumberDialogProps) {
  const [countryCode, setCountryCode] = useState("+1")
  const [areaCode, setAreaCode] = useState("")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-white/10 bg-[#1C1C1C] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Buy Phone Number</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="text-lg text-white">Country</label>
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="h-12 border-white/10 bg-black/20 text-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+1">United States (+1)</SelectItem>
                <SelectItem value="+44">United Kingdom (+44)</SelectItem>
                <SelectItem value="+91">India (+91)</SelectItem>
                {/* Add more countries as needed */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg text-white">
              Area Code <span className="text-white/60">(Optional)</span>
            </label>
            <Input
              placeholder="e.g. 650"
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
              className="h-12 border-white/10 bg-black/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-white/5 p-4">
            <Info className="h-5 w-5 flex-shrink-0 text-white/60" />
            <p className="text-sm text-white/60">This number incurs a monthly fee of $2.00.</p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button onClick={() => onSave(countryCode, areaCode)} className="bg-white text-black hover:bg-white/90">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

