"use client"

import * as React from "react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Smile } from "lucide-react"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void
  className?: string
}

export function EmojiPicker({ onEmojiSelect, className }: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Picker data={data} onEmojiSelect={onEmojiSelect} theme="dark" previewPosition="none" />
      </PopoverContent>
    </Popover>
  )
}

