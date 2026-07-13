import { useQuery } from "@tanstack/react-query"
import { getFAQs } from "../../services/faq.service"

export function useFAQs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: getFAQs,
    staleTime: 120_000,
  })
}
