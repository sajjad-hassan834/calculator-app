import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Search, Home, TrendingUp, CreditCard, PiggyBank, Shield, Percent, Briefcase, GraduationCap, DollarSign, Building2, ArrowRight } from "lucide-react"
import { SearchOverlay } from "../components/shared/SearchOverlay"
import { AuroraBackground } from "../components/motion/AuroraBackground"
import { ScrollReveal } from "../components/motion/ScrollReveal"
import { AnimatedNumber } from "../components/motion/AnimatedNumber"

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
]

const POPULAR = [
  { label: "Mortgage Calculator", path: "/calculator/mortgage" },
  { label: "Compound Interest", path: "/calculator/compound" },
  { label: "Loan Calculator", path: "/calculator/loan" },
  { label: "Retirement Planner", path: "/calculator/retirement" },
]

export function Hero({ title, subtitle }: { title?: string, subtitle?: string }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  // Simulate a live counter starting from a high number and ticking up
  const [calculationsToday, setCalculationsToday] = useState(12847200)

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculationsToday(prev => prev + Math.floor(Math.random() * 5) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AuroraBackground className="pt-24 pb-16 lg:pt-32 lg:pb-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 relative">
              <ScrollReveal variant="fade-up" delay={100}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 glass rounded-full text-foreground/80 text-xs font-medium border border-border/50">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Live: <AnimatedNumber value={calculationsToday} className="font-bold text-primary" /> calculations today
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={200}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                  {title ? (
                    <span dangerouslySetInnerHTML={{ __html: title.replace('\n', '<br/>') }} />
                  ) : (
                    <>Financial clarity, <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-300%">instantly.</span></>
                  )}
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={300}>
                <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                  {subtitle || "Make smarter financial decisions with our suite of free, expert-built calculators. No sign-up required."}
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={400}>
                <div className="relative max-w-xl mb-8 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="w-full text-left pl-14 pr-32 py-5 glass-card rounded-2xl text-muted-foreground text-base sm:text-lg hover:border-primary/50 transition-all shadow-lg"
                  >
                    What do you want to calculate?
                  </button>
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-md flex items-center gap-2 group-hover:translate-x-1"
                  >
                    Search <ArrowRight className="w-4 h-4 hidden sm:block" />
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={500}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Trending:</span>
                  {POPULAR.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => navigate(p.path)}
                      className="px-4 py-2 glass rounded-full text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all hover:-translate-y-0.5 border border-border/50"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Visuals (Floating Cards) */}
            <div className="hidden lg:block lg:col-span-5 relative h-[600px] w-full">
              <ScrollReveal variant="float" delay={300} className="absolute top-10 right-0 w-[280px] glass-card rounded-2xl p-6 z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Monthly Payment</div>
                    <div className="text-2xl font-bold text-foreground">$2,450</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[70%]" />
                </div>
              </ScrollReveal>

              <ScrollReveal variant="float" delay={150} className="absolute top-1/2 -translate-y-1/2 -left-10 w-[260px] glass-card rounded-2xl p-6 z-10 scale-90 opacity-90" style={{ animationDelay: '1s', animationDuration: '7s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Est. Returns</div>
                    <div className="text-2xl font-bold text-foreground">+14.2%</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-full bg-secondary rounded-md" />
                  <div className="h-14 w-full bg-secondary rounded-md" />
                  <div className="h-16 w-full bg-accent rounded-md" />
                  <div className="h-20 w-full bg-secondary rounded-md" />
                </div>
              </ScrollReveal>
              
              <ScrollReveal variant="float" delay={600} className="absolute bottom-16 right-10 w-[240px] glass-card rounded-2xl p-5 z-30" style={{ animationDelay: '2s', animationDuration: '5s' }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium text-muted-foreground">Tax Savings</div>
                  <Shield className="w-4 h-4 text-success" />
                </div>
                <div className="text-3xl font-bold text-success mb-1">$4,200</div>
                <div className="text-xs text-muted-foreground">Per year optimization</div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Bottom Curved Divider */}
        <div className="curved-divider-bottom hidden lg:block">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
      </AuroraBackground>

      {/* Categories Row (Pushed down slightly by the divider) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <ScrollReveal variant="fade-up" delay={600}>
          <div className="flex overflow-x-auto pb-6 pt-4 gap-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.id}`)}
                  className="flex flex-col items-center gap-3 p-5 glass-card min-w-[120px] rounded-2xl hover:border-primary/40 group hover:-translate-y-2 cursor-pointer snap-start transition-all shadow-sm hover:shadow-md"
                >
                  <div className="p-3 bg-secondary group-hover:bg-primary/10 rounded-xl transition-colors">
                    <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {cat.label}
                  </span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>
      </section>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
