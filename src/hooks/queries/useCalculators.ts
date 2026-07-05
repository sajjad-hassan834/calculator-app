import { useQuery } from "@tanstack/react-query"
import {
  getCalculators,
  getFeaturedCalculators,
  getPopularCalculators,
  getCalculatorBySlug,
  searchCalculators,
} from "../../services/calculator.service"

export function useCalculators(params?: { page?: number; per_page?: number; category_id?: string }) {
  return useQuery({
    queryKey: ["calculators", "list", params],
    queryFn: () => getCalculators(params),
    staleTime: 60_000,
  })
}

export function useFeaturedCalculators() {
  return useQuery({
    queryKey: ["calculators", "featured"],
    queryFn: getFeaturedCalculators,
    staleTime: 60_000,
  })
}

export function usePopularCalculators(limit = 9) {
  return useQuery({
    queryKey: ["calculators", "popular", limit],
    queryFn: () => getPopularCalculators(limit),
    staleTime: 60_000,
  })
}

export function useCalculatorBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["calculators", slug],
    queryFn: () => getCalculatorBySlug(slug!),
    enabled: !!slug,
    staleTime: 60_000,
  })
}

export function useCalculatorSearch(q: string) {
  return useQuery({
    queryKey: ["calculators", "search", q],
    queryFn: () => searchCalculators(q),
    enabled: q.length > 0,
    staleTime: 30_000,
  })
}
