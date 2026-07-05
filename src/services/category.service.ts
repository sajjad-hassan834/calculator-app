import { api, extractData } from "./api"

export interface CategoryItem {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color_hex: string | null
  calculator_count: number
  sort_order: number
}

export interface CategoryWithCalculators {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color_hex: string | null
  calculators: Array<{
    id: string
    name: string
    slug: string
    short_description: string | null
    description: string | null
    calculator_type: string
    engine_type: string
    is_featured: boolean
    is_popular: boolean
    view_count: number
    published_at: string | null
  }>
  calculator_count: number
}

export async function getCategories() {
  const response = await api.get("/categories", { params: { per_page: 50 } })
  return extractData<CategoryItem[]>(response)
}

export async function getCategoryBySlug(slug: string, page = 1, perPage = 20) {
  const response = await api.get(`/categories/${slug}`, {
    params: { page, per_page: perPage },
  })
  return extractData<CategoryWithCalculators>(response)
}
