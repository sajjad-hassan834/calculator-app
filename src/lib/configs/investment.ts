import { calcInvestment } from "../calculators/investment"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const investmentConfig: CalculatorConfig = {
  id: "investment",
  meta: CALCULATOR_META.investment,
  defaults: { invPrincipal: 10000, invMonthly: 500, invRate: 8, invYears: 20 },
  inputs: [
    { type: "slider", key: "invPrincipal", label: "Initial Investment", min: 0, max: 1000000, step: 1000, prefix: "$", default: 10000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "invMonthly", label: "Monthly Contribution", min: 0, max: 10000, step: 100, prefix: "$", default: 500 },
    { type: "slider", key: "invRate", label: "Annual Return", min: 0.5, max: 30, step: 0.5, suffix: "%", default: 8, validate: v => v > 20 ? "Returns above 20% carry significant risk" : null },
    { type: "slider", key: "invYears", label: "Investment Period", min: 1, max: 40, step: 1, suffix: " yrs", default: 20 },
  ],
  calculate: v => calcInvestment(v.invPrincipal, v.invMonthly, v.invRate, v.invYears),
  highlight: { label: "Future Value", valueKey: "fv", format: "currency" },
  results: [
    { key: "totalContributions", label: "Total Contributions", format: "currency" },
    { key: "interest", label: "Interest Earned", color: "text-emerald-600 dark:text-emerald-400", format: "currency" },
  ],
  copyTemplate: r => `Future Value: $${Math.round(r.fv).toLocaleString()} | Contributions: $${Math.round(r.totalContributions).toLocaleString()} | Interest: $${Math.round(r.interest).toLocaleString()}`,
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "value", label: "Value", format: "currency" },
      { key: "contributed", label: "Contributed", format: "currency" },
    ],
    rows: r.schedule,
  }),
  growthChart: {
    title: "Growth Over Time",
    data: r => r.schedule,
    lines: [
      { dataKey: "value", name: "Portfolio Value", colorKey: "blue" },
      { dataKey: "contributed", name: "Contributions", colorKey: "emerald" },
    ],
  },
  pieChart: {
    title: "Contributions vs Growth",
    data: (v, r) => [
      { name: "Contributions", value: Math.round(r.totalContributions) },
      { name: "Growth", value: Math.round(r.fv - r.totalContributions) },
    ],
  },
}
