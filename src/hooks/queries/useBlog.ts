import { useQuery } from "@tanstack/react-query"
import { getBlogPosts, getBlogPostBySlug } from "../../services/blog.service"

export function useBlogPosts(params?: {
  page?: number
  per_page?: number
  category_slug?: string
  featured?: boolean
}) {
  return useQuery({
    queryKey: ["blog", "list", params],
    queryFn: () => getBlogPosts(params),
    staleTime: 60_000,
  })
}

export function useBlogPostBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogPostBySlug(slug!),
    enabled: !!slug,
    staleTime: 60_000,
  })
}
