"use client"

import { Plus, BarChart2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuickActionToolbar() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background border rounded-full shadow-lg p-2 flex space-x-2">
      <Button variant="ghost" size="icon">
        <Plus className="h-4 w-4" />
        <span className="sr-only">New Campaign</span>
      </Button>
      <Button variant="ghost" size="icon">
        <BarChart2 className="h-4 w-4" />
        <span className="sr-only">View Analytics</span>
      </Button>
      <Button variant="ghost" size="icon">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send Message</span>
      </Button>
    </div>
  )
}

