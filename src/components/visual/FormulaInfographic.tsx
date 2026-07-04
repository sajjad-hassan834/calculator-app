import { ArrowDown, Variable, Workflow } from "lucide-react"

interface FormulaInfographicProps {
  formula: string
  explanation: string
  variables: { name: string; symbol: string; desc: string }[]
  workflowSteps: string[]
}

export function FormulaInfographic({
  formula,
  explanation,
  variables,
  workflowSteps,
}: FormulaInfographicProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Variable className="w-4 h-4 text-primary" />
          Mathematical Formula
        </h4>
        <div className="p-4 bg-background/80 border border-border rounded-xl mb-4">
          <code className="text-sm sm:text-base font-['JetBrains_Mono',monospace] text-primary leading-relaxed block text-center">
            {formula}
          </code>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
      </div>

      {variables.length > 0 && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-secondary/30">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Variable className="w-3.5 h-3.5 text-primary" />
              Variables Explained
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2.5 w-1/3">Variable</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2.5 w-1/6">Symbol</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-2.5">Description</th>
                </tr>
              </thead>
              <tbody>
                {variables.map((v, i) => (
                  <tr key={v.symbol} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-background" : "bg-secondary/10"}`}>
                    <td className="px-5 py-3 text-foreground font-medium">{v.name}</td>
                    <td className="px-5 py-3 font-['JetBrains_Mono',monospace] text-primary font-medium">{v.symbol}</td>
                    <td className="px-5 py-3 text-muted-foreground">{v.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {workflowSteps.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Workflow className="w-4 h-4 text-primary" />
            Calculation Workflow
          </h4>
          <div className="space-y-0">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="pt-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
