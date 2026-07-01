export interface MortgageResult {
  principal: number
  monthly: number
  total: number
  totalInterest: number
  downPayment: number
  amortization: YearData[]
}

export interface CompoundResult {
  fv: number
  interest: number
  returnPct: number
  growth: YearData[]
}

export interface LoanResult {
  monthly: number
  total: number
  interest: number
  schedule: YearData[]
}

export interface YearData {
  year: number
  balance: number
  cumulPrincipal: number
  cumulInterest: number
}

export interface SavingsResult {
  monthly: number
  totalContributions: number
  interestEarned: number
  monthsToGoal: number
  schedule: { year: number; balance: number; contributed: number }[]
}

export interface RetirementResult {
  nestEgg: number
  withdrawMonthly: number
  totalContributed: number
  schedule: { year: number; balance: number; contributed: number }[]
}

export interface ROIResult {
  profit: number
  roi: number
  annualizedRoi: number
}

export interface InvestmentResult {
  fv: number
  totalContributions: number
  interest: number
  schedule: { year: number; value: number; contributed: number }[]
}

export interface TaxResult {
  totalTax: number
  effectiveRate: number
  marginalRate: number
  takeHome: number
  breakdown: { label: string; rate: number; taxable: number; tax: number }[]
}

export interface BreakEvenResult {
  units: number
  revenue: number
  contributionMargin: number
}

export type CalculatorResult =
  | MortgageResult
  | CompoundResult
  | LoanResult
  | SavingsResult
  | RetirementResult
  | ROIResult
  | InvestmentResult
  | TaxResult
  | BreakEvenResult
