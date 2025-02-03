"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MetricCard } from "./metric-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const compareData = [
  { name: "Mon", calls: 40, emails: 24 },
  { name: "Tue", calls: 30, emails: 13 },
  { name: "Wed", calls: 20, emails: 38 },
  { name: "Thu", calls: 27, emails: 39 },
  { name: "Fri", calls: 18, emails: 48 },
]

export function CampaignAnalytics() {
  const [selectedCampaign, setSelectedCampaign] = React.useState("campaign1")

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
          <SelectTrigger className="w-[200px] bg-black/40 border border-white/20 text-white">
            <SelectValue placeholder="Select Campaign" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white border-white/10">
            <SelectItem value="campaign1">Campaign 1</SelectItem>
            <SelectItem value="campaign2">Campaign 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Prospects Contacted" value="4,535" change="+589 Since Last Week" />
        <MetricCard title="Appointment Rate" value="3.2%" change="+0.2% Since Last Week" />
        <MetricCard title="Emails Sent" value="4,535" change="+589 Since Last Week" />
        <MetricCard title="Replied" value="4,535" change="+589 Since Last Week" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ComparisonChart title="Volume of Outreach" data={compareData} />
        <ComparisonChart title="Volume of Appointments" data={compareData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Calls Sent" value="4,535" change="+589 Since Last Week" />
        <MetricCard title="Picked Up" value="4,535" change="+589 Since Last Week" />
        <MetricCard title="Appointments Booked" value="4,535" change="+589 Since Last Week" />
        <MetricCard title="Conversion Rate" value="4,535" change="+589 Since Last Week" />
      </div>
    </div>
  )
}

interface ComparisonChartProps {
  title: string
  data: { name: string; calls: number; emails: number }[]
}

function ComparisonChart({ title, data }: ComparisonChartProps) {
  return (
    <Card className="bg-black/20 border border-white/10 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip
                contentStyle={{ backgroundColor: "#2b2b2b", border: "none", borderRadius: "8px" }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Bar dataKey="calls" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="emails" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

