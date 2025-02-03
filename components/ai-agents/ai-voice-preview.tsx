"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AIVoicePreviewProps {
  gender: "male" | "female"
  pitch: number
  speed: number
  onPitchChange: (value: number) => void
  onSpeedChange: (value: number) => void
}

export function AIVoicePreview({ gender, pitch, speed, onPitchChange, onSpeedChange }: AIVoicePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    // Here you would typically trigger the voice synthesis
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    onPitchChange(1)
    onSpeedChange(1)
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handlePlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="text-sm text-white/60">Preview {gender} voice</div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Pitch</span>
            <span className="text-sm text-white/60">{pitch.toFixed(1)}</span>
          </div>
          <Slider
            value={[pitch]}
            onValueChange={([value]) => onPitchChange(value)}
            min={0.5}
            max={2}
            step={0.1}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Speed</span>
            <span className="text-sm text-white/60">{speed.toFixed(1)}x</span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
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

