import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const inflationConfig: CalculatorConfig = {
  id: "inflation",
  meta: CALCULATOR_META.inflation,
  defaults: { infAmount: 10000, infRate: 3.0, infYears: 10 },
  inputs: [
    { type: "slider", key: "infAmount", label: "Starting Amount", min: 100, max: 1000000, step: 100, prefix: "$", default: 10000, formatDisplay: v => (v >= 1000 ? (v / 1000).toFixed(1) + "K" : v.toString()) },
    { type: "slider", key: "infRate", label: "Inflation Rate (Annual)", min: 0.1, max: 15, step: 0.1, suffix: "%", default: 3.0 },
    { type: "slider", key: "infYears", label: "Years", min: 1, max: 50, step: 1, suffix: " yrs", default: 10 },
  ],
  calculate: v => {
    const amount = v.infAmount;
    const rate = v.infRate / 100;
    const years = v.infYears;
    
    // Future equivalent cost (how much you need in the future to buy what amount buys today)
    const futureCost = amount * Math.pow(1 + rate, years);
    
    // Future purchasing power of the amount (what amount will buy in the future in today's dollars)
    const futurePower = amount / Math.pow(1 + rate, years);
    
    const powerLost = amount - futurePower;

    const schedule = [];
    for (let i = 0; i <= years; i++) {
      schedule.push({
        year: i,
        cost: amount * Math.pow(1 + rate, i),
        power: amount / Math.pow(1 + rate, i)
      });
    }

    return {
      futureCost,
      futurePower,
      powerLost,
      schedule
    }
  },
  highlight: { label: "Equivalent Cost in Future", valueKey: "futureCost", format: "currency" },
  results: [
    { key: "futurePower", label: "Future Purchasing Power", format: "currency" },
    { key: "powerLost", label: "Purchasing Power Lost", color: "text-red-600 dark:text-red-400", format: "currency" },
  ],
  copyTemplate: r => `Original: $10,000 | Future Equivalent Cost: $${Math.round(r.futureCost).toLocaleString()} | Power Lost: $${Math.round(r.powerLost).toLocaleString()}`,
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "cost", label: "Equivalent Cost", format: "currency" },
      { key: "power", label: "Purchasing Power", format: "currency" },
    ],
    rows: r.schedule.map((s: any) => ({ year: s.year, cost: s.cost, power: s.power })),
  }),
  growthChart: {
    title: "Inflation Impact Over Time",
    data: r => r.schedule.map((s: any) => ({ ...s, value: s.cost })),
    lines: [
      { dataKey: "cost", name: "Equivalent Cost", colorKey: "amber" },
      { dataKey: "power", name: "Purchasing Power", colorKey: "blue" },
    ],
  },
  pieChart: {
    title: "Purchasing Power Lost",
    data: (_v, r) => [
      { name: "Remaining Power", value: Math.round(r.futurePower) },
      { name: "Value Lost", value: Math.round(r.powerLost) },
    ],
  },
}
