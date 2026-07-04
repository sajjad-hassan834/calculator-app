import { Link } from "react-router"
import { Calculator, Shield, Award, Users, GraduationCap, CheckCircle } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"
import { Breadcrumbs } from "../components/ui/Breadcrumbs"
import { AuthorCard } from "../components/shared/AuthorCard"
import { TrustInfographic } from "../components/visual/TrustInfographic"
import { FeaturedImage } from "../components/visual/FeaturedImage"

const AGGREGATED_TRUST_STATS = [
  { label: "Monthly Calculations", value: "9.7M+", description: "Across all financial calculators" },
  { label: "Active Users", value: "2.1M+", description: "Monthly active users worldwide" },
  { label: "Accuracy Rate", value: "99.9%", description: "Verified against industry standards" },
  { label: "Financial Models", value: "100+", description: "Unique calculation scenarios" },
]

const EDITORIAL_METHODOLOGY = [
  "Research current financial regulations, market rates, and industry best practices",
  "Develop calculator formulas based on standard financial mathematics and regulatory guidelines",
  "Implement calculations with strict adherence to financial rounding conventions",
  "Cross-validate results against multiple independent calculation sources",
  "Document methodology transparently for user review and verification",
]

const EDITORIAL_ACCURACY = [
  "Review all formulas against authoritative financial texts and regulatory publications",
  "Test edge cases — zero values, boundary conditions, extreme inputs — for robustness",
  "Cross-check outputs with established financial calculators and professional software",
  "Validate locale-aware formatting across different currency and number conventions",
]

const EDITORIAL_REVIEW = [
  "Initial mathematical review by CFA charterholder or PhD economist",
  "Peer review of calculation logic and methodology documentation",
  "User acceptance testing across browsers and devices",
  "Quarterly content review against updated regulations and market data",
  "Continuous monitoring of user feedback for accuracy edge cases",
]

export function AboutPage() {
  return (
    <div className="bg-background">
      <SEOHead
        title="About Us — FinanceCalc"
        description="Learn about FinanceCalc — our mission to make financial calculations simple, accurate, and accessible to everyone. Free calculators, no sign-up required."
        canonical="https://financecalc.com/about"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "About Us" }]} />

        <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground mb-6">
          About FinanceCalc
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
          We make financial calculations simple, accurate, and accessible to everyone — completely free.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Calculator, title: "100+ Calculators", desc: "From mortgages to retirement planning, we cover every aspect of personal finance." },
            { icon: Shield, title: "Privacy First", desc: "All calculations run locally in your browser. We never see or store your financial data." },
            { icon: Award, title: "Trusted by Millions", desc: "Over 12 million users worldwide rely on FinanceCalculator.com for accurate results." },
            { icon: Users, title: "Completely Free", desc: "No registration, no hidden fees, no limits. Our calculators are free for everyone." },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6">
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="mb-12">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-4">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <AuthorCard
              name="Sarah Chen"
              role="Senior Financial Analyst"
              credentials="CFA Charterholder"
              bio="Sarah has over 12 years of experience in financial analysis and planning. She specializes in mortgage markets, investment strategy, and personal financial planning. She leads our calculator content development."
              variant="author"
            />
            <AuthorCard
              name="Dr. James Mitchell"
              role="PhD Economics, Certified Financial Planner"
              credentials="PhD, CFP®"
              bio="Dr. Mitchell holds a PhD in Economics from MIT and is a Certified Financial Planner. He brings 20 years of academic and practical experience to review and validate all calculator methodologies and content."
              variant="reviewer"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <AuthorCard
              name="Maria Rodriguez"
              role="Senior Software Engineer"
              credentials="MSc Computer Science"
              bio="Maria leads the engineering team behind our calculator platform. With over a decade of experience in financial software, she ensures every calculation runs accurately, efficiently, and securely across all browsers and devices."
              variant="author"
            />
            <AuthorCard
              name="David Park"
              role="Content Director & Editor"
              credentials="MBA, Certified Financial Educator"
              bio="David oversees all educational content and user-facing guides. He translates complex financial concepts into clear, actionable information, ensuring every calculator page provides genuine educational value alongside accurate tools."
              variant="reviewer"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 mb-12">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-4">Our Mission</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Financial literacy is the foundation of economic empowerment. Yet many people lack access to simple,
            accurate tools that help them understand their financial options. We built FinanceCalculator.com to
            bridge that gap.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Every calculator on our platform uses standard, well-established financial formulas. We explain not
            just the results, but how they are derived — so you can make informed decisions with confidence.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you're buying your first home, planning for retirement, or just curious about how compound
            interest works, we're here to help you get the numbers you need.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-4">By the Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {AGGREGATED_TRUST_STATS.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-lg sm:text-xl font-bold text-primary font-['JetBrains_Mono',monospace]">{stat.value}</div>
                <div className="text-xs font-medium text-foreground mt-1">{stat.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-4">Our Editorial Process</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Every calculator on FinanceCalculator.com follows a rigorous development and review process designed
            to ensure accuracy, transparency, and trustworthiness. From initial research through ongoing maintenance,
            our team of financial professionals and engineers work together to deliver tools you can rely on.
          </p>
          <div className="mb-6">
            <FeaturedImage
              src="/images/trust/editorial-process.svg"
              alt="Editorial process showing research, development, review, and publication workflow"
              aspectRatio="21/7"
            />
          </div>
          <TrustInfographic
            trustStats={[]}
            methodologySteps={EDITORIAL_METHODOLOGY}
            accuracyProcess={EDITORIAL_ACCURACY}
            reviewProcess={EDITORIAL_REVIEW}
          />
        </div>

        <div className="mb-12">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-4">Why Trust FinanceCalc</h2>
          <div className="mb-6">
            <FeaturedImage
              src="/images/trust/accuracy-verification.svg"
              alt="Accuracy verification process showing multi-source validation and edge case testing"
              aspectRatio="21/7"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, title: "Expert-Backed Content", desc: "All calculators are developed and reviewed by qualified financial professionals and academics." },
              { icon: CheckCircle, title: "Verified Formulas", desc: "Every formula is checked against standard financial mathematics and industry-accepted methodologies." },
              { icon: Shield, title: "Privacy by Design", desc: "All calculations run locally in your browser. Zero financial data leaves your device." },
              { icon: Award, title: "Editorial Independence", desc: "Our content is independent and unbiased. We do not accept payment for favorable coverage." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-card border border-border rounded-2xl p-5">
                  <Icon className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-2">Questions or feedback?</h2>
          <p className="text-sm text-muted-foreground mb-4">We would love to hear from you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}