import { useQuery } from "@tanstack/react-query"
import { getGuides, getGuideBySlug } from "../../services/guide.service"

export function useGuides(params?: {
  page?: number
  per_page?: number
  category_slug?: string
  featured?: boolean
}) {
  return useQuery({
    queryKey: ["guides", "list", params],
    queryFn: () => getGuides(params),
    staleTime: 60_000,
  })
}

export function useGuideBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["guides", slug],
    queryFn: () => getGuideBySlug(slug!),
    enabled: !!slug,
    staleTime: 60_000,
  })
}
