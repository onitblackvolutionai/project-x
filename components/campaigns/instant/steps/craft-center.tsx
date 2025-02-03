"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { useToast } from "@/components/ui/use-toast"

interface CraftCenterStepProps {
  onNext: () => void
  onPrev: () => void
  data?: {
    // Make data prop optional
    call_script?: {
      // Make call_script prop optional
      greeting?: string
      value_prop?: string
      objections?: string
      closing?: string
    }
  }
}

export function CraftCenterStep({ onNext, onPrev, data }: CraftCenterStepProps) {
  const [activeTab, setActiveTab] = useState("calling")
  const { toast } = useToast()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Craft Your Message</h2>
        <p className="text-[#e7e7e7]">Refine your scripts and templates for maximum impact</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#ffffff]/10 border-b border-[#ffffff]/10 p-1 rounded-t-lg">
          <TabsTrigger value="calling" className="data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#09090b]">
            Calling Scripts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calling">
          <div className="space-y-4">
            {/* Greeting */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Greeting</label>
              <Textarea
                placeholder="Enter your greeting here..."
                className="min-h-[100px] bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
                defaultValue={data?.call_script?.greeting || ""} // Use optional chaining and default value
              />
            </div>

            {/* Value Proposition */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Value Proposition</label>
              <Textarea
                placeholder="Enter your value proposition here..."
                className="min-h-[100px] bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
                defaultValue={data?.call_script?.value_prop || ""} // Use optional chaining and default value
              />
            </div>

            {/* Objections */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Objections</label>
              <Textarea
                placeholder="Enter objection handling here..."
                className="min-h-[100px] bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
                defaultValue={data?.call_script?.objections || ""} // Use optional chaining and default value
              />
            </div>

            {/* Closing */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Closing</label>
              <Textarea
                placeholder="Enter your closing statement here..."
                className="min-h-[100px] bg-[#ffffff]/5 border-[#ffffff]/10 text-white"
                defaultValue={data?.call_script?.closing || ""} // Use optional chaining and default value
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} variant="outline">
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

