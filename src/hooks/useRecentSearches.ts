import { useLocalStorage } from "./useLocalStorage"

const MAX = 6

export function useRecentSearches() {
  const [searches, setSearches] = useLocalStorage<string[]>("recentSearches", [])

  const add = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    setSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())
      return [trimmed, ...filtered].slice(0, MAX)
    })
  }

  const clear = () => setSearches([])

  return { searches, add, clear }
}
