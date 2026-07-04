import { useParams, Link } from "react-router"
import { ArrowRight, Calculator, TrendingUp, Star, BookOpen, FileText } from "lucide-react"
import { CATEGORIES, FEATURED } from "../../lib/data"
import { Breadcrumbs } from "../../components/ui/Breadcrumbs"
import { SEARCH_INDEX } from "../../lib/searchData"
import { SEOHead } from "../../components/seo/SEOHead"
import { EducationalIllustration } from "../../components/visual/EducationalIllustration"
import { FeaturedImage } from "../../components/visual/FeaturedImage"
import { EXPANDED_CONTENT } from "../../lib/expandedContent"

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

function getCalculatorIdsForCategory(categoryId: string): string[] {
  const map: Record<string, string[]> = {
    mortgage: ["mortgage"],
    investments: ["compound", "roi", "investment"],
    loans: ["loan", "mortgage"],
    savings: ["savings", "compound"],
    retirement: ["retirement", "compound"],
    tax: ["tax"],
    business: ["roi", "break-even"],
  }
  return map[categoryId] || []
}

const CATEGORY_IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  mortgage: { src: "/images/homepage/hero-finance.svg", alt: "Mortgage calculator dashboard showing payments and amortization" },
  investments: { src: "/images/investments/investment-portfolio.svg", alt: "Investment portfolio with asset allocation breakdown" },
  loans: { src: "/images/loan/personal-loan.svg", alt: "Personal loan calculator illustration" },
  savings: { src: "/images/savings/savings-goal.svg", alt: "Savings goal tracker illustration" },
  retirement: { src: "/images/retirement/retirement-planning.svg", alt: "Retirement planning illustration" },
  tax: { src: "/images/tax/tax-filing.svg", alt: "Tax filing and bracket illustration" },
  business: { src: "/images/business/business-growth.svg", alt: "Business growth chart illustration" },
}

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

  const calcIds = getCalculatorIdsForCategory(category.id)
  const relatedGuides = calcIds.flatMap((cid) => EXPANDED_CONTENT[cid]?.relatedGuides || [])
  const featuredGuides = relatedGuides.slice(0, 4)
  const education = CATEGORY_EDUCATION[category.id]

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

      {education && (
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {CATEGORY_IMAGE_MAP[category.id] && (
              <div className="mb-6">
                <FeaturedImage
                  src={CATEGORY_IMAGE_MAP[category.id].src}
                  alt={CATEGORY_IMAGE_MAP[category.id].alt}
                  aspectRatio="21/8"
                />
              </div>
            )}
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
              {calcIds.length > 0 && (
                <div className="space-y-3">
                  {calcIds.slice(0, 3).map((cid) => (
                    <EducationalIllustration key={cid} calculatorId={cid} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {featuredGuides.length > 0 && (
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Related Guides</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.title}
                  to={guide.url}
                  className="group bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors">{guide.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{guide.description}</p>
                </Link>
              ))}
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
