import { calcLoan } from "../calculators/loan"
import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const loanConfig: CalculatorConfig = {
  id: "loan",
  meta: CALCULATOR_META.loan,
  defaults: { loanAmt: 25000, loanRate: 8.5, loanTerm: 5 },
  inputs: [
    { type: "slider", key: "loanAmt", label: "Loan Amount", min: 1000, max: 500000, step: 500, prefix: "$", default: 25000, formatDisplay: v => (v / 1000).toFixed(0) + "K" },
    { type: "slider", key: "loanRate", label: "Annual Interest Rate", min: 0.5, max: 30, step: 0.1, suffix: "%", default: 8.5, validate: v => v > 25 ? "APR above 25% approaches predatory lending thresholds" : null },
    { type: "slider", key: "loanTerm", label: "Loan Term", min: 1, max: 30, step: 1, suffix: " yrs", default: 5 },
  ],
  calculate: v => calcLoan(v.loanAmt, v.loanRate, v.loanTerm),
  highlight: { label: "Monthly Payment", valueKey: "monthly", format: "currency" },
  results: [
    { key: "interest", label: "Total Interest", color: "text-amber-600 dark:text-amber-400", format: "currency" },
    { key: "total", label: "Total Repayment", format: "currency" },
  ],
  copyTemplate: r => `Monthly Payment: $${Math.round(r.monthly).toLocaleString()} | Total Interest: $${Math.round(r.interest).toLocaleString()} | Total Cost: $${Math.round(r.total).toLocaleString()}`,
  csvData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "balance", label: "Balance", format: "currency" },
      { key: "cumulPrincipal", label: "Cumulative Principal", format: "currency" },
      { key: "cumulInterest", label: "Cumulative Interest", format: "currency" },
    ],
    rows: r.schedule,
  }),
  hasMonthlyTable: true,
  monthlyTableData: (v, r) => {
    const monthlyRate = v.loanRate / 100 / 12
    const monthly = r.monthly
    let bal = v.loanAmt
    const months = []
    for (let m = 1; m <= Math.min(12, v.loanTerm * 12); m++) {
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
    rows: r.schedule,
  }),
  growthChart: {
    title: "Balance Over Time",
    data: r => r.schedule,
    lines: [
      { dataKey: "balance", name: "Remaining Balance", colorKey: "blue" },
      { dataKey: "cumulInterest", name: "Interest Paid", colorKey: "amber" },
    ],
  },
  pieChart: {
    title: "Principal vs Interest",
    data: (v, r) => [
      { name: "Principal", value: Math.round(v.loanAmt) },
      { name: "Interest", value: Math.round(r.interest) },
    ],
  },
}
