import { calcCompound } from "../calculators/compound"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const compoundConfig: CalculatorConfig = {
  id: "compound",
  meta: CALCULATOR_META.compound,
  defaults: { cpPrincipal: 10000, cpRate: 7, cpYears: 10, cpFreq: 12 },
  inputs: [
    { type: "slider", key: "cpPrincipal", label: "Initial Principal", min: 1000, max: 1000000, step: 1000, prefix: "$", default: 10000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "cpRate", label: "Annual Interest Rate", min: 0.5, max: 30, step: 0.1, suffix: "%", default: 7 },
    { type: "slider", key: "cpYears", label: "Investment Period", min: 1, max: 40, step: 1, suffix: " yrs", default: 10 },
    { type: "select", key: "cpFreq", label: "Compounding Frequency", options: [
      { value: 1, label: "Annually" },
      { value: 2, label: "Semi-annually" },
      { value: 4, label: "Quarterly" },
      { value: 12, label: "Monthly" },
      { value: 365, label: "Daily" },
    ], default: 12 },
  ],
  calculate: v => calcCompound(v.cpPrincipal, v.cpRate, v.cpYears, v.cpFreq),
  highlight: { label: "Future Value", valueKey: "fv", format: "currency" },
  results: [
    { key: "interest", label: "Interest Earned", color: "text-emerald-600 dark:text-emerald-400", format: "currency" },
    { key: "returnPct", label: "Total Return", color: "text-emerald-600 dark:text-emerald-400", format: "percent" },
  ],
  copyTemplate: r => `Future Value: $${Math.round(r.fv).toLocaleString()} | Total Interest: $${Math.round(r.interest).toLocaleString()} | Return: ${r.returnPct.toFixed(1)}%`,
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "value", label: "Value", format: "currency" },
      { key: "interest", label: "Interest", format: "currency" },
    ],
    rows: r.growth,
  }),
  growthChart: {
    title: "Growth Over Time",
    data: r => r.growth,
    lines: [
      { dataKey: "value", name: "Total Value", colorKey: "blue" },
      { dataKey: "interest", name: "Interest Earned", colorKey: "emerald" },
    ],
  },
  pieChart: {
    title: "Principal vs Interest Earned",
    data: (v, r) => [
      { name: "Principal", value: Math.round(v.cpPrincipal) },
      { name: "Interest Earned", value: Math.round(r.interest) },
    ],
  },
}
