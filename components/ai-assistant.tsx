"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 rounded-full">
          <Bot className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">AI Assistant</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>AI Assistant</SheetTitle>
          <SheetDescription>How can I help you today?</SheetDescription>
        </SheetHeader>
        {/* Add AI chat interface here */}
      </SheetContent>
    </Sheet>
  )
}

