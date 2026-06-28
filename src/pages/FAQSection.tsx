import { useState } from "react"
import { FAQS } from "../lib/data"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }

  return (
    <section className="py-16 bg-card border-y border-border">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about using FinanceCalculator.com
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
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
      </div>
    </section>
  )
}
