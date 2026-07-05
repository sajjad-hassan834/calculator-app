import { useQuery } from "@tanstack/react-query"
import { getPublicSettings, getHomepageSections, getTestimonials } from "../../services/settings.service"

export function usePublicSettings() {
  return useQuery({
    queryKey: ["settings", "public"],
    queryFn: getPublicSettings,
    staleTime: 120_000,
  })
}

export function useHomepageSections() {
  return useQuery({
    queryKey: ["settings", "homepage"],
    queryFn: getHomepageSections,
    staleTime: 120_000,
  })
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["settings", "testimonials"],
    queryFn: getTestimonials,
    staleTime: 120_000,
  })
}
