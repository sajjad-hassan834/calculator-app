import { Link } from "react-router"
import { Calculator, Globe, Mail, Twitter, Linkedin, Youtube } from "lucide-react"

const FOOTER_LINKS = {
  Calculators: [
    { label: "Mortgage", path: "/calculator/mortgage" },
    { label: "Compound Interest", path: "/calculator/compound" },
    { label: "Loan Repayment", path: "/calculator/loan" },
    { label: "Savings Goal", path: "/calculator/savings" },
    { label: "Retirement Planner", path: "/calculator/retirement" },
    { label: "ROI Calculator", path: "/calculator/roi" },
    { label: "Tax Calculator", path: "/calculator/tax" },
    { label: "Investment Growth", path: "/calculator/investment" },
    { label: "Break-Even Analysis", path: "/calculator/break-even" },
  ],
  Categories: [
    { label: "Investments", path: "/category/investments" },
    { label: "Loans & Mortgages", path: "/category/mortgage" },
    { label: "Savings & Goals", path: "/category/savings" },
    { label: "Retirement", path: "/category/retirement" },
    { label: "Tax Planning", path: "/category/tax" },
    { label: "Business Finance", path: "/category/business" },
    { label: "Personal Finance", path: "/category/personal" },
    { label: "Real Estate", path: "/category/realestate" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "How It Works", path: "/about" },
    { label: "Methodology", path: "/about" },
    { label: "Accessibility", path: "/accessibility" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "Sitemap", path: "/sitemap" },
  ],
  Legal: [
    { label: "Privacy Policy", path: "/legal/privacy" },
    { label: "Terms of Service", path: "/legal/terms" },
    { label: "Cookie Policy", path: "/legal/cookies" },
    { label: "Disclaimer", path: "/legal/disclaimer" },
    { label: "Accessibility Statement", path: "/accessibility" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#07111f] text-slate-400" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <span className="font-['DM_Serif_Display',serif] text-white text-base">FinanceCalc</span>
            </Link>
            <p className="text-xs leading-relaxed mb-5 text-slate-500">
              Free, accurate financial calculators for everyone. Trusted by millions since 2018.
            </p>
            <div className="flex gap-2 mb-5">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
                { icon: Mail, label: "Email" },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <button
                    key={s.label}
                    className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>
            <div className="text-xs text-slate-600">
              <span className="text-slate-500">Version</span> 2.0.0
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.path} className="text-xs text-slate-500 hover:text-slate-300 transition-all duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>2026 FinanceCalculator.com — All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> English (USD) &bull; Educational purposes only.
          </span>
        </div>
      </div>
    </footer>
  )
}
