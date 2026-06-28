import { useNavigate } from "react-router"
import { FEATURED } from "../lib/data"
import { Star, ArrowRight } from "lucide-react"

export function FeaturedCalculators() {
  const navigate = useNavigate()
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
          {FEATURED.map((calc) => {
            const Icon = calc.icon
            const path = `/calculator/${calc.id}`
            return (
              <button
                key={calc.id}
                onClick={() => navigate(path)}
                className="group relative text-left bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden cursor-pointer"
              >
                {calc.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full border border-amber-100 dark:border-amber-900/40">
                      <Star className="w-2.5 h-2.5 fill-current" /> Popular
                    </span>
                  </div>
                )}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 pr-16">{calc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{calc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-['JetBrains_Mono',monospace]">
                    {calc.uses} uses
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
