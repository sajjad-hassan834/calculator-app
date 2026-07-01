import { calcRetirement } from "../calculators/savings"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const retirementConfig: CalculatorConfig = {
  id: "retirement",
  meta: CALCULATOR_META.retirement,
  defaults: { rtAge: 30, rtRetire: 65, rtSavings: 20000, rtMonthly: 500, rtReturn: 7, rtLife: 90 },
  inputs: [
    { type: "slider", key: "rtAge", label: "Current Age", min: 18, max: 70, step: 1, default: 30 },
    { type: "slider", key: "rtRetire", label: "Retirement Age", min: 40, max: 80, step: 1, default: 65 },
    { type: "slider", key: "rtSavings", label: "Current Savings", min: 0, max: 2000000, step: 5000, prefix: "$", default: 20000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "rtMonthly", label: "Monthly Contribution", min: 0, max: 10000, step: 100, prefix: "$", default: 500 },
    { type: "slider", key: "rtReturn", label: "Annual Return", min: 1, max: 15, step: 0.5, suffix: "%", default: 7, validate: v => v > 12 ? "Returns above 12% are above historical market averages" : null },
    { type: "slider", key: "rtLife", label: "Life Expectancy", min: 70, max: 100, step: 1, default: 90 },
  ],
  calculate: v => calcRetirement(v.rtAge, v.rtRetire, v.rtSavings, v.rtMonthly, v.rtReturn, v.rtLife),
  highlight: { label: "Nest Egg at Retirement", valueKey: "nestEgg", format: "currency" },
  results: [
    { key: "withdrawMonthly", label: "Monthly Withdrawal", format: "currency" },
    { key: "totalContributed", label: "Total Contributed", format: "currency" },
  ],
  copyTemplate: r => `Nest Egg: $${Math.round(r.nestEgg).toLocaleString()} | Monthly Withdrawal: $${Math.round(r.withdrawMonthly).toLocaleString()}`,
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "balance", label: "Balance", format: "currency" },
    ],
    rows: r.schedule.map(s => ({ year: s.year, balance: s.balance })),
  }),
  growthChart: {
    title: "Growth Over Time",
    data: r => r.schedule.map(s => ({ ...s, value: s.balance })),
    lines: [
      { dataKey: "balance", name: "Portfolio Value", colorKey: "blue" },
    ],
  },
  pieChart: {
    title: "Contributions vs Growth",
    data: (v, r) => [
      { name: "Contributions", value: Math.round(r.totalContributed) },
      { name: "Growth", value: Math.round(r.nestEgg - r.totalContributed) },
    ],
  },
}
