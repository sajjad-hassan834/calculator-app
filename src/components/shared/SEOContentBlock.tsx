import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, AlertCircle, HelpCircle } from "lucide-react"
import type { CalcMeta } from "../../lib/calculatorMeta"

interface FAQ {
  q: string
  a: string
}

function CalculatorFAQ({
  faqs,
  calcType,
}: {
  faqs: FAQ[]
  calcType: string
}) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-background border border-border rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-foreground text-sm pr-4">{faq.q}</span>
            {open === i ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
          </button>
          {open === i && (
            <div className="px-5 pb-4 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const PER_CALCULATOR_FAQS: Record<string, FAQ[]> = {
  mortgage: [
    { q: "What is a good down payment for a mortgage?", a: "A 20% down payment is ideal because it eliminates the need for Private Mortgage Insurance (PMI). However, many lenders offer conventional loans with as little as 3-5% down. FHA loans require only 3.5% down but come with mortgage insurance premiums." },
    { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 30-year mortgage offers lower monthly payments but significantly more total interest. A 15-year mortgage has higher monthly payments but you build equity much faster and pay far less interest. Use this calculator to compare both scenarios side by side." },
    { q: "How does my credit score affect my mortgage rate?", a: "Credit scores directly impact the interest rate lenders offer you. A score of 760+ typically gets the best rates, while scores below 620 may face higher rates or difficulty qualifying. Improving your score before applying can save tens of thousands over the loan term." },
    { q: "What is included in my monthly mortgage payment?", a: "Your monthly payment typically includes principal and interest (P&I), property taxes, homeowners insurance, and possibly PMI or HOA fees. This calculator estimates P&I only. Use our full affordability analysis to factor in taxes and insurance." },
  ],
  compound: [
    { q: "What is the Rule of 72?", a: "The Rule of 72 is a quick mental math shortcut: divide 72 by your annual return rate to estimate how many years it will take to double your money. For example, at 8% return: 72 ÷ 8 = 9 years to double." },
    { q: "How does compounding frequency affect growth?", a: "More frequent compounding means interest is calculated and added to your principal more often. Daily compounding yields slightly more than monthly, which yields more than annual. The difference becomes more significant over longer time periods." },
    { q: "What is a realistic long-term return rate?", a: "The S&P 500 has historically averaged 7-10% annual returns before inflation. A conservative estimate for long-term planning is 6-8%. After accounting for inflation (2-3%), real returns are typically 4-6%." },
  ],
  loan: [
    { q: "What is the difference between secured and unsecured loans?", a: "Secured loans are backed by collateral (like a car or home) and typically have lower interest rates. Unsecured loans have no collateral requirement but usually have higher rates because the lender takes on more risk." },
    { q: "How does my credit score affect my loan rate?", a: "Your credit score is one of the primary factors lenders use to determine your interest rate. A higher score qualifies you for lower rates. Checking your credit report annually and improving your score before applying can save significant money." },
  ],
}

const DEFAULT_FAQS = [
  { q: "How accurate are these financial calculators?", a: "Our calculators use standard financial formulas and provide highly accurate estimates based on the inputs you provide. Actual figures may vary based on specific terms, fees, and individual circumstances. Always consult a qualified professional for major financial decisions." },
  { q: "Do I need an account to use these tools?", a: "No. All calculators on FinanceCalculator.com are completely free with no registration required. All calculations run locally in your browser, and we never store your personal financial data on our servers." },
  { q: "Can I use these calculators for non-USD currencies?", a: "Yes. The calculators work with any currency. The mathematics are currency-agnostic — simply enter your values in your local currency and interpret the results accordingly." },
]

export function SEOContentBlock({
  meta,
  calcType,
}: {
  meta: CalcMeta
  calcType: string
}) {
  const faqs = PER_CALCULATOR_FAQS[calcType] ?? DEFAULT_FAQS

  return (
    <section className="py-12 bg-card border-t border-border" aria-label={`About the ${meta.title}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-6">
          About the {meta.title}
        </h2>

        <div className="space-y-6">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">What This Calculator Does</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{meta.introduction}</p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Why It Matters</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{meta.whyMatters}</p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">How the Calculation Works</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{meta.howItWorks}</p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-3">The Formula</h3>
            <div className="p-4 bg-secondary/50 rounded-lg mb-4">
              <code className="text-sm font-['JetBrains_Mono',monospace] text-primary leading-relaxed block">
                {meta.formula}
              </code>
            </div>
            <p className="text-sm text-muted-foreground">{meta.explanation}</p>

            <h4 className="text-sm font-semibold text-foreground mt-4 mb-2">Variables Explained</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-2 pr-4">Variable</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-2 pr-4">Symbol</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {meta.variables.map((v) => (
                    <tr key={v.symbol} className="border-b border-border/50">
                      <td className="py-2 pr-4 text-foreground font-medium">{v.name}</td>
                      <td className="py-2 pr-4 font-['JetBrains_Mono',monospace] text-primary">{v.symbol}</td>
                      <td className="py-2 text-muted-foreground">{v.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-3">Step-by-Step Example</h3>
            <p className="text-sm text-muted-foreground mb-3">{meta.example.desc}</p>
            <ol className="list-decimal list-inside space-y-1.5">
              {meta.example.steps.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground font-['JetBrains_Mono',monospace]">{step}</li>
              ))}
            </ol>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Interpreting Your Results</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{meta.interpretation}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-500" /> Advantages
              </h4>
              <ul className="space-y-2">
                {meta.advantages.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">--</span> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Limitations
              </h4>
              <ul className="space-y-2">
                {meta.limitations.map((l, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">--</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" /> Common Mistakes
            </h4>
            <ul className="space-y-2">
              {meta.commonMistakes.map((m, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">--</span> {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background border border-border rounded-xl p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-500" /> Helpful Tips
            </h4>
            <ul className="space-y-2">
              {meta.tips.map((t, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">--</span> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background border border-border rounded-xl p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" /> Glossary
            </h4>
            <dl className="space-y-3">
              {meta.glossary.map((g) => (
                <div key={g.term}>
                  <dt className="text-sm font-medium text-foreground">{g.term}</dt>
                  <dd className="text-sm text-muted-foreground mt-0.5">{g.def}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-background border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-3">Frequently Asked Questions</h3>
            <CalculatorFAQ faqs={faqs} calcType={calcType} />
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">Educational purposes only.</span>{" "}
                  The content and calculations provided by this tool are for educational and informational purposes
                  only. They do not constitute financial advice, investment advice, or a recommendation of any
                  financial product or strategy. Results are estimates based on standard formulas and
                  user-provided inputs. Actual results may vary based on specific terms, fees, market conditions,
                  and individual circumstances. Always consult a qualified financial advisor, tax professional,
                  or legal expert before making financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
