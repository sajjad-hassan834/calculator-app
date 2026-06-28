import { Link, useLocation } from "react-router"
import { Home, Calculator, TrendingUp, BookOpen, User } from "lucide-react"

const ITEMS = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Calculators", icon: Calculator, path: "/calculator/mortgage" },
  { label: "Trending", icon: TrendingUp, path: "/category/investments" },
  { label: "Guides", icon: BookOpen, path: "/about" },
  { label: "About", icon: User, path: "/about" },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path ||
            (item.path === "/" && location.pathname === "/") ||
            (item.path === "/calculator/mortgage" && location.pathname.startsWith("/calculator"))
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
