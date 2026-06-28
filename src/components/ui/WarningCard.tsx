import { AlertTriangle } from "lucide-react"

export function WarningCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{title}</span>
        </div>
      )}
      <div className="text-xs text-muted-foreground leading-relaxed">{children}</div>
    </div>
  )
}
