import { useState } from "react"
import { useNavigate } from "react-router"
import { Search, Check, Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, Briefcase, GraduationCap, DollarSign, Building2 } from "lucide-react"
import { SearchOverlay } from "../components/shared/SearchOverlay"

const CATEGORIES = [
  { id: "mortgage", label: "Mortgage", icon: Home },
  { id: "investments", label: "Investments", icon: TrendingUp },
  { id: "loans", label: "Loans", icon: CreditCard },
  { id: "savings", label: "Savings", icon: PiggyBank },
  { id: "retirement", label: "Retirement", icon: Shield },
  { id: "tax", label: "Tax", icon: Percent },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "personal", label: "Personal", icon: DollarSign },
  { id: "realestate", label: "Real Estate", icon: Building2 },
  { id: "currency", label: "Currency", icon: DollarSign },
  { id: "insurance", label: "Insurance", icon: Shield },
]

const POPULAR = [
  { label: "Mortgage Calculator", path: "/calculator/mortgage" },
  { label: "Compound Interest", path: "/calculator/compound" },
  { label: "Loan Calculator", path: "/calculator/loan" },
  { label: "Retirement Planner", path: "/calculator/retirement" },
  { label: "ROI Calculator", path: "/calculator/roi" },
  { label: "Savings Goal", path: "/calculator/savings" },
]

export function Hero() {
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <section className="relative overflow-hidden bg-[#07111f]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20"
          style={{ background: "radial-gradient(ellipse, #1a4fba 0%, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Trusted by 12 million users worldwide
            </div>
          </div>

          <h1 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl lg:text-6xl text-white text-center leading-tight mb-5 max-w-3xl mx-auto">
            Smart Financial Calculations
            <span className="block italic text-blue-300">for Every Goal</span>
          </h1>
          <p className="text-center text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Free, accurate, and instant. From mortgages to investments — get the numbers
            you need to make confident decisions.
          </p>

          <div className="relative max-w-lg mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full text-left pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 text-base outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition"
            >
              Search any calculator...
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:-translate-y-[calc(50%+2px)]"
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {POPULAR.map((p) => (
              <button
                key={p.label}
                onClick={() => navigate(p.path)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-slate-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.id}`)}
                  className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 hover:border-white/20 group hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors font-medium">
                    {cat.label}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-slate-500 text-xs font-medium">
            {[
              "No sign-up required",
              "100% Free forever",
              "Privacy-first — no data stored",
              "Instant results",
            ].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
