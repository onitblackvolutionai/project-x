"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ViewCampaignDialogProps {
  isOpen: boolean
  onClose: () => void
  campaign: {
    id: string
    name: string
    description: string
  }
}

const compareData = [
  { name: "Mon", calls: 40, emails: 24 },
  { name: "Tue", calls: 30, emails: 13 },
  { name: "Wed", calls: 20, emails: 38 },
  { name: "Thu", calls: 27, emails: 39 },
  { name: "Fri", calls: 18, emails: 48 },
]

export function ViewCampaignDialog({ isOpen, onClose, campaign }: ViewCampaignDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] bg-[#09090B] border-0 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">{campaign.name}</h2>
              <p className="text-white/60">{campaign.description}</p>
            </div>
            <Button variant="outline" className="bg-white/10 text-white border-white/20">
              Date Range
            </Button>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard title="Total Campaigns" value="12" subtext="+2 Since Last Week" />
            <MetricCard title="Active Channels" value="2" subtext="+2 Since Last Week" />
            <MetricCard title="Prospects Contacted" value="4,535" subtext="+589 Since Last Week" />
            <MetricCard title="Appointment Rate" value="3.2%" subtext="+0.5% Since Last Week" />
          </div>

          {/* Analytics Section */}
          <Card className="bg-[#1C1C1C] border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Analytics</h3>

            <div className="space-y-8">
              {/* Overview Section */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Overview</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard title="Prospects Contacted" value="4,535" subtext="+589 Since Last Week" small />
                    <MetricCard title="Appointment Rate" value="3.2%" subtext="+0.2% Since Last Week" small />
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-[#2B2B2B] rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white/70 mb-4">
                    A Comparison Chart between all the active channels (volume of appointments)
                  </h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={compareData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#c6c6c6" />
                        <YAxis stroke="#c6c6c6" />
                        <Tooltip />
                        <Bar dataKey="calls" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="emails" fill="hsl(var(--chart-2))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* AI Calls Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">AI Calls</h4>
                <div className="grid grid-cols-4 gap-4">
                  <MetricCard title="Calls Sent" value="4,535" subtext="+589 Since Last Week" small />
                  <MetricCard title="Picked Up" value="4,535" subtext="+589 Since Last Week" small />
                  <MetricCard title="Appointments Booked" value="4,535" subtext="+589 Since Last Week" small />
                  <MetricCard title="Conversion Rate" value="4,535" subtext="+589 Since Last Week" small />
                </div>
                <div className="bg-[#2B2B2B] rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white/70 mb-4">
                    A Comparison Chart between all the active channels (volume of outreach)
                  </h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={compareData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#c6c6c6" />
                        <YAxis stroke="#c6c6c6" />
                        <Tooltip />
                        <Bar dataKey="calls" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="emails" fill="hsl(var(--chart-2))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* AI Emails Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">AI Emails</h4>
                <div className="grid grid-cols-4 gap-4">
                  <MetricCard title="Emails Sent" value="4,535" subtext="+589 Since Last Week" small />
                  <MetricCard title="Replied" value="4,535" subtext="+589 Since Last Week" small />
                  <MetricCard title="Appointments Booked" value="4,535" subtext="+589 Since Last Week" small />
                  <MetricCard title="Conversion Rate" value="4,535" subtext="+589 Since Last Week" small />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MetricCard({
  title,
  value,
  subtext,
  small = false,
}: {
  title: string
  value: string
  subtext: string
  small?: boolean
}) {
  return (
    <div className={`rounded-lg bg-[#2B2B2B] p-4 ${small ? "text-sm" : ""}`}>
      <div className="text-sm text-[#c6c6c6]">{title}</div>
      <div className={`mt-2 font-bold text-white ${small ? "text-xl" : "text-2xl"}`}>{value}</div>
      <div className="mt-1 text-xs text-[#c6c6c6]">{subtext}</div>
    </div>
  )
}

