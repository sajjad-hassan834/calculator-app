import { Shield, Lock, Award, User, ExternalLink, BookOpen } from "lucide-react"
import type { CalcMeta } from "../../lib/calculatorMeta"
import { AuthorReviewBlock } from "./AuthorCard"

export function TrustBadges({
  meta,
}: {
  meta: Pick<CalcMeta, "lastUpdated" | "author" | "reviewer" | "references">
}) {
  return (
    <section className="py-12 bg-card border-y border-border" aria-label="Trust and credibility information">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-6">
          Trust & Credibility
        </h2>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Privacy First Architecture</div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                All data calculations execute locally in your browser using client-side JavaScript. No financial
                data is ever transmitted to, stored on, or processed by our servers. Your numbers never leave
                your device.
              </p>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">No Login Required</div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Every calculator is 100% free with zero paywalls, zero registration, and zero account required.
                No sign-ups, no subscriptions — just instant access to premium financial tools.
              </p>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">Verified Accuracy Notice</div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                All mathematical formulas powering these calculators are verified against standard financial
                compliance algorithms and industry-standard methodologies. Results are reliable for educational
                planning purposes.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Written & Reviewed By
          </h3>
          <AuthorReviewBlock
            author={meta.author}
            reviewer={meta.reviewer}
            lastUpdated={meta.lastUpdated}
          />
        </div>

          <div className="bg-background border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Sources & References
            </h3>
            <ul className="space-y-2">
              {meta.references.map((ref, i) => (
                <li key={i}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-amber-700 dark:text-amber-400">Educational disclaimer.</span>{" "}
                The calculators and content on FinanceCalculator.com are for educational and informational
                purposes only. They do not constitute financial advice, investment advice, or a recommendation
                of any financial product. Results are estimates based on standard formulas and user-provided
                inputs. Actual results may vary. Always consult a qualified financial advisor for decisions
                specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
