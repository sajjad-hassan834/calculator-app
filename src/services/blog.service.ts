import { api, extractData } from "./api"

export interface BlogPostListItem {
  id: string
  title: string
  slug: string
  subtitle: string | null
  excerpt: string | null
  cover_image_url: string | null
  reading_time_minutes: number | null
  is_featured: boolean
  is_pinned: boolean
  published_at: string | null
  author_name: string | null
  author_role: string | null
  category_name: string | null
  category_slug: string | null
}

export interface BlogPostDetail extends BlogPostListItem {
  content: string | null
}

export async function getBlogPosts(params?: {
  page?: number
  per_page?: number
  category_slug?: string
  featured?: boolean
}) {
  const response = await api.get("/blog", { params })
  return extractData<BlogPostListItem[]>(response)
}

export async function getBlogPostBySlug(slug: string) {
  const response = await api.get(`/blog/${slug}`)
  return extractData<BlogPostDetail>(response)
}
