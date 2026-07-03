import { SEOHead } from "../components/seo/SEOHead"
import { Coffee, Heart, Zap, Sparkles } from "lucide-react"

export function SupportPage() {
  return (
    <>
      <SEOHead
        title="Support Us | FinanceCalc"
        description="Help keep FinanceCalc free and accessible to everyone by supporting our development."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 text-amber-500 rounded-2xl mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl font-normal text-foreground mb-6">
            Support Our Mission
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We built FinanceCalc to provide everyone with free, accurate, and easy-to-use financial tools. We don't run intrusive ads or sell your data. If you found our tools helpful, consider buying us a coffee!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Tier 1 */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-primary/50 transition-colors">
            <div className="mb-4">
              <Coffee className="w-6 h-6 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground">Coffee</h3>
              <p className="text-sm text-muted-foreground mt-1">A simple thank you.</p>
            </div>
            <div className="text-3xl font-bold text-foreground mb-6">$3</div>
            <button
              onClick={() => alert("Payment integration coming soon!")}
              className="mt-auto w-full py-2.5 px-4 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
            >
              Donate $3
            </button>
          </div>

          {/* Tier 2 */}
          <div className="bg-card border-2 border-primary rounded-2xl p-6 flex flex-col relative shadow-[0_0_40px_rgba(37,99,235,0.1)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
              Most Popular
            </div>
            <div className="mb-4">
              <Zap className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground">Server Fund</h3>
              <p className="text-sm text-muted-foreground mt-1">Keep the lights on.</p>
            </div>
            <div className="text-3xl font-bold text-foreground mb-6">$10</div>
            <button
              onClick={() => alert("Payment integration coming soon!")}
              className="mt-auto w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              Donate $10
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-primary/50 transition-colors">
            <div className="mb-4">
              <Sparkles className="w-6 h-6 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground">Super Supporter</h3>
              <p className="text-sm text-muted-foreground mt-1">Fund new calculators.</p>
            </div>
            <div className="text-3xl font-bold text-foreground mb-6">$25</div>
            <button
              onClick={() => alert("Payment integration coming soon!")}
              className="mt-auto w-full py-2.5 px-4 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
            >
              Donate $25
            </button>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground max-w-xl mx-auto">
          <p>
            All donations go directly towards server costs, maintenance, and the development of new free tools. Thank you for your support!
          </p>
        </div>
      </div>
    </>
  )
}
