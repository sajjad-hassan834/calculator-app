import {
  Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, BarChart2, Calculator,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface IllustrationConfig {
  icon: LucideIcon
  gradient: string
  labels: { primary: string; secondary: string; detail: string }
  facts: string[]
}

const ILLUSTRATION_MAP: Record<string, IllustrationConfig> = {
  mortgage: {
    icon: Home,
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    labels: { primary: "Home Ownership", secondary: "Smart Borrowing", detail: "30-Year Fixed Rate Analysis" },
    facts: ["10% down saves $50K+ in interest", "Rate drop of 1% = $300/mo savings", "Extra $100/mo cuts 5 years off term"],
  },
  loan: {
    icon: CreditCard,
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    labels: { primary: "Personal Lending", secondary: "Debt Management", detail: "Smart Borrowing Strategies" },
    facts: ["$300B+ US personal loan market", "Avg rate: 9-36% by credit tier", "Consolidation saves avg $350/mo"],
  },
  compound: {
    icon: TrendingUp,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    labels: { primary: "Exponential Growth", secondary: "Compound Returns", detail: "The Eighth Wonder of the World" },
    facts: ["$10K @ 8% = $100K in 30 years", "Start at 25 vs 35 = $300K gap", "Daily vs annual = +0.5% more"],
  },
  savings: {
    icon: PiggyBank,
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    labels: { primary: "Goal-Based Saving", secondary: "Financial Targets", detail: "Turn Dreams into Plans" },
    facts: ["$200/mo @ 4% = $49K in 15 years", "Emergency fund = 3-6 months expenses", "Automated saving = 95% success rate"],
  },
  retirement: {
    icon: Shield,
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    labels: { primary: "Retirement Security", secondary: "Nest Egg Planning", detail: "Comfortable Golden Years" },
    facts: ["Need 80% of pre-retirement income", "4% rule: safe annual withdrawal", "$500/mo from 25 = $1.2M by 65"],
  },
  roi: {
    icon: BarChart2,
    gradient: "from-teal-500/20 via-teal-500/5 to-transparent",
    labels: { primary: "Investment Returns", secondary: "Performance Metrics", detail: "Measure What Matters" },
    facts: ["S&P 500 avg 10% annual return", "Annualized ROI = true comparison", "Double your money in 7.2 years @ 10%"],
  },
  investment: {
    icon: TrendingUp,
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    labels: { primary: "Wealth Building", secondary: "Regular Investing", detail: "Consistency Beats Timing" },
    facts: ["$500/mo @ 8% = $296K in 20 years", "DCA reduces volatility by 40%", "60% of growth comes from returns"],
  },
  tax: {
    icon: Percent,
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    labels: { primary: "Tax Planning", secondary: "Smart Filing", detail: "Keep More of What You Earn" },
    facts: ["US progressive: 10%-37% brackets", "Effective rate is always lower", "$3K max capital loss deduction"],
  },
  "break-even": {
    icon: BarChart2,
    gradient: "from-orange-500/20 via-orange-500/5 to-transparent",
    labels: { primary: "Business Analysis", secondary: "Cost Management", detail: "Know Your Numbers" },
    facts: ["45% of businesses fail in 5 years", "Know your break-even to survive", "20% price increase = 50% profit jump"],
  },
  basic: {
    icon: Calculator,
    gradient: "from-slate-500/20 via-slate-500/5 to-transparent",
    labels: { primary: "Everyday Arithmetic", secondary: "Quick Calculations", detail: "Fast, Reliable, Accurate" },
    facts: ["Instant results with keyboard", "Full history preserved locally", "Zero-config: just start typing"],
  },
}

interface EducationalIllustrationProps {
  calculatorId: string
  className?: string
}

export function EducationalIllustration({ calculatorId, className = "" }: EducationalIllustrationProps) {
  const config = ILLUSTRATION_MAP[calculatorId]

  if (!config) return null

  const Icon = config.icon

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} border border-border p-6 ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Icon className="w-full h-full" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-background/80 border border-border flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{config.labels.primary}</p>
            <p className="text-xs text-muted-foreground">{config.labels.secondary}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/80 font-medium mb-3">{config.labels.detail}</p>

        <div className="space-y-2">
          {config.facts.map((fact, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
              {fact}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
