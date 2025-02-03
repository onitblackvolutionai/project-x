"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useCampaignStore } from "@/store/campaign-store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { timezones } from "@/lib/timezones"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import cn from "classnames"

interface BlueprintStepProps {
  onNext: () => void
  data: {
    goal: string
    audience: string
    key_messages: string[]
    channels: string[]
    timeline: { start: string; end: string }
  }
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function BlueprintStep({ onNext, data }: BlueprintStepProps) {
  const campaignStore = useCampaignStore()
  const { toast } = useToast()
  const [selectedDays, setSelectedDays] = useState<Set<string>>(
    new Set(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
  )
  const [dailyQuota, setDailyQuota] = useState([50])
  const [selectedTimezone, setSelectedTimezone] = useState("GMT")

  useEffect(() => {
    const savedDailyQuota = campaignStore.blueprint?.dailyQuota
    if (savedDailyQuota) setDailyQuota([savedDailyQuota])

    const savedSelectedDays = campaignStore.blueprint?.selectedDays
    if (savedSelectedDays) setSelectedDays(new Set(savedSelectedDays))

    const savedTimezone = campaignStore.blueprint?.timezone
    if (savedTimezone) setSelectedTimezone(savedTimezone)
  }, [campaignStore])

  const toggleDay = (day: string) => {
    const newSelected = new Set(selectedDays)
    if (newSelected.has(day)) {
      newSelected.delete(day)
    } else {
      newSelected.add(day)
    }
    setSelectedDays(newSelected)
  }

  const handleSaveChanges = () => {
    campaignStore.setField("blueprint", "dailyQuota", dailyQuota[0])
    campaignStore.setField("blueprint", "selectedDays", Array.from(selectedDays))
    campaignStore.setField("blueprint", "timezone", selectedTimezone)

    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
      className: "bg-white text-black",
    })
  }

  return (
    <div className="space-y-10">
      {/* Daily Leads Quota */}
      <div className="space-y-4">
        <label className="text-2xl font-bold text-white">Daily Leads Quota</label>
        <div className="px-4">
          <Slider
            value={dailyQuota}
            onValueChange={(value) => setDailyQuota(value)}
            max={1500}
            step={50}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:w-6 [&_[role=slider]]:h-6"
          />
          <div className="flex justify-between mt-4 text-lg text-white/70">
            <span>0</span>
            <span className="text-2xl font-bold text-white">{dailyQuota[0]}</span>
            <span>1500</span>
          </div>
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-4">
        <label className="text-2xl font-bold text-white">Email to use for Outreach</label>
        <Input
          type="email"
          placeholder="email@example.com"
          className="bg-white/10 border-2 border-white/20 text-white h-12 text-base rounded-lg focus:ring-2 focus:ring-white/40 transition-all duration-200"
          onChange={(e) => campaignStore.setField("blueprint", "outreachEmail", e.target.value)}
        />
      </div>

      {/* Schedule Settings */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Schedule Settings</h2>

        {/* Timezone */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-white">Timezone</label>
          <p className="text-sm text-white/60">(The timezone which you wanna send the calls in)</p>
          <Select value={selectedTimezone} onValueChange={(value) => setSelectedTimezone(value)}>
            <SelectTrigger className="bg-white/10 border-2 border-white/20 text-white h-12 text-base rounded-lg focus:ring-2 focus:ring-white/40 transition-all duration-200">
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
          <label className="text-lg font-semibold text-white">Active Days</label>
          <div className="flex flex-wrap gap-3">
            {weekDays.map((day) => (
              <Button
                key={day}
                variant="outline"
                className={cn(
                  "border-2 border-white/20 text-base font-medium px-6 py-2 rounded-lg transition-all duration-200",
                  selectedDays.has(day) ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10",
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
          <label className="text-lg font-semibold text-white">Working Hours</label>
          <div className="flex items-center gap-6">
            <Input
              type="time"
              defaultValue="19:00"
              className="bg-white/10 border-2 border-white/20 text-white h-12 text-base rounded-lg focus:ring-2 focus:ring-white/40 transition-all duration-200"
              onChange={(e) => campaignStore.setField("blueprint", "workingHoursStart", e.target.value)}
            />
            <span className="text-2xl font-bold text-white">—</span>
            <Input
              type="time"
              defaultValue="22:00"
              className="bg-white/10 border-2 border-white/20 text-white h-12 text-base rounded-lg focus:ring-2 focus:ring-white/40 transition-all duration-200"
              onChange={(e) => campaignStore.setField("blueprint", "workingHoursEnd", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} className="bg-white text-black hover:bg-white/90">
          Save Changes
        </Button>
        <Button onClick={onNext} className="ml-4 bg-purple-600 text-white hover:bg-purple-700">
          Next Step
        </Button>
      </div>
    </div>
  )
}

