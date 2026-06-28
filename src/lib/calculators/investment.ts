export function calcROI(
  initialInvestment: number,
  finalValue: number,
  years: number
) {
  const profit = finalValue - initialInvestment
  const roi = (profit / initialInvestment) * 100
  const annualizedRoi =
    (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100
  return { profit, roi, annualizedRoi }
}

export function calcBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  pricePerUnit: number
) {
  const contributionMargin = pricePerUnit - variableCostPerUnit
  const units = fixedCosts / contributionMargin
  const revenue = units * pricePerUnit
  return { units: Math.ceil(units), revenue, contributionMargin }
}

export function calcInvestment(
  principal: number,
  monthlyAdd: number,
  annualRate: number,
  years: number
) {
  const r = annualRate / 100 / 12
  const n = years * 12
  let fv = principal
  for (let m = 0; m < n; m++) {
    fv = fv * (1 + r) + monthlyAdd
  }
  const totalContributions = principal + monthlyAdd * n
  const interest = fv - totalContributions
  const schedule = []
  let balance = principal
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthlyAdd
    }
    schedule.push({
      year: y,
      value: Math.round(balance),
      contributed: Math.round(principal + monthlyAdd * y * 12),
    })
  }
  return { fv, totalContributions, interest, schedule }
}
