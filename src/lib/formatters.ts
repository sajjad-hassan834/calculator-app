export function fmt$(n: number, compact = false): string {
  if (compact) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n)
}

export function fmtPct(n: number, decimals = 2): string {
  return `${n.toFixed(decimals)}%`
}

export function fmtNum(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n))
}
