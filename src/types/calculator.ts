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
