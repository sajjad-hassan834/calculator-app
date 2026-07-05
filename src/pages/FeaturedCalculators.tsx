import { useNavigate } from "react-router"
import { Star, ArrowRight, Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, BarChart2, Calculator as CalcIcon } from "lucide-react"
import { useFeaturedCalculators } from "../hooks/queries/useCalculators"

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

const ICON_MAP: Record<string, any> = {
  Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, BarChart2, CalcIcon,
}

export function FeaturedCalculators() {
  const navigate = useNavigate()
  const { data: calculators, isLoading } = useFeaturedCalculators()

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-48 bg-secondary rounded-full animate-pulse mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-secondary rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const displayCalcs = (calculators || []).slice(0, 9)

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-1">
              Popular Calculators
            </h2>
            <p className="text-sm text-muted-foreground">
              The most-used tools on FinanceCalculator.com
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayCalcs.map((calc) => {
            const Icon = ICON_MAP[calc.calculator_type] || CalcIcon
            const gradient = GRADIENT_MAP[calc.slug] || "from-primary to-primary/70"
            const path = `/calculator/${calc.slug}`
            const uses = calc.view_count ? `${(calc.view_count / 1000).toFixed(1)}K` : ""
            return (
              <button
                key={calc.id}
                onClick={() => navigate(path)}
                className="group relative text-left bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden cursor-pointer"
              >
                {calc.is_popular && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full border border-amber-100 dark:border-amber-900/40">
                      <Star className="w-2.5 h-2.5 fill-current" /> Popular
                    </span>
                  </div>
                )}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 pr-16">{calc.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{calc.short_description || calc.description}</p>
                <div className="flex items-center justify-between">
                  {uses && (
                    <span className="text-xs text-muted-foreground font-['JetBrains_Mono',monospace]">
                      {uses} uses
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                    Open <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
