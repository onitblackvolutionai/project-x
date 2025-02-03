"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { motion } from "framer-motion"

interface ConnectSourceStepProps {
  onNext: () => void
  onPrev?: () => void
  data?: {
    criteria?: string[]
  }
}

export function ConnectSourceStep({ onNext, onPrev, data }: ConnectSourceStepProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const { toast } = useToast()

  const platforms = {
    ads: [
      {
        name: "Meta Ads",
        description: "Call Leads as soon as they Sign Up to Your Campaign",
        icon: "https://www.facebook.com/images/fb_icon_325x325.png",
      },
      {
        name: "Google Ads",
        description: "Turn Interest into Appointments",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
      },
      {
        name: "LinkedIn Ads",
        description: "The best place for B2B professionals",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png",
      },
    ],
    forms: [
      {
        name: "Tally Forms",
        description: "Simple and powerful forms",
        icon: "https://tally.so/favicon.svg",
      },
      {
        name: "Typeform Forms",
        description: "Conversational forms",
        icon: "https://www.typeform.com/favicon.ico",
      },
      {
        name: "Google Forms",
        description: "Easy to use forms",
        icon: "https://ssl.gstatic.com/docs/forms/device_home/android_192.png",
      },
    ],
  }

  const handleConnect = async (platformName: string) => {
    // Simulate connecting to the platform
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Connected!",
      description: `Successfully connected to ${platformName}.`,
    })

    setSelectedPlatform(null) // Close the dialog
    onNext() // Proceed to the next step
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Select Your Lead Source</h2>
      <p className="text-sm text-white/60">Choose where your leads will come from</p>

      {/* Qualification Criteria */}
      {data?.criteria && (
        <div className="space-y-2 mt-4">
          <h3 className="text-lg font-medium text-white">Qualification Criteria</h3>
          <ul className="list-disc list-inside text-sm text-white/80">
            {data.criteria.map((criterion, index) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Platform Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {/* Advertising Platforms */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Advertising Platforms</h3>
          <div className="grid grid-cols-1 gap-4">
            {platforms.ads.map((platform) => (
              <motion.div
                key={platform.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#2b2b2b] rounded-lg p-6 text-center cursor-pointer transition-all duration-200 hover:bg-[#3b3b3b]"
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <Image
                  src={platform.icon || "/placeholder.svg"}
                  alt={platform.name}
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h4 className="text-lg font-semibold text-white mb-2">{platform.name}</h4>
                <p className="text-sm text-white/80">{platform.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form Platforms */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Form Platforms</h3>
          <div className="grid grid-cols-1 gap-4">
            {platforms.forms.map((platform) => (
              <motion.div
                key={platform.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#2b2b2b] rounded-lg p-6 text-center cursor-pointer transition-all duration-200 hover:bg-[#3b3b3b]"
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <Image
                  src={platform.icon || "/placeholder.svg"}
                  alt={platform.name}
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h4 className="text-lg font-semibold text-white mb-2">{platform.name}</h4>
                <p className="text-sm text-white/80">{platform.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Connect Dialog */}
      <Dialog open={!!selectedPlatform} onOpenChange={() => setSelectedPlatform(null)}>
        <DialogContent className="bg-gray-800 p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-white">Connect {selectedPlatform}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-gray-400">
              Configure your connection to {selectedPlatform} to start receiving leads instantly.
            </p>
            <Button onClick={() => handleConnect(selectedPlatform!)} className="w-full bg-purple-600">
              Connect & Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between mt-8">
        {onPrev && (
          <Button variant="outline" onClick={onPrev} className="border-white/20 text-white hover:bg-white/10">
            Previous
          </Button>
        )}
        <Button onClick={onNext} className="bg-[#6B2FED] text-white hover:bg-[#6B2FED]/90">
          Next
        </Button>
      </div>
    </div>
  )
}

