"use client"

import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Jan", appointments: 100 },
  { month: "Feb", appointments: 200 },
  { month: "Mar", appointments: 150 },
  { month: "Apr", appointments: 180 },
  { month: "May", appointments: 250 },
  { month: "Jun", appointments: 300 },
  { month: "Jul", appointments: 500 },
  { month: "Aug", appointments: 400 },
  { month: "Sep", appointments: 300 },
]

export function CampaignPerformance() {
  return (
    <Card className="bg-card border border-white/10">
      <CardHeader>
        <CardTitle className="text-card-foreground">Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" stroke="#c6c6c6" axisLine={{ stroke: "#c6c6c6" }} tickLine={false} />
              <YAxis
                stroke="#c6c6c6"
                axisLine={{ stroke: "#c6c6c6" }}
                tickLine={false}
                tickFormatter={(value) => `${value}K`}
              />
              <Tooltip
                contentStyle={{ background: "#2b2b2b", border: "1px solid #c6c6c6" }}
                labelStyle={{ color: "#c6c6c6" }}
                itemStyle={{ color: "hsl(var(--chart-1))" }}
              />
              <Area
                type="monotone"
                dataKey="appointments"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

