import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { fmt$ } from "../../lib/formatters"

interface Column {
  key: string
  label: string
  format?: "currency" | "number" | "percent"
}

export function DataTable({
  columns,
  data,
  title,
  defaultRows = 5,
}: {
  columns: Column[]
  data: Record<string, number>[]
  title?: string
  defaultRows?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const rows = expanded ? data : data.slice(0, defaultRows)

  const formatValue = (val: number, format?: string) => {
    switch (format) {
      case "currency": return fmt$(val)
      case "number": return val.toLocaleString()
      case "percent": return `${val.toFixed(2)}%`
      default: return val
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-secondary/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2.5 text-foreground font-['JetBrains_Mono',monospace] text-xs">
                    {formatValue(row[col.key], col.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > defaultRows && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground border-t border-border transition-colors"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Show All {data.length} Rows <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      )}
    </div>
  )
}
