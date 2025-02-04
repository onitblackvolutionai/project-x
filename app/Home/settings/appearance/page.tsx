"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/settings/color-picker"
import { PreviewCard } from "@/components/settings/preview-card"
import { useSettings } from "@/store/settings-store"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { toast } from "@/components/ui/use-toast"
import { Moon, Sun } from "lucide-react"

export default function AppearancePage() {
  const settings = useSettings()
  const { theme, setTheme } = useTheme() // Added theme to destructured object

  const [localSettings, setLocalSettings] = useState({
    themeMode: settings.themeMode,
    primaryColor: settings.primaryColor,
    fontSize: settings.fontSize,
    borderRadius: settings.borderRadius,
    animations: settings.animations,
  })

  useEffect(() => {
    // Update local state whenever settings change in the store
    setLocalSettings({
      themeMode: settings.themeMode,
      primaryColor: settings.primaryColor,
      fontSize: settings.fontSize,
      borderRadius: settings.borderRadius,
      animations: settings.animations,
    })
  }, [settings])

  const handleChange = (key: keyof typeof localSettings, value: any) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    settings.setAppearance(localSettings)
    toast({
      title: "Changes saved",
      description: "Your appearance settings have been updated.",
    })
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Appearance Settings</h1>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <Card className="border-white/10 bg-black/40 backdrop-blur-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Theme</CardTitle>
          <CardDescription>Customize the look and feel of your platform.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Theme Mode */}
          <div className="space-y-4">
            <Label className="text-white">Theme Mode</Label>
            <div className="grid grid-cols-3 gap-3">
              {["light", "dark", "system"].map((mode) => (
                <Button
                  key={mode}
                  variant={localSettings.themeMode === mode ? "default" : "outline"}
                  onClick={() => handleChange("themeMode", mode)}
                  className={cn(
                    "text-base font-medium px-6 py-3 rounded-lg transition-all duration-200",
                    localSettings.themeMode === mode
                      ? "bg-white text-black hover:bg-white/90"
                      : "border-white/20 text-white hover:bg-white/10",
                  )}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Primary Color */}
          <div className="space-y-4">
            <Label className="text-white">Primary Color</Label>
            <ColorPicker color={localSettings.primaryColor} onChange={(color) => handleChange("primaryColor", color)} />
          </div>

          {/* Font Size */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white">Font Size</Label>
              <span className="text-sm text-white/60">{localSettings.fontSize}px</span>
            </div>
            <Slider
              value={[localSettings.fontSize]}
              onValueChange={([value]) => handleChange("fontSize", value)}
              min={12}
              max={20}
              step={1}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white"
            />
          </div>

          {/* Border Radius */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white">Border Radius</Label>
              <span className="text-sm text-white/60">{localSettings.borderRadius}px</span>
            </div>
            <Slider
              value={[localSettings.borderRadius]}
              onValueChange={([value]) => handleChange("borderRadius", value)}
              min={0}
              max={20}
              step={1}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white"
            />
          </div>

          {/* Animations */}
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-white">Animations</Label>
              <p className="text-xs text-white/60">Enable animations and transitions</p>
            </div>
            <Switch
              checked={localSettings.animations}
              onCheckedChange={(checked) => handleChange("animations", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-white/10 bg-black/20 backdrop-blur-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Preview</CardTitle>
            <CardDescription>See how your changes look in real-time</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <PreviewCard
              theme={localSettings.themeMode}
              primaryColor={localSettings.primaryColor}
              fontSize={localSettings.fontSize}
              radius={localSettings.borderRadius}
              animations={localSettings.animations}
            />
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const defaults = {
                    themeMode: "system",
                    primaryColor: "#6B2FED",
                    fontSize: 14,
                    borderRadius: 8,
                    animations: true,
                  }
                  setLocalSettings(defaults)
                }}
                className="border-white/20 text-white hover:bg-white/10 flex-1"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

