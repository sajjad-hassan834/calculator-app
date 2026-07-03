import {
  Home, TrendingUp, PiggyBank, Shield, CreditCard, Percent,
  BarChart2, Briefcase, GraduationCap, DollarSign, Building2,
} from "lucide-react"

export const CATEGORIES = [
  { id: "mortgage", label: "Mortgage", icon: Home, desc: "Home loans, refinancing & affordability", count: 12 },
  { id: "investments", label: "Investments", icon: TrendingUp, desc: "ROI, stocks, bonds & portfolios", count: 18 },
  { id: "loans", label: "Loans", icon: CreditCard, desc: "Personal, auto & student loans", count: 9 },
  { id: "savings", label: "Savings", icon: PiggyBank, desc: "Goals, interest & projections", count: 7 },
  { id: "retirement", label: "Retirement", icon: Shield, desc: "401k, IRA & pension planning", count: 6 },
  { id: "tax", label: "Tax", icon: Percent, desc: "Income, capital gains & brackets", count: 8 },
  { id: "business", label: "Business", icon: Briefcase, desc: "Break-even, NPV & profitability", count: 10 },
  { id: "education", label: "Education", icon: GraduationCap, desc: "Student loans & 529 plans", count: 5 },
  { id: "personal", label: "Personal Finance", icon: DollarSign, desc: "Budgeting & net worth", count: 11 },
  { id: "realestate", label: "Real Estate", icon: Building2, desc: "Rent vs buy & property", count: 6 },
  { id: "currency", label: "Currency", icon: DollarSign, desc: "Conversion & exchange rates", count: 4 },
  { id: "insurance", label: "Insurance", icon: Shield, desc: "Life, health & premium calc", count: 5 },
]

export const FEATURED = [
  { id: "mortgage", title: "Mortgage Calculator", desc: "Monthly payments, amortization & total cost for your home loan.", icon: Home, gradient: "from-blue-600 to-blue-800", uses: "2.4M", popular: true },
  { id: "compound", title: "Compound Interest", desc: "See how investments grow exponentially over time.", icon: TrendingUp, gradient: "from-emerald-600 to-emerald-800", uses: "1.8M", popular: true },
  { id: "loan", title: "Loan Calculator", desc: "Monthly repayments and total interest on any personal loan.", icon: CreditCard, gradient: "from-purple-600 to-purple-800", uses: "1.2M", popular: true },
  { id: "savings", title: "Savings Goal", desc: "How much to save monthly to reach your financial target.", icon: PiggyBank, gradient: "from-amber-500 to-amber-700", uses: "870K", popular: false },
  { id: "retirement", title: "Retirement Planner", desc: "Check if you are on track to retire with enough wealth.", icon: Shield, gradient: "from-rose-600 to-rose-800", uses: "940K", popular: false },
  { id: "roi", title: "ROI Calculator", desc: "Measure return on investment and profitability for any decision.", icon: BarChart2, gradient: "from-teal-600 to-teal-800", uses: "760K", popular: false },
  { id: "tax", title: "Tax Calculator", desc: "Estimate your income tax based on progressive brackets.", icon: Percent, gradient: "from-indigo-600 to-indigo-800", uses: "680K", popular: false },
  { id: "investment", title: "Investment Growth", desc: "Project portfolio growth with regular contributions.", icon: TrendingUp, gradient: "from-cyan-600 to-cyan-800", uses: "620K", popular: false },
  { id: "break-even", title: "Break-Even Analysis", desc: "Find how many units you need to sell to break even.", icon: BarChart2, gradient: "from-orange-600 to-orange-800", uses: "410K", popular: false },
]

export const FAQS = [
  { q: "How accurate are these financial calculators?", a: "Our calculators use standard financial formulas and provide highly accurate estimates. Actual figures may vary based on specific lender terms, fees, insurance, and taxes. Always consult a qualified financial advisor for major decisions." },
  { q: "Do I need an account to use the calculators?", a: "No. All calculators on FinanceCalculator.com are completely free with no registration required. Calculations run locally in your browser and we never store your personal financial data." },
  { q: "What is the difference between APR and interest rate?", a: "The interest rate is the base cost of borrowing the principal. APR (Annual Percentage Rate) includes interest plus lender fees, giving a truer picture of the loan's total cost." },
  { q: "How is a monthly mortgage payment calculated?", a: "Monthly payment = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1], where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (term in years × 12)." },
  { q: "Can I use these calculators for currencies other than USD?", a: "Yes. The calculators are built on pure mathematics and work with any currency. Simply enter your values in your local currency and interpret results accordingly." },
  { q: "What does compound frequency mean in the investment calculator?", a: "Compound frequency is how often interest is added to your principal. More frequent compounding (monthly vs annually) means slightly more growth because each compounding period earns interest on previous interest sooner." },
]
