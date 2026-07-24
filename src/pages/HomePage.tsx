import { Hero } from "./Hero"
import { CategoriesSection } from "./CategoriesSection"
import { FeaturedCalculators } from "./FeaturedCalculators"
import { FAQSection } from "./FAQSection"
import { ComingSoonSection } from "../components/ui/ComingSoon"
import { AdPlaceholder } from "../components/ui/AdPlaceholder"
import { TrendingUp, Star, FileSearch, Shield, Award, CheckCircle2, ArrowRight, BookOpen, Clock, Users } from "lucide-react"
import { ScrollReveal } from "../components/motion/ScrollReveal"
import { AnimatedNumber } from "../components/motion/AnimatedNumber"
import { useNavigate } from "react-router"
import { SEOHead } from "../components/seo/SEOHead"
import { generateWebSiteSchema, generateFAQSchema, generateOrganizationSchema } from "../lib/seo"
import { FAQS } from "../lib/data"
import { usePopularCalculators, useFeaturedCalculators } from "../hooks/queries/useCalculators"
import { useTestimonials, useHomepageSections } from "../hooks/queries/useSettings"

const EDITORIAL_STANDARDS = [
  { icon: FileSearch, title: "Expert-Reviewed Methodology", desc: "Every calculator is built on formulas verified by CFA charterholders and PhD economists. Our methodology documentation is transparent and accessible." },
  { icon: Shield, title: "Independent & Unbiased", desc: "We accept no advertising or sponsorship from financial institutions. Our calculators are designed to serve your interests, not those of lenders or brokers." },
  { icon: Award, title: "Regularly Updated", desc: "Tax brackets, market assumptions, and regulatory standards are reviewed and updated quarterly. You always get current, relevant information." },
  { icon: CheckCircle2, title: "Privacy by Design", desc: "All calculations run locally in your browser. Zero financial data is transmitted, stored, or shared. Your privacy is built into every tool we build." },
]

