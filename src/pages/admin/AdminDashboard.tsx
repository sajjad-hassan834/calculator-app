import { useState } from "react"
import {
  Calculator, FileText, BookOpen, DollarSign, LogOut,
  Menu, X, Save, Check
} from "lucide-react"

interface CalculatorEntry {
  id: string
  title: string
  enabled: boolean
  uses: number
}

interface SeoEntry {
  id: string
  field: string
  content: string
}

interface FormulaEntry {
  id: string
  name: string
  formula: string
}

interface AdEntry {
  id: string
  location: string
  enabled: boolean
  width: string
  height: string
}

type Tab = "calculators" | "seo" | "formulas" | "ads"

const initialCalculators: CalculatorEntry[] = [
  { id: "mortgage", title: "Mortgage Calculator", enabled: true, uses: 145230 },
  { id: "compound", title: "Compound Interest", enabled: true, uses: 98740 },
  { id: "loan", title: "Loan Calculator", enabled: true, uses: 82310 },
  { id: "savings", title: "Savings Goal", enabled: true, uses: 45200 },
  { id: "retirement", title: "Retirement Planner", enabled: true, uses: 61200 },
  { id: "roi", title: "ROI Calculator", enabled: true, uses: 38900 },
  { id: "investment", title: "Investment Calculator", enabled: true, uses: 27300 },
  { id: "tax", title: "Tax Bracket Calculator", enabled: true, uses: 55800 },
  { id: "break-even", title: "Break-Even Analysis", enabled: false, uses: 12100 },
]

const initialSeo: SeoEntry[] = [
  { id: "s1", field: "Meta Description (Mortgage)", content: "Free mortgage calculator — estimate monthly payments, total interest, and amortization schedule instantly." },
  { id: "s2", field: "H1 Title (Compound)", content: "Compound Interest Calculator — See Your Money Grow" },
  { id: "s3", field: "FAQ Intro (Retirement)", content: "Frequently asked questions about retirement planning, 401(k) limits, and Social Security." },
  { id: "s4", field: "Meta Description (Loan)", content: "Calculate loan payments, total interest, and compare loan terms with our free loan calculator." },
]

const initialFormulas: FormulaEntry[] = [
  { id: "f1", name: "Mortgage Payment", formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]" },
  { id: "f2", name: "Compound Interest", formula: "A = P × (1 + r/n)^(n×t)" },
  { id: "f3", name: "Loan Amortization", formula: "Same as mortgage formula with P = principal" },
  { id: "f4", name: "Break-Even Point", formula: "BEP = Fixed Costs / (Price - Variable Cost)" },
]

const initialAds: AdEntry[] = [
  { id: "a1", location: "Below Hero (Homepage)", enabled: true, width: "728", height: "90" },
  { id: "a2", location: "Below Calculator Results", enabled: true, width: "728", height: "90" },
  { id: "a3", location: "Above FAQ Section", enabled: true, width: "728", height: "90" },
  { id: "a4", location: "After Trust Section", enabled: true, width: "728", height: "90" },
]

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("calculators")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [calculators, setCalculators] = useState(initialCalculators)
  const [seoEntries, setSeoEntries] = useState(initialSeo)
  const [formulas, setFormulas] = useState(initialFormulas)
  const [ads, setAds] = useState(initialAds)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs: { id: Tab; label: string; icon: typeof Calculator }[] = [
    { id: "calculators", label: "Manage Calculators", icon: Calculator },
    { id: "seo", label: "Edit SEO Content", icon: FileText },
    { id: "formulas", label: "Formulas & Variables", icon: BookOpen },
    { id: "ads", label: "AdSense Placements", icon: DollarSign },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 md:w-16"
        } bg-card border-r border-border flex flex-col transition-all duration-300 overflow-hidden shrink-0`}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
          {sidebarOpen && (
            <span className="text-sm font-semibold text-foreground tracking-tight">Owner Portal</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {tabs.map((t) => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{t.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-2 border-t border-border shrink-0">
          <button
            onClick={() => {
              localStorage.removeItem("fc_admin_token")
              window.location.href = "/"
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 shrink-0">
          <h1 className="text-sm font-semibold text-foreground">
            {tabs.find((t) => t.id === tab)?.label}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Saved
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {tab === "calculators" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-4">
                Toggle calculator visibility on the public site.
              </p>
              {calculators.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${c.enabled ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.uses.toLocaleString()} uses</div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setCalculators((prev) =>
                        prev.map((x) => (x.id === c.id ? { ...x, enabled: !x.enabled } : x))
                      )
                    }
                    className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                      c.enabled ? "bg-primary" : "bg-switch-background"
                    }`}
                    aria-label={`${c.enabled ? "Disable" : "Enable"} ${c.title}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${
                        c.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "seo" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                Edit SEO metadata and educational content for each calculator.
              </p>
              {seoEntries.map((entry) => (
                <div key={entry.id} className="bg-card border border-border rounded-xl p-4">
                  <label className="text-xs font-medium text-foreground mb-1.5 block">{entry.field}</label>
                  <textarea
                    value={entry.content}
                    onChange={(e) =>
                      setSeoEntries((prev) =>
                        prev.map((x) => (x.id === entry.id ? { ...x, content: e.target.value } : x))
                      )
                    }
                    className="w-full min-h-[80px] text-sm bg-background border border-border rounded-lg px-3 py-2 text-foreground resize-y focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#1e293b] transition-all duration-200 outline-none"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "formulas" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-4">
                Manage the formulas and variable descriptions displayed on calculator pages.
              </p>
              {formulas.map((f) => (
                <div key={f.id} className="bg-card border border-border rounded-xl p-4">
                  <label className="text-xs font-medium text-foreground mb-1.5 block">{f.name}</label>
                  <input
                    type="text"
                    value={f.formula}
                    onChange={(e) =>
                      setFormulas((prev) =>
                        prev.map((x) => (x.id === f.id ? { ...x, formula: e.target.value } : x))
                      )
                    }
                    className="w-full text-sm font-['JetBrains_Mono',monospace] bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#1e293b] transition-all duration-200 outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "ads" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-4">
                Manage AdSense placement slots across the site. Placements are pre-integrated with locked heights.
              </p>
              {ads.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{a.location}</div>
                    <div className="text-xs text-muted-foreground">
                      {a.width} x {a.height}px — {a.enabled ? "Active" : "Inactive"}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setAds((prev) =>
                        prev.map((x) => (x.id === a.id ? { ...x, enabled: !x.enabled } : x))
                      )
                    }
                    className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                      a.enabled ? "bg-primary" : "bg-switch-background"
                    }`}
                    aria-label={`${a.enabled ? "Disable" : "Enable"} ${a.location}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${
                        a.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
