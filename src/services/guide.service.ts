import { api, extractData } from "./api"

export interface GuideListItem {
  id: string
  title: string
  slug: string
  subtitle: string | null
  excerpt: string | null
  cover_image_url: string | null
  reading_time_minutes: number | null
  difficulty_level: string | null
  is_featured: boolean
  published_at: string | null
  author_name: string | null
  category_name: string | null
  category_slug: string | null
}

export interface GuideDetail extends GuideListItem {
  content: string | null
}

export async function getGuides(params?: {
  page?: number
  per_page?: number
  category_slug?: string
  featured?: boolean
}) {
  const response = await api.get("/guides", { params })
  return extractData<GuideListItem[]>(response)
}

export async function getGuideBySlug(slug: string) {
  const response = await api.get(`/guides/${slug}`)
  return extractData<GuideDetail>(response)
}
