import type { ReactNode } from "react"

const styles = {
  info: "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400",
  success: "bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-500/5 border-amber-500/20 text-amber-700 dark:text-amber-400",
  error: "bg-red-500/5 border-red-500/20 text-red-700 dark:text-red-400",
  default: "bg-secondary/50 border-border text-muted-foreground",
}

export function InfoCard({
  icon,
  title,
  children,
  variant = "default",
}: {
  icon?: ReactNode
  title?: string
  children: ReactNode
  variant?: keyof typeof styles
}) {
  return (
    <div className={`rounded-xl border p-4 ${styles[variant]}`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="text-xs font-semibold">{title}</span>
        </div>
      )}
      <div className="text-xs leading-relaxed">{children}</div>
    </div>
  )
}
