"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Calls", value: 25 },
  { name: "SMS", value: 25 },
  { name: "Email", value: 25 },
  { name: "WhatsApp", value: 25 },
]

const COLORS = ["#6b2fed", "#ffffff", "#56577a", "#cbd5e0"]

export function ChannelDistribution() {
  return (
    <Card className="bg-[#2b2b2b]">
      <CardHeader>
        <CardTitle className="text-white">Top Performing Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#414141",
                  border: "none",
                  borderRadius: "4px",
                  color: "#ffffff",
                }}
                itemStyle={{ color: "#ffffff" }}
                formatter={(value, name) => [`${value}%`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div
                className="w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm text-white">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

