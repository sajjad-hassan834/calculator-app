import type { ReactNode } from "react"

const variants = {
  default: "bg-secondary text-muted-foreground border-border",
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  danger: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  popular: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/40",
}

export function Badge({
  children,
  variant = "default",
  icon,
}: {
  children: ReactNode
  variant?: keyof typeof variants
  icon?: ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border ${variants[variant]}`}
    >
      {icon}
      {children}
    </span>
  )
}
