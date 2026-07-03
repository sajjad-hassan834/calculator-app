import { useState, useEffect, useRef, useCallback } from "react"
import { Link, useLocation } from "react-router"
import {
  Calculator, Search, Moon, Sun, Menu, X, Clock, Star,
  ChevronDown, BookOpen, HelpCircle, Info, Newspaper, ChevronRight,
  Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent,
  BarChart2, Briefcase, GraduationCap, DollarSign, Building2, Coffee
} from "lucide-react"
import { SearchOverlay } from "../shared/SearchOverlay"
import { HistoryPanel } from "../shared/HistoryPanel"
import { FavoritesPanel } from "../shared/FavoritesPanel"
import { CurrencySelector } from "../shared/CurrencySelector"
import { useCurrency } from "../../lib/CurrencyContext"
import { MegaMenu } from "./MegaMenu"

// ── Mobile drawer accordion data ────────────────────────────────────────────
const MOBILE_CALC_GROUPS = [
  {
    title: "Housing",
    items: [
      { label: "Mortgage Calculator", path: "/calculator/mortgage", icon: Home },
      { label: "Home Affordability", path: "/calculator/mortgage", icon: Building2 },
    ],
  },
  {
    title: "Personal Finance",
    items: [
      { label: "Loan Calculator", path: "/calculator/loan", icon: CreditCard },
      { label: "Savings Goal", path: "/calculator/savings", icon: PiggyBank },
      { label: "Tax Estimator", path: "/calculator/tax", icon: Percent },
    ],
  },
  {
    title: "Investing",
    items: [
      { label: "Compound Interest", path: "/calculator/compound", icon: TrendingUp },
      { label: "ROI Calculator", path: "/calculator/roi", icon: BarChart2 },
      { label: "Investment Growth", path: "/calculator/investment", icon: TrendingUp },
      { label: "Retirement Planner", path: "/calculator/retirement", icon: Shield },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Break-Even Analysis", path: "/calculator/break-even", icon: Briefcase },
      { label: "Profit Margin", path: "/calculator/break-even", icon: Percent },
    ],
  },
  {
    title: "Other",
    items: [
      { label: "Education Savings", path: "/calculator/savings", icon: GraduationCap },
      { label: "Inflation Calculator", path: "/calculator/compound", icon: DollarSign },
    ],
  },
]

const SECONDARY_LINKS = [
  { label: "Blog", path: "/blog", icon: Newspaper },
  { label: "About", path: "/about", icon: Info },
  { label: "Help", path: "/help", icon: HelpCircle },
]

