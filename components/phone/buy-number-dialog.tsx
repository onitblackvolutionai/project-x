"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface BuyNumberDialogProps {
  isOpen: boolean
  onClose: () => void
  onBuy: (countryCode: string, areaCode: string) => void
}

export function BuyNumberDialog({ isOpen, onClose, onBuy }: BuyNumberDialogProps) {
  const [countryCode, setCountryCode] = useState("")
  const [areaCode, setAreaCode] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  const handleFind = async () => {
    if (!countryCode) {
      toast({
        title: "Error",
        description: "Please enter a country code",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    // Simulate API call to find available numbers
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSearching(false)

    toast({
      title: "Numbers Found",
      description: "Available numbers found for your selected region",
    })
  }

  const handleBuy = async () => {
    if (!countryCode || !areaCode) {
      toast({
        title: "Error",
        description: "Please enter both country code and area code",
        variant: "destructive",
      })
      return
    }

    onBuy(countryCode, areaCode)
    setCountryCode("")
    setAreaCode("")
    toast({
      title: "Success",
      description: "Phone number purchased successfully",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-800 border-none p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Buy a New Phone Number</h2>

          <div className="space-y-2">
            <label className="text-sm text-white/80">Choose Country Code</label>
            <div className="flex gap-4">
              <Input
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="flex-1 bg-zinc-700/50 border-none text-white h-12"
                placeholder="Enter country code"
              />
              <Button
                onClick={handleFind}
                disabled={isSearching}
                className="bg-white text-black hover:bg-white/90 px-8"
              >
                {isSearching ? "Finding..." : "Find"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/80">Choose Area Code</label>
            <div className="flex gap-4">
              <Input
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
                className="flex-1 bg-zinc-700/50 border-none text-white h-12"
                placeholder="Enter area code"
              />
              <Button onClick={handleBuy} className="bg-white text-black hover:bg-white/90 px-8">
                Buy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

