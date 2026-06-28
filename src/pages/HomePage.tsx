import { Hero } from "./Hero"
import { CategoriesSection } from "./CategoriesSection"
import { FeaturedCalculators } from "./FeaturedCalculators"
import { FAQSection } from "./FAQSection"
import { ComingSoonSection } from "../components/ui/ComingSoon"
import { AdPlaceholder } from "../components/ui/AdPlaceholder"
import { TrendingUp, Clock, BookOpen, Star, Quote } from "lucide-react"
import { useNavigate } from "react-router"
import { FEATURED } from "../lib/data"
import { ArrowRight } from "lucide-react"

function Testimonials() {
  const testimonials = [
    { quote: "This site saved me thousands on my mortgage. I used the calculator to compare terms and negotiate with my bank.", name: "Michael R.", role: "Homeowner" },
    { quote: "The compound interest calculator showed me exactly why I should start investing now instead of waiting.", name: "Priya K.", role: "Software Engineer" },
    { quote: "I use the retirement planner every quarter to track if I am on target. It is simple but powerful.", name: "David L.", role: "Teacher" },
  ]
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-2">Trusted by Millions</h2>
          <p className="text-sm text-muted-foreground">See what our users say about FinanceCalculator.com</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-background border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
              <Quote className="w-6 h-6 text-primary/30 mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="text-sm font-medium text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrendingNow() {
  const navigate = useNavigate()
  const trending = FEATURED.slice(0, 4)
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-1 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" /> Trending Now
            </h2>
            <p className="text-sm text-muted-foreground">Most popular calculators this week</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((c) => {
            const Icon = c.icon
            return (
              <button
                key={c.id}
                onClick={() => navigate(`/calculator/${c.id}`)}
                className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out text-left cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{c.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.uses} uses</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function LearningResources() {
  const resources = [
    { title: "Understanding Mortgage Rates", desc: "Learn how interest rates are determined and how to get the best rate.", icon: BookOpen, gradient: "from-blue-500 to-blue-700" },
    { title: "The Power of Compound Interest", desc: "Why Einstein called it the eighth wonder of the world.", icon: TrendingUp, gradient: "from-emerald-500 to-emerald-700" },
    { title: "Retirement Planning 101", desc: "A complete guide to building your nest egg.", icon: Clock, gradient: "from-rose-500 to-rose-700" },
    { title: "Tax Strategies for Investors", desc: "Minimize your tax burden with smart investment strategies.", icon: Star, gradient: "from-indigo-500 to-indigo-700" },
  ]
  const navigate = useNavigate()
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-1">Learning Resources</h2>
            <p className="text-sm text-muted-foreground">Deepen your financial knowledge</p>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-medium hover:underline transition-all duration-200">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((r) => {
            const Icon = r.icon
            return (
              <button
                key={r.title}
                onClick={() => navigate("/about")}
                className="group text-left bg-background border border-border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <Hero />
      <TrendingNow />
      <CategoriesSection />
      <FeaturedCalculators />
      <AdPlaceholder className="mx-auto max-w-7xl h-24 my-8" />
      <Testimonials />
      <LearningResources />
      <ComingSoonSection />
      <FAQSection />
    </>
  )
}
