import { useMemo } from "react"
import { Lightbulb, TrendingUp, AlertTriangle, ArrowRight, Sparkles } from "lucide-react"
import type { CalcMeta } from "../../lib/calculatorMeta"

interface AIInsightsProps {
  calcType: string
  values: Record<string, number>
  results: Record<string, number>
  meta: CalcMeta
}

function generateInsights(
  calcType: string,
  values: Record<string, number>,
  results: Record<string, number>
): { type: "insight" | "warning" | "recommendation"; icon: any; title: string; text: string }[] {
  const insights: { type: "insight" | "warning" | "recommendation"; icon: any; title: string; text: string }[] = []

  switch (calcType) {
    case "mortgage": {
      const monthly = results.monthlyPayment || 0
      const totalInterest = results.totalInterest || 0
      const homePrice = values.homePrice || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Monthly Payment Impact",
        text: `Your monthly payment of $${Math.round(monthly).toLocaleString()} represents ${((monthly / (homePrice / 12)) * 100).toFixed(1)}% of your 1/12th annual home price.`,
      })
      if (values.downPayment && values.downPayment < 20) {
        insights.push({
          type: "warning",
          icon: AlertTriangle,
          title: "PMI May Apply",
          text: `With a ${values.downPayment}% down payment (under 20%), you may need Private Mortgage Insurance (PMI), adding approximately $100-$300 to your monthly payment.`,
        })
      }
      insights.push({
        type: "recommendation",
        icon: Sparkles,
        title: "Interest Savings Opportunity",
        text: `Paying an extra $100/month could save you approximately $${Math.round(totalInterest * 0.15).toLocaleString()} in interest and shorten your loan by several years.`,
      })
      break
    }
    case "compound": {
      const fv = results.fv || 0
      const principal = values.cpPrincipal || 0
      const interest = fv - principal
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Growth Breakdown",
        text: `Of the final $${Math.round(fv).toLocaleString()}, $${Math.round(principal).toLocaleString()} (${((principal / fv) * 100).toFixed(1)}%) is your principal and $${Math.round(interest).toLocaleString()} (${((interest / fv) * 100).toFixed(1)}%) is earned interest.`,
      })
      insights.push({
        type: "recommendation",
        icon: Sparkles,
        title: "Time is Your Greatest Asset",
        text: `If you extended your investment period by 5 more years, your final value could grow to approximately $${Math.round(fv * Math.pow(1 + (values.cpRate || 7) / 100, 5)).toLocaleString()}.`,
      })
      break
    }
    case "loan": {
      const monthly = results.monthlyPayment || 0
      const interest = results.interest || 0
      const loanAmt = values.loanAmt || 0
      const term = values.loanTerm || 5
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Cost of Borrowing",
        text: `Over ${term} years, you will pay $${Math.round(interest).toLocaleString()} in interest, making your total repayment $${Math.round((loanAmt + interest)).toLocaleString()}.`,
      })
      if (term > 3) {
        insights.push({
          type: "recommendation",
          icon: Sparkles,
          title: "Consider a Shorter Term",
          text: `A ${Math.max(1, term - 2)}-year term would increase monthly payments but could save approximately $${Math.round(interest * 0.3).toLocaleString()} in total interest.`,
        })
      }
      break
    }
    case "retirement": {
      const nestEgg = results.nestEgg || 0
      const monthlyWithdrawal = results.monthlyWithdrawal || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Retirement Readiness",
        text: `Your projected nest egg of $${Math.round(nestEgg).toLocaleString()} could provide approximately $${Math.round(monthlyWithdrawal).toLocaleString()}/month in retirement.`,
      })
      if (monthlyWithdrawal < 2000) {
        insights.push({
          type: "warning",
          icon: AlertTriangle,
          title: "Potential Shortfall",
          text: `Your projected monthly withdrawal of $${Math.round(monthlyWithdrawal).toLocaleString()} may be below typical retirement needs. Consider increasing monthly contributions.`,
        })
      }
      break
    }
    case "savings": {
      const monthly = results.monthlyContribution || 0
      const target = values.svTarget || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Monthly Savings Target",
        text: `You need to save $${Math.round(monthly).toLocaleString()} each month to reach your goal of $${Math.round(target).toLocaleString()}.`,
      })
      break
    }
    case "roi": {
      const totalROI = results.roi || 0
      const annualized = results.annualizedROI || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Investment Performance",
        text: `Your investment achieved a ${totalROI.toFixed(1)}% total return, or ${annualized.toFixed(1)}% annualized.`,
      })
      break
    }
    case "investment": {
      const fv = results.fv || 0
      const contributions = results.totalContributions || 0
      const returns = fv - contributions
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Returns vs Contributions",
        text: `Of the final $${Math.round(fv).toLocaleString()}, you contributed $${Math.round(contributions).toLocaleString()} and earned $${Math.round(returns).toLocaleString()} in returns (${((returns / fv) * 100).toFixed(1)}% of the total).`,
      })
      break
    }
    case "tax": {
      const totalTax = results.totalTax || 0
      const effectiveRate = results.effectiveRate || 0
      const marginalRate = results.marginalRate || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Tax Rate Analysis",
        text: `Your effective tax rate is ${effectiveRate.toFixed(1)}%, while your marginal rate is ${marginalRate.toFixed(1)}%. Additional income up to the next bracket ceiling will be taxed at ${marginalRate.toFixed(1)}%.`,
      })
      break
    }
    case "break-even": {
      const units = results.units || 0
      const revenue = results.revenue || 0
      const cm = results.contributionMargin || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Break-Even Analysis",
        text: `You need to sell ${Math.round(units).toLocaleString()} units ($${Math.round(revenue).toLocaleString()} in revenue) to break even. Each unit contributes $${Math.round(cm).toLocaleString()} toward fixed costs and profit.`,
      })
      break
    }
  }

  insights.push({
    type: "recommendation",
    icon: AlertTriangle,
    title: "Always Verify",
    text: "These estimates are for educational purposes. Consult a qualified financial advisor for personalized advice tailored to your specific situation.",
  })

  return insights.slice(0, 4)
}

export function AIInsights({ calcType, values, results, meta }: AIInsightsProps) {
  const insights = useMemo(
    () => generateInsights(calcType, values, results),
    [calcType, values, results]
  )

  return (
    <section className="py-12 bg-card border-t border-border" aria-label="Smart insights">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground">
            Smart Insights
          </h2>
        </div>
        <div className="space-y-3">
          {insights.map((insight, i) => {
            const Icon = insight.icon
            const borderColor =
              insight.type === "warning"
                ? "border-amber-500/20 bg-amber-500/5"
                : insight.type === "recommendation"
                  ? "border-blue-500/20 bg-blue-500/5"
                  : "border-emerald-500/20 bg-emerald-500/5"
            const iconColor =
              insight.type === "warning"
                ? "text-amber-500"
                : insight.type === "recommendation"
                  ? "text-blue-500"
                  : "text-emerald-500"
            return (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 border rounded-xl ${borderColor}`}
              >
                <Icon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
                <div>
                  <h3 className="text-sm font-medium text-foreground">{insight.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
