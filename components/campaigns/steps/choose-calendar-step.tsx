"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"

interface ChooseCalendarStepProps {
  onNext: () => void
}

export function ChooseCalendarStep({ onNext }: ChooseCalendarStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Choose Calendar</h2>
        <p className="text-[#e7e7e7]">Connect your calendar for appointment scheduling</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            name: "Google Calendar",
            icon: "/placeholder.svg",
            connected: true,
          },
          {
            name: "Microsoft Outlook",
            icon: "/placeholder.svg",
            connected: false,
          },
          {
            name: "Apple Calendar",
            icon: "/placeholder.svg",
            connected: false,
          },
        ].map((calendar) => (
          <Card key={calendar.name} className="bg-[#ffffff]/5 border-[#ffffff]/10">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-4">
                  <Image src={calendar.icon || "/placeholder.svg"} alt={calendar.name} width={48} height={48} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{calendar.name}</h3>
                <Button
                  variant={calendar.connected ? "outline" : "default"}
                  className={
                    calendar.connected
                      ? "border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5"
                      : "bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90"
                  }
                >
                  {calendar.connected ? "Connected" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Availability Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#ffffff]/5">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-white mr-3" />
                <span className="text-white">Available Days</span>
              </div>
              <Button variant="outline" className="border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#ffffff]/5">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-white mr-3" />
                <span className="text-white">Available Hours</span>
              </div>
              <Button variant="outline" className="border-[#ffffff]/10 text-white hover:bg-[#ffffff]/5">
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90">
          Next Step
        </Button>
      </div>
    </div>
  )
}

