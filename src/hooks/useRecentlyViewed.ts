import { useLocalStorage } from "./useLocalStorage"

const MAX = 6

export function useRecentlyViewed() {
  const [recent, setRecent] = useLocalStorage<string[]>("recentlyViewed", [])

  const add = (id: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((x) => x !== id)
      return [id, ...filtered].slice(0, MAX)
    })
  }

  return { recent, add }
}
