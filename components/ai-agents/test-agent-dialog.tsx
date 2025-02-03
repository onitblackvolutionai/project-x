"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  sender: "user" | "agent"
  text: string
  timestamp: Date
}

interface TestAgentDialogProps {
  isOpen: boolean
  onClose: () => void
  agent: {
    id: string
    name: string
    image: string
    personality: {
      friendliness: number
      formality: number
      persistence: number
      empathy: number
      creativity: number
    }
  }
}

export function TestAgentDialog({ isOpen, onClose, agent }: TestAgentDialogProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Add initial greeting
      setMessages([
        {
          id: "1",
          sender: "agent",
          text: `Hi! I'm ${agent.name}. How can I help you today?`,
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, agent.name])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your point. Let me help you with that.",
        "That's interesting! Could you tell me more?",
        "I can definitely assist you with this matter.",
        "Let me suggest a solution that might work for you.",
      ]

      const agentMessage: Message = {
        id: Date.now().toString(),
        sender: "agent",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 border-b border-white/10">
          <DialogTitle className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={agent.image || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
            </div>
            <span>{agent.name}</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted text-muted-foreground">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

