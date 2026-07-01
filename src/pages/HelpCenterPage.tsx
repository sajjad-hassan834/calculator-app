import { useState } from "react"
import { Link } from "react-router"
import { Search, ChevronDown, ChevronUp, BookOpen, Mail, HelpCircle, Shield, User, Star } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"

const HELP_ARTICLES = [
  {
    category: "Getting Started",
    icon: BookOpen,
    articles: [
      { q: "How do I use a calculator?", a: "Navigate to any calculator page, enter your values using the sliders or input fields, and results update instantly in real time. All calculations happen locally in your browser." },
      { q: "Do I need an account?", a: "No. All calculators are completely free with no registration required. Your data never leaves your device." },
      { q: "How do I save my results?", a: "Use the Save button to bookmark a calculator, or your calculation history is automatically saved. You can also export results as CSV, Excel, JSON, or PDF." },
    ],
  },
  {
    category: "Calculations & Accuracy",
    icon: HelpCircle,
    articles: [
      { q: "How accurate are the results?", a: "Our calculators use standard financial formulas from industry sources. Results are highly accurate for educational planning but may vary based on specific terms, fees, and individual circumstances." },
      { q: "What formulas do you use?", a: "Each calculator page includes the formula, variable explanations, and a step-by-step example. We use standard amortization, compound interest, and financial formulas." },
      { q: "Can I use these for tax planning?", a: "The Tax Calculator provides estimates based on current federal brackets. Consult a licensed tax professional for your specific situation." },
    ],
  },
  {
    category: "Features",
    icon: Star,
    articles: [
      { q: "What is the History feature?", a: "Your calculation results are automatically saved locally in your browser. Click the clock icon in the header to view, reuse, or delete past calculations." },
      { q: "How do Favorites work?", a: "Click the star icon on any calculator to bookmark it. Access your favorites from the star icon in the header or mobile navigation." },
      { q: "Can I share my results?", a: "Yes. Use the Share button on any calculator page to copy a link, share via social media, or export results as PDF, CSV, Excel, or JSON." },
    ],
  },
  {
    category: "Privacy & Security",
    icon: Shield,
    articles: [
      { q: "Is my data private?", a: "Yes. All calculations run locally in your browser using JavaScript. We never transmit, store, or process your financial data on our servers." },
      { q: "What information do you collect?", a: "We use anonymized analytics to improve our service. No personal financial data is collected. See our Privacy Policy for details." },
      { q: "Do you use cookies?", a: "We use essential cookies for functionality and anonymized analytics. You can accept or reject non-essential cookies via our cookie banner." },
    ],
  },
  {
    category: "Account & Support",
    icon: User,
    articles: [
      { q: "How can I contact support?", a: "Visit our Contact page to send us a message. We aim to respond within 24 hours on business days." },
      { q: "Do you offer financial advice?", a: "No. Our calculators are educational tools. Results are estimates only. Always consult a qualified financial advisor for personalized advice." },
      { q: "How often are calculators updated?", a: "We update tax brackets annually and review all calculators quarterly. Each page shows its last updated date." },
    ],
  },
]

export function HelpCenterPage() {
  const [query, setQuery] = useState("")
  const [openArticle, setOpenArticle] = useState<string | null>(null)

  const allArticles = HELP_ARTICLES.flatMap((c) =>
    c.articles.map((a) => ({ ...a, category: c.category }))
  )

  const filtered = query.trim()
    ? allArticles.filter(
        (a) =>
          a.q.toLowerCase().includes(query.toLowerCase()) ||
          a.a.toLowerCase().includes(query.toLowerCase())
      )
    : allArticles

  return (
    <div className="bg-background min-h-screen">
      <SEOHead
        title="Help Center — FinanceCalculator.com"
        description="Find answers to common questions about using our financial calculators, features, privacy, and more."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Help Center</span>
        </nav>

        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground mb-2">
            Help Center
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about using our financial calculators
          </p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            aria-label="Search help articles"
          />
        </div>

        {query.trim() === "" ? (
          <div className="space-y-8">
            {HELP_ARTICLES.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.category}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-foreground text-lg">{section.category}</h2>
                  </div>
                  <div className="space-y-2">
                    {section.articles.map((article) => (
                      <div
                        key={article.q}
                        className="bg-card border border-border rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenArticle(openArticle === article.q ? null : article.q)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left"
                          aria-expanded={openArticle === article.q}
                        >
                          <span className="text-sm font-medium text-foreground pr-4">{article.q}</span>
                          {openArticle === article.q ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                          )}
                        </button>
                        {openArticle === article.q && (
                          <div className="px-5 pb-4 border-t border-border">
                            <p className="text-sm text-muted-foreground leading-relaxed pt-3">{article.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} results for "{query}"</p>
            {filtered.map((article) => (
              <div
                key={article.q}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenArticle(openArticle === article.q ? null : article.q)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  aria-expanded={openArticle === article.q}
                >
                  <div>
                    <span className="text-xs text-primary font-medium">{article.category}</span>
                    <span className="text-sm font-medium text-foreground block">{article.q}</span>
                  </div>
                  {openArticle === article.q ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openArticle === article.q && (
                  <div className="px-5 pb-4 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-3">{article.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-2">Still need help?</h2>
          <p className="text-sm text-muted-foreground mb-4">Contact our support team and we will get back to you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            <Mail className="w-4 h-4" /> Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
