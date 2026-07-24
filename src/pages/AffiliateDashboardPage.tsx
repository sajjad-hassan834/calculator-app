import { useState } from "react"
import { Copy, Link as LinkIcon, DollarSign, Users, MousePointerClick, CheckCircle, ExternalLink, Sparkles } from "lucide-react"
import { AuroraBackground } from "../components/motion/AuroraBackground"
import { ScrollReveal } from "../components/motion/ScrollReveal"

export function AffiliateDashboardPage() {
  const [copied, setCopied] = useState(false)
  const affiliateLink = "https://financecalculator.com/?ref=FINPRO2026"

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <AuroraBackground className="pt-32 pb-16 border-b border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <ScrollReveal variant="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Partner Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Track your referrals, manage your links, and monitor your earnings in real-time.
            </p>
          </ScrollReveal>
        </div>
      </AuroraBackground>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <ScrollReveal variant="fade-up" delay={0}>
            <div className="glass-card p-6 rounded-2xl border-border/50">
              <div className="flex items-center gap-3 text-muted-foreground mb-3">
                <MousePointerClick className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Total Clicks</span>
              </div>
              <div className="text-3xl font-bold text-foreground">1,245</div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={50}>
            <div className="glass-card p-6 rounded-2xl border-border/50">
              <div className="flex items-center gap-3 text-muted-foreground mb-3">
                <Users className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">Signups</span>
              </div>
              <div className="text-3xl font-bold text-foreground">84</div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <div className="glass-card p-6 rounded-2xl border-border/50">
              <div className="flex items-center gap-3 text-muted-foreground mb-3">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">Pending Payout</span>
              </div>
              <div className="text-3xl font-bold text-foreground">$125.50</div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={150}>
            <div className="glass-card p-6 rounded-2xl border-border/50">
              <div className="flex items-center gap-3 text-muted-foreground mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">Total Paid</span>
              </div>
              <div className="text-3xl font-bold text-foreground">$1,450.00</div>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal variant="fade-up">
              <div className="glass-card p-8 rounded-2xl border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-primary" /> Your Affiliate Link
                </h2>
                <p className="text-muted-foreground mb-6">
                  Share this link on your blog, social media, or newsletter to earn a 20% recurring commission for every paid user you refer.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-secondary rounded-xl p-4 font-mono text-sm text-foreground overflow-hidden text-ellipsis whitespace-nowrap border border-border/50">
                    {affiliateLink}
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="shrink-0 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity min-w-[120px]"
                  >
                    {copied ? (
                      <><CheckCircle className="w-4 h-4" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Link</>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up">
              <div className="glass-card p-8 rounded-2xl border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-6">Recent Referrals</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-muted-foreground">
                    <thead className="border-b border-border/50 text-foreground font-medium">
                      <tr>
                        <th className="py-4">Date</th>
                        <th className="py-4">Plan</th>
                        <th className="py-4">Commission</th>
                        <th className="py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      <tr>
                        <td className="py-4">Today, 10:23 AM</td>
                        <td className="py-4">Pro Monthly</td>
                        <td className="py-4 font-medium text-emerald-500">$2.00</td>
                        <td className="py-4 text-right"><span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded text-xs font-semibold border border-amber-500/20">Pending</span></td>
                      </tr>
                      <tr>
                        <td className="py-4">Yesterday</td>
                        <td className="py-4">Pro Yearly</td>
                        <td className="py-4 font-medium text-emerald-500">$19.80</td>
                        <td className="py-4 text-right"><span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded text-xs font-semibold border border-amber-500/20">Pending</span></td>
                      </tr>
                      <tr>
                        <td className="py-4">Oct 12, 2026</td>
                        <td className="py-4">Business Monthly</td>
                        <td className="py-4 font-medium text-emerald-500">$9.80</td>
                        <td className="py-4 text-right"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded text-xs font-semibold border border-emerald-500/20">Cleared</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            <ScrollReveal variant="fade-up">
              <div className="glass-card p-6 rounded-2xl border-border/50">
                <h3 className="font-bold text-foreground mb-4">Payout Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Method</label>
                    <div className="p-3 bg-secondary rounded-lg text-sm text-foreground border border-border/50">
                      PayPal
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Account</label>
                    <div className="p-3 bg-secondary rounded-lg text-sm text-foreground border border-border/50">
                      payouts@example.com
                    </div>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1 mt-2">
                    Edit Settings <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-2xl border border-primary/20">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Pro Tips
                </h3>
                <ul className="text-sm text-muted-foreground space-y-3 mt-4 list-disc list-inside">
                  <li>Embed your link in related blog posts.</li>
                  <li>Use our SEO calculators to attract traffic.</li>
                  <li>Share on LinkedIn and X for B2B traffic.</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
