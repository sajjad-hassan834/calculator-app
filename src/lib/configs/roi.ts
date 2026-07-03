import { calcROI } from "../calculators/investment"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const roiConfig: CalculatorConfig = {
  id: "roi",
  meta: CALCULATOR_META.roi,
  defaults: { roiInvest: 50000, roiFinal: 75000, roiYears: 3 },
  inputs: [
    { type: "slider", key: "roiInvest", label: "Initial Investment", min: 1000, max: 1000000, step: 1000, prefix: "$", default: 50000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "roiFinal", label: "Final Value", min: 0, max: 5000000, step: 1000, prefix: "$", default: 75000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "roiYears", label: "Years Held", min: 1, max: 30, step: 1, suffix: " yrs", default: 3 },
  ],
  calculate: v => calcROI(v.roiInvest, v.roiFinal, v.roiYears),
  highlight: { label: "Total Profit", valueKey: "profit", format: "currency" },
  results: [
    { key: "roi", label: "Total ROI", color: "text-emerald-600 dark:text-emerald-400", format: "percent" },
    { key: "annualizedRoi", label: "Annualized ROI", format: "percent" },
  ],
  copyTemplate: r => `Profit: $${Math.round(r.profit).toLocaleString()} | Total ROI: ${r.roi.toFixed(1)}% | Annualized: ${r.annualizedRoi.toFixed(1)}%`,
  growthChart: {
    title: "ROI Overview",
    data: () => [],
    lines: [],
  },
  pieChart: {
    title: "Profit vs Investment",
    data: (v, r) => [
      { name: "Initial Investment", value: Math.round(v.roiInvest) },
      { name: "Profit", value: Math.max(0, Math.round(r.profit)) },
    ],
  },
}
