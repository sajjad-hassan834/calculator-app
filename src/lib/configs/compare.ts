import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const compareConfig: CalculatorConfig = {
  id: "compare",
  meta: CALCULATOR_META.compare,
  defaults: { cmpInitial: 10000, cmpMonthly: 500, cmpYears: 20, cmpRateA: 5.0, cmpRateB: 8.0 },
  inputs: [
    { type: "slider", key: "cmpInitial", label: "Initial Deposit", min: 0, max: 1000000, step: 1000, prefix: "$", default: 10000, formatDisplay: v => (v >= 1000 ? (v / 1000).toFixed(0) + "K" : v.toString()) },
    { type: "slider", key: "cmpMonthly", label: "Monthly Contribution", min: 0, max: 10000, step: 50, prefix: "$", default: 500 },
    { type: "slider", key: "cmpYears", label: "Years to Invest", min: 1, max: 50, step: 1, suffix: " yrs", default: 20 },
    { type: "slider", key: "cmpRateA", label: "Option A Annual Return", min: 0.1, max: 20, step: 0.1, suffix: "%", default: 5.0 },
    { type: "slider", key: "cmpRateB", label: "Option B Annual Return", min: 0.1, max: 20, step: 0.1, suffix: "%", default: 8.0 },
  ],
  calculate: v => {
    const P = v.cmpInitial;
    const PMT = v.cmpMonthly;
    const t = v.cmpYears;
    const rA = v.cmpRateA / 100;
    const rB = v.cmpRateB / 100;
    
    // Monthly compounding for both
    const n = 12;
    const rateA = rA / n;
    const rateB = rB / n;


    let balanceA = P;
    let balanceB = P;

    const schedule = [];
    
    for (let year = 0; year <= t; year++) {
      if (year === 0) {
        schedule.push({ year: 0, optionA: P, optionB: P, contributed: P });
        continue;
      }
      
      let yearBalA = balanceA;
      let yearBalB = balanceB;
      let totalContrib = P;

      for (let m = 1; m <= 12; m++) {
        yearBalA = (yearBalA + PMT) * (1 + rateA);
        yearBalB = (yearBalB + PMT) * (1 + rateB);
      }
      
      balanceA = yearBalA;
      balanceB = yearBalB;
      totalContrib = P + (PMT * 12 * year);

      schedule.push({
        year,
        optionA: yearBalA,
        optionB: yearBalB,
        contributed: totalContrib
      });
    }

    const finalA = balanceA;
    const finalB = balanceB;
    const difference = Math.abs(finalA - finalB);
    const winner = finalA > finalB ? "Option A" : (finalB > finalA ? "Option B" : "Tie");

    return {
      finalA,
      finalB,
      difference,
      winner,
      schedule
    }
  },
  highlight: { label: "Difference at End", valueKey: "difference", format: "currency" },
  results: [
    { key: "finalA", label: "Option A Final Value", format: "currency" },
    { key: "finalB", label: "Option B Final Value", color: "text-emerald-600 dark:text-emerald-400", format: "currency" },
  ],
  copyTemplate: r => `Option A: $${Math.round(r.finalA).toLocaleString()} | Option B: $${Math.round(r.finalB).toLocaleString()} | Difference: $${Math.round(r.difference).toLocaleString()}`,
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "contributed", label: "Total Contributed", format: "currency" },
      { key: "optionA", label: "Option A", format: "currency" },
      { key: "optionB", label: "Option B", format: "currency" },
    ],
    rows: r.schedule.map((s: any) => ({ year: s.year, contributed: s.contributed, optionA: s.optionA, optionB: s.optionB })),
  }),
  growthChart: {
    title: "Option A vs Option B",
    data: r => r.schedule,
    lines: [
      { dataKey: "optionA", name: "Option A", colorKey: "blue" },
      { dataKey: "optionB", name: "Option B", colorKey: "emerald" },
      { dataKey: "contributed", name: "Contributions", colorKey: "amber" },
    ],
  },
  pieChart: {
    title: "Final Value Comparison",
    data: (_v, r) => [
      { name: "Option A", value: Math.round(r.finalA) },
      { name: "Option B", value: Math.round(r.finalB) },
    ],
  },
}