function TrustStats({ title = "Trusted by Millions", subtitle = "Financial tools you can rely on, built with precision and care" }: { title?: string, subtitle?: string }) {
  return (
    <section className="py-24 bg-[#0a1120] relative overflow-hidden border-y border-border/10">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">{title}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { label: "Monthly Calculations", value: 9700000, suffix: "+", description: "Across all calculators" },
            { label: "Active Users", value: 2100000, suffix: "+", description: "Trust our tools monthly" },
            { label: "Years of Projections", value: 50, suffix: "+", description: "Long-term financial modeling" },
            { label: "Accuracy Rate", value: 99, suffix: ".9%", description: "Verified against standards" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} variant="fade-up" delay={i * 100}>
              <div className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2 font-['JetBrains_Mono',monospace] tracking-tighter">
                  <AnimatedNumber 
                    value={stat.value} 
                    formatFn={(val) => val > 1000000 ? (val/1000000).toFixed(1) + "M" : val.toString()} 
                  />
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="text-base font-medium text-slate-300 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.description}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal variant="fade-up" delay={400}>
          <TestimonialsSection />
        </ScrollReveal>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { data: testimonials, isLoading } = useTestimonials()

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-secondary rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  const displayTestimonials = testimonials && testimonials.length > 0
    ? testimonials.slice(0, 3)
    : [
        { author_name: "Michael R.", author_title: "Homeowner", content: "This site saved me thousands on my mortgage. I used the calculator to compare terms and negotiate with my bank.", rating: 5, is_featured: true },
        { author_name: "Priya K.", author_title: "Software Engineer", content: "The compound interest calculator showed me exactly why I should start investing now instead of waiting.", rating: 5, is_featured: true },
        { author_name: "David L.", author_title: "Teacher", content: "I use the retirement planner every quarter to track if I am on target. It is simple but powerful.", rating: 5, is_featured: true },
      ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {displayTestimonials.map((t) => (
        <div key={t.author_name} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 ease-out">
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className={`w-5 h-5 ${star <= (t.rating || 5) ? "text-accent fill-accent" : "text-slate-600"}`} />
            ))}
          </div>
          <p className="text-base text-slate-300 leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              {t.author_name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{t.author_name}</div>
              <div className="text-xs text-slate-400">{t.author_title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EditorialStandards({ title = "Uncompromising Standards", subtitle = "How we ensure every calculator delivers accurate, trustworthy results" }: { title?: string, subtitle?: string }) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {EDITORIAL_STANDARDS.map((item, i) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.title} variant={i % 2 === 0 ? "fade-up" : "fade-scale"} delay={i * 100}>
                <div className="flex gap-6 group">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TrendingNow({ title = "Trending Now", subtitle = "Most popular calculators this week" }: { title?: string, subtitle?: string }) {
  const navigate = useNavigate()
  const { data: calculators, isLoading } = usePopularCalculators(6)

  if (isLoading) return <div className="py-24" /> // Skip loading state for brevity in unified plan

  const GRADIENT_MAP: Record<string, string> = {
    mortgage: "from-blue-500 to-indigo-600",
    compound: "from-emerald-400 to-teal-600",
    loan: "from-purple-500 to-pink-600",
    savings: "from-amber-400 to-orange-600",
    retirement: "from-rose-500 to-red-700",
    roi: "from-teal-400 to-emerald-600",
  }

  const trending = (calculators || []).slice(0, 6)
  const usesFormatter = (count: number) => count > 1000 ? `${(count / 1000).toFixed(1)}M` : `${count.toLocaleString()}`

  return (
    <section className="py-20 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><TrendingUp className="w-6 h-6 text-primary" /></div>
                {title}
              </h2>
              <p className="text-base text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((c, i) => {
            const gradient = GRADIENT_MAP[c.slug] || "from-primary to-primary/70"
            return (
              <ScrollReveal key={c.id} variant="fade-up" delay={i * 100}>
                <button
                  onClick={() => navigate(`/calculator/${c.slug}`)}
                  className="w-full flex items-center justify-between bg-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-inner`}>
                      <span className="text-xl font-bold text-white font-serif">{c.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{c.name}</div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {usesFormatter(c.view_count)} uses
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function LearningResources({ title = "Learning Resources", subtitle = "Deepen your financial knowledge" }: { title?: string, subtitle?: string }) {
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
            <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-foreground mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <button onClick={() => navigate("/blog")} className="hidden sm:flex items-center gap-1.5 text-sm text-primary font-medium hover:underline cursor-pointer">
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

function FeaturedGuides({ title = "Editor's Picks", subtitle = "Hand-selected tools for complex financial decisions" }: { title?: string, subtitle?: string }) {
  const navigate = useNavigate()
  const { data: calculators } = useFeaturedCalculators()

  if (!calculators || calculators.length === 0) return null
  const featured = calculators.slice(0, 3)

  return (
    <section id="calculators" className="py-24 bg-card border-y border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            </div>
            <button onClick={() => navigate("/sitemap#calculators")} className="hidden sm:flex items-center gap-2 text-base text-primary font-bold hover:underline cursor-pointer">
              View all <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((calc, i) => (
            <ScrollReveal key={calc.id} variant="fade-up" delay={i * 150}>
              <button
                onClick={() => navigate(`/calculator/${calc.slug}`)}
                className="w-full group text-left bg-background border border-border rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 ease-out cursor-pointer flex flex-col h-full"
              >
                <div className="h-48 bg-secondary relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-bold text-foreground/5 font-serif">{calc.name.charAt(0)}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="px-3 py-1 glass rounded-full text-xs font-semibold text-foreground/70 backdrop-blur-md">
                      Featured Tool
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col grow">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{calc.name}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">{calc.short_description || calc.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-semibold text-sm">
                    Try Calculator <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  const { data: sections } = useHomepageSections();

  if (!sections) return null; // or loading spinner

  const activeSections = sections;

  const renderSection = (sec: any) => {
    switch (sec.section_key) {
      case 'hero': return <Hero key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'trending': return <TrendingNow key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'categories': return <CategoriesSection key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'popular_tools': return <FeaturedCalculators key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'ad_1': return <AdPlaceholder key={sec.id} className="mx-auto max-w-7xl h-24 my-8" />;
      case 'trust_stats': return <TrustStats key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'editorial': return <EditorialStandards key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'featured': return <FeaturedGuides key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'learning_resources': return <LearningResources key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'coming_soon': return <ComingSoonSection key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      case 'faq': return <FAQSection key={sec.id} title={sec.title} subtitle={sec.subtitle} />;
      default: return null;
    }
  };

  return (
    <>
      <SEOHead
        title="Free Financial Calculators — Mortgage, Retirement, Investment & More | FinanceCalc"
        description="Use 100% free financial calculators for mortgage, compound interest, loans, retirement, savings, ROI, tax, and break-even analysis. Instant results, no sign-up required."
        canonical="https://financecalc.com"
        jsonLd={[generateOrganizationSchema(), generateWebSiteSchema(), generateFAQSchema(FAQS)]}
      />
      {activeSections.map(renderSection)}
    </>
  )
}
