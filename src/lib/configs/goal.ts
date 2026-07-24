import { CALCULATOR_META } from "../calculatorMeta"
import type { CalculatorConfig } from "../calculatorConfig"

export const goalConfig: CalculatorConfig = {
  id: "goal",
  meta: CALCULATOR_META.goal,
  defaults: { glTarget: 50000, glYears: 5, glRate: 4.0, glInitial: 0 },
  inputs: [
    { type: "slider", key: "glTarget", label: "Target Amount", min: 1000, max: 1000000, step: 1000, prefix: "$", default: 50000, formatDisplay: v => (v >= 1000 ? (v / 1000).toFixed(0) + "K" : v.toString()) },
    { type: "slider", key: "glInitial", label: "Initial Savings", min: 0, max: 500000, step: 1000, prefix: "$", default: 0, formatDisplay: v => (v >= 1000 ? (v / 1000).toFixed(0) + "K" : v.toString()) },
    { type: "slider", key: "glYears", label: "Years to Goal", min: 1, max: 40, step: 1, suffix: " yrs", default: 5 },
    { type: "slider", key: "glRate", label: "Expected Annual Return", min: 0.1, max: 15, step: 0.1, suffix: "%", default: 4.0 },
  ],
  calculate: v => {
    const FV = v.glTarget;
    const PV = v.glInitial;
    const t = v.glYears;
    const r = v.glRate / 100;
    const n = 12; // monthly contributions
    
    const rate = r / n;
    const periods = t * n;

    // Future value of present value
    const fvOfPv = PV * Math.pow(1 + rate, periods);

    // Amount still needed to reach goal
    const amountNeeded = Math.max(0, FV - fvOfPv);

    // PMT formula: PMT = (FV * r) / ((1 + r)^n - 1)
    let PMT = 0;
    if (amountNeeded > 0) {
      if (rate === 0) {
        PMT = amountNeeded / periods;
      } else {
        PMT = (amountNeeded * rate) / (Math.pow(1 + rate, periods) - 1);
      }
    }

    const totalContributions = PMT * periods;
    const interestEarned = FV - PV - totalContributions;

    const schedule = [];
    let balance = PV;
    let cumContrib = PV;

    for (let year = 0; year <= t; year++) {
      if (year === 0) {
        schedule.push({ year: 0, balance: PV, contributed: PV, interest: 0 });
        continue;
      }
      
      for (let m = 1; m <= 12; m++) {
        balance = (balance + PMT) * (1 + rate);
      }
      cumContrib += PMT * 12;

      schedule.push({
        year,
        balance,
        contributed: cumContrib,
        interest: balance - cumContrib
      });
    }

    return {
      monthlySavings: PMT,
      totalContributions,
      interestEarned,
      schedule
    }
  },
  highlight: { label: "Required Monthly Savings", valueKey: "monthlySavings", format: "currency" },
  results: [
    { key: "totalContributions", label: "Total Contributions", format: "currency" },
    { key: "interestEarned", label: "Estimated Interest", color: "text-emerald-600 dark:text-emerald-400", format: "currency" },
  ],
  copyTemplate: r => `To reach your goal, save $${Math.round(r.monthlySavings).toLocaleString()} every month.`,
  tableData: r => ({
    columns: [
      { key: "year", label: "Year" },
      { key: "contributed", label: "Total Saved", format: "currency" },
      { key: "balance", label: "Balance", format: "currency" },
    ],
    rows: r.schedule.map((s: any) => ({ year: s.year, contributed: s.contributed, balance: s.balance })),
  }),
  growthChart: {
    title: "Path to Your Goal",
    data: r => r.schedule,
    lines: [
      { dataKey: "balance", name: "Balance", colorKey: "blue" },
      { dataKey: "contributed", name: "Your Savings", colorKey: "amber" },
    ],
  },
  pieChart: {
    title: "Goal Composition",
    data: (v, r) => [
      { name: "Initial", value: v.glInitial },
      { name: "Monthly Savings", value: Math.round(r.totalContributions) },
      { name: "Interest Earned", value: Math.max(0, Math.round(r.interestEarned)) },
    ].filter(d => d.value > 0),
  },
}
