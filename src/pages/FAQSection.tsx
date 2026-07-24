import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { useFAQs } from "../hooks/queries/useFAQs"
import { ScrollReveal } from "../components/motion/ScrollReveal"

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

export function FAQSection({ title = "Frequently Asked Questions", subtitle = "Common questions about our calculators and methodology" }: { title?: string, subtitle?: string }) {
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
    <section className="py-24 bg-card relative z-10 border-y border-border">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <Skeleton />
        ) : faqList.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-8 h-8 mx-auto mb-3 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">No FAQs available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqList.map((faq, i) => (
              <ScrollReveal key={faq.id} variant="fade-up" delay={i * 50}>
                <div className="bg-background border border-border/80 rounded-2xl overflow-hidden hover:border-primary/40 transition-colors duration-300 shadow-sm">
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    <span className="font-bold text-foreground text-base pr-4">{faq.question}</span>
                    {open === i ? (
                      <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                        <ChevronUp className="w-4 h-4 shrink-0" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <ChevronDown className="w-4 h-4 shrink-0" />
                      </div>
                    )}
                  </button>
                  <div
                    className={cn(
                      "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                      open === i ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
