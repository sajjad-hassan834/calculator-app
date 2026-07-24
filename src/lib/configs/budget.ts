import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const budgetConfig: CalculatorConfig = {
  id: "budget",
  meta: CALCULATOR_META.budget,
  defaults: { budIncome: 5000, budHousing: 1500, budFood: 600, budTransport: 400, budUtilities: 300, budDebt: 500, budSavings: 500 },
  inputs: [
    { type: "slider", key: "budIncome", label: "Monthly Income (After Tax)", min: 500, max: 20000, step: 100, prefix: "$", default: 5000 },
    { type: "slider", key: "budHousing", label: "Housing (Rent/Mortgage)", min: 0, max: 10000, step: 50, prefix: "$", default: 1500 },
    { type: "slider", key: "budFood", label: "Food & Groceries", min: 0, max: 3000, step: 25, prefix: "$", default: 600 },
    { type: "slider", key: "budTransport", label: "Transportation", min: 0, max: 2000, step: 25, prefix: "$", default: 400 },
    { type: "slider", key: "budUtilities", label: "Utilities & Bills", min: 0, max: 2000, step: 25, prefix: "$", default: 300 },
    { type: "slider", key: "budDebt", label: "Debt Payments", min: 0, max: 5000, step: 25, prefix: "$", default: 500 },
    { type: "slider", key: "budSavings", label: "Savings & Investments", min: 0, max: 10000, step: 50, prefix: "$", default: 500 },
  ],
  calculate: v => {
    const income = v.budIncome;
    const needs = v.budHousing + v.budFood + v.budTransport + v.budUtilities;
    const debtAndSavings = v.budDebt + v.budSavings;
    const totalExpenses = needs + debtAndSavings;
    const wants = Math.max(0, income - totalExpenses);
    
    // 50/30/20 target breakdown
    const targetNeeds = income * 0.50;
    const targetWants = income * 0.30;
    const targetSavings = income * 0.20;

    const schedule = [
      { category: "Needs", actual: needs, target: targetNeeds },
      { category: "Wants", actual: wants, target: targetWants },
      { category: "Savings/Debt", actual: debtAndSavings, target: targetSavings },
    ];

    return {
      income,
      needs,
      wants,
      debtAndSavings,
      totalExpenses,
      schedule
    }
  },
  highlight: { label: "Remaining for Wants", valueKey: "wants", format: "currency" },
  results: [
    { key: "needs", label: "Total Needs", format: "currency" },
    { key: "debtAndSavings", label: "Savings & Debt", color: "text-emerald-600 dark:text-emerald-400", format: "currency" },
  ],
  copyTemplate: r => `Income: $${r.income} | Needs: $${r.needs} | Savings/Debt: $${r.debtAndSavings} | Wants: $${r.wants}`,
  tableData: r => ({
    columns: [
      { key: "category", label: "Category" },
      { key: "actual", label: "Your Spend", format: "currency" },
      { key: "target", label: "50/30/20 Target", format: "currency" },
    ],
    rows: r.schedule.map((s: any) => ({ category: s.category, actual: s.actual, target: s.target })),
  }),
  growthChart: {
    title: "Your Spend vs 50/30/20 Rule",
    data: r => r.schedule,
    lines: [
      { dataKey: "actual", name: "Your Spend", colorKey: "blue" },
      { dataKey: "target", name: "Target", colorKey: "emerald" },
    ],
  },
  pieChart: {
    title: "Budget Breakdown",
    data: (_v, r) => [
      { name: "Needs", value: r.needs },
      { name: "Savings & Debt", value: r.debtAndSavings },
      { name: "Wants", value: r.wants },
    ],
  },
}
