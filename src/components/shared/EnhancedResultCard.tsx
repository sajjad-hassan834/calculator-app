import type { CalcMeta } from "../../lib/calculatorMeta"
import { CheckCircle, AlertCircle, Lightbulb, TrendingUp } from "lucide-react"

interface EnhancedResultCardProps {
  meta: CalcMeta
  results: Record<string, number>
  resultHighlight: { label: string; value: string }
}

function getInterpretationBlocks(meta: CalcMeta) {
  return [
    {
      icon: CheckCircle,
      title: "Key Takeaway",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/5 border-emerald-500/20",
      text: meta.interpretation,
    },
    {
      icon: TrendingUp,
      title: "Advantages",
      color: "text-blue-500",
      bgColor: "bg-blue-500/5 border-blue-500/20",
      text: meta.advantages.slice(0, 2).join(" "),
    },
    {
      icon: AlertCircle,
      title: "Important Limitations",
      color: "text-amber-500",
      bgColor: "bg-amber-500/5 border-amber-500/20",
      text: meta.limitations.slice(0, 2).join(" "),
    },
    {
      icon: Lightbulb,
      title: "Pro Tips",
      color: "text-purple-500",
      bgColor: "bg-purple-500/5 border-purple-500/20",
      text: meta.tips.slice(0, 2).join(" "),
    },
  ]
}

export function EnhancedResultCard({ meta, resultHighlight }: EnhancedResultCardProps) {
  const blocks = getInterpretationBlocks(meta)

  return (
    <div className="space-y-3">
      <div className="rounded-xl p-4 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
        <div className="text-xs font-medium text-muted-foreground mb-1">{resultHighlight.label}</div>
        <div className="text-2xl font-['JetBrains_Mono',monospace] font-bold text-foreground">
          {resultHighlight.value}
        </div>
      </div>
      {blocks.map((block, i) => {
        const Icon = block.icon
        return (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-xl border ${block.bgColor}`}
          >
            <Icon className={`w-4 h-4 ${block.color} shrink-0 mt-0.5`} />
            <div>
              <h4 className="text-xs font-semibold text-foreground">{block.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{block.text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
