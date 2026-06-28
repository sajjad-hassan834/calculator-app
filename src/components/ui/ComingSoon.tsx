import { Clock, Lock } from "lucide-react"

const FUTURE_FEATURES = [
  { icon: Clock, title: "Portfolio Tracker", desc: "Track all your investments in one place with real-time updates." },
  { icon: Clock, title: "Budget Planner", desc: "Create and manage monthly budgets with spending insights." },
  { icon: Clock, title: "AI Financial Assistant", desc: "Get personalized financial insights powered by AI." },
  { icon: Clock, title: "Net Worth Tracker", desc: "Monitor your assets and liabilities over time." },
  { icon: Clock, title: "Inflation Calculator", desc: "See how inflation affects your purchasing power." },
  { icon: Clock, title: "Currency Converter", desc: "Real-time exchange rates for 170+ currencies." },
  { icon: Clock, title: "Goal Planner", desc: "Set and track multiple financial goals simultaneously." },
  { icon: Clock, title: "Tax Planner", desc: "Plan your taxes with deductions and credits." },
  { icon: Clock, title: "Compare Investments", desc: "Side-by-side comparison of different investment options." },
  { icon: Clock, title: "User Accounts", desc: "Save your calculations and scenarios in the cloud." },
]

export function ComingSoonCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any
  title: string
  desc: string
}) {
  return (
    <div className="relative bg-card border border-border/50 rounded-2xl p-5 opacity-60 hover:opacity-80 transition-opacity group">
      <div className="absolute top-3 right-3">
        <span className="flex items-center gap-1 px-2 py-0.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full border border-border">
          <Lock className="w-2.5 h-2.5" /> Coming Soon
        </span>
      </div>
      <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-foreground mb-1.5 pr-20">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

export function ComingSoonSection() {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-2">
            More Features Coming Soon
          </h2>
          <p className="text-sm text-muted-foreground">
            We are building advanced tools to help you master your finances.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {FUTURE_FEATURES.map((f) => (
            <ComingSoonCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </div>
    </section>
  )
}
