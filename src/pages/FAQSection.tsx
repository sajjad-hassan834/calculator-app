import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { useFAQs } from "../hooks/queries/useFAQs"

function cn(...classes: (string | boolean | undefined)[]) { return classes.filter(Boolean).join(" ") }

function Skeleton() {
  return (
    <div className="space-y-3 py-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-background border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function FAQSection() {
  const { data: faqs, isLoading } = useFAQs()
  const [open, setOpen] = useState<number | null>(0)

  const faqList = faqs ?? []

  const jsonLd = faqList.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null

  return (
    <section className="py-16 bg-card border-y border-border">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about using FinanceCalculator.com
          </p>
        </div>

        {isLoading ? (
          <Skeleton />
        ) : faqList.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-8 h-8 mx-auto mb-3 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">No FAQs available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqList.map((faq, i) => (
              <div key={faq.id} className="bg-background border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-medium text-foreground text-sm pr-4">{faq.question}</span>
                  {open === i ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {open === i && (
                  <div className="px-5 pb-4 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
