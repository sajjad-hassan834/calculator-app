import { calcBreakEven } from "../calculators/investment"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const breakEvenConfig: CalculatorConfig = {
  id: "break-even",
  meta: CALCULATOR_META["break-even"],
  defaults: { beFixed: 50000, bePrice: 50, beVariable: 20 },
  inputs: [
    { type: "slider", key: "beFixed", label: "Fixed Costs", min: 1000, max: 1000000, step: 1000, prefix: "$", default: 50000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "bePrice", label: "Price per Unit", min: 1, max: 10000, step: 1, prefix: "$", default: 50 },
    { type: "slider", key: "beVariable", label: "Variable Cost per Unit", min: 0.01, max: 10000, step: 1, prefix: "$", default: 20 },
  ],
  calculate: v => calcBreakEven(v.beFixed, v.beVariable, v.bePrice),
  highlight: { label: "Units to Break Even", valueKey: "units", format: "number" },
  results: [
    { key: "revenue", label: "Break-Even Revenue", format: "currency" },
    { key: "contributionMargin", label: "Contribution Margin", format: "currency" },
  ],
  copyTemplate: r => `Units to Break Even: ${r.units.toLocaleString()} | Revenue: $${Math.round(r.revenue).toLocaleString()}`,
  growthChart: {
    title: "Cost Analysis",
    data: () => [],
    lines: [],
  },
  pieChart: {
    title: "Break-Even Breakdown",
    data: (v, r) => [
      { name: "Fixed Costs", value: Math.round(v.beFixed) },
      { name: "Variable Costs", value: Math.round(r.units * v.beVariable) },
    ],
  },
}
