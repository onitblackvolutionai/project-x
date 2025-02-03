"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

interface SelectAIVoiceStepProps {
  onNext: () => void
  onPrev: () => void
}

export function SelectAIVoiceStep({ onNext, onPrev }: SelectAIVoiceStepProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const { toast } = useToast()

  const agents = [
    {
      id: "emma",
      name: "Emma Wilson",
      description: "Professional and friendly voice, perfect for business conversations",
    },
    {
      id: "james",
      name: "James Anderson",
      description: "Confident and authoritative voice, ideal for executive-level communication",
    },
    { id: "sarah", name: "Sarah Chen", description: "Warm and engaging voice, great for building rapport" },
  ]

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
                    src={`/placeholder.svg`}
                    alt={agent.name}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-[#e7e7e7] mb-4">{agent.description}</p>
                <Button variant="outline" size="sm" className="border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5">
                  Preview Voice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={onNext} disabled={!selectedAgent}>
          Next
        </Button>
      </div>
    </div>
  )
}

