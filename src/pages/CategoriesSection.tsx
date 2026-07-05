import { useNavigate } from "react-router"
import { ArrowRight, Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, BarChart2, Briefcase, GraduationCap, DollarSign, Building2, Calculator as CalcIcon } from "lucide-react"
import { useCategories } from "../hooks/queries/useCategories"
import { useMemo } from "react"

const ICON_MAP: Record<string, any> = {
  Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent,
  BarChart2, Briefcase, GraduationCap, DollarSign, Building2,
}

export function CategoriesSection() {
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
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-1">
              Browse by Category
            </h2>
            <p className="text-sm text-muted-foreground">
              {categories ? `${categories.length} calculators organized by topic` : "Calculators organized by topic"}
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {categoriesWithIcons.map((cat) => {
            const Icon = cat.Icon
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-border bg-background hover:bg-secondary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <Icon className="w-6 h-6 text-primary" />
                <div className="text-center">
                  <div className="text-xs font-semibold text-foreground">{cat.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{cat.calculator_count} tools</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
