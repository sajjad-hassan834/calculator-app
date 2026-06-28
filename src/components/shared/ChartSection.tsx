import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChartTooltip } from "./ChartTooltip"
import { fmt$ } from "../../lib/formatters"

interface ChartColors {
  blue: string
  emerald: string
  amber: string
}

export function getChartColors(isDark: boolean): ChartColors {
  return {
    blue: isDark ? "#4d87ff" : "#1a4fba",
    emerald: isDark ? "#10b981" : "#059669",
    amber: isDark ? "#f59e0b" : "#d97706",
  }
}

const gridLine = (isDark: boolean) =>
  isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
const axisText = (isDark: boolean) =>
  isDark ? "#7a9cc4" : "#94a3b8"

export function GrowthChart({
  data,
  isDark,
  lines,
}: {
  data: any[]
  isDark: boolean
  lines: { dataKey: string; name: string; color: string }[]
}) {
  const colors = getChartColors(isDark)
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            {lines.map((l) => (
              <linearGradient key={l.dataKey} id={`grad-${l.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={l.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={l.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridLine(isDark)} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: axisText(isDark) }}
            tickLine={false}
            axisLine={false}
            label={{ value: "Year", position: "insideBottom", offset: -2, fontSize: 11, fill: axisText(isDark) }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisText(isDark) }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmt$(v, true)}
            width={60}
          />
          <Tooltip content={(p) => <ChartTooltip {...p} />} />
          {lines.map((l) => (
            <Area
              key={l.dataKey}
              type="monotone"
              dataKey={l.dataKey}
              name={l.name}
              stroke={l.color}
              fill={`url(#grad-${l.dataKey})`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PieBreakdown({
  data,
  isDark,
  colors,
}: {
  data: { name: string; value: number }[]
  isDark: boolean
  colors: string[]
}) {
  return (
    <div className="h-56 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="70%"
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => fmt$(v)}
            contentStyle={{
              background: isDark ? "#0d1929" : "#fff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: 12,
              fontSize: 12,
              color: isDark ? "#e2eaf5" : "#0d1b2e",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 text-xs">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: colors[i % colors.length] }} />
            <span className="text-muted-foreground">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
