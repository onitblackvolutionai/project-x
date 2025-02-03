"use client"

import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
DialogDescription,
DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Agent {
id: string
name: string
description: string
imageUrl: string
}

const agents: Agent[] = [
{
  id: "nick",
  name: "Nick",
  description: "Your go-to guy when it comes to bringing in revenue",
  imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9RurfwMeBNXLfReJ4xChTifTMzwfkG.png",
},
{
  id: "darcy",
  name: "Darcy",
  description: "Polite, but firm, doesn't hesitate to make a point",
  imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mj1A1bBsBBNKIoO38Xk4W9rJyLlO1O.png",
},
{
  id: "emma",
  name: "Emma Hilton",
  description: "Sweet, Polite and she will get the Job Done",
  imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jHjPlMihP5ccLi72b78lhuW0wYK6jl.png",
},
]

interface SelectAIAgentDialogProps {
isOpen: boolean
onClose: () => void
onSave: (agentId: string) => void
}

export function SelectAIAgentDialog({ isOpen, onClose, onSave }: SelectAIAgentDialogProps) {
const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
const { toast } = useToast()

const handleSave = () => {
  if (selectedAgent) {
    onSave(selectedAgent)
    onClose()
  } else {
    toast({
      title: "No agent selected",
      description: "Please select an AI agent before saving.",
      variant: "destructive",
    })
  }
}

return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="bg-[#09090b]/80 backdrop-blur-sm p-0 text-white">
      <DialogHeader>
        <DialogTitle className="text-2xl">Select AI Agent</DialogTitle>
        <DialogDescription>Choose the voice that will represent your brand</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className={`border-white/10 bg-white/5 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
              selectedAgent === agent.id ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSelectedAgent(agent.id)}
          >
            <CardContent className="flex flex-col items-center p-6">
              <div className="relative h-24 w-24 mb-4">
                <Image
                  src={agent.imageUrl || "/placeholder.svg"}
                  alt={agent.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <CardTitle className="text-lg font-semibold mb-2">{agent.name}</CardTitle>
              <p className="text-sm text-white/70 text-center">{agent.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DialogFooter>
        <Button onClick={handleSave} className="bg-white text-black hover:bg-white/90">
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
}

