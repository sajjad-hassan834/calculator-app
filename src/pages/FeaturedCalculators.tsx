import { useNavigate } from "react-router"
import { Star, ArrowRight, Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, BarChart2, Calculator as CalcIcon } from "lucide-react"
import { useFeaturedCalculators } from "../hooks/queries/useCalculators"
import { ScrollReveal } from "../components/motion/ScrollReveal"

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

export function FeaturedCalculators({ title = "Discover Popular Tools", subtitle = "The most-used financial calculators by our community" }: { title?: string, subtitle?: string }) {
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
    <section className="py-24 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {subtitle}
              </p>
            </div>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {displayCalcs.map((calc, i) => {
            const Icon = ICON_MAP[calc.calculator_type] || CalcIcon
            const gradient = GRADIENT_MAP[calc.slug] || "from-primary to-primary/70"
            const path = `/calculator/${calc.slug}`
            const uses = calc.view_count ? `${(calc.view_count / 1000).toFixed(1)}K` : ""
            return (
              <ScrollReveal key={calc.id} variant="fade-up" delay={i * 100}>
                <button
                  onClick={() => navigate(path)}
                  className="w-full h-full group relative text-left bg-card border border-border/80 rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 ease-out overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
                  
                  {calc.is_popular && (
                    <div className="absolute top-6 right-6">
                      <span className="flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/20">
                        <Star className="w-3 h-3 fill-current" /> Popular
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 pr-8 group-hover:text-primary transition-colors">{calc.name}</h3>
                  <p className="text-base text-muted-foreground mb-8 leading-relaxed grow">{calc.short_description || calc.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto w-full border-t border-border/50 pt-4">
                    {uses ? (
                      <span className="text-sm text-muted-foreground font-mono bg-secondary px-2 py-1 rounded-md">
                        {uses} uses
                      </span>
                    ) : <span />}
                    <span className="flex items-center gap-2 text-sm font-bold text-primary translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Calculate <ArrowRight className="w-4 h-4" />
                    </span>
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
