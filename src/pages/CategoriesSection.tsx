import { useNavigate } from "react-router"
import { ArrowRight, Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, BarChart2, Briefcase, GraduationCap, DollarSign, Building2, Calculator as CalcIcon } from "lucide-react"
import { useCategories } from "../hooks/queries/useCategories"
import { useMemo } from "react"
import { ScrollReveal } from "../components/motion/ScrollReveal"

const ICON_MAP: Record<string, any> = {
  Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent,
  BarChart2, Briefcase, GraduationCap, DollarSign, Building2,
}

export function CategoriesSection({ title = "Browse by Category", subtitle }: { title?: string, subtitle?: string }) {
  const navigate = useNavigate()
  const { data: categories, isLoading } = useCategories()

  const categoriesWithIcons = useMemo(() => {
    if (!categories) return []
    return categories.map((cat) => ({
      ...cat,
      Icon: ICON_MAP[cat.icon || ""] || CalcIcon,
    }))
  }, [categories])

  if (isLoading) {
    return (
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-6 w-48 bg-secondary rounded-full animate-pulse mx-auto mb-2" />
            <div className="h-4 w-72 bg-secondary rounded-full animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-24 bg-secondary rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="categories" className="py-24 bg-background relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {subtitle || (categories ? `Explore ${categories.length} financial tools organized by topic` : "Explore calculators organized by topic")}
              </p>
            </div>
            <button
              onClick={() => navigate("/sitemap#categories")}
              className="flex items-center gap-2 text-base text-primary font-bold hover:underline self-start sm:self-auto cursor-pointer"
            >
              View all categories <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categoriesWithIcons.map((cat, i) => {
            const Icon = cat.Icon
            return (
              <ScrollReveal key={cat.id} variant="fade-scale" delay={i * 50}>
                <button
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className="w-full flex flex-col items-center gap-3 p-6 rounded-[1.5rem] bg-card border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-foreground mb-1">{cat.name}</div>
                    <div className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {cat.calculator_count} tools
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
