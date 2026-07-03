import { calcSavingsGoal } from "../calculators/savings"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const savingsConfig: CalculatorConfig = {
  id: "savings",
  meta: CALCULATOR_META.savings,
  defaults: { svTarget: 50000, svCurrent: 5000, svRate: 4, svYears: 5 },
  inputs: [
    { type: "slider", key: "svTarget", label: "Target Amount", min: 1000, max: 1000000, step: 1000, prefix: "$", default: 50000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "svCurrent", label: "Current Savings", min: 0, max: 500000, step: 500, prefix: "$", default: 5000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "svRate", label: "Annual Interest Rate (APY)", min: 0.1, max: 10, step: 0.1, suffix: "%", default: 4 },
    { type: "slider", key: "svYears", label: "Goal Timeline", min: 1, max: 40, step: 1, suffix: " yrs", default: 5 },
  ],
  calculate: v => calcSavingsGoal(v.svTarget, v.svCurrent, v.svRate, v.svYears),
  highlight: { label: "Monthly Savings Needed", valueKey: "monthly", format: "currency" },
  results: [
    { key: "monthsToGoal", label: "Time to Goal", format: "number" },
    { key: "totalContributions", label: "Total Contributions", format: "currency" },
    { key: "interestEarned", label: "Interest Earned", color: "text-emerald-600 dark:text-emerald-400", format: "currency" },
  ],
  copyTemplate: r => `Monthly Savings: $${Math.round(r.monthly).toLocaleString()} | Months to Goal: ${r.monthsToGoal} | Interest: $${Math.round(r.interestEarned).toLocaleString()}`,
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "balance", label: "Balance", format: "currency" },
    ],
    rows: r.schedule.map((s: { year: number; balance: number }) => ({ year: s.year, balance: s.balance })),
  }),
  growthChart: {
    title: "Growth Over Time",
    data: r => r.schedule.map((s: { year: number; balance: number; contributed: number }) => ({ ...s, value: s.balance })),
    lines: [
      { dataKey: "balance", name: "Balance", colorKey: "blue" },
    ],
  },
  pieChart: {
    title: "Contributions vs Growth",
    data: (v, r) => [
      { name: "Your Savings", value: Math.round(v.svCurrent + r.totalContributions) },
      { name: "Interest", value: Math.max(0, Math.round(r.interestEarned)) },
    ],
  },
}
