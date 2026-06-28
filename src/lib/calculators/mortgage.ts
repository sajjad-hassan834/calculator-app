import type { MortgageResult } from "../../types/calculator"

export function calcMortgage(
  homePrice: number,
  downPct: number,
  annualRate: number,
  termYears: number
): MortgageResult {
  const principal = homePrice * (1 - downPct / 100)
  const r = annualRate / 100 / 12
  const n = termYears * 12
  const monthly =
    r === 0
      ? principal / n
      : (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
  const total = monthly * n
  const totalInterest = total - principal
  const amortization = []
  let balance = principal
  let cp = 0
  let ci = 0
  for (let yr = 1; yr <= termYears; yr++) {
    for (let m = 0; m < 12; m++) {
      const ip = balance * r
      const pp = Math.min(monthly - ip, balance)
      cp += pp
      ci += ip
      balance = Math.max(0, balance - pp)
    }
    amortization.push({
      year: yr,
      balance: Math.round(balance),
      cumulPrincipal: Math.round(cp),
      cumulInterest: Math.round(ci),
    })
  }
  return {
    principal,
    monthly,
    total,
    totalInterest,
    downPayment: (homePrice * downPct) / 100,
    amortization,
  }
}
