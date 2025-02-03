import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function GeneralSettings() {
  const [darkMode, setDarkMode] = useState(true)
  const [fontSize, setFontSize] = useState([16])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <p className="text-sm text-gray-500">Enable or disable dark mode</p>
        </div>
        <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
      </div>
      <div className="space-y-4">
        <Label htmlFor="font-size">Font Size</Label>
        <Slider id="font-size" min={12} max={24} step={1} value={fontSize} onValueChange={setFontSize} />
        <p className="text-sm text-gray-500">Current font size: {fontSize}px</p>
      </div>
    </div>
  )
}

