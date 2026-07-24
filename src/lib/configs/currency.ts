import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

const CURRENCIES = [
  { value: 0, label: "USD - US Dollar", rate: 1.0 },
  { value: 1, label: "EUR - Euro", rate: 0.92 },
  { value: 2, label: "GBP - British Pound", rate: 0.79 },
  { value: 3, label: "JPY - Japanese Yen", rate: 151.3 },
  { value: 4, label: "CAD - Canadian Dollar", rate: 1.35 },
  { value: 5, label: "AUD - Australian Dollar", rate: 1.52 },
  { value: 6, label: "CHF - Swiss Franc", rate: 0.90 },
  { value: 7, label: "CNY - Chinese Yuan", rate: 7.23 },
  { value: 8, label: "INR - Indian Rupee", rate: 83.1 },
]

export const currencyConfig: CalculatorConfig = {
  id: "currency",
  meta: CALCULATOR_META.currency,
  defaults: { currAmount: 1000, currFrom: 0, currTo: 1 },
  inputs: [
    { type: "slider", key: "currAmount", label: "Amount", min: 10, max: 100000, step: 10, default: 1000 },
    { type: "select", key: "currFrom", label: "From Currency", options: CURRENCIES.map(c => ({ value: c.value, label: c.label })), default: 0 },
    { type: "select", key: "currTo", label: "To Currency", options: CURRENCIES.map(c => ({ value: c.value, label: c.label })), default: 1 },
  ],
  calculate: v => {
    const amount = v.currAmount;
    const fromRate = CURRENCIES.find(c => c.value === v.currFrom)?.rate || 1;
    const toRate = CURRENCIES.find(c => c.value === v.currTo)?.rate || 1;
    
    const converted = amount * (toRate / fromRate);
    
    // We create a dummy schedule to satisfy the ChartDef requirements (even if not highly relevant)
    const schedule = [];
    for (let i = 1; i <= 5; i++) {
      schedule.push({ year: i, value: converted * (1 + (i * 0.01)) }); // slight mock variation
    }

    return {
      converted,
      schedule
    }
  },
  highlight: { label: "Converted Amount", valueKey: "converted", format: "number" },
  results: [],
  copyTemplate: r => `Converted Amount: ${r.converted.toFixed(2)}`,
  growthChart: {
    title: "Exchange Trend (Mock)",
    data: r => r.schedule,
    lines: [
      { dataKey: "value", name: "Value", colorKey: "emerald" },
    ],
  },
  pieChart: {
    title: "Conversion Breakdown",
    data: (_v, r) => [
      { name: "Converted", value: Math.round(r.converted) },
    ],
  },
}
