"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function NotificationCenter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed top-4 right-4">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Stay updated with your campaign progress and important alerts.</SheetDescription>
        </SheetHeader>
        {/* Add notification items here */}
      </SheetContent>
    </Sheet>
  )
}