export function Header({
  darkMode,
  toggleDarkMode,
  externalSearchOpen,
  onExternalSearchClose,
  isHomePage,
}: {
  darkMode: boolean
  toggleDarkMode: () => void
  externalSearchOpen?: boolean
  onExternalSearchClose?: () => void
  isHomePage?: boolean
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)
  const { currency, setCurrency } = useCurrency()
  const location = useLocation()
  const calcButtonRef = useRef<HTMLButtonElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)

  const effectiveSearchOpen = externalSearchOpen ?? searchOpen
  const closeSearch = () => {
    setSearchOpen(false)
    onExternalSearchClose?.()
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMega = useCallback(() => setMegaOpen(false), [])

  const handleCalcButtonKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setMegaOpen((prev) => !prev)
    }
    if (e.key === "Escape") setMegaOpen(false)
  }

  const calcActive = location.pathname.startsWith("/calculator") || location.pathname.startsWith("/category")

  return (
    <>
      {/* ── Main header ─────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-3 min-w-0">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0"
              aria-label="FinanceCalc Home"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-['DM_Serif_Display',serif] text-lg font-normal text-foreground hidden sm:block whitespace-nowrap">
                FinanceCalc
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-0.5 ml-2 shrink-0"
              aria-label="Main navigation"
            >
              {/* Calculators with mega menu trigger */}
              <div className="relative" ref={megaRef}>
                <button
                  ref={calcButtonRef}
                  onClick={() => setMegaOpen((prev) => !prev)}
                  onKeyDown={handleCalcButtonKey}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  aria-controls="mega-menu"
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-all duration-200
                    ${calcActive || megaOpen
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                >
                  Calculators
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Secondary links */}
              {SECONDARY_LINKS.map((l) => {
                const isActive = location.pathname.startsWith(l.path)
                return (
                  <Link
                    key={l.label}
                    to={l.path}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 whitespace-nowrap
                      ${isActive
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </nav>

            {/* Spacer */}
            <div className="flex-1 min-w-0" />

            {/* Compact search — hidden on homepage (Hero has its own) */}
            {!isHomePage && (
              <div className="hidden md:flex w-44 lg:w-56 xl:w-64 relative shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-full flex items-center pl-9 pr-3 py-2 text-sm bg-secondary border border-border/60 rounded-xl text-muted-foreground hover:text-foreground text-left transition-all duration-200 focus:ring-2 focus:ring-primary/40 focus:bg-background"
                  aria-label="Open search"
                >
                  <span className="truncate">Search calculators…</span>
                  <kbd className="ml-auto hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-background border border-border rounded text-[10px] text-muted-foreground font-mono shrink-0">
                    /
                  </kbd>
                </button>
              </div>
            )}

            {/* Utility row */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Support Us Button */}
              <Link
                to="/support"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors shrink-0"
                aria-label="Support our work"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Support Us</span>
              </Link>

              <CurrencySelector value={currency} onChange={setCurrency} />

              <button
                onClick={() => setHistoryOpen(true)}
                className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm shrink-0"
                aria-label="Calculation history"
                title="History"
              >
                <Clock className="w-4 h-4" />
              </button>

              <button
                onClick={() => setFavoritesOpen(true)}
                className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm shrink-0"
                aria-label="Favorites"
                title="Favorites"
              >
                <Star className="w-4 h-4" />
              </button>

              {/* Mobile search icon */}
              <button
                className="md:hidden w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 shrink-0"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm shrink-0"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Hamburger — mobile/tablet only */}
              <button
                className="lg:hidden w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 shrink-0"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mega menu panel (below header, full-width) ─────────────────── */}
        <div id="mega-menu">
          <MegaMenu open={megaOpen} onClose={closeMega} />
        </div>
      </header>

      {/* ── Mobile full-screen drawer ──────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-200
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer panel */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`fixed top-0 right-0 bottom-0 z-50 w-[min(85vw,360px)] bg-card border-l border-border lg:hidden
          flex flex-col transition-transform duration-300 ease-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Calculator className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-['DM_Serif_Display',serif] text-base text-foreground">FinanceCalc</span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain py-3">

          {/* Calculators accordion */}
          <div className="px-3 mb-1">
            <button
              onClick={() => setMobileAccordion(mobileAccordion === "calc" ? null : "calc")}
              aria-expanded={mobileAccordion === "calc"}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-primary" />
                Calculators
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200
                  ${mobileAccordion === "calc" ? "rotate-180" : ""}`}
              />
            </button>

            {mobileAccordion === "calc" && (
              <div className="mt-1 ml-3 space-y-4 pb-2">
                {MOBILE_CALC_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1.5">
                      {group.title}
                    </div>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Secondary links */}
          <div className="px-3 space-y-0.5">
            {SECONDARY_LINKS.map((l) => {
              const Icon = l.icon
              const isActive = location.pathname.startsWith(l.path)
              return (
                <Link
                  key={l.label}
                  to={l.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors
                    ${isActive
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {l.label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary" />}
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="mx-5 my-4 border-t border-border" />

          {/* Utility actions */}
          <div className="px-3 space-y-0.5">
            <button
              onClick={() => { setMenuOpen(false); setHistoryOpen(true) }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Clock className="w-4 h-4 shrink-0" />
              Calculation History
            </button>
            <button
              onClick={() => { setMenuOpen(false); setFavoritesOpen(true) }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Star className="w-4 h-4 shrink-0" />
              Favorites
            </button>
            <button
              onClick={() => { toggleDarkMode(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="border-t border-border px-5 py-4 shrink-0">
          <p className="text-xs text-muted-foreground">
            25+ free calculators — no sign-up required
          </p>
        </div>
      </div>

      {/* ── Overlays & Panels ──────────────────────────────────────────── */}
      <SearchOverlay open={effectiveSearchOpen} onClose={closeSearch} />
      <HistoryPanel open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <FavoritesPanel open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
    </>
  )
}
