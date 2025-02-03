"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

interface AgentCardProps {
  agent: {
    id: string
    name: string
    description: string
    image: string
    voice: {
      // Add voice object to agent
      previewUrl: string
    }
  }
  isSelected: boolean
  onSelect: () => void
  onTest: () => void
}

export function AgentCard({ agent, isSelected, onSelect, onTest }: AgentCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Card
        className={`cursor-pointer transition-all duration-200 ${isSelected ? "ring-2 ring-white" : "hover:bg-white/5"}`}
        onClick={onSelect}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={agent.image || "/placeholder.svg"}
                alt={agent.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
              <p className="text-sm text-white/60">{agent.description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onTest()
              }}
            >
              <Play className="w-4 h-4 mr-2" /> Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

