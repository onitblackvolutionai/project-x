"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCampaignStore } from "@/store/campaign-store"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { timezones } from "@/lib/timezones"

interface CampaignConfigDialogProps {
  isOpen: boolean
  onClose: () => void
  campaignId: string
}

const steps = [
  { id: "blueprint", label: "Blueprint" },
  { id: "knowledge", label: "Knowledge Vault" },
  { id: "leads", label: "Leads" },
  { id: "qualify", label: "Qualify Leads" },
  { id: "channels", label: "Select Channels" },
  { id: "craft", label: "Craft Center" },
  { id: "agent", label: "Select AI Agent" },
  { id: "test", label: "Test" },
  { id: "launch", label: "Launch" },
]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function CampaignConfigDialog({ isOpen, onClose, campaignId }: CampaignConfigDialogProps) {
  const [currentStep, setCurrentStep] = useState("blueprint")
  const campaign = useCampaignStore((state) => state.campaigns[campaignId])
  const setField = useCampaignStore((state) => state.setField)

  // Local state for blueprint settings
  const [dailyQuota, setDailyQuota] = useState([campaign?.blueprint?.dailyQuota || 50])
  const [selectedDays, setSelectedDays] = useState<Set<string>>(
    new Set(campaign?.blueprint?.selectedDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
  )
  const [selectedTimezone, setSelectedTimezone] = useState(campaign?.blueprint?.timezone || "GMT")

  const toggleDay = (day: string) => {
    const newSelected = new Set(selectedDays)
    if (newSelected.has(day)) {
      newSelected.delete(day)
    } else {
      newSelected.add(day)
    }
    setSelectedDays(newSelected)
    setField(campaignId, "blueprint", "selectedDays", Array.from(newSelected))
  }

  const renderContent = () => {
    switch (currentStep) {
      case "blueprint":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Daily Leads Quota */}
            <div className="space-y-4">
              <label className="text-2xl font-bold text-[#ffffff]">Daily Leads Quota</label>
              <div className="px-4">
                <Slider
                  value={dailyQuota}
                  onValueChange={(value) => {
                    setDailyQuota(value)
                    setField(campaignId, "blueprint", "dailyQuota", value[0])
                  }}
                  max={1500}
                  step={50}
                  className="[&_[role=slider]]:bg-[#ffffff] [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
                />
                <div className="flex justify-between mt-4 text-lg text-[#e7e7e7]">
                  <span>0</span>
                  <span className="text-2xl font-bold text-[#ffffff]">{dailyQuota[0]}</span>
                  <span>1500</span>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-4">
              <label className="text-2xl font-bold text-[#ffffff]">Email to use for Outreach</label>
              <Input
                type="email"
                placeholder="email@example.com"
                defaultValue={campaign?.blueprint?.outreachEmail}
                className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                onChange={(e) => setField(campaignId, "blueprint", "outreachEmail", e.target.value)}
              />
            </div>

            {/* Schedule Settings */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#ffffff]">Schedule Settings</h2>

              {/* Timezone */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-[#ffffff]">Timezone</label>
                <p className="text-sm text-[#e7e7e7]">(The timezone which you wanna send the calls in)</p>
                <Select
                  value={selectedTimezone}
                  onValueChange={(value) => {
                    setSelectedTimezone(value)
                    setField(campaignId, "blueprint", "timezone", value)
                  }}
                >
                  <SelectTrigger className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Active Days */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-[#ffffff]">Active Days</label>
                <div className="flex flex-wrap gap-3">
                  {weekDays.map((day) => (
                    <Button
                      key={day}
                      variant="outline"
                      className={cn(
                        "border-2 border-[#ffffff]/20 text-base font-medium px-6 py-2 rounded-lg transition-all duration-200",
                        selectedDays.has(day)
                          ? "bg-[#ffffff] text-[#09090b]"
                          : "bg-transparent text-[#ffffff] hover:bg-[#ffffff]/10",
                      )}
                      onClick={() => toggleDay(day)}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-[#ffffff]">Working Hours</label>
                <div className="flex items-center gap-6">
                  <Input
                    type="time"
                    defaultValue={campaign?.blueprint?.workingHoursStart || "19:00"}
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                    onChange={(e) => setField(campaignId, "blueprint", "workingHoursStart", e.target.value)}
                  />
                  <span className="text-2xl font-bold text-[#ffffff]">—</span>
                  <Input
                    type="time"
                    defaultValue={campaign?.blueprint?.workingHoursEnd || "22:00"}
                    className="bg-[#ffffff]/10 border-2 border-[#ffffff]/20 text-[#ffffff] h-12 text-base rounded-lg focus:ring-2 focus:ring-[#ffffff]/40 transition-all duration-200"
                    onChange={(e) => setField(campaignId, "blueprint", "workingHoursEnd", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
      // Add other cases for different steps...
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 bg-[#09090b] rounded-xl overflow-hidden flex flex-col">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 border-r border-[#ffffff]/10 p-8 bg-[#000000]/20 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-white">Campaign Configuration</h1>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white/60 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "w-full px-6 py-4 rounded-lg text-left transition-all duration-200 flex items-center",
                    step.id === currentStep ? "bg-[#ffffff] text-[#09090b]" : "text-[#ffffff]/70 hover:bg-[#ffffff]/10",
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#ffffff]/20 text-[#ffffff]">
                    {index + 1}
                  </span>
                  <span className="text-lg font-medium">{step.label}</span>
                  {step.id === currentStep && (
                    <motion.span
                      className="ml-auto"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-12 overflow-y-auto relative">
            <div className="max-w-4xl mx-auto">{renderContent()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

