import { useParams, Link } from "react-router"
import { ArrowRight, Calculator, TrendingUp, Star, BookOpen } from "lucide-react"
import { Breadcrumbs } from "../../components/ui/Breadcrumbs"
import { SEOHead } from "../../components/seo/SEOHead"
import { useCategoryBySlug } from "../../hooks/queries/useCategories"
import { useCategories } from "../../hooks/queries/useCategories"

const GRADIENT_MAP: Record<string, string> = {
  mortgage: "from-blue-600 to-blue-800",
  compound: "from-emerald-600 to-emerald-800",
  loan: "from-purple-600 to-purple-800",
  savings: "from-amber-500 to-amber-700",
  retirement: "from-rose-600 to-rose-800",
  roi: "from-teal-600 to-teal-800",
  investment: "from-cyan-600 to-cyan-800",
  tax: "from-indigo-600 to-indigo-800",
  "break-even": "from-orange-600 to-orange-800",
}

const CATEGORY_EDUCATION: Record<string, { overview: string; keyInsight: string }> = {
  mortgage: {
    overview: "Mortgage calculators help you understand the true cost of homeownership. From monthly payments and amortization schedules to total interest over the life of the loan, these tools empower you to compare loan offers, evaluate refinancing options, and determine how much house you can afford before you step into a lender's office.",
    keyInsight: "A 1% difference in your mortgage rate can mean $50,000+ in additional interest over a 30-year loan.",
  },
  investments: {
    overview: "Investment calculators project how your money grows over time through compound returns. Whether you are evaluating a one-time investment, modeling regular contributions, or comparing different asset classes, these tools help you understand the relationship between time, rate of return, and wealth accumulation.",
    keyInsight: "Starting to invest at 25 vs 35 can result in a $300,000+ difference by retirement age.",
  },
  loans: {
    overview: "Loan calculators give you complete visibility into the true cost of borrowing. By modeling different interest rates, terms, and repayment strategies, you can identify the most cost-effective loan structure and develop a plan to minimize total interest paid.",
    keyInsight: "A 2% lower APR on a $25,000 loan saves over $3,000 in interest over 5 years.",
  },
  savings: {
    overview: "Savings calculators transform financial goals into actionable plans. By showing exactly how much you need to save each month to reach any target, they eliminate guesswork and help you build a realistic, data-driven path to your financial objectives.",
    keyInsight: "Automated monthly savings of $200 at 4% APY grows to nearly $50,000 in 15 years.",
  },
  retirement: {
    overview: "Retirement planners project your savings forward through your working years and calculate how much you can sustainably withdraw. These tools provide an early warning system, helping you adjust your strategy decades before you need the money.",
    keyInsight: "You may need 80% of your pre-retirement income to maintain your lifestyle in retirement.",
  },
  tax: {
    overview: "Tax calculators demystify the progressive tax system by showing exactly how much you owe at each bracket. Understanding your marginal and effective tax rates is essential for making informed decisions about retirement contributions, investments, and major financial moves.",
    keyInsight: "Your marginal tax rate determines the true benefit of 401(k) contributions and the true cost of additional income.",
  },
  business: {
    overview: "Business calculators help entrepreneurs and managers make data-driven decisions about pricing, costs, and investments. Break-even analysis, ROI projections, and margin calculations provide the quantitative foundation for sound business strategy.",
    keyInsight: "20% of new businesses fail within 2 years — often because they don't understand their numbers.",
  },
}

export function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const { data: category, isLoading, isError } = useCategoryBySlug(id)
  const { data: allCategories } = useCategories()

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="h-6 w-32 bg-secondary rounded-full animate-pulse mb-8" />
        <div className="flex items-start gap-5 mb-10">
          <div className="w-16 h-16 bg-secondary rounded-2xl animate-pulse" />
          <div className="flex-1">
            <div className="h-8 w-64 bg-secondary rounded-full animate-pulse mb-2" />
            <div className="h-4 w-96 bg-secondary rounded-full animate-pulse" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-secondary rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !category) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Category not found</h1>
        <p className="text-muted-foreground mt-2">The category you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
      </div>
    )
  }

  const calculators = category.calculators || []
  const education = CATEGORY_EDUCATION[category.slug] || CATEGORY_EDUCATION[category.slug.replace(/-/g, "")]
  const otherCategories = (allCategories || []).filter((c) => c.slug !== category.slug)
  const calcCount = calculators.length || category.calculator_count

  return (
    <div className="bg-background min-h-screen">
      <SEOHead
        title={`${category.name} Calculators — Free Online Tools | FinanceCalculator.com`}
        description={`Free ${category.name.toLowerCase()} calculators and tools. ${category.description || ""}`}
        canonical={`https://financecalculator.com/category/${category.slug}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: category.name }]} />

        <div className="flex items-start gap-5 mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground">
              {category.name} Calculators
            </h1>
            <p className="text-muted-foreground mt-1.5">{category.description}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>{calcCount} calculators</span>
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Free to use</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {calculators.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-5">
                <Star className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Available Calculators
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {calculators.map((calc) => {
                  const gradient = GRADIENT_MAP[calc.slug] || "from-primary to-primary/70"
                  const uses = calc.view_count ? `${(calc.view_count / 1000).toFixed(1)}K` : ""
                  const path = `/calculator/${calc.slug}`
                  return (
                    <Link
                      key={calc.id}
                      to={path}
                      className="group relative text-left bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1.5">{calc.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{calc.short_description || calc.description}</p>
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

          {calculators.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <Calculator className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No calculators available in this category yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Check back soon — new calculators are being added regularly</p>
            </div>
          )}
        </div>
      </section>

      {education && (
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Educational Overview</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{education.overview}</p>
                <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                  <p className="text-xs text-primary font-medium">
                    <Star className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                    {education.keyInsight}
                  </p>
                </div>
              </div>
              {calculators.slice(0, 3).length > 0 && (
                <div className="space-y-3">
                  {calculators.slice(0, 3).map((calc) => (
                    <div key={calc.id} className="bg-card border border-border rounded-xl p-4">
                      <div className="text-xs font-semibold text-foreground mb-1">{calc.name}</div>
                      <p className="text-xs text-muted-foreground line-clamp-3">{calc.description || calc.short_description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Browse Other Categories</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {otherCategories.slice(0, 12).map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                >
                  <Calculator className="w-4 h-4 shrink-0" />
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
