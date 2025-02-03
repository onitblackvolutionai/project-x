"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertTriangle } from "lucide-react"

interface LaunchStepProps {
  onNext: () => void
}

export function LaunchStep({ onNext }: LaunchStepProps) {
  const checklistItems = [
    { id: "blueprint", label: "Campaign Blueprint", status: "complete" },
    { id: "knowledge", label: "Knowledge Base", status: "complete" },
    { id: "source", label: "Lead Source", status: "complete" },
    { id: "channels", label: "Communication Channels", status: "complete" },
    { id: "content", label: "Content Creation", status: "warning", message: "Test call recommended" },
    { id: "voice", label: "AI Voice Agent", status: "complete" },
    { id: "calendar", label: "Calendar Integration", status: "complete" },
  ] as const

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Launch Campaign</h2>
        <p className="text-[#e7e7e7]">Review and launch your campaign</p>
      </div>

      <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Pre-launch Checklist</h3>
          <div className="space-y-4">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-[#ffffff]/5">
                <div className="flex items-center">
                  {item.status === "complete" ? (
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                  )}
                  <span className="text-white">{item.label}</span>
                </div>
                {item.status === "warning" && <span className="text-sm text-yellow-500">{item.message}</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#ffffff]/5 border-[#ffffff]/10">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Ready to Launch</h3>
            <p className="text-[#e7e7e7] mb-4">
              Your campaign is configured and ready to go. Click the button below to start reaching out to your leads.
            </p>
            <Button onClick={onNext} className="bg-[#ffffff] text-[#09090b] hover:bg-[#ffffff]/90 w-full max-w-md">
              Launch Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

