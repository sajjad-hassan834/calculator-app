import { Star } from "lucide-react"
import { useFavorites } from "../../hooks/useFavorites"
import type { CalcMeta } from "../../lib/calculatorMeta"

interface FavoriteButtonProps {
  meta: Pick<CalcMeta, "id" | "title" | "category">
}

export function FavoriteButton({ meta }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  const favorited = isFavorite(meta.id)

  return (
    <button
      onClick={() =>
        toggleFavorite({
          calculatorId: meta.id,
          title: meta.title,
          category: meta.category,
          addedAt: Date.now(),
        })
      }
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
        favorited
          ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
          : "bg-secondary border-border text-muted-foreground hover:text-foreground"
      }`}
      aria-label={favorited ? `Remove ${meta.title} from favorites` : `Add ${meta.title} to favorites`}
      aria-pressed={favorited}
    >
      <Star className={`w-3.5 h-3.5 ${favorited ? "fill-amber-500" : ""}`} />
      <span className="hidden sm:block">{favorited ? "Saved" : "Save"}</span>
    </button>
  )
}
