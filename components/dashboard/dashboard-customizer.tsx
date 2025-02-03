"use client"

import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardCustomizer() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Customize Dashboard</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Dashboard Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Add Widget</DropdownMenuItem>
        <DropdownMenuItem>Rearrange Widgets</DropdownMenuItem>
        <DropdownMenuItem>Reset Layout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

