export function calcSavingsGoal(
  target: number,
  current: number,
  annualRate: number,
  years: number
) {
  const r = annualRate / 100 / 12
  const n = years * 12
  const remaining = target - current
  if (remaining <= 0) return { monthly: 0, totalContributions: 0, interestEarned: 0, monthsToGoal: 0, schedule: [] }
  const monthly =
    r === 0
      ? remaining / n
      : (remaining * r) / (Math.pow(1 + r, n) - 1)
  const totalContributions = monthly * n
  const interestEarned = target - current - totalContributions
  const schedule = []
  let balance = current
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly
    }
    schedule.push({
      year: y,
      balance: Math.round(balance),
      contributed: Math.round(monthly * y * 12 + current),
    })
  }
  let monthsToGoal = 0
  let testBalance = current
  while (testBalance < target && monthsToGoal < 600) {
    testBalance = testBalance * (1 + r) + monthly
    monthsToGoal++
  }
  return { monthly, totalContributions, interestEarned, monthsToGoal, schedule }
}

export function calcRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  lifeExpectancy: number
) {
  const yearsToRetire = retirementAge - currentAge
  const yearsInRetirement = lifeExpectancy - retirementAge
  const r = annualReturn / 100 / 12
  const n = yearsToRetire * 12
  let balance = currentSavings
  for (let m = 0; m < n; m++) {
    balance = balance * (1 + r) + monthlyContribution
  }
  const nestEgg = balance
  const withdrawMonthly =
    nestEgg *
    ((r * Math.pow(1 + r, yearsInRetirement * 12)) /
      (Math.pow(1 + r, yearsInRetirement * 12) - 1))
  const schedule = []
  balance = currentSavings
  for (let y = 1; y <= yearsToRetire; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthlyContribution
    }
    schedule.push({
      year: y + currentAge,
      balance: Math.round(balance),
      contributed: Math.round(monthlyContribution * y * 12 + currentSavings),
    })
  }
  return { nestEgg, withdrawMonthly, totalContributed: monthlyContribution * n + currentSavings, schedule }
}
