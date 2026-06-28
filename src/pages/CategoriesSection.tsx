import { useNavigate } from "react-router"
import { CATEGORIES } from "../lib/data"
import { ArrowRight } from "lucide-react"

export function CategoriesSection() {
  const navigate = useNavigate()
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-1">
              Browse by Category
            </h2>
            <p className="text-sm text-muted-foreground">Over 100 calculators organized by topic</p>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-border bg-background hover:bg-secondary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon className="w-6 h-6 text-primary" />
                <div className="text-center">
                  <div className="text-xs font-semibold text-foreground">{cat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{cat.count} tools</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
