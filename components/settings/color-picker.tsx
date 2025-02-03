"use client"

import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="h-10 w-20 rounded-lg border border-white/10" style={{ backgroundColor: color }} />
      </PopoverTrigger>
      <PopoverContent className="w-auto border-none bg-transparent p-0">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}

