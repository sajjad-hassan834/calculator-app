import type { CompoundResult } from "../../types/calculator"

export function calcCompound(
  principal: number,
  rate: number,
  years: number,
  freq: number
): CompoundResult {
  const r = rate / 100
  const fv = principal * Math.pow(1 + r / freq, freq * years)
  const interest = fv - principal
  const growth = []
  for (let y = 1; y <= Math.min(years, 40); y++) {
    const v = principal * Math.pow(1 + r / freq, freq * y)
    growth.push({
      year: y,
      value: Math.round(v),
      interest: Math.round(v - principal),
    })
  }
  return { fv, interest, returnPct: (interest / principal) * 100, growth }
}
