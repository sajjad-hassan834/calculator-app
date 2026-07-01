import { useNavigate } from "react-router"
import { ArrowRight, TrendingUp, Star, Clock, BookOpen } from "lucide-react"
import { FEATURED, CATEGORIES } from "../../lib/data"
import { CALCULATOR_META } from "../../lib/calculatorMeta"
import type { CalcMeta } from "../../lib/calculatorMeta"

interface RelatedContentProps {
  currentId: string
  relatedLinks: { label: string; path: string }[]
  meta?: CalcMeta
}

const difficultyColors: Record<string, string> = {
  Beginner: "text-emerald-500 bg-emerald-500/10",
  Intermediate: "text-amber-500 bg-amber-500/10",
  Advanced: "text-red-500 bg-red-500/10",
}

export function RelatedContent({ currentId, relatedLinks, meta }: RelatedContentProps) {
  const navigate = useNavigate()
  const sameCategory = meta
    ? FEATURED.filter(
        (c) => c.id !== currentId && CALCULATOR_META[c.id]?.category === meta.category
      ).slice(0, 2)
    : []
  const others = FEATURED.filter((c) => c.id !== currentId && !sameCategory.find((s) => s.id === c.id)).slice(0, 3)

  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
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
            {meta?.relatedCategories && meta.relatedCategories.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-medium text-muted-foreground mb-3">Browse by Category</h4>
                <div className="flex flex-wrap gap-2">
                  {meta.relatedCategories.map((cat) => {
                    const category = CATEGORIES.find((c) => c.label === cat)
                    if (!category) return null
                    return (
                      <button
                        key={cat}
                        onClick={() => navigate(`/category/${category.id}`)}
                        className="px-2.5 py-1 text-xs font-medium bg-background border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {sameCategory.length > 0 && (
            <div>
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-4">
                <Star className="w-4 h-4 text-primary" /> Same Category
              </h3>
              <div className="space-y-2">
                {sameCategory.map((c) => {
                  const Icon = c.icon
                  const cm = CALCULATOR_META[c.id]
                  return (
                    <button
                      key={c.id}
                      onClick={() => navigate(`/calculator/${c.id}`)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 group"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="text-left min-w-0">
                        <span className="block truncate group-hover:text-foreground">{c.title}</span>
                        {cm && (
                          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                            <BookOpen className="w-3 h-3" />
                            {cm.readingTime}
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-4">
              <TrendingUp className="w-4 h-4 text-primary" /> Trending
            </h3>
            <div className="space-y-2">
              {others.map((c) => {
                const Icon = c.icon
                const cm = CALCULATOR_META[c.id]
                return (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/calculator/${c.id}`)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="text-left min-w-0">
                      <span className="block truncate group-hover:text-foreground">{c.title}</span>
                      {cm && (
                        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                          <Clock className="w-3 h-3" />
                          {cm.time}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-4">
              <Star className="w-4 h-4 text-primary" /> Popular
            </h3>
            <div className="space-y-2">
              {FEATURED.filter((c) => c.popular && c.id !== currentId).slice(0, 3).map((c) => {
                const Icon = c.icon
                const cm = CALCULATOR_META[c.id]
                return (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/calculator/${c.id}`)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="text-left min-w-0">
                      <span className="block truncate group-hover:text-foreground">{c.title}</span>
                      {cm?.difficulty && (
                        <span className={`inline-block px-1.5 py-0.5 text-[10px] font-medium rounded ${difficultyColors[cm.difficulty] || ""} mt-0.5`}>
                          {cm.difficulty}
                        </span>
                      )}
                    </div>
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
