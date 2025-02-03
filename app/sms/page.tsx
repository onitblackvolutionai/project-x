"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"
import { MetricCard } from "@/components/dashboard/metric-card"
import { motion } from "framer-motion"

export default function SMSPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const weeklyData = [
    { name: "Mon", total: 120, cold: 80, warm: 40 },
    { name: "Tue", total: 150, cold: 100, warm: 50 },
    { name: "Wed", total: 180, cold: 110, warm: 70 },
    { name: "Thu", total: 200, cold: 130, warm: 70 },
    { name: "Fri", total: 220, cold: 140, warm: 80 },
    { name: "Sat", total: 100, cold: 60, warm: 40 },
    { name: "Sun", total: 80, cold: 50, warm: 30 },
  ]

  const monthlyData = [
    { name: "Week 1", total: 850, cold: 550, warm: 300 },
    { name: "Week 2", total: 930, cold: 600, warm: 330 },
    { name: "Week 3", total: 1050, cold: 680, warm: 370 },
    { name: "Week 4", total: 1200, cold: 780, warm: 420 },
  ]

  const messageTypeData = [
    { name: "Cold", value: 65 },
    { name: "Warm", value: 35 },
  ]

  const responseRateData = [
    { name: "Responded", value: 42 },
    { name: "No Response", value: 58 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 space-y-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">SMS Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] bg-black/40 border border-white/20 text-white rounded-lg">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white border-white/10 rounded-lg">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Messages" value="3,450" change="+15% from last period" />
        <MetricCard title="Cold Messages" value="2,270" change="+12% from last period" />
        <MetricCard title="Warm Messages" value="1,180" change="+20% from last period" />
        <MetricCard title="Unique Conversations" value="875" change="+8% from last period" />
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="bg-black/20 border border-white/10 backdrop-blur-md rounded-lg">
          <CardHeader>
            <CardTitle>Message Volume</CardTitle>
            <CardDescription>Total messages sent and received over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={timeRange === "7d" ? weeklyData : monthlyData}
              index="name"
              categories={["total", "cold", "warm"]}
              colors={["#6B2FED", "#3B82F6", "#10B981"]}
              yAxisWidth={40}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="bg-black/20 border border-white/10 backdrop-blur-md rounded-lg">
          <CardHeader>
            <CardTitle>Cold vs Warm Messages</CardTitle>
            <CardDescription>Comparison of cold and warm message volumes</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={timeRange === "7d" ? weeklyData : monthlyData}
              index="name"
              categories={["cold", "warm"]}
              colors={["#3B82F6", "#10B981"]}
              yAxisWidth={40}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart 1 */}
        <Card className="bg-black/20 border border-white/10 backdrop-blur-md rounded-lg">
          <CardHeader>
            <CardTitle>Message Type Distribution</CardTitle>
            <CardDescription>Percentage of cold vs warm messages</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={messageTypeData}
              index="name"
              category="value"
              colors={["#3B82F6", "#10B981"]}
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        {/* Pie Chart 2 */}
        <Card className="bg-black/20 border border-white/10 backdrop-blur-md rounded-lg">
          <CardHeader>
            <CardTitle>Response Rates</CardTitle>
            <CardDescription>Percentage of messages that received a response</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cold">
              <TabsList className="mb-4">
                <TabsTrigger value="cold">Cold Messages</TabsTrigger>
                <TabsTrigger value="warm">Warm Messages</TabsTrigger>
              </TabsList>
              <TabsContent value="cold">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">18.5%</div>
                    <p className="text-sm text-white/60">+2.3% from last period</p>
                  </div>
                  <PieChart
                    data={responseRateData}
                    index="name"
                    category="value"
                    colors={["#6B2FED", "#E11D48"]}
                    className="h-[150px] w-[150px]"
                  />
                </div>
              </TabsContent>
              <TabsContent value="warm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">42.7%</div>
                    <p className="text-sm text-white/60">+5.1% from last period</p>
                  </div>
                  <PieChart
                    data={[
                      { name: "Responded", value: 42.7 },
                      { name: "No Response", value: 57.3 },
                    ]}
                    index="name"
                    category="value"
                    colors={["#6B2FED", "#E11D48"]}
                    className="h-[150px] w-[150px]"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart 2 */}
      <Card className="bg-black/20 border border-white/10 backdrop-blur-md rounded-lg">
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
          <CardDescription>Message engagement trends</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={[
              { name: "Week 1", opens: 75, clicks: 25, responses: 15 },
              { name: "Week 2", opens: 80, clicks: 30, responses: 18 },
              { name: "Week 3", opens: 85, clicks: 35, responses: 22 },
              { name: "Week 4", opens: 90, clicks: 40, responses: 28 },
            ]}
            index="name"
            categories={["opens", "clicks", "responses"]}
            colors={["#6B2FED", "#3B82F6", "#10B981"]}
            yAxisWidth={40}
            className="h-[300px]"
          />
        </CardContent>
      </Card>

      {/* Performance Metrics Grid */}
      <Card className="bg-black/20 border border-white/10 backdrop-blur-md rounded-lg">
        <CardHeader>
          <CardTitle>SMS Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for your SMS campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Delivery Rate</h3>
              <div className="text-3xl font-bold text-white">99.2%</div>
              <p className="text-sm text-white/60">+0.5% from last period</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Open Rate</h3>
              <div className="text-3xl font-bold text-white">94.8%</div>
              <p className="text-sm text-white/60">+1.2% from last period</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Click-Through Rate</h3>
              <div className="text-3xl font-bold text-white">12.3%</div>
              <p className="text-sm text-white/60">+0.8% from last period</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Conversion Rate</h3>
              <div className="text-3xl font-bold text-white">3.7%</div>
              <p className="text-sm text-white/60">+0.3% from last period</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

