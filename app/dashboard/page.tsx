import { Suspense } from "react"
import { MetricCard } from "@/components/dashboard/metric-card"
import { CampaignPerformance } from "@/components/dashboard/campaign-performance"
import { ChannelDistribution } from "@/components/dashboard/channel-distribution"
import { DateRangePicker } from "@/components/date-range-picker"
import { CampaignAnalytics } from "@/components/dashboard/campaign-analytics"
import { ProgressTracker } from "@/components/dashboard/progress-tracker"
import { AISuggestions } from "@/components/dashboard/ai-suggestions"
import { InteractiveDataVisualizer } from "@/components/dashboard/interactive-data-visualizer"

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Welcome, User</h1>
            <p className="mt-1 text-muted-foreground">Here's an overview of your campaigns</p>
          </div>
          <div className="flex items-center space-x-4">
            <DateRangePicker />
          </div>
        </div>

        <Suspense fallback={<div>Loading metrics...</div>}>
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Campaigns" value="12" change="+2 Since Last Week" />
            <MetricCard title="Active Channels" value="2" change="+2 Since Last Week" />
            <MetricCard title="Prospects Contacted" value="4,535" change="+589 Since Last Week" />
            <MetricCard title="Appointment Rate" value="3.2%" change="+0.5% Since Last Week" />
          </div>
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<div>Loading campaign performance...</div>}>
              <CampaignPerformance />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<div>Loading channel distribution...</div>}>
              <ChannelDistribution />
            </Suspense>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Suspense fallback={<div>Loading progress tracker...</div>}>
            <ProgressTracker />
          </Suspense>
          <Suspense fallback={<div>Loading AI suggestions...</div>}>
            <AISuggestions />
          </Suspense>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div>Loading interactive data visualizer...</div>}>
            <InteractiveDataVisualizer />
          </Suspense>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div>Loading campaign analytics...</div>}>
            <CampaignAnalytics />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

