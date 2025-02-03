"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Phone, Mail } from "lucide-react"
import type React from "react" // Import React

interface PreviewCardProps {
  theme: "light" | "dark" | "system"
  primaryColor: string
  fontSize: number
  radius: number
  animations: boolean
}

export function PreviewCard({ theme, primaryColor, fontSize, radius, animations }: PreviewCardProps) {
  const previewMessage = {
    sender: "AI Assistant",
    message: "Hello! How can I help you today?",
    time: "2:30 PM",
  }

  const previewStyle = {
    "--preview-font-size": `${fontSize}px`,
    "--preview-radius": `${radius}px`,
    "--preview-primary": primaryColor,
  } as React.CSSProperties

  const AnimatedDiv = animations ? motion.div : "div"

  return (
    <div style={previewStyle} className="space-y-6">
      {/* Navigation Preview */}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          style={{
            borderRadius: radius,
            backgroundColor: primaryColor,
            fontSize: Math.max(fontSize - 2, 12),
          }}
          className="gap-2"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Messages
        </Button>
        {["Calls", "Email"].map((item) => (
          <Button
            key={item}
            variant="ghost"
            size="sm"
            style={{ borderRadius: radius, fontSize: Math.max(fontSize - 2, 12) }}
            className="gap-2 text-white/60 hover:text-white"
          >
            {item === "Calls" ? <Phone className="h-3.5 w-3.5" /> : <Mail className="h-3.5 w-3.5" />}
            {item}
          </Button>
        ))}
      </div>

      {/* Message Preview */}
      <div style={{ borderRadius: radius }} className="border border-white/10 bg-white/5 p-4">
        <AnimatedDiv
          initial={animations ? { opacity: 0, y: 10 } : undefined}
          animate={animations ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-3"
        >
          <Avatar style={{ borderRadius: radius }} className="h-8 w-8 border border-white/10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span style={{ fontSize }} className="font-medium text-white">
                {previewMessage.sender}
              </span>
              <span style={{ fontSize: fontSize - 2 }} className="text-white/60">
                {previewMessage.time}
              </span>
            </div>
            <p style={{ fontSize }} className="text-white/80">
              {previewMessage.message}
            </p>
          </div>
        </AnimatedDiv>
      </div>

      {/* Action Preview */}
      <Button
        style={{
          borderRadius: radius,
          backgroundColor: primaryColor,
          fontSize,
        }}
        className="w-full transition-colors hover:opacity-90"
      >
        Preview Button
      </Button>
    </div>
  )
}

