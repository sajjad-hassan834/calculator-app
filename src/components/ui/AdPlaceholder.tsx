export function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`min-h-[90px] bg-secondary/30 border border-dashed border-border rounded-2xl flex items-center justify-center text-xs text-muted-foreground/50 select-none ${className}`}
      aria-hidden="true"
    >
      Advertisement
    </div>
  )
}
