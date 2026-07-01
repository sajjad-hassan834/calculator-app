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
}

export function getCalculatorConfig(id: string): CalculatorConfig | undefined {
  return CALCULATOR_CONFIGS[id]
}
