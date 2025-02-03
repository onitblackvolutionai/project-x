"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function SidebarTrigger() {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-background/10 transition-colors">
      {state === "expanded" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

