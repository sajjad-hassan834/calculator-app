import { fmt$ } from "../../lib/formatters"

export function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border shadow-xl px-3 py-2.5 text-xs font-['JetBrains_Mono',monospace] bg-background border-border text-foreground">
      <div className="font-medium mb-1 text-muted-foreground">Year {label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium">{fmt$(p.value)}</span>
        </div>
      ))}
    </div>
  )
}
