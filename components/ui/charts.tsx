"use client"

import { Bar, Line, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell, Legend } from "recharts"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  yAxisWidth?: number
  className?: string
}

interface PieChartProps {
  data: any[]
  index: string
  category: string
  colors: string[]
  className?: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c1c1c] p-3 border border-white/10 rounded-lg shadow-lg">
        <p className="text-white font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function BarChart({ data, index, categories, colors, yAxisWidth = 50, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <Bar data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
        <XAxis dataKey={index} stroke="#ffffff60" />
        <YAxis width={yAxisWidth} stroke="#ffffff60" />
        <Tooltip content={<CustomTooltip />} />
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i]} />
        ))}
      </Bar>
    </ResponsiveContainer>
  )
}

export function LineChart({ data, index, categories, colors, yAxisWidth = 50, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <Line data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
        <XAxis dataKey={index} stroke="#ffffff60" />
        <YAxis width={yAxisWidth} stroke="#ffffff60" />
        <Tooltip content={<CustomTooltip />} />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i]}
            strokeWidth={2}
            dot={{ fill: colors[i], strokeWidth: 2 }}
          />
        ))}
      </Line>
    </ResponsiveContainer>
  )
}

export function PieChart({ data, index, category, colors, className }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <Pie
        data={data}
        dataKey={category}
        nameKey={index}
        cx="50%"
        cy="50%"
        outerRadius="90%"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </ResponsiveContainer>
  )
}

