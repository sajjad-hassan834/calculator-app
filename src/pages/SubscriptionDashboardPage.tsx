import { useState } from "react"
import { CreditCard, CheckCircle, ArrowRight, Star } from "lucide-react"
import { AuroraBackground } from "../components/motion/AuroraBackground"
import { ScrollReveal } from "../components/motion/ScrollReveal"
import { Link } from "react-router"

export function SubscriptionDashboardPage() {
  const [activePlan] = useState("Pro") // Mock active plan

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your subscription? You will lose access to premium tools at the end of your billing cycle.")) {
      alert("Subscription cancelled successfully.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AuroraBackground className="pt-32 pb-16 border-b border-border/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <ScrollReveal variant="fade-up">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Billing & Subscription
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your premium plan, payment methods, and billing history.
            </p>
          </ScrollReveal>
        </div>
      </AuroraBackground>

      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 space-y-8">
        
        {/* Current Plan Card */}
        <ScrollReveal variant="fade-up">
          <div className="glass-card rounded-[2rem] p-8 border-border/50 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Star className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-4">
                <CheckCircle className="w-3.5 h-3.5" /> Active Subscription
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{activePlan} Plan</h2>
              <p className="text-muted-foreground">You are currently billed <strong className="text-foreground">$9.99/month</strong>.</p>
              <p className="text-sm text-muted-foreground mt-1">Your next billing date is <strong>August 12, 2026</strong>.</p>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto relative z-10">
              <Link to="/pricing" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-center hover:opacity-90 transition shadow-md flex items-center justify-center gap-2">
                Upgrade Plan <ArrowRight className="w-4 h-4" />
              </Link>
              <button 
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl border border-destructive/30 text-destructive font-medium text-center hover:bg-destructive/5 transition"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Method */}
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 rounded-2xl border-border/50 h-full">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Payment Method
              </h3>
              
              <div className="flex items-center justify-between p-4 bg-secondary rounded-xl border border-border/50 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-800 text-xs italic">
                    VISA
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Visa ending in 4242</div>
                    <div className="text-xs text-muted-foreground">Expires 12/28</div>
                  </div>
                </div>
                <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Default</div>
              </div>
              
              <button className="text-sm font-medium text-primary hover:underline transition">
                + Add new payment method
              </button>
            </div>
          </ScrollReveal>

          {/* Billing History */}
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 rounded-2xl border-border/50 h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">Billing History</h3>
              
              <div className="space-y-4">
                {[
                  { date: "Jul 12, 2026", amount: "$9.99", status: "Paid" },
                  { date: "Jun 12, 2026", amount: "$9.99", status: "Paid" },
                  { date: "May 12, 2026", amount: "$9.99", status: "Paid" }
                ].map((invoice, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 last:pb-0">
                    <div>
                      <div className="text-sm font-medium text-foreground">{invoice.date}</div>
                      <div className="text-xs text-muted-foreground">Pro Plan - Monthly</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground">{invoice.amount}</div>
                      <div className="text-xs text-emerald-500 font-medium flex items-center gap-1 justify-end">
                        <CheckCircle className="w-3 h-3" /> {invoice.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="text-sm font-medium text-primary hover:underline transition mt-6 block">
                Download All Invoices
              </button>
            </div>
          </ScrollReveal>
        </div>

      </section>
    </div>
  )
}
