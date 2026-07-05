import { useQuery } from "@tanstack/react-query"
import { getCategories, getCategoryBySlug } from "../../services/category.service"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 120_000,
  })
}

export function useCategoryBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["categories", slug],
    queryFn: () => getCategoryBySlug(slug!),
    enabled: !!slug,
    staleTime: 60_000,
  })
}
