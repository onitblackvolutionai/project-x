"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface ConnectSourceDialogProps {
  onComplete: () => void
}

interface PlatformCardProps {
  name: string
  description: string
  logo: string
  onClick: () => void
}

function PlatformCard({ name, description, logo, onClick }: PlatformCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors text-center group"
    >
      <div className="mb-4 w-16 h-16 flex items-center justify-center">
        <Image
          src={logo || "/placeholder.svg"}
          alt={name}
          width={48}
          height={48}
          className="group-hover:scale-110 transition-transform"
        />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </button>
  )
}

const platforms = {
  ads: [
    {
      name: "Meta Ads",
      description: "Call Leads as soon as they Sign Up to Your Campaign",
      logo: "https://v0.dev/meta-logo.svg",
    },
    {
      name: "Google Ads",
      description: "Turn Interest into Appointments",
      logo: "https://v0.dev/google-logo.svg",
    },
    {
      name: "LinkedIn Ads",
      description: "The best place for B2B professionals",
      logo: "https://v0.dev/linkedin-logo.svg",
    },
  ],
  forms: [
    {
      name: "Tally Forms",
      description: "Simple and powerful forms",
      logo: "https://v0.dev/tally-logo.svg",
    },
    {
      name: "Typeform Forms",
      description: "Conversational forms",
      logo: "https://v0.dev/typeform-logo.svg",
    },
    {
      name: "Google Forms",
      description: "Easy to use forms",
      logo: "https://v0.dev/google-forms-logo.svg",
    },
  ],
}

export function ConnectSourceDialog({ onComplete }: ConnectSourceDialogProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsConnecting(false)
    setSelectedPlatform(null)
    onComplete()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Connect Your Source</h2>
        <p className="text-gray-400">Select Your Lead Source</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Ad Platforms</h3>
          <div className="grid grid-cols-3 gap-4">
            {platforms.ads.map((platform) => (
              <PlatformCard key={platform.name} {...platform} onClick={() => setSelectedPlatform(platform.name)} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Forms</h3>
          <div className="grid grid-cols-3 gap-4">
            {platforms.forms.map((platform) => (
              <PlatformCard key={platform.name} {...platform} onClick={() => setSelectedPlatform(platform.name)} />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedPlatform} onOpenChange={() => setSelectedPlatform(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {selectedPlatform}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-400">
              Configure your connection to {selectedPlatform} to start receiving leads instantly.
            </p>
            <Button onClick={handleConnect} className="w-full" disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect & Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

