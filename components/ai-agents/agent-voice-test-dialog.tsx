"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, CircleStopIcon as Stop } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface AgentVoiceTestDialogProps {
  isOpen: boolean
  onClose: () => void
  agent: {
    id: string
    name: string
    image: string
    voice: {
      previewUrl: string
    }
  }
}

export function AgentVoiceTestDialog({ isOpen, onClose, agent }: AgentVoiceTestDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [isOpen])

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-6 bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={agent.image || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
            </div>
            <span className="text-white">{agent.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 text-center">
          <p className="text-lg text-white">"Hey there. This is just Closi speaking. How are you doing today?"</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" onClick={handlePlay} disabled={isPlaying}>
              <Play className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleStop} disabled={!isPlaying}>
              <Stop className="h-5 w-5" />
            </Button>
          </div>
          <audio ref={audioRef} src={agent.voice.previewUrl} preload="auto" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

