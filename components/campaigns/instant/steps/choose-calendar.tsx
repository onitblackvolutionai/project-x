"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ChooseCalendarStepProps {
  onNext: () => void
  onPrev: () => void
}

export function ChooseCalendarStep({ onNext, onPrev }: ChooseCalendarStepProps) {
  const { toast } = useToast()
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Choose Calendar</h2>
        <p className="text-[#e7e7e7]">Connect your calendar for appointment scheduling</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Google Calendar", connected: true },
          { name: "Microsoft Outlook", connected: false },
          { name: "Apple Calendar", connected: false },
        ].map((calendar) => (
          <Card key={calendar.name} className="bg-[#ffffff]/5 border-[#ffffff]/10">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-4 bg-[#ffffff]/10 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-white" />
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
                <CalendarIcon className="h-5 w-5 text-white mr-3" />
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

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

