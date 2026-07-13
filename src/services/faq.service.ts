import { api } from "./api"

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  is_featured: boolean
}

export async function getFAQs(): Promise<FAQ[]> {
  const { data } = await api.get<{ data: FAQ[] }>("/faqs")
  return data.data
}
