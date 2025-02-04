"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIVoicePreview } from "@/components/settings/ai-voice-preview"
import { PersonalitySlider } from "@/components/settings/personality-slider"

export default function AIAgentsPage() {
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([150])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [personality, setPersonality] = useState({
    friendliness: 0.7,
    formality: 0.5,
    persistence: 0.3,
  })

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Behavior</CardTitle>
            <CardDescription>Configure how your AI agents interact with customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Temperature</Label>
                <span className="text-sm text-white/60">{temperature[0]}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                min={0}
                max={1}
                step={0.1}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
              <p className="text-sm text-white/60">
                Controls randomness in responses. Lower values make responses more focused and deterministic.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Max Response Length</Label>
                <span className="text-sm text-white/60">{maxTokens[0]} tokens</span>
              </div>
              <Slider
                value={maxTokens}
                onValueChange={setMaxTokens}
                min={50}
                max={500}
                step={10}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            <div className="space-y-4">
              <Label>Personality Traits</Label>
              <div className="space-y-6">
                <PersonalitySlider
                  label="Friendliness"
                  value={personality.friendliness}
                  onChange={(value) => setPersonality({ ...personality, friendliness: value })}
                />
                <PersonalitySlider
                  label="Formality"
                  value={personality.formality}
                  onChange={(value) => setPersonality({ ...personality, formality: value })}
                />
                <PersonalitySlider
                  label="Persistence"
                  value={personality.persistence}
                  onChange={(value) => setPersonality({ ...personality, persistence: value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
            <CardDescription>Configure voice synthesis for your AI agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Voice</Label>
                <p className="text-sm text-white/60">Allow AI agents to use voice in calls</p>
              </div>
              <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
            </div>

            {voiceEnabled && (
              <Tabs defaultValue="male" className="w-full">
                <TabsList>
                  <TabsTrigger value="male">Male Voice</TabsTrigger>
                  <TabsTrigger value="female">Female Voice</TabsTrigger>
                </TabsList>
                <TabsContent value="male">
                  <AIVoicePreview gender="male" />
                </TabsContent>
                <TabsContent value="female">
                  <AIVoicePreview gender="female" />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="w-[400px]">
        <div className="sticky top-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Preview</CardTitle>
              <CardDescription>Test your AI agent&apos;s behavior</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] overflow-y-auto">{/* AI Chat Preview Component */}</CardContent>
          </Card>

          <Button className="w-full" size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

