"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { useState } from "react"

interface VoiceAgent {
  id: string
  name: string
  description: string
  image: string
  preview: string
}

interface SelectAIVoiceStepProps {
  onNext: () => void
}

export function SelectAIVoiceStepProps({ onNext }: SelectAIVoiceStepProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [playingPreview, setPlayingPreview] = useState<string | null>(null)

  const agents: VoiceAgent[] = [
    {
      id: "emma",
      name: "Emma Wilson",
      description: "Professional and friendly voice, perfect for business conversations",
      image: "/placeholder.svg",
      preview: "/sample-voice.mp3",
    },
    {
      id: "james",
      name: "James Anderson",
      description: "Confident and authoritative voice, ideal for executive-level communication",
      image: "/placeholder.svg",
      preview: "/sample-voice.mp3",
    },
    {
      id: "sarah",
      name: "Sarah Chen",
      description: "Warm and engaging voice, great for building rapport",
      image: "/placeholder.svg",
      preview: "/sample-voice.mp3",
    },
  ]

  const togglePreview = (agentId: string) => {
    if (playingPreview === agentId) {
      setPlayingPreview(null)
    } else {
      setPlayingPreview(agentId)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Select AI Voice Agent</h2>
        <p className="text-[#e7e7e7]">Choose the voice that will represent your brand</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className={`bg-[#ffffff]/5 border-[#ffffff]/10 transition-colors cursor-pointer ${
              selectedAgent === agent.id ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSelectedAgent(agent.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src={agent.image || "/placeholder.svg"}
                    alt={agent.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-[#e7e7e7] mb-4">{agent.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5"
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePreview(agent.id)
                  }}
                >
                  {playingPreview === agent.id ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Preview
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Preview Voice
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90"
          disabled={!selectedAgent}
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}

