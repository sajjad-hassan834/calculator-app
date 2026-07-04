import { CheckCircle2, FileSearch, Shield, Users, Award, Eye } from "lucide-react"

interface TrustInfographicProps {
  methodologySteps: string[]
  accuracyProcess: string[]
  reviewProcess: string[]
  trustStats: { label: string; value: string; description: string }[]
}

export function TrustInfographic({
  methodologySteps,
  accuracyProcess,
  reviewProcess,
  trustStats,
}: TrustInfographicProps) {
  return (
    <div className="space-y-6">
      {trustStats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-lg sm:text-xl font-bold text-primary font-['JetBrains_Mono',monospace]">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-foreground mt-1">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.description}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <FileSearch className="w-4 h-4 text-blue-500" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">Methodology</h4>
          </div>
          <ul className="space-y-2">
            {methodologySteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-500" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">Accuracy Process</h4>
          </div>
          <ul className="space-y-2">
            {accuracyProcess.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-amber-500" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">Review Process</h4>
          </div>
          <ul className="space-y-2">
            {reviewProcess.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
