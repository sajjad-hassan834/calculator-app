import { Star, X, ChevronRight, Heart } from "lucide-react"
import { useFavorites } from "../../hooks/useFavorites"
import { useNavigate } from "react-router"

interface FavoritesPanelProps {
  open: boolean
  onClose: () => void
}

export function FavoritesPanel({ open, onClose }: FavoritesPanelProps) {
  const { favorites, removeFavorite } = useFavorites()
  const navigate = useNavigate()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Your favorites"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-foreground text-base">Favorites</h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{favorites.length}</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Close favorites"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground font-medium">No favorites yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Star calculators to add them here for quick access</p>
            </div>
          ) : (
            <div className="space-y-1">
              {favorites.map((fav) => (
                <div
                  key={fav.calculatorId}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => {
                    navigate(`/calculator/${fav.calculatorId}`)
                    onClose()
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/calculator/${fav.calculatorId}`)
                      onClose()
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{fav.title}</div>
                      <div className="text-xs text-muted-foreground">{fav.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFavorite(fav.calculatorId)
                      }}
                      className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-red-500"
                      aria-label={`Remove ${fav.title} from favorites`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
