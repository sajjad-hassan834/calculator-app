import { useParams, Link } from "react-router"
import { ArrowRight, Calculator, TrendingUp, Star } from "lucide-react"
import { CATEGORIES, FEATURED } from "../../lib/data"
import { Breadcrumbs } from "../../components/ui/Breadcrumbs"
import { SEARCH_INDEX } from "../../lib/searchData"
import { SEOHead } from "../../components/seo/SEOHead"

export function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const category = CATEGORIES.find((c) => c.id === id)

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Category not found</h1>
        <p className="text-muted-foreground mt-2">The category you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
      </div>
    )
  }

  const Icon = category.icon

  const allCalcs = SEARCH_INDEX.filter((c) => {
    const categoryName = category.label.toLowerCase()
    if (categoryName === "loans" || categoryName === "mortgage") {
      return c.category.toLowerCase() === "mortgage" || c.category.toLowerCase() === "loans"
    }
    return c.category.toLowerCase() === categoryName ||
      c.category.toLowerCase().includes(categoryName) ||
      categoryName.includes(c.category.toLowerCase())
  })

  const featuredCalcs = FEATURED.filter((c) => {
    if (category.id === "mortgage") return c.id === "mortgage" || c.id === "loan"
    if (category.id === "investments") return ["compound", "roi", "investment"].includes(c.id)
    if (category.id === "loans") return ["loan", "mortgage"].includes(c.id)
    if (category.id === "savings") return ["savings", "compound"].includes(c.id)
    if (category.id === "retirement") return ["retirement", "compound"].includes(c.id)
    if (category.id === "tax") return ["tax"].includes(c.id)
    if (category.id === "business") return ["roi", "break-even"].includes(c.id)
    return c.id === category.id
  })

  const otherCategories = CATEGORIES.filter((c) => c.id !== category.id)
  const calcCount = allCalcs.length || featuredCalcs.length
  const displayCalcs = allCalcs.length > 0 ? allCalcs : featuredCalcs

  return (
    <div className="bg-background min-h-screen">
      <SEOHead
        title={`${category.label} Calculators — Free Online Tools | FinanceCalculator.com`}
        description={category.desc}
        canonical={`https://financecalculator.com/category/${category.id}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: category.label }]} />

        <div className="flex items-start gap-5 mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground">
              {category.label} Calculators
            </h1>
            <p className="text-muted-foreground mt-1.5">{category.desc}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>{calcCount} calculators</span>
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>{category.count || calcCount * 1000}+ monthly users</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayCalcs.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <Star className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Available Calculators
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayCalcs.map((calc) => {
                  const CalcIcon = FEATURED.find((f) => f.id === calc.id)?.icon || Calculator
                  const gradient = FEATURED.find((f) => f.id === calc.id)?.gradient || "from-primary to-primary/70"
                  const uses = FEATURED.find((f) => f.id === calc.id)?.uses || ""
                  const path = `/calculator/${calc.id}`
                  return (
                    <Link
                      key={calc.id}
                      to={path}
                      className="group relative text-left bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
                        <CalcIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1.5">{calc.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{"desc" in calc ? calc.desc : calc.description}</p>
                      <div className="flex items-center justify-between">
                        {uses && <span className="text-xs text-muted-foreground font-['JetBrains_Mono',monospace]">{uses} uses</span>}
                        <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                          Open <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          {displayCalcs.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Calculator className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No calculators available in this category yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Check back soon — new calculators are being added regularly</p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Browse Other Categories</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {otherCategories.slice(0, 12).map((cat) => {
                const CatIcon = cat.icon
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                  >
                    <CatIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
