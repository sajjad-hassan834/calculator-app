import { useNavigate } from "react-router"
import { ArrowRight, TrendingUp, Star, Clock } from "lucide-react"
import { FEATURED } from "../../lib/data"

interface RelatedContentProps {
  currentId: string
  relatedLinks: { label: string; path: string }[]
}

export function RelatedContent({ currentId, relatedLinks }: RelatedContentProps) {
  const navigate = useNavigate()
  const others = FEATURED.filter((c) => c.id !== currentId).slice(0, 3)
  const allCalcs = FEATURED.slice(0, 6)

  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-4">
              <ArrowRight className="w-4 h-4 text-primary" /> Related Calculators
            </h3>
            <div className="space-y-2">
              {relatedLinks.map((r) => (
                <button
                  key={r.path}
                  onClick={() => navigate(r.path)}
                  className="w-full text-left px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-4">
              <TrendingUp className="w-4 h-4 text-primary" /> Trending Calculators
            </h3>
            <div className="space-y-2">
              {others.map((c) => {
                const Icon = c.icon
                return (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/calculator/${c.id}`)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span>{c.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-4">
              <Star className="w-4 h-4 text-primary" /> Popular Calculators
            </h3>
            <div className="space-y-2">
              {allCalcs.slice(0, 4).map((c) => {
                const Icon = c.icon
                return (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/calculator/${c.id}`)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span>{c.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
