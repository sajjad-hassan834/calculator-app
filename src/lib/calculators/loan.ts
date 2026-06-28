import type { LoanResult } from "../../types/calculator"

export function calcLoan(
  amount: number,
  rate: number,
  termYears: number
): LoanResult {
  const r = rate / 100 / 12
  const n = termYears * 12
  const monthly =
    r === 0
      ? amount / n
      : (amount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
  const total = monthly * n
  const interest = total - amount
  const schedule = []
  let balance = amount
  let cp = 0
  let ci = 0
  for (let yr = 1; yr <= termYears; yr++) {
    for (let m = 0; m < 12 && balance > 0; m++) {
      const ip = balance * r
      const pp = Math.min(monthly - ip, balance)
      cp += pp
      ci += ip
      balance = Math.max(0, balance - pp)
    }
    schedule.push({
      year: yr,
      balance: Math.round(balance),
      cumulPrincipal: Math.round(cp),
      cumulInterest: Math.round(ci),
    })
  }
  return { monthly, total, interest, schedule }
}
