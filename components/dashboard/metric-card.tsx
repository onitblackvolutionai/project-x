interface MetricCardProps {
  title: string
  value: string | number
  change: string
}

export function MetricCard({ title, value, change }: MetricCardProps) {
  return (
    <div className="rounded-lg bg-[#2b2b2b] p-4 transition-all duration-200 border border-white/10">
      <div className="text-sm text-[#c6c6c6]">{title}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-[#c6c6c6]">{change}</div>
    </div>
  )
}

