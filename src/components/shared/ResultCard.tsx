export function ResultCard({
  label,
  value,
  highlight = false,
  color = "text-foreground",
}: {
  label: string
  value: string
  highlight?: boolean
  color?: string
}) {
  return (
    <div
      className={`rounded-xl p-4 border border-border transition-all ${
        highlight
          ? "bg-primary text-primary-foreground"
          : "bg-card"
      }`}
    >
      <div
        className={`text-xs font-medium mb-1 ${
          highlight ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
      <div
        className={`text-xl font-['JetBrains_Mono',monospace] font-medium ${
          highlight ? "text-primary-foreground" : color
        }`}
      >
        {value}
      </div>
    </div>
  )
}
