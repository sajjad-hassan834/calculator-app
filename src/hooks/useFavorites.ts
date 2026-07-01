import { useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"

export interface FavoriteEntry {
  calculatorId: string
  title: string
  category: string
  addedAt: number
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteEntry[]>("calcFavorites", [])

  const isFavorite = useCallback(
    (calculatorId: string) => {
      return favorites.some((f) => f.calculatorId === calculatorId)
    },
    [favorites]
  )

  const toggleFavorite = useCallback(
    (entry: FavoriteEntry) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.calculatorId === entry.calculatorId)
        if (exists) {
          return prev.filter((f) => f.calculatorId !== entry.calculatorId)
        }
        return [entry, ...prev]
      })
    },
    [setFavorites]
  )

  const removeFavorite = useCallback(
    (calculatorId: string) => {
      setFavorites((prev) => prev.filter((f) => f.calculatorId !== calculatorId))
    },
    [setFavorites]
  )

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  }
}
