import { useMemo } from "react"
import { TrendingUp, AlertTriangle, Sparkles } from "lucide-react"

interface AIInsightsProps {
  calcType: string
  values: Record<string, number>
  results: Record<string, number>
}

interface Insight {
  type: "insight" | "warning" | "recommendation" | "risk"
  icon: any
  title: string
  text: string
}

function generateInsights(
  calcType: string,
  values: Record<string, number>,
  results: Record<string, number>
): Insight[] {
  const insights: Insight[] = []

  switch (calcType) {
    case "mortgage": {
      const monthly = results.monthly || 0
      const totalInterest = results.totalInterest || 0
      const homePrice = values.homePrice || 0
      const rate = values.mortRate || 6.5
      const term = values.mortTerm || 30
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Monthly Payment Impact",
        text: `Your monthly payment of $${Math.round(monthly).toLocaleString()} represents ${((monthly / (homePrice / 12)) * 100).toFixed(1)}% of your 1/12th annual home price.`,
      })
      if (values.downPct && values.downPct < 20) {
        insights.push({
          type: "warning",
          icon: AlertTriangle,
          title: "PMI May Apply",
          text: `With a ${values.downPct}% down payment (under 20%), you may need Private Mortgage Insurance (PMI), adding approximately $100-$300 to your monthly payment.`,
        })
      }
      insights.push({
        type: "recommendation",
        icon: Sparkles,
        title: "Interest Savings Opportunity",
        text: `Paying an extra $100/month could save you approximately $${Math.round(totalInterest * 0.15).toLocaleString()} in interest and shorten your loan by several years.`,
      })
      if (rate > 7) {
        insights.push({
          type: "risk",
          icon: AlertTriangle,
          title: "Above-Average Rate",
          text: `Your rate of ${rate}% is above the current market average. Consider shopping around for a better rate or exploring refinancing options when rates drop.`,
        })
      }
      if (term > 20) {
        insights.push({
          type: "recommendation",
          icon: Sparkles,
          title: "15-Year vs 30-Year",
          text: `A 15-year term at the same rate would have a monthly payment of ~$${Math.round(monthly * 1.4).toLocaleString()} but could save over $${Math.round(totalInterest * 0.55).toLocaleString()} in total interest.`,
        })
      }
      break
    }
    case "compound": {
      const fv = results.fv || 0
      const principal = values.cpPrincipal || 0
      const rate = values.cpRate || 7
      const years = values.cpYears || 10
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
        text: `If you extended your investment period by 5 more years, your final value could grow to approximately $${Math.round(fv * Math.pow(1 + rate / 100, 5)).toLocaleString()}.`,
      })
      if (rate < 5) {
        insights.push({
          type: "risk",
          icon: AlertTriangle,
          title: "Conservative Return",
          text: `A ${rate}% return may not outpace inflation (typically 2-3%). Consider a more diversified portfolio for long-term growth potential.`,
        })
      }
      const doublingYears = 72 / rate
      if (doublingYears > 0) {
        insights.push({
          type: "insight",
          icon: TrendingUp,
          title: "Rule of 72",
          text: `At ${rate}% annual return, your money would double approximately every ${doublingYears.toFixed(1)} years.`,
        })
      }
      break
    }
    case "loan": {
      const monthly = results.monthly || 0
      const interest = results.interest || 0
      const loanAmt = values.loanAmt || 0
      const term = values.loanTerm || 5
      const rate = values.loanRate || 8
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Cost of Borrowing",
        text: `Over ${term} years, you will pay $${Math.round(interest).toLocaleString()} in interest, making your total repayment $${Math.round((loanAmt + interest)).toLocaleString()}. The interest represents ${((interest / loanAmt) * 100).toFixed(1)}% of your principal.`,
      })
      if (term > 3) {
        insights.push({
          type: "recommendation",
          icon: Sparkles,
          title: "Consider a Shorter Term",
          text: `A ${Math.max(1, term - 2)}-year term would increase monthly payments to ~$${Math.round(monthly * 1.35).toLocaleString()} but could save approximately $${Math.round(interest * 0.3).toLocaleString()} in total interest.`,
        })
      }
      if (rate > 10) {
        insights.push({
          type: "risk",
          icon: AlertTriangle,
          title: "High-Interest Loan",
          text: `At ${rate}% APR, this is considered a high-interest loan. Consider improving your credit score or exploring credit union options for better rates.`,
        })
      }
      break
    }
    case "retirement": {
      const nestEgg = results.nestEgg || 0
      const monthlyWithdrawal = results.withdrawMonthly || 0
      const currentAge = values.rtAge || 30
      const monthly = values.rtMonthly || 500
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
          text: `Your projected monthly withdrawal of $${Math.round(monthlyWithdrawal).toLocaleString()} may be below typical retirement needs. Consider increasing monthly contributions by $${Math.round(monthly * 0.5).toLocaleString()}.`,
        })
      }
      if (currentAge > 40) {
        insights.push({
          type: "risk",
          icon: AlertTriangle,
          title: "Late Start Impact",
          text: `Starting retirement savings at ${currentAge} means you have less time for compound growth. Consider maxing out your 401(k) and IRA contributions to catch up.`,
        })
      }
      const withdrawalRate = (monthlyWithdrawal * 12) / nestEgg * 100
      if (withdrawalRate > 4 && withdrawalRate > 0) {
        insights.push({
          type: "warning",
          icon: AlertTriangle,
          title: "Withdrawal Rate Alert",
          text: `Your ${withdrawalRate.toFixed(1)}% withdrawal rate exceeds the recommended 4% safe withdrawal rate, which may deplete your savings before end of life.`,
        })
      }
      break
    }
    case "savings": {
      const monthly = results.monthly || 0
      const target = values.svTarget || 0
      const years = values.svYears || 5
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Monthly Savings Target",
        text: `You need to save $${Math.round(monthly).toLocaleString()} each month to reach your goal of $${Math.round(target).toLocaleString()} in ${years} years.`,
      })
      insights.push({
        type: "recommendation",
        icon: Sparkles,
        title: "Consider Auto-Saving",
        text: `Setting up an automatic transfer of $${Math.round(monthly).toLocaleString()} to a high-yield savings account ensures consistency and removes the temptation to spend.`,
      })
      const halfMonthly = monthly / 2
      if (halfMonthly > 0) {
        insights.push({
          type: "insight",
          icon: TrendingUp,
          title: "Extended Timeline Option",
          text: `If you saved half that amount ($${Math.round(halfMonthly).toLocaleString()}/month), it would take approximately ${(years * 1.8).toFixed(1)} years to reach your goal.`,
        })
      }
      break
    }
    case "roi": {
      const totalROI = results.roi || 0
      const annualized = results.annualizedRoi || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Investment Performance",
        text: `Your investment achieved a ${totalROI.toFixed(1)}% total return, or ${annualized.toFixed(1)}% annualized.`,
      })
      if (annualized > 0) {
        insights.push({
          type: "insight",
          icon: TrendingUp,
          title: "Benchmark Comparison",
          text: `An annualized return of ${annualized.toFixed(1)}% ${annualized > 10 ? "outperforms the historical S&P 500 average of ~10%" : "is below the historical S&P 500 average of ~10%"}.`,
        })
      }
      insights.push({
        type: "recommendation",
        icon: Sparkles,
        title: "Use With Other Metrics",
        text: `ROI is useful but consider also evaluating this investment using Net Present Value (NPV) and payback period for a more complete picture.`,
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
      const returnRatio = contributions > 0 ? returns / contributions : 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Return Multiple",
        text: `For every $1 you contributed, you earned $${returnRatio.toFixed(2)} in investment returns.`,
      })
      if (contributions > 0) {
        insights.push({
          type: "recommendation",
          icon: Sparkles,
          title: "Dollar-Cost Averaging Works",
          text: `By investing regularly, you benefit from dollar-cost averaging — buying more shares when prices are low and fewer when prices are high.`,
        })
      }
      break
    }
    case "tax": {
      const totalTax = results.totalTax || 0
      const effectiveRate = results.effectiveRate || 0
      const marginalRate = results.marginalRate || 0
      const income = values.taxIncome || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Tax Rate Analysis",
        text: `Your effective tax rate is ${effectiveRate.toFixed(1)}%, while your marginal rate is ${marginalRate.toFixed(1)}%. Additional income up to the next bracket ceiling will be taxed at ${marginalRate.toFixed(1)}%.`,
      })
      const retirementSavings = income * 0.1
      insights.push({
        type: "recommendation",
        icon: Sparkles,
        title: "Tax-Advantaged Savings",
        text: `Contributing $${Math.round(retirementSavings).toLocaleString()} (10% of your income) to a 401(k) or traditional IRA could reduce your taxable income and save approximately $${Math.round(retirementSavings * (marginalRate / 100)).toLocaleString()} in taxes this year.`,
      })
      break
    }
    case "break-even": {
      const units = results.units || 0
      const revenue = results.revenue || 0
      const cm = results.contributionMargin || 0
      const fc = values.beFixed || 0
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Break-Even Analysis",
        text: `You need to sell ${Math.round(units).toLocaleString()} units ($${Math.round(revenue).toLocaleString()} in revenue) to break even. Each unit contributes $${Math.round(cm).toLocaleString()} toward fixed costs and profit.`,
      })
      if (cm > 0) {
        const profitTarget = fc * 0.2
        const unitsForProfit = Math.ceil((fc + profitTarget) / cm)
        insights.push({
          type: "recommendation",
          icon: Sparkles,
          title: "Target for Profitability",
          text: `To achieve a 20% profit margin ($${Math.round(profitTarget).toLocaleString()} profit), you need to sell approximately ${unitsForProfit.toLocaleString()} units.`,
        })
      }
      const marginRatio = (cm / (values.bePrice || 1)) * 100
      insights.push({
        type: "insight",
        icon: TrendingUp,
        title: "Contribution Margin Ratio",
        text: `Your contribution margin ratio is ${marginRatio.toFixed(1)}%, meaning ${marginRatio.toFixed(1)}% of each sales dollar goes toward covering fixed costs and profit.`,
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

export function AIInsights({ calcType, values, results }: AIInsightsProps) {
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
                : insight.type === "risk"
                  ? "border-red-500/20 bg-red-500/5"
                  : insight.type === "recommendation"
                    ? "border-blue-500/20 bg-blue-500/5"
                    : "border-emerald-500/20 bg-emerald-500/5"
            const iconColor =
              insight.type === "warning"
                ? "text-amber-500"
                : insight.type === "risk"
                  ? "text-red-500"
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
