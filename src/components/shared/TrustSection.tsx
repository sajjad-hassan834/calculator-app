import { Shield, Lock, Award, BookOpen, User, Calendar, ExternalLink } from "lucide-react"

interface TrustSectionProps {
  lastUpdated: string
  author: { name: string; role: string }
  reviewer: { name: string; role: string }
  references: { label: string; url: string }[]
}

export function TrustSection({ lastUpdated, author, reviewer, references }: TrustSectionProps) {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-6">
          Trust & Credibility
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Calculation Accuracy</div>
              <p className="text-xs text-muted-foreground mt-0.5">Standard financial formulas verified by experts.</p>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">No Login Required</div>
              <p className="text-xs text-muted-foreground mt-0.5">All calculators are free. No account needed.</p>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Privacy First</div>
              <p className="text-xs text-muted-foreground mt-0.5">Calculations run locally. We never see your data.</p>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Last Updated</div>
              <p className="text-xs text-muted-foreground mt-0.5">{lastUpdated}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-background border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Author & Reviewer
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {author.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{author.name}</div>
                  <div className="text-xs text-muted-foreground">{author.role}</div>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {reviewer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{reviewer.name}</div>
                  <div className="text-xs text-muted-foreground">{reviewer.role}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Sources & References
            </h3>
            <ul className="space-y-2">
              {references.map((ref, i) => (
                <li key={i}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Educational Disclaimer</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The calculators and content on FinanceCalculator.com are for educational and informational purposes only.
                They do not constitute financial advice, investment advice, or a recommendation of any financial product.
                Results are estimates based on standard formulas and user-provided inputs. Actual results may vary.
                Always consult a qualified financial advisor for decisions specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
