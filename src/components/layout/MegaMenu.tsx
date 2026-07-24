import { useEffect, useRef } from "react"
import { Link } from "react-router"
import {
  Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent,
  BarChart2, Briefcase, GraduationCap, Building2,
  RefreshCw, Landmark, HeartPulse, Wallet, Scale,
  Calculator, Target, ArrowRightLeft, Receipt, ChevronRight,
} from "lucide-react"


interface MenuItem {
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  desc: string
}

interface MenuGroup {
  title: string
  color: string
  items: MenuItem[]
}

const MENU_GROUPS: MenuGroup[] = [
  {
    title: "Housing",
    color: "text-blue-500",
    items: [
      { label: "Mortgage", path: "/calculator/mortgage", icon: Home, desc: "Monthly payments & amortization" },
      { label: "Home Affordability", path: "/calculator/mortgage", icon: Building2, desc: "How much home can you afford?" },
      { label: "Rent vs Buy", path: "/calculator/mortgage", icon: Scale, desc: "Compare renting and owning" },
      { label: "Refinance", path: "/calculator/mortgage", icon: RefreshCw, desc: "Should you refinance?" },
    ],
  },
  {
    title: "Personal Finance",
    color: "text-emerald-500",
    items: [
      { label: "Loan", path: "/calculator/loan", icon: CreditCard, desc: "Monthly repayments & interest" },
      { label: "Savings Goal", path: "/calculator/savings", icon: PiggyBank, desc: "Reach your savings target" },
      { label: "Budget Planner", path: "/calculator/savings", icon: Wallet, desc: "Track income & expenses" },
      { label: "Tax Estimator", path: "/calculator/tax", icon: Receipt, desc: "Estimate income tax owed" },
    ],
  },
  {
    title: "Investing",
    color: "text-indigo-500",
    items: [
      { label: "Compound Interest", path: "/calculator/compound", icon: TrendingUp, desc: "Watch money grow over time" },
      { label: "ROI Calculator", path: "/calculator/roi", icon: BarChart2, desc: "Return on any investment" },
      { label: "Investment Growth", path: "/calculator/investment", icon: Target, desc: "Portfolio with contributions" },
      { label: "Retirement Planner", path: "/calculator/retirement", icon: Shield, desc: "Are you on track to retire?" },
    ],
  },
  {
    title: "Business",
    color: "text-amber-500",
    items: [
      { label: "Break-Even Analysis", path: "/calculator/break-even", icon: Landmark, desc: "Units needed to break even" },
      { label: "Profit Margin", path: "/calculator/break-even", icon: Percent, desc: "Gross & net margin calculator" },
      { label: "GST / VAT", path: "/calculator/tax", icon: Receipt, desc: "Tax-inclusive & exclusive" },
      { label: "Salary Calculator", path: "/calculator/tax", icon: Briefcase, desc: "Net take-home pay estimator" },
    ],
  },
  {
    title: "Other",
    color: "text-rose-500",
    items: [
      { label: "Currency Converter", path: "/calculator/compound", icon: ArrowRightLeft, desc: "Real-time exchange rates" },
      { label: "Inflation Calculator", path: "/calculator/compound", icon: TrendingUp, desc: "Purchasing power over time" },
      { label: "Education Savings", path: "/calculator/savings", icon: GraduationCap, desc: "College & 529 planning" },
      { label: "Insurance Estimator", path: "/calculator/mortgage", icon: HeartPulse, desc: "Premium cost estimator" },
    ],
  },
]

export function MegaMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Use capture phase so it fires before bubbling stops
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open, onClose])

  return (
    <div
      ref={menuRef}
      role="region"
      aria-label="Calculators mega menu"
      className={`absolute top-full left-0 right-0 z-50 bg-card border-b border-border shadow-2xl shadow-black/20
        transition-all duration-200 ease-out origin-top
        ${open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {MENU_GROUPS.map((group) => (
            <div key={group.title}>
              <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-4 ${group.color}`}>
                {group.title}
              </div>
              <ul className="space-y-1" role="list">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary transition-all duration-150 group"
                        role="menuitem"
                      >
                        <div className="mt-0.5 w-7 h-7 rounded-lg bg-secondary group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-150">
                          <Icon className={`w-3.5 h-3.5 ${group.color} group-hover:scale-110 transition-transform duration-150`} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground leading-tight truncate group-hover:text-primary transition-colors duration-150">
                            {item.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calculator className="w-3.5 h-3.5 text-primary" />
            <span>25+ free financial calculators — no sign-up required</span>
          </div>
          <Link
            to="/sitemap#calculators"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline transition-all duration-150"
          >
            Browse all calculators
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
