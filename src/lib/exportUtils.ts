import * as XLSX from "xlsx"
import html2canvas from "html2canvas"

export function exportToExcel(
  data: { columns: { key: string; label: string; format?: string }[]; rows: Record<string, number>[] },
  filename: string
) {
  const wb = XLSX.utils.book_new()
  const rows = data.rows.map((row) => {
    const obj: Record<string, string | number> = {}
    data.columns.forEach((col) => {
      obj[col.label] = row[col.key]
    })
    return obj
  })
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, "Results")
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export async function exportToImage(elementId: string, filename: string) {
  const el = document.getElementById(elementId)
  if (!el) return
  const canvas = await html2canvas(el, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
  })
  const link = document.createElement("a")
  link.download = `${filename}.png`
  link.href = canvas.toDataURL("image/png")
  link.click()
}

export function exportToJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${filename}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToCSV(
  columns: { key: string; label: string }[],
  rows: Record<string, number>[],
  filename: string
) {
  const csv = columns.map((c) => c.label).join(",") +
    "\n" +
    rows.map((r) => columns.map((c) => r[c.key]).join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
}
