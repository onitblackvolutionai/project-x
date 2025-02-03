import { Slider } from "@mui/material"

interface PersonalitySliderProps {
  label: string
  value: number
  onChange: (value: number) => void
}

export function PersonalitySlider({ label, value, onChange }: PersonalitySliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-white/60">{Math.round(value * 100)}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        min={0}
        max={1}
        step={0.1}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
      />
    </div>
  )
}

