import { useParams, Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { CATEGORIES, FEATURED } from "../../lib/data"

export function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const category = CATEGORIES.find((c) => c.id === id)

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Category not found</h1>
        <p className="text-muted-foreground mt-2">The category you're looking for doesn't exist.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
      </div>
    )
  }

  const Icon = category.icon
  const relatedCalcs = FEATURED.filter((c) => {
    if (category.id === "mortgage") return c.id === "mortgage" || c.id === "loan"
    if (category.id === "investments") return ["compound", "roi", "investment"].includes(c.id)
    if (category.id === "loans") return ["loan", "mortgage"].includes(c.id)
    if (category.id === "savings") return ["savings", "compound"].includes(c.id)
    if (category.id === "retirement") return ["retirement", "compound"].includes(c.id)
    if (category.id === "tax") return ["tax"].includes(c.id)
    if (category.id === "business") return ["roi", "break-even"].includes(c.id)
    return c.id === category.id
  })

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.label}</span>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="font-['DM_Serif_Display',serif] text-3xl text-foreground">{category.label}</h1>
            <p className="text-muted-foreground text-sm">{category.desc}</p>
          </div>
        </div>
      </div>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedCalcs.map((calc) => {
              const CalcIcon = calc.icon
              const path = `/calculator/${calc.id}`
              return (
                <Link
                  key={calc.id}
                  to={path}
                  className="group relative text-left bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center mb-4`}>
                    <CalcIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{calc.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{calc.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-['JetBrains_Mono',monospace]">{calc.uses} uses</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Open <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {relatedCalcs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No calculators available in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
