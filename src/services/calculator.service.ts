import { api, extractData, extractMeta } from "./api"

export interface CalculatorListItem {
  id: string
  name: string
  slug: string
  category_id: string | null
  short_description: string | null
  description: string | null
  calculator_type: string
  engine_type: string
  is_featured: boolean
  is_popular: boolean
  view_count: number
  published_at: string | null
  created_at: string
}

export interface CalculatorDetail {
  id: string
  name: string
  slug: string
  category_id: string | null
  author_id: string | null
  reviewer_id: string | null
  short_description: string | null
  description: string | null
  meta_description: string | null
  keywords: string[] | null
  calculator_type: string
  engine_type: string
  engine_config: Record<string, any> | null
  input_schema: Record<string, any>
  output_schema: Record<string, any>
  formula_expression: string | null
  default_values: Record<string, any> | null
  validation_rules: Record<string, any> | null
  currency: string
  country: string
  is_featured: boolean
  is_popular: boolean
  is_calculator: boolean
  is_active: boolean
  is_published: boolean
  status: string
  view_count: number
  published_at: string | null
  created_at: string
  updated_at: string
  inputs: any[]
  outputs: any[]
  formulas: any[]
  faqs: any[]
  examples: any[]
  references: any[]
  charts: any[]
  sections: any[]
  media: any[]
}

export interface CalculatorsResponse {
  data: CalculatorListItem[]
  meta: {
    page: number
    per_page: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

export async function getCalculators(params?: {
  page?: number
  per_page?: number
  category_id?: string
}) {
  const response = await api.get("/calculators", { params })
  return { data: extractData<CalculatorListItem[]>(response), meta: extractMeta(response) }
}

export async function getFeaturedCalculators() {
  const response = await api.get("/calculators/featured")
  return extractData<CalculatorListItem[]>(response)
}

export async function getPopularCalculators(limit = 9) {
  const response = await api.get("/calculators/popular", { params: { limit } })
  return extractData<CalculatorListItem[]>(response)
}

export async function getCalculatorBySlug(slug: string) {
  const response = await api.get(`/calculators/${slug}`)
  return extractData<CalculatorDetail>(response)
}

export async function searchCalculators(q: string, limit = 20) {
  const response = await api.get("/calculators/search", { params: { q, limit } })
  return extractData<CalculatorListItem[]>(response)
}
