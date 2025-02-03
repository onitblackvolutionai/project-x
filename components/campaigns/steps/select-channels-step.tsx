"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MessageSquare, Video } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface Channel {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

interface SelectChannelsStepProps {
  onNext: () => void
}

export function SelectChannelsStep({ onNext }: SelectChannelsStepProps) {
  const channels: Channel[] = [
    {
      id: "phone",
      name: "AI Voice Calls",
      icon: Phone,
      description: "Automated voice calls with natural conversation",
    },
    {
      id: "email",
      name: "AI Email",
      icon: Mail,
      description: "Personalized email campaigns",
    },
    {
      id: "sms",
      name: "AI SMS",
      icon: MessageSquare,
      description: "Direct messaging through SMS",
    },
    {
      id: "video",
      name: "AI Video Messages",
      icon: Video,
      description: "Personalized video messages",
    },
  ]

  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set())

  const toggleChannel = (channelId: string) => {
    const newSelected = new Set(selectedChannels)
    if (newSelected.has(channelId)) {
      newSelected.delete(channelId)
    } else {
      newSelected.add(channelId)
    }
    setSelectedChannels(newSelected)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-card-foreground mb-2">Select Channels</h2>
        <p className="text-muted-foreground">Choose the channels for your campaign</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {channels.map((channel) => (
          <Card
            key={channel.id}
            className={`bg-white/5 border-white/10 transition-colors ${
              selectedChannels.has(channel.id) ? "ring-2 ring-white" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    <channel.icon className="h-6 w-6 text-card-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </div>
                </div>
                <Switch checked={selectedChannels.has(channel.id)} onCheckedChange={() => toggleChannel(channel.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
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

