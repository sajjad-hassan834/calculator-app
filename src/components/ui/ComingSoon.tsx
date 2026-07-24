import { Clock, Lock } from "lucide-react"

const FUTURE_FEATURES = [
  { icon: Clock, title: "Portfolio Tracker", desc: "Track all your investments in one place with real-time updates." },
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
    <div className="relative bg-card border border-border/50 rounded-2xl p-5 opacity-60 hover:opacity-80 transition-all duration-300 ease-out group hover:-translate-y-1 hover:shadow-xl">
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

export function ComingSoonSection({ title = "More Features Coming Soon", subtitle = "We are building advanced tools to help you master your finances." }: { title?: string, subtitle?: string }) {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-2">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {subtitle}
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
