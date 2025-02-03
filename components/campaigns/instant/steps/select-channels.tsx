"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MessageSquare } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

interface SelectChannelsStepProps {
  onNext: () => void
  onPrev: () => void
  data?: string[] // Make data optional
}

export function SelectChannelsStep({ onNext, onPrev, data }: SelectChannelsStepProps) {
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const toggleChannel = (channelId: string) => {
    const newSelected = new Set(selectedChannels)
    if (newSelected.has(channelId)) {
      newSelected.delete(channelId)
    } else {
      newSelected.add(channelId)
    }
    setSelectedChannels(newSelected)
  }

  const channels = [
    { id: "phone", name: "AI Voice Calls", icon: Phone, description: "Automated voice calls" },
    { id: "email", name: "AI Email", icon: Mail, description: "Personalized email campaigns" },
    { id: "sms", name: "AI SMS", icon: MessageSquare, description: "Direct messaging through SMS" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Select Channels</h2>
        <p className="text-[#e7e7e7]">Choose the channels for your campaign</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {channels.map((channel) => (
          <Card
            key={channel.id}
            className={`bg-[#ffffff]/5 border-[#ffffff]/10 transition-colors ${
              selectedChannels.has(channel.id) ? "ring-2 ring-white" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-[#ffffff]/10">
                    <channel.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{channel.name}</h3>
                    <p className="text-sm text-[#e7e7e7]">{channel.description}</p>
                  </div>
                </div>
                <Switch
                  checked={selectedChannels.has(channel.id)}
                  onCheckedChange={() => toggleChannel(channel.id)}
                  disabled={!data?.includes(channel.name)} // Disable if not in campaign data
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Button onClick={onPrev} variant="ghost">
          Previous
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90"
          disabled={selectedChannels.size === 0}
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}

