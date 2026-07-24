import type { CalculatorConfig } from "../calculatorConfig"
import { mortgageConfig } from "./mortgage"
import { compoundConfig } from "./compound"
import { loanConfig } from "./loan"
import { savingsConfig } from "./savings"
import { retirementConfig } from "./retirement"
import { roiConfig } from "./roi"
import { investmentConfig } from "./investment"
import { taxConfig } from "./tax"
import { breakEvenConfig } from "./break-even"
import { inflationConfig } from "./inflation"
import { currencyConfig } from "./currency"
import { budgetConfig } from "./budget"
import { compareConfig } from "./compare"
import { goalConfig } from "./goal"

export const CALCULATOR_CONFIGS: Record<string, CalculatorConfig> = {
  mortgage: mortgageConfig,
  compound: compoundConfig,
  loan: loanConfig,
  savings: savingsConfig,
  retirement: retirementConfig,
  roi: roiConfig,
  investment: investmentConfig,
  tax: taxConfig,
  "break-even": breakEvenConfig,
  inflation: inflationConfig,
  currency: currencyConfig,
  budget: budgetConfig,
  compare: compareConfig,
  goal: goalConfig,
}

export function getCalculatorConfig(id: string): CalculatorConfig | undefined {
  return CALCULATOR_CONFIGS[id]
}

export const CALCULATOR_IDS = Object.keys(CALCULATOR_CONFIGS)
