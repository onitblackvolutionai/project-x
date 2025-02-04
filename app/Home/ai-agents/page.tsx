"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIVoicePreview } from "@/components/ai-agents/ai-voice-preview"
import { PersonalitySlider } from "@/components/ai-agents/personality-slider"
import { AgentCard } from "@/components/ai-agents/agent-card"
import { useToast } from "@/components/ui/use-toast"
import { AgentVoiceTestDialog } from "@/components/ai-agents/agent-voice-test-dialog" // Import the new dialog

interface AIAgent {
  id: string
  name: string
  description: string
  image: string
  personality: {
    friendliness: number
    formality: number
    persistence: number
    empathy: number
    creativity: number
  }
  voice: {
    gender: "male" | "female"
    pitch: number
    speed: number
    accent: string
    previewUrl: string // Add preview URL for voice
  }
}

const defaultAgents: AIAgent[] = [
  {
    id: "emma",
    name: "Emma Wilson",
    description: "Professional and friendly voice, perfect for business conversations",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jHjPlMihP5ccLi72b78lhuW0wYK6jl.png",
    personality: {
      friendliness: 0.8,
      formality: 0.6,
      persistence: 0.4,
      empathy: 0.9,
      creativity: 0.7,
    },
    voice: {
      gender: "female",
      pitch: 1.2,
      speed: 1.0,
      accent: "American",
      previewUrl: "/audio/emma.mp3", // Example URL
    },
  },
  {
    id: "darcy",
    name: "Darcy",
    description: "Polite, but firm, doesn't hesitate to make a point",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mj1A1bBsBBNKIoO38Xk4W9rJyLlO1O.png",
    personality: {
      friendliness: 0.6,
      formality: 0.8,
      persistence: 0.7,
      empathy: 0.5,
      creativity: 0.4,
    },
    voice: {
      gender: "female",
      pitch: 0.9,
      speed: 1.1,
      accent: "British",
      previewUrl: "/audio/darcy.mp3", // Example URL
    },
  },
  {
    id: "nick",
    name: "Nick",
    description: "Your go-to guy when it comes to bringing in revenue",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9RurfwMeBNXLfReJ4xChTifTMzwfkG.png",
    personality: {
      friendliness: 0.7,
      formality: 0.5,
      persistence: 0.8,
      empathy: 0.6,
      creativity: 0.6,
    },
    voice: {
      gender: "male",
      pitch: 0.8,
      speed: 1.0,
      accent: "American",
      previewUrl: "/audio/nick.mp3", // Example URL
    },
  },
]

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>(defaultAgents)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [showTestDialog, setShowTestDialog] = useState(false) // State for the new dialog
  const { toast } = useToast()

  useEffect(() => {
    const emmaAgent = agents.find((agent) => agent.id === "emma")
    if (emmaAgent) {
      setSelectedAgent(emmaAgent)
    }
  }, [agents])

  const handleAgentSelect = (agent: AIAgent) => {
    setSelectedAgent(agent)
  }

  const handlePersonalityChange = (trait: keyof AIAgent["personality"], value: number) => {
    if (!selectedAgent) return

    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === selectedAgent.id
          ? {
              ...agent,
              personality: {
                ...agent.personality,
                [trait]: value,
              },
            }
          : agent,
      ),
    )

    setSelectedAgent((prev) =>
      prev
        ? {
            ...prev,
            personality: {
              ...prev.personality,
              [trait]: value,
            },
          }
        : null,
    )
  }

  const handleVoiceChange = (property: keyof AIAgent["voice"], value: any) => {
    if (!selectedAgent) return

    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === selectedAgent.id
          ? {
              ...agent,
              voice: {
                ...agent.voice,
                [property]: value,
              },
            }
          : agent,
      ),
    )

    setSelectedAgent((prev) =>
      prev
        ? {
            ...prev,
            voice: {
              ...prev.voice,
              [property]: value,
            },
          }
        : null,
    )
  }

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your AI agent settings have been updated successfully.",
    })
  }

  return (
    <div className="flex gap-6 p-6">
      <div className="w-[400px] space-y-6">
        {/* AI Agents List */}
        <Card>
          <CardHeader>
            <CardTitle>AI Agents</CardTitle>
            <CardDescription>Select an AI agent to configure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isSelected={selectedAgent?.id === agent.id}
                  onSelect={() => handleAgentSelect(agent)}
                  onTest={() => {
                    setSelectedAgent(agent)
                    setShowTestDialog(true)
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card>
          <CardHeader>
            <CardTitle>AI Preview</CardTitle>
            <CardDescription>Test your AI agent&apos;s behavior</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto">
            {selectedAgent ? (
              <div className="space-y-4">
                <p className="text-sm text-white/60">
                  Selected Agent: <span className="text-white">{selectedAgent.name}</span>
                </p>
                <Button onClick={() => setShowTestDialog(true)} className="w-full">
                  Test Conversation
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-white/60">Select an AI agent to preview</div>
            )}
          </CardContent>
        </Card>

        <Button className="w-full" size="lg" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>

      <div className="flex-1 space-y-6">
        {selectedAgent && (
          <>
            {/* Personality Settings */}
            <Card>
              <CardHeader>
                <CardTitle>AI Behavior</CardTitle>
                <CardDescription>Configure how your AI agents interact with customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Personality Traits</Label>
                  <div className="space-y-6">
                    <PersonalitySlider
                      label="Friendliness"
                      value={selectedAgent.personality.friendliness}
                      onChange={(value) => handlePersonalityChange("friendliness", value)}
                    />
                    <PersonalitySlider
                      label="Formality"
                      value={selectedAgent.personality.formality}
                      onChange={(value) => handlePersonalityChange("formality", value)}
                    />
                    <PersonalitySlider
                      label="Persistence"
                      value={selectedAgent.personality.persistence}
                      onChange={(value) => handlePersonalityChange("persistence", value)}
                    />
                    <PersonalitySlider
                      label="Empathy"
                      value={selectedAgent.personality.empathy}
                      onChange={(value) => handlePersonalityChange("empathy", value)}
                    />
                    <PersonalitySlider
                      label="Creativity"
                      value={selectedAgent.personality.creativity}
                      onChange={(value) => handlePersonalityChange("creativity", value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voice Settings */}
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
                  <Tabs defaultValue={selectedAgent.voice.gender} className="w-full">
                    <TabsList>
                      <TabsTrigger value="male">Male Voice</TabsTrigger>
                      <TabsTrigger value="female">Female Voice</TabsTrigger>
                    </TabsList>
                    <TabsContent value="male">
                      <AIVoicePreview
                        gender="male"
                        pitch={selectedAgent.voice.pitch}
                        speed={selectedAgent.voice.speed}
                        onPitchChange={(value) => handleVoiceChange("pitch", value)}
                        onSpeedChange={(value) => handleVoiceChange("speed", value)}
                      />
                    </TabsContent>
                    <TabsContent value="female">
                      <AIVoicePreview
                        gender="female"
                        pitch={selectedAgent.voice.pitch}
                        speed={selectedAgent.voice.speed}
                        onPitchChange={(value) => handleVoiceChange("pitch", value)}
                        onSpeedChange={(value) => handleVoiceChange("speed", value)}
                      />
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {selectedAgent && (
        <AgentVoiceTestDialog // Use the new dialog component
          isOpen={showTestDialog}
          onClose={() => setShowTestDialog(false)}
          agent={selectedAgent}
        />
      )}
    </div>
  )
}

