import { api, extractData } from "./api"

export interface HomepageSection {
  section_key: string
  title: string | null
  subtitle: string | null
  content: string | null
  section_type: string
  config: Record<string, any> | null
}

export interface Testimonial {
  author_name: string
  author_title: string | null
  author_avatar_url: string | null
  content: string
  rating: number | null
  is_featured: boolean
}

export async function getPublicSettings() {
  const response = await api.get("/settings/public")
  return extractData<Record<string, any>>(response)
}

export async function getHomepageSections() {
  const response = await api.get("/settings/homepage-sections")
  return extractData<HomepageSection[]>(response)
}

export async function getTestimonials() {
  const response = await api.get("/settings/testimonials")
  return extractData<Testimonial[]>(response)
}
