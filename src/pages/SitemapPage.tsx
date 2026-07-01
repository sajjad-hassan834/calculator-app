import { Link } from "react-router"
import { SEOHead } from "../components/seo/SEOHead"
import { SEARCH_INDEX } from "../lib/searchData"
import { CATEGORIES } from "../lib/data"
import { Home, Calculator, Grid3X3, FileText, BookOpen, HelpCircle, Info, Mail } from "lucide-react"

const ICON_MAP: Record<string, any> = {
  Home, Calculator, Grid3X3, FileText, BookOpen, HelpCircle, Info, Mail,
}

const STATIC_PAGES = [
  { path: "/", label: "Home", icon: "Home" },
  { path: "/about", label: "About Us", icon: "Info" },
  { path: "/contact", label: "Contact", icon: "Mail" },
  { path: "/help", label: "Help Center", icon: "HelpCircle" },
  { path: "/blog", label: "Blog", icon: "BookOpen" },
  { path: "/accessibility", label: "Accessibility", icon: "FileText" },
]

const LEGAL_PAGES = [
  { path: "/legal/privacy", label: "Privacy Policy" },
  { path: "/legal/terms", label: "Terms of Service" },
  { path: "/legal/cookies", label: "Cookie Policy" },
  { path: "/legal/disclaimer", label: "Disclaimer" },
]

export function SitemapPage() {
  return (
    <>
      <SEOHead
        title="Sitemap | FinanceCalc"
        description="Browse all pages, calculators, and categories available on FinanceCalc. Complete site navigation and index."
        canonical="https://financecalc.com/sitemap"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl text-foreground mb-2">
          Sitemap
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Browse all pages and resources available on FinanceCalc.
        </p>

        <div className="space-y-10">
          {/* Pages */}
          <section>
            <h2 className="font-['DM_Serif_Display',serif] text-xl text-foreground mb-4">Pages</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {STATIC_PAGES.map((p) => {
                const Icon = ICON_MAP[p.icon]
                return (
                  <Link
                    key={p.path}
                    to={p.path}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4 text-primary" />}
                    <span className="text-sm text-foreground">{p.label}</span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Legal */}
          <section>
            <h2 className="font-['DM_Serif_Display',serif] text-xl text-foreground mb-4">Legal</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {LEGAL_PAGES.map((p) => (
                <Link
                  key={p.path}
                  to={p.path}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{p.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Calculators */}
          <section>
            <h2 className="font-['DM_Serif_Display',serif] text-xl text-foreground mb-4">Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {SEARCH_INDEX.map((c) => (
                <Link
                  key={c.id}
                  to={c.path}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-primary" />
                  <div>
                    <span className="text-sm text-foreground">{c.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">{c.description}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section>
            <h2 className="font-['DM_Serif_Display',serif] text-xl text-foreground mb-4">Categories</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const CatIcon = cat.icon ? ICON_MAP[cat.icon as string] : Grid3X3
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    {CatIcon && <CatIcon className="w-4 h-4 text-primary" />}
                    <span className="text-sm text-foreground">{cat.label}</span>
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
