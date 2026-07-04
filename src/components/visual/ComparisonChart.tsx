interface ComparisonBar {
  name: string
  value: number
  color?: string
}

interface ComparisonChartProps {
  title: string
  bars: ComparisonBar[]
  formatValue?: (v: number) => string
  className?: string
}

const DEFAULT_COLORS = [
  "bg-primary",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
]

function defaultFormat(v: number): string {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`
  return `$${v.toLocaleString()}`
}

export function ComparisonChart({
  title,
  bars,
  formatValue = defaultFormat,
  className = "",
}: ComparisonChartProps) {
  if (bars.length === 0) return null

  const maxValue = Math.max(...bars.map((b) => b.value))

  return (
    <div className={`bg-card border border-border rounded-2xl p-5 ${className}`}>
      <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
      <div className="space-y-3">
        {bars.map((bar, i) => {
          const pct = maxValue > 0 ? (bar.value / maxValue) * 100 : 0
          const color = bar.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
          return (
            <div key={bar.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">{bar.name}</span>
                <span className="text-foreground font-semibold font-['JetBrains_Mono',monospace]">
                  {formatValue(bar.value)}
                </span>
              </div>
              <div className="w-full h-3 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
