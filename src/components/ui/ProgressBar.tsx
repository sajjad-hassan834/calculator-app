export function ProgressBar({
  value,
  max = 100,
  label,
  color = "bg-primary",
  size = "md",
}: {
  value: number
  max?: number
  label?: string
  color?: string
  size?: "sm" | "md" | "lg"
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" }
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{label}</span>
          <span>{pct.toFixed(0)}%</span>
        </div>
      )}
      <div className={`${heights[size]} bg-secondary/50 rounded-full overflow-hidden`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div
          className={`${heights[size]} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
