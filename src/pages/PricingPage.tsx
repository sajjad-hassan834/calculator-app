import { useState } from "react"
import { Check, X, Sparkles, Building2, User, ArrowRight, CreditCard } from "lucide-react"
import { AuroraBackground } from "../components/motion/AuroraBackground"
import { ScrollReveal } from "../components/motion/ScrollReveal"

const PRICING_PLANS = [
  {
    name: "Basic",
    description: "Perfect for personal use and simple calculations.",
    price: { monthly: 0, yearly: 0 },
    icon: User,
    features: [
      { name: "Access to 50+ basic calculators", included: true },
      { name: "Instant results", included: true },
      { name: "Ad-supported experience", included: true },
      { name: "Save history locally", included: false },
      { name: "Export to PDF/Excel", included: false },
      { name: "AI-driven insights", included: false },
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline"
  },
  {
    name: "Pro",
    description: "For professionals needing advanced tools and exports.",
    price: { monthly: 9.99, yearly: 99 },
    icon: Sparkles,
    popular: true,
    features: [
      { name: "Everything in Basic", included: true },
      { name: "100% Ad-free experience", included: true },
      { name: "Save calculation history", included: true },
      { name: "Export to PDF/Excel", included: true },
      { name: "Advanced tax & business tools", included: true },
      { name: "AI-driven financial insights", included: true },
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "primary"
  },
  {
    name: "Business",
    description: "For firms and teams who need white-labeling and APIs.",
    price: { monthly: 49, yearly: 490 },
    icon: Building2,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "White-label reports (Your Logo)", included: true },
      { name: "API Access (10k req/mo)", included: true },
      { name: "Team accounts (up to 5)", included: true },
      { name: "Priority email support", included: true },
      { name: "Custom calculator development", included: true },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline"
  }
]

export function PricingPage() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <AuroraBackground className="pt-32 pb-24 border-b border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Simple, transparent pricing
              </h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Choose the plan that fits your needs. From personal finance to enterprise solutions, we have you covered.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                <button 
                  onClick={() => setAnnual(!annual)}
                  className="w-16 h-8 rounded-full bg-secondary relative border border-border/50 cursor-pointer focus:outline-none transition-colors"
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-primary transition-all duration-300 shadow-md ${annual ? 'left-9' : 'left-1'}`} />
                </button>
                <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                  Annually <span className="text-success text-xs font-bold ml-1 px-2 py-0.5 rounded-full bg-success/10 border border-success/20">Save 20%</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </AuroraBackground>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PRICING_PLANS.map((plan, i) => {
            const price = annual ? plan.price.yearly : plan.price.monthly
            const Icon = plan.icon
            return (
              <ScrollReveal key={plan.name} variant="fade-up" delay={i * 150}>
                <div className={`relative glass-card rounded-[2rem] p-8 ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10 -translate-y-4' : 'border-border/50 hover:border-border transition-colors'}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full shadow-lg border border-white/10 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">{plan.description}</p>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">${price}</span>
                      <span className="text-muted-foreground font-medium">/{annual && plan.price.yearly > 0 ? 'yr' : 'mo'}</span>
                    </div>
                    {annual && plan.price.yearly > 0 && (
                      <div className="text-sm text-success font-medium mt-2">Billed ${price} annually</div>
                    )}
                  </div>
                  
                  <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mb-8 shadow-sm hover:shadow-md ${
                    plan.buttonVariant === 'primary' 
                      ? 'bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-0.5' 
                      : 'glass border border-border/50 text-foreground hover:bg-secondary'
                  }`}>
                    {plan.buttonText} {plan.buttonVariant === 'primary' && <ArrowRight className="w-4 h-4" />}
                  </button>
                  
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">What's included</div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="mt-0.5 p-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="mt-0.5 p-0.5 rounded-full text-muted-foreground/40 shrink-0">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>
      
      {/* Global Payment Methods Banner */}
      <section className="py-16 bg-card border-y border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">Supporting seamless global payments</p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos represented as text/icons for now */}
            <div className="text-xl font-bold font-serif flex items-center gap-2"><CreditCard className="w-6 h-6"/> Stripe</div>
            <div className="text-xl font-bold font-serif flex items-center gap-2"><CreditCard className="w-6 h-6"/> PayPal</div>
            <div className="text-xl font-bold font-serif flex items-center gap-2"><CreditCard className="w-6 h-6"/> Razorpay</div>
            <div className="text-xl font-bold font-serif flex items-center gap-2"><CreditCard className="w-6 h-6"/> JazzCash</div>
            <div className="text-xl font-bold font-serif flex items-center gap-2"><CreditCard className="w-6 h-6"/> EasyPaisa</div>
          </div>
        </div>
      </section>
    </div>
  )
}
