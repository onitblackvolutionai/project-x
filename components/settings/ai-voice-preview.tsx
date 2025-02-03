"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AIVoicePreviewProps {
  gender: "male" | "female"
}

export function AIVoicePreview({ gender }: AIVoicePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [pitch, setPitch] = useState([1])
  const [speed, setSpeed] = useState([1])

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="text-sm text-white/60">Preview {gender} voice</div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Pitch</span>
            <span className="text-sm text-white/60">{pitch[0]}</span>
          </div>
          <Slider
            value={pitch}
            onValueChange={setPitch}
            min={0.5}
            max={2}
            step={0.1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Speed</span>
            <span className="text-sm text-white/60">{speed[0]}x</span>
          </div>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            min={0.5}
            max={2}
            step={0.1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>
      </div>
    </div>
  )
}

