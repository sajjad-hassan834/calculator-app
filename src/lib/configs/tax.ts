import { calcTaxBracket } from "../calculators/tax"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

const TAX_BRACKETS = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11600, max: 47150, rate: 12 },
  { min: 47150, max: 100525, rate: 22 },
  { min: 100525, max: 191950, rate: 24 },
  { min: 191950, max: 243725, rate: 32 },
  { min: 243725, max: 609350, rate: 35 },
  { min: 609350, max: Infinity, rate: 37 },
]

export const taxConfig: CalculatorConfig = {
  id: "tax",
  meta: CALCULATOR_META.tax,
  defaults: { taxIncome: 95000 },
  inputs: [
    { type: "slider", key: "taxIncome", label: "Annual Income", min: 10000, max: 10000000, step: 1000, prefix: "$", default: 95000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
  ],
  calculate: v => calcTaxBracket(v.taxIncome, TAX_BRACKETS),
  highlight: { label: "Total Tax Owed", valueKey: "totalTax", format: "currency" },
  results: [
    { key: "takeHome", label: "Take Home Pay", format: "currency" },
    { key: "effectiveRate", label: "Effective Tax Rate", format: "percent" },
    { key: "marginalRate", label: "Marginal Tax Rate", format: "percent" },
  ],
  copyTemplate: r => `Total Tax: $${r.totalTax.toLocaleString()} | Effective Rate: ${r.effectiveRate.toFixed(1)}% | Marginal Rate: ${r.marginalRate.toFixed(0)}%`,
  growthChart: {
    title: "Tax Breakdown",
    data: () => [],
    lines: [],
  },
  pieChart: {
    title: "Tax by Bracket",
    data: (v, r) => r.breakdown.map((b: any) => ({
      name: `${b.rate}%`,
      value: b.tax,
    })),
  },
}
