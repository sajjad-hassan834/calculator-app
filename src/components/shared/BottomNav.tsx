import { useLocation } from "react-router"
import { Home, Calculator, TrendingUp, Clock, Star } from "lucide-react"
import { useState } from "react"
import { HistoryPanel } from "./HistoryPanel"
import { FavoritesPanel } from "./FavoritesPanel"

const ITEMS = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Calculators", icon: Calculator, path: "/calculator/mortgage" },
  { label: "Trending", icon: TrendingUp, path: "/category/investments" },
  { label: "History", icon: Clock, path: "", action: "history" as const },
  { label: "Favorites", icon: Star, path: "", action: "favorites" as const },
]

export function BottomNav() {
  const location = useLocation()
  const [historyOpen, setHistoryOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = (item.path && location.pathname === item.path) ||
              (item.path === "/" && location.pathname === "/") ||
              (item.path === "/calculator/mortgage" && location.pathname.startsWith("/calculator"))
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.action === "history") setHistoryOpen(true)
                  else if (item.action === "favorites") setFavoritesOpen(true)
                }}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
      <HistoryPanel open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <FavoritesPanel open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
    </>
  )
}
