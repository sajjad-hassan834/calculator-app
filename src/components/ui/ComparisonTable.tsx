import { fmt$, fmtPct, fmtNum } from "../../lib/formatters"

type FormatType = "currency" | "percent" | "number" | "string"

interface ComparisonColumn {
  label: string
  rows: (string | number)[]
  format?: FormatType
  highlight?: boolean
}

export function ComparisonTable({
  columns,
  rowLabels,
}: {
  columns: ComparisonColumn[]
  rowLabels: string[]
}) {
  const fmt = (val: string | number, format?: FormatType): string => {
    if (typeof val === "string") return val
    switch (format) {
      case "currency": return fmt$(val)
      case "percent": return fmtPct(val, 1)
      case "number": return fmtNum(val)
      default: return String(val)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" role="table">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Metric</th>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider ${
                  col.highlight ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rowLabels.map((label, rowIdx) => (
            <tr key={label} className="hover:bg-secondary/30 transition-colors">
              <td className="px-4 py-2.5 text-foreground font-medium text-xs">{label}</td>
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-4 py-2.5 text-xs font-['JetBrains_Mono',monospace] ${
                    col.highlight ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  {fmt(col.rows[rowIdx], col.format)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
