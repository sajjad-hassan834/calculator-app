import { useState, useMemo } from "react"
import type { CalculatorConfig, InputField } from "../lib/calculatorConfig"

export function getDefaultValues(config: CalculatorConfig): Record<string, number> {
  return config.inputs.reduce<Record<string, number>>((acc, input) => {
    acc[input.key] = input.default
    return acc
  }, {})
}

export function useCalculatorState(config: CalculatorConfig) {
  const [values, setValues] = useState<Record<string, number>>(() => getDefaultValues(config))

  const setValue = (key: string, val: number) => {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  const results = useMemo(() => config.calculate(values), [config, values])

  return { values, setValue, results }
}
