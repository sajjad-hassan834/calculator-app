export interface SearchEntry {
  id: string
  title: string
  keywords: string[]
  synonyms: string[]
  category: string
  path: string
  description: string
}

export const SEARCH_INDEX: SearchEntry[] = [
  {
    id: "mortgage",
    title: "Mortgage Calculator",
    keywords: ["mortgage", "home loan", "house", "property", "real estate", "mortgage payment"],
    synonyms: ["home loan calculator", "house payment calculator", "mortgage rate calculator", "affordability calculator"],
    category: "Mortgage",
    path: "/calculator/mortgage",
    description: "Calculate monthly mortgage payments, amortization, and total loan cost",
  },
  {
    id: "compound",
    title: "Compound Interest Calculator",
    keywords: ["compound", "interest", "investment", "growth", "exponential", "savings", "return"],
    synonyms: ["compound interest", "interest calculator", "investment growth calculator", "exponential growth"],
    category: "Investments",
    path: "/calculator/compound",
    description: "See how investments grow exponentially over time with compound interest",
  },
  {
    id: "loan",
    title: "Loan Repayment Calculator",
    keywords: ["loan", "personal loan", "auto loan", "car loan", "debt", "borrow", "repayment", "installment"],
    synonyms: ["personal loan calculator", "car loan calculator", "debt calculator", "installment calculator", "emi calculator"],
    category: "Loans",
    path: "/calculator/loan",
    description: "Calculate monthly repayments and total interest on any personal loan",
  },
  {
    id: "savings",
    title: "Savings Goal Calculator",
    keywords: ["savings", "goal", "target", "save", "fund", "emergency fund", "down payment", "vacation"],
    synonyms: ["savings goal calculator", "savings planner", "goal planner", "monthly savings calculator"],
    category: "Savings",
    path: "/calculator/savings",
    description: "Find out how much to save monthly to reach your financial target",
  },
  {
    id: "retirement",
    title: "Retirement Planner",
    keywords: ["retirement", "pension", "401k", "ira", "nest egg", "retire", "superannuation"],
    synonyms: ["retirement calculator", "retirement planning", "401k calculator", "pension calculator"],
    category: "Retirement",
    path: "/calculator/retirement",
    description: "Check if you are on track to retire with enough wealth for your golden years",
  },
  {
    id: "roi",
    title: "ROI Calculator",
    keywords: ["roi", "return on investment", "profit", "profitability", "investment return", "gain"],
    synonyms: ["return on investment calculator", "profit calculator", "investment return calculator"],
    category: "Business",
    path: "/calculator/roi",
    description: "Measure return on investment and profitability for any business decision",
  },
  {
    id: "investment",
    title: "Investment Growth Calculator",
    keywords: ["investment", "invest", "portfolio", "stocks", "bonds", "monthly contribution", "dca"],
    synonyms: ["investment calculator", "portfolio growth calculator", "dollar cost average calculator"],
    category: "Investments",
    path: "/calculator/investment",
    description: "Project portfolio growth with regular monthly contributions over time",
  },
  {
    id: "tax",
    title: "Tax Calculator",
    keywords: ["tax", "income tax", "federal tax", "tax bracket", "irs", "tax return", "withholding"],
    synonyms: ["income tax calculator", "tax bracket calculator", "federal tax calculator", "tax estimator"],
    category: "Tax",
    path: "/calculator/tax",
    description: "Estimate your federal income tax using progressive tax brackets",
  },
  {
    id: "break-even",
    title: "Break-Even Analysis",
    keywords: ["break even", "breakeven", "profit", "business", "cost", "revenue", "fixed cost", "variable cost"],
    synonyms: ["break even calculator", "breakeven analysis", "profit calculator", "cost analysis"],
    category: "Business",
    path: "/calculator/break-even",
    description: "Find how many units you need to sell to cover costs and make a profit",
  },
]
