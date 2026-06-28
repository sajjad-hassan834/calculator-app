import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Calculator, Search, Moon, Sun, Menu, X } from "lucide-react"
import { SearchOverlay } from "../shared/SearchOverlay"

const NAV_LINKS = [
  { label: "Calculators", path: "/" },
  { label: "Mortgage", path: "/calculator/mortgage" },
  { label: "Loans", path: "/calculator/loan" },
  { label: "Investments", path: "/calculator/compound" },
  { label: "Savings", path: "/calculator/savings" },
  { label: "Retirement", path: "/calculator/retirement" },
  { label: "Tax", path: "/calculator/tax" },
  { label: "Blog", path: "/blog" },
]

export function Header({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean
  toggleDarkMode: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="FinanceCalc Home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-['DM_Serif_Display',serif] text-lg font-normal text-foreground hidden sm:block">
                FinanceCalc
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.path}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex flex-1 max-w-xs relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-border/60 rounded-xl text-muted-foreground hover:text-foreground text-left transition-all duration-200 focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-gray-950 aria-expanded:ring-2 aria-expanded:ring-blue-600"
                aria-label="Open search"
              >
                <span>Search calculators...</span>
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                className="md:hidden w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                to="/calculator/mortgage"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate</span>
              </Link>
              <button
                className="lg:hidden w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:shadow-sm"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-card" role="navigation" aria-label="Mobile navigation">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.path}
                  onClick={() => setMenuOpen(false)}
                  className="w-full block text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
