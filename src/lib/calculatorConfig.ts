import type { CalcMeta } from "./calculatorMeta"

export interface InputSlider {
  type: "slider"
  key: string
  label: string
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  default: number
  formatDisplay?: (v: number) => string
  tooltip?: string
  validate?: (v: number) => string | null
}

export interface InputSelect {
  type: "select"
  key: string
  label: string
  options: { value: number; label: string }[]
  default: number
}

export type InputField = InputSlider | InputSelect

export interface ResultCardDef {
  key: string
  label: string
  color?: string
  format?: "currency" | "percent" | "number" | "raw"
}

export interface GrowthLineDef {
  dataKey: string
  name: string
  colorKey: "blue" | "emerald" | "amber"
}

export interface ChartDef {
  title: string
  data: (results: any) => any[]
  lines: GrowthLineDef[]
}

export interface PieDef {
  title: string
  data: (values: Record<string, number>, results: any) => { name: string; value: number }[]
}

export interface CalculatorConfig {
  id: string
  meta: CalcMeta
  inputs: InputField[]
  defaults: Record<string, number>
  calculate: (values: Record<string, number>) => any
  highlight: { label: string; valueKey: string; format?: "currency" | "number" }
  results: ResultCardDef[]
  copyTemplate: (results: any) => string
  csvData?: (results: any) => { columns: { key: string; label: string; format?: string }[]; rows: Record<string, number>[] }
  hasMonthlyTable?: boolean
  monthlyTableData?: (values: Record<string, number>, results: any) => { columns: { key: string; label: string; format?: string }[]; rows: Record<string, number>[] }
  tableData?: (results: any) => { columns: { key: string; label: string; format?: string }[]; rows: Record<string, number>[] }
  growthChart: ChartDef
  pieChart: PieDef
}
