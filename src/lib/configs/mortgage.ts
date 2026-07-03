import { calcMortgage } from "../calculators/mortgage"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const mortgageConfig: CalculatorConfig = {
  id: "mortgage",
  meta: CALCULATOR_META.mortgage,
  defaults: { homePrice: 500000, downPct: 20, mortRate: 6.5, mortTerm: 30 },
  inputs: [
    { type: "slider", key: "homePrice", label: "Home Price", min: 100000, max: 2000000, step: 5000, prefix: "$", default: 500000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "downPct", label: "Down Payment", min: 0, max: 50, step: 1, suffix: "%", default: 20, validate: v => v < 5 ? "Down payments under 5% may require PMI" : null },
    { type: "slider", key: "mortRate", label: "Interest Rate (Annual)", min: 0.5, max: 20, step: 0.1, suffix: "%", default: 6.5, validate: v => v > 15 ? "Rates above 15% are uncommon for prime mortgages" : null },
    { type: "select", key: "mortTerm", label: "Loan Term", options: [10, 15, 20, 25, 30].map(y => ({ value: y, label: `${y}yr` })), default: 30 },
  ],
  calculate: v => calcMortgage(v.homePrice, v.downPct, v.mortRate, v.mortTerm),
  highlight: { label: "Monthly Payment", valueKey: "monthly", format: "currency" },
  results: [
    { key: "downPayment", label: "Down Payment", format: "currency" },
    { key: "principal", label: "Loan Principal", format: "currency" },
    { key: "totalInterest", label: "Total Interest", color: "text-amber-600 dark:text-amber-400", format: "currency" },
    { key: "total", label: "Total Cost", format: "currency" },
  ],
  copyTemplate: r => `Monthly Payment: $${Math.round(r.monthly).toLocaleString()} | Total Interest: $${Math.round(r.totalInterest).toLocaleString()} | Total Cost: $${Math.round(r.total).toLocaleString()}`,
  csvData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "balance", label: "Balance", format: "currency" },
      { key: "cumulPrincipal", label: "Cumulative Principal", format: "currency" },
      { key: "cumulInterest", label: "Cumulative Interest", format: "currency" },
    ],
    rows: r.amortization,
  }),
  hasMonthlyTable: true,
  monthlyTableData: (v, r) => {
    const monthlyRate = v.mortRate / 100 / 12
    const monthly = r.monthly
    let bal = r.principal
    const months = []
    for (let m = 1; m <= Math.min(12, v.mortTerm * 12); m++) {
      const ip = bal * monthlyRate
      const pp = Math.min(monthly - ip, bal)
      months.push({ month: m, payment: Math.round(monthly), principal: Math.round(pp), interest: Math.round(ip), balance: Math.round(Math.max(0, bal - pp)) })
      bal = Math.max(0, bal - pp)
    }
    return {
      columns: [
        { key: "month", label: "Month" },
        { key: "payment", label: "Payment", format: "currency" },
        { key: "principal", label: "Principal", format: "currency" },
        { key: "interest", label: "Interest", format: "currency" },
        { key: "balance", label: "Balance", format: "currency" },
      ],
      rows: months,
    }
  },
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "balance", label: "Balance", format: "currency" },
      { key: "cumulPrincipal", label: "Principal Paid", format: "currency" },
      { key: "cumulInterest", label: "Interest Paid", format: "currency" },
    ],
    rows: r.amortization,
  }),
  growthChart: {
    title: "Balance Over Time",
    data: r => r.amortization,
    lines: [
      { dataKey: "balance", name: "Remaining Balance", colorKey: "blue" },
      { dataKey: "cumulInterest", name: "Interest Paid", colorKey: "amber" },
    ],
  },
  pieChart: {
    title: "Principal vs Interest",
    data: (_v, r) => [
      { name: "Principal", value: Math.round(r.principal) },
      { name: "Interest", value: Math.round(r.totalInterest) },
    ],
  },
}
