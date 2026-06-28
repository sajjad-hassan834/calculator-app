import { useState, useMemo, useCallback, useEffect } from "react"
import { useParams, Link } from "react-router"
import {
  Copy, Check, Printer, Share2, Info, FileSpreadsheet,
  ArrowLeft, GitCompare, Save, ArrowUp
} from "lucide-react"
import { SliderInput } from "../../components/shared/SliderInput"
import { ResultCard } from "../../components/shared/ResultCard"
import { TermSelector } from "../../components/shared/TermSelector"
import { GrowthChart, PieBreakdown, getChartColors } from "../../components/shared/ChartSection"
import { Breadcrumbs } from "../../components/ui/Breadcrumbs"
import { Badge } from "../../components/ui/Badge"
import { InfoCard } from "../../components/ui/InfoCard"
import { DataTable } from "../../components/ui/DataTable"
import { AnimatedCounter } from "../../components/ui/AnimatedCounter"
import { SEOContentBlock } from "../../components/shared/SEOContentBlock"
import { TrustBadges } from "../../components/shared/TrustBadges"
import { RelatedContent } from "../../components/shared/RelatedContent"
import { AdPlaceholder } from "../../components/ui/AdPlaceholder"
import { fmt$, fmtPct, fmtNum } from "../../lib/formatters"
import { calcMortgage } from "../../lib/calculators/mortgage"
import { calcCompound } from "../../lib/calculators/compound"
import { calcLoan } from "../../lib/calculators/loan"
import { calcSavingsGoal, calcRetirement } from "../../lib/calculators/savings"
import { calcROI, calcBreakEven, calcInvestment } from "../../lib/calculators/investment"
import { calcTaxBracket } from "../../lib/calculators/tax"
import { CALCULATOR_META, type CalcMeta } from "../../lib/calculatorMeta"

const COMPOUND_FREQS = [
  { value: 1, label: "Annually" },
  { value: 2, label: "Semi-annually" },
  { value: 4, label: "Quarterly" },
  { value: 12, label: "Monthly" },
  { value: 365, label: "Daily" },
]

const TAX_BRACKETS = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11600, max: 47150, rate: 12 },
  { min: 47150, max: 100525, rate: 22 },
  { min: 100525, max: 191950, rate: 24 },
  { min: 191950, max: 243725, rate: 32 },
  { min: 243725, max: 609350, rate: 35 },
  { min: 609350, max: Infinity, rate: 37 },
]

export function CalculatorPage() {
  const { type } = useParams<{ type: string }>()
  const calcType = type || "mortgage"
  const meta: CalcMeta | undefined = CALCULATOR_META[calcType]

  if (!meta) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Calculator not found</h1>
        <p className="text-muted-foreground mt-2">The calculator you are looking for does not exist.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
      </div>
    )
  }

  useEffect(() => {
    document.title = `${meta.title} — FinanceCalculator.com`
    return () => { document.title = "FinanceCalculator.com — Free Financial Calculators Online" }
  }, [meta.title])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]") as string[]
      const filtered = stored.filter((x: string) => x !== calcType)
      filtered.unshift(calcType)
      localStorage.setItem("recentlyViewed", JSON.stringify(filtered.slice(0, 6)))
    } catch { /* ignore */ }
  }, [calcType])

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  const colors = getChartColors(isDark)
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [tableTab, setTableTab] = useState<"yearly" | "monthly">("yearly")
  const [showAllAmort, setShowAllAmort] = useState(false)
  const [showFAB, setShowFAB] = useState(false)

  const [homePrice, setHomePrice] = useState(500000)
  const [downPct, setDownPct] = useState(20)
  const [mortRate, setMortRate] = useState(6.5)
  const [mortTerm, setMortTerm] = useState(30)
  const [cpPrincipal, setCpPrincipal] = useState(10000)
  const [cpRate, setCpRate] = useState(7)
  const [cpYears, setCpYears] = useState(10)
  const [cpFreq, setCpFreq] = useState(12)
  const [loanAmt, setLoanAmt] = useState(25000)
  const [loanRate, setLoanRate] = useState(8.5)
  const [loanTerm, setLoanTerm] = useState(5)
  const [svTarget, setSvTarget] = useState(50000)
  const [svCurrent, setSvCurrent] = useState(5000)
  const [svRate, setSvRate] = useState(4)
  const [svYears, setSvYears] = useState(5)
  const [rtAge, setRtAge] = useState(30)
  const [rtRetire, setRtRetire] = useState(65)
  const [rtSavings, setRtSavings] = useState(20000)
  const [rtMonthly, setRtMonthly] = useState(500)
  const [rtReturn, setRtReturn] = useState(7)
  const [rtLife, setRtLife] = useState(90)
  const [roiInvest, setRoiInvest] = useState(50000)
  const [roiFinal, setRoiFinal] = useState(75000)
  const [roiYears, setRoiYears] = useState(3)
  const [invPrincipal, setInvPrincipal] = useState(10000)
  const [invMonthly, setInvMonthly] = useState(500)
  const [invRate, setInvRate] = useState(8)
  const [invYears, setInvYears] = useState(20)
  const [taxIncome, setTaxIncome] = useState(95000)
  const [beFixed, setBeFixed] = useState(50000)
  const [bePrice, setBePrice] = useState(50)
  const [beVariable, setBeVariable] = useState(20)

  const mort = useMemo(() => calcMortgage(homePrice, downPct, mortRate, mortTerm), [homePrice, downPct, mortRate, mortTerm])
  const comp = useMemo(() => calcCompound(cpPrincipal, cpRate, cpYears, cpFreq), [cpPrincipal, cpRate, cpYears, cpFreq])
  const loan = useMemo(() => calcLoan(loanAmt, loanRate, loanTerm), [loanAmt, loanRate, loanTerm])
  const savings = useMemo(() => calcSavingsGoal(svTarget, svCurrent, svRate, svYears), [svTarget, svCurrent, svRate, svYears])
  const retirement = useMemo(() => calcRetirement(rtAge, rtRetire, rtSavings, rtMonthly, rtReturn, rtLife), [rtAge, rtRetire, rtSavings, rtMonthly, rtReturn, rtLife])
  const roi = useMemo(() => calcROI(roiInvest, roiFinal, roiYears), [roiInvest, roiFinal, roiYears])
  const investment = useMemo(() => calcInvestment(invPrincipal, invMonthly, invRate, invYears), [invPrincipal, invMonthly, invRate, invYears])
  const tax = useMemo(() => calcTaxBracket(taxIncome, TAX_BRACKETS), [taxIncome])
  const breakEven = useMemo(() => calcBreakEven(beFixed, beVariable, bePrice), [beFixed, beVariable, bePrice])

  const copyResult = useCallback(() => {
    let text = ""
    switch (calcType) {
      case "mortgage": text = `Monthly Payment: ${fmt$(mort.monthly)} | Total Interest: ${fmt$(mort.totalInterest)} | Total Cost: ${fmt$(mort.total)}`; break
      case "compound": text = `Future Value: ${fmt$(comp.fv)} | Total Interest: ${fmt$(comp.interest)} | Return: ${fmtPct(comp.returnPct)}`; break
      case "loan": text = `Monthly Payment: ${fmt$(loan.monthly)} | Total Interest: ${fmt$(loan.interest)} | Total Cost: ${fmt$(loan.total)}`; break
      case "savings": text = `Monthly Savings: ${fmt$(savings.monthly)} | Months to Goal: ${savings.monthsToGoal} | Interest: ${fmt$(savings.interestEarned)}`; break
      case "retirement": text = `Nest Egg: ${fmt$(retirement.nestEgg)} | Monthly Withdrawal: ${fmt$(retirement.withdrawMonthly)}`; break
      case "roi": text = `Profit: ${fmt$(roi.profit)} | Total ROI: ${fmtPct(roi.roi)} | Annualized: ${fmtPct(roi.annualizedRoi)}`; break
      case "investment": text = `Future Value: ${fmt$(investment.fv)} | Contributions: ${fmt$(investment.totalContributions)} | Interest: ${fmt$(investment.interest)}`; break
      case "tax": text = `Total Tax: ${fmt$(tax.totalTax)} | Effective Rate: ${fmtPct(tax.effectiveRate, 1)} | Marginal Rate: ${fmtPct(tax.marginalRate, 0)}`; break
      case "break-even": text = `Units to Break Even: ${breakEven.units} | Revenue: ${fmt$(breakEven.revenue)}`; break
    }
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }, [calcType, mort, comp, loan, savings, retirement, roi, investment, tax, breakEven])

  const exportCSV = useCallback(() => {
    let csv = "Year,Value\n"
    let data: any[] = []
    switch (calcType) {
      case "mortgage": data = mort.amortization; csv = "Year,Balance,Cumulative Principal,Cumulative Interest\n" + data.map(r => `${r.year},${r.balance},${r.cumulPrincipal},${r.cumulInterest}`).join("\n"); break
      case "compound": data = comp.growth; csv = "Year,Value,Interest\n" + data.map(r => `${r.year},${r.value},${r.interest}`).join("\n"); break
      case "loan": data = loan.schedule; csv = "Year,Balance,Cumulative Principal,Cumulative Interest\n" + data.map(r => `${r.year},${r.balance},${r.cumulPrincipal},${r.cumulInterest}`).join("\n"); break
    }
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `${calcType}-results.csv`; a.click()
    URL.revokeObjectURL(url)
  }, [calcType, mort, comp, loan])

  const Icon = meta.icon

  const resultHighlight = (() => {
    switch (calcType) {
      case "mortgage": return { label: "Monthly Payment", value: fmt$(mort.monthly) }
      case "compound": return { label: "Future Value", value: fmt$(comp.fv) }
      case "loan": return { label: "Monthly Payment", value: fmt$(loan.monthly) }
      case "savings": return { label: "Monthly Savings Needed", value: fmt$(savings.monthly) }
      case "retirement": return { label: "Nest Egg at Retirement", value: fmt$(retirement.nestEgg) }
      case "roi": return { label: "Total Profit", value: fmt$(roi.profit) }
      case "investment": return { label: "Future Value", value: fmt$(investment.fv) }
      case "tax": return { label: "Total Tax Owed", value: fmt$(tax.totalTax) }
      case "break-even": return { label: "Units to Break Even", value: fmtNum(breakEven.units) }
      default: return { label: "Result", value: "" }
    }
  })()

  const amortizationData = calcType === "mortgage" ? mort.amortization
    : calcType === "loan" ? loan.schedule
    : calcType === "compound" ? comp.growth
    : calcType === "savings" ? savings.schedule.map(s => ({ ...s, value: s.balance }))
    : calcType === "retirement" ? retirement.schedule.map(s => ({ ...s, value: s.balance }))
    : calcType === "investment" ? investment.schedule
    : []

  const amortColumns = calcType === "mortgage" || calcType === "loan"
    ? [{ key: "year", label: "Year" }, { key: "balance", label: "Balance", format: "currency" as const }, { key: "cumulPrincipal", label: "Principal Paid", format: "currency" as const }, { key: "cumulInterest", label: "Interest Paid", format: "currency" as const }]
    : [{ key: "year", label: "Year" }, { key: "value", label: "Value", format: "currency" as const }, { key: "interest", label: "Interest", format: "currency" as const }]

  const isTableVisible = calcType !== "tax" && calcType !== "break-even" && amortizationData.length > 0

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumbs items={[
          { label: "Home", path: "/" },
          { label: meta.category, path: `/category/${meta.category.toLowerCase()}` },
          { label: meta.title },
        ]} />

        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground mb-2">
            {meta.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">{meta.desc}</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <Badge variant="primary" icon={<Info className="w-3 h-3" />}>{meta.time}</Badge>
            <Badge variant="success">{meta.uses} uses</Badge>
            {meta.popular && <Badge variant="popular">Popular</Badge>}
          </div>
        </div>
      </div>

      <AdPlaceholder className="mx-auto max-w-7xl h-20 mb-8" />

      <section className="pb-16" id="calculator-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="font-semibold text-foreground text-base">{meta.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Results update in real time</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={copyResult} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors" aria-label="Copy results">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors" aria-label="Export CSV">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">CSV</span>
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors" aria-label="Print report">
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Print</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                      setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000)
                    })
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy shareable link"
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:block">{linkCopied ? "Copied" : "Copy Link"}</span>
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground/50 cursor-not-allowed"
                  disabled
                  aria-label="Compare scenarios (coming soon)"
                  title="Coming soon"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Compare</span>
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground/50 cursor-not-allowed"
                  disabled
                  aria-label="Save scenario (coming soon)"
                  title="Coming soon"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Save</span>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
              <div className="lg:col-span-3 p-6 space-y-6">
                {calcType === "mortgage" && (
                  <>
                    <SliderInput label="Home Price" value={homePrice} min={100000} max={2000000} step={5000} prefix="$" onChange={setHomePrice} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Down Payment" value={downPct} min={0} max={50} step={1} suffix="%" onChange={setDownPct} />
                    <SliderInput label="Interest Rate (Annual)" value={mortRate} min={0.5} max={20} step={0.1} suffix="%" onChange={setMortRate} />
                    <TermSelector label="Loan Term" options={[10, 15, 20, 25, 30].map(y => ({ value: y, label: `${y}yr` }))} value={mortTerm} onChange={setMortTerm} />
                  </>
                )}
                {calcType === "compound" && (
                  <>
                    <SliderInput label="Initial Principal" value={cpPrincipal} min={1000} max={1000000} step={1000} prefix="$" onChange={setCpPrincipal} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Annual Interest Rate" value={cpRate} min={0.5} max={30} step={0.1} suffix="%" onChange={setCpRate} />
                    <SliderInput label="Investment Period" value={cpYears} min={1} max={40} step={1} suffix=" yrs" onChange={setCpYears} />
                    <TermSelector label="Compounding Frequency" options={COMPOUND_FREQS} value={cpFreq} onChange={setCpFreq} />
                  </>
                )}
                {calcType === "loan" && (
                  <>
                    <SliderInput label="Loan Amount" value={loanAmt} min={1000} max={500000} step={500} prefix="$" onChange={setLoanAmt} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Annual Interest Rate" value={loanRate} min={0.5} max={30} step={0.1} suffix="%" onChange={setLoanRate} />
                    <SliderInput label="Loan Term" value={loanTerm} min={1} max={30} step={1} suffix=" yrs" onChange={setLoanTerm} />
                  </>
                )}
                {calcType === "savings" && (
                  <>
                    <SliderInput label="Target Amount" value={svTarget} min={1000} max={1000000} step={1000} prefix="$" onChange={setSvTarget} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Current Savings" value={svCurrent} min={0} max={500000} step={500} prefix="$" onChange={setSvCurrent} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Annual Interest Rate (APY)" value={svRate} min={0.1} max={10} step={0.1} suffix="%" onChange={setSvRate} />
                    <SliderInput label="Goal Timeline" value={svYears} min={1} max={40} step={1} suffix=" yrs" onChange={setSvYears} />
                  </>
                )}
                {calcType === "retirement" && (
                  <>
                    <SliderInput label="Current Age" value={rtAge} min={18} max={70} step={1} onChange={setRtAge} />
                    <SliderInput label="Retirement Age" value={rtRetire} min={40} max={80} step={1} onChange={setRtRetire} />
                    <SliderInput label="Current Savings" value={rtSavings} min={0} max={2000000} step={5000} prefix="$" onChange={setRtSavings} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Monthly Contribution" value={rtMonthly} min={0} max={10000} step={100} prefix="$" onChange={setRtMonthly} />
                    <SliderInput label="Annual Return" value={rtReturn} min={1} max={15} step={0.5} suffix="%" onChange={setRtReturn} />
                    <SliderInput label="Life Expectancy" value={rtLife} min={70} max={100} step={1} onChange={setRtLife} />
                  </>
                )}
                {calcType === "roi" && (
                  <>
                    <SliderInput label="Initial Investment" value={roiInvest} min={1000} max={1000000} step={1000} prefix="$" onChange={setRoiInvest} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Final Value" value={roiFinal} min={0} max={5000000} step={1000} prefix="$" onChange={setRoiFinal} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Years Held" value={roiYears} min={1} max={30} step={1} suffix=" yrs" onChange={setRoiYears} />
                  </>
                )}
                {calcType === "investment" && (
                  <>
                    <SliderInput label="Initial Investment" value={invPrincipal} min={0} max={1000000} step={1000} prefix="$" onChange={setInvPrincipal} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Monthly Contribution" value={invMonthly} min={0} max={10000} step={100} prefix="$" onChange={setInvMonthly} />
                    <SliderInput label="Annual Return" value={invRate} min={0.5} max={30} step={0.5} suffix="%" onChange={setInvRate} />
                    <SliderInput label="Investment Period" value={invYears} min={1} max={40} step={1} suffix=" yrs" onChange={setInvYears} />
                  </>
                )}
                {calcType === "tax" && (
                  <SliderInput label="Annual Income" value={taxIncome} min={10000} max={10000000} step={1000} prefix="$" onChange={setTaxIncome} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                )}
                {calcType === "break-even" && (
                  <>
                    <SliderInput label="Fixed Costs" value={beFixed} min={1000} max={1000000} step={1000} prefix="$" onChange={setBeFixed} formatDisplay={v => (v / 1000).toFixed(0) + "K"} />
                    <SliderInput label="Price per Unit" value={bePrice} min={1} max={10000} step={1} prefix="$" onChange={setBePrice} />
                    <SliderInput label="Variable Cost per Unit" value={beVariable} min={0.01} max={10000} step={1} prefix="$" onChange={setBeVariable} />
                  </>
                )}

                <InfoCard icon={<Info className="w-4 h-4" />} title="Formula Used" variant="info">
                  <code className="text-xs font-['JetBrains_Mono',monospace]">{meta.formula}</code>
                </InfoCard>
              </div>

              <div className="lg:col-span-2 p-6 space-y-4 bg-secondary/20">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Results</div>
                <div className="rounded-xl p-4 bg-primary text-primary-foreground">
                  <div className="text-xs font-medium text-primary-foreground/70 mb-1">{resultHighlight.label}</div>
                  <div className="text-2xl font-['JetBrains_Mono',monospace] font-bold">
                    <AnimatedCounter value={(() => {
                      switch (calcType) {
                        case "mortgage": return mort.monthly
                        case "compound": return comp.fv
                        case "loan": return loan.monthly
                        case "savings": return savings.monthly
                        case "retirement": return retirement.nestEgg
                        case "roi": return roi.profit
                        case "investment": return investment.fv
                        case "tax": return tax.totalTax
                        case "break-even": return breakEven.units
                        default: return 0
                      }
                    })()} prefix="$" duration={600} format="currency" />
                  </div>
                </div>

                {calcType === "mortgage" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Down Payment" value={fmt$(mort.downPayment)} />
                    <ResultCard label="Loan Principal" value={fmt$(mort.principal)} />
                    <ResultCard label="Total Interest" value={fmt$(mort.totalInterest)} color="text-amber-600 dark:text-amber-400" />
                    <ResultCard label="Total Cost" value={fmt$(mort.total)} />
                    <ResultCard label="Interest / Total" value={fmtPct((mort.totalInterest / mort.total) * 100, 1)} color="text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                {calcType === "compound" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Initial Investment" value={fmt$(cpPrincipal)} />
                    <ResultCard label="Interest Earned" value={fmt$(comp.interest)} color="text-emerald-600 dark:text-emerald-400" />
                    <ResultCard label="Total Return" value={`+${fmtPct(comp.returnPct, 1)}`} color="text-emerald-600 dark:text-emerald-400" />
                    <ResultCard label="Money Multiplier" value={`${(comp.fv / cpPrincipal).toFixed(2)}x`} />
                  </div>
                )}
                {calcType === "loan" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Loan Principal" value={fmt$(loanAmt)} />
                    <ResultCard label="Total Interest" value={fmt$(loan.interest)} color="text-amber-600 dark:text-amber-400" />
                    <ResultCard label="Total Repayment" value={fmt$(loan.total)} />
                    <ResultCard label="Interest / Loan" value={fmtPct((loan.interest / loanAmt) * 100, 1)} color="text-amber-600 dark:text-amber-400" />
                  </div>
                )}
                {calcType === "savings" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Target Amount" value={fmt$(svTarget)} />
                    <ResultCard label="Time to Goal" value={`${savings.monthsToGoal} months`} />
                    <ResultCard label="Total Contributions" value={fmt$(savings.totalContributions)} />
                    <ResultCard label="Interest Earned" value={fmt$(savings.interestEarned)} color="text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                {calcType === "retirement" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Monthly Withdrawal" value={fmt$(retirement.withdrawMonthly)} />
                    <ResultCard label="Total Contributed" value={fmt$(retirement.totalContributed)} />
                    <ResultCard label="Retirement Age" value={`${rtRetire}`} />
                    <ResultCard label="Years in Retirement" value={`${rtLife - rtRetire}`} />
                  </div>
                )}
                {calcType === "roi" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Total ROI" value={fmtPct(roi.roi, 1)} color="text-emerald-600 dark:text-emerald-400" />
                    <ResultCard label="Annualized ROI" value={fmtPct(roi.annualizedRoi, 1)} />
                    <ResultCard label="Initial Investment" value={fmt$(roiInvest)} />
                    <ResultCard label="Final Value" value={fmt$(roiFinal)} />
                  </div>
                )}
                {calcType === "investment" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Total Contributions" value={fmt$(investment.totalContributions)} />
                    <ResultCard label="Interest Earned" value={fmt$(investment.interest)} color="text-emerald-600 dark:text-emerald-400" />
                    <ResultCard label="Return %" value={fmtPct((investment.interest / investment.totalContributions) * 100, 1)} color="text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                {calcType === "tax" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Take Home Pay" value={fmt$(tax.takeHome)} />
                    <ResultCard label="Effective Tax Rate" value={fmtPct(tax.effectiveRate, 1)} />
                    <ResultCard label="Marginal Tax Rate" value={fmtPct(tax.marginalRate, 0)} />
                    <ResultCard label="Taxable Income" value={fmt$(taxIncome)} />
                  </div>
                )}
                {calcType === "break-even" && (
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard label="Break-Even Revenue" value={fmt$(breakEven.revenue)} />
                    <ResultCard label="Contribution Margin" value={fmt$(breakEven.contributionMargin)} />
                    <ResultCard label="Fixed Costs" value={fmt$(beFixed)} />
                    <ResultCard label="Variable Costs" value={fmt$(breakEven.units * beVariable)} />
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-border p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    {calcType === "compound" || calcType === "investment" || calcType === "retirement" || calcType === "savings"
                      ? "Growth Over Time"
                      : calcType === "tax" ? "Tax Breakdown"
                      : calcType === "break-even" ? "Cost Analysis"
                      : "Balance Over Time"}
                  </h3>
                  {calcType === "tax" ? (
                    <div className="space-y-2">
                      {tax.breakdown.map((b: any, i: number) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-card border border-border rounded-lg text-sm">
                          <div>
                            <span className="text-foreground font-medium">{fmtPct(b.rate, 0)}</span>
                            <span className="text-muted-foreground ml-2">{b.label}</span>
                          </div>
                          <span className="font-['JetBrains_Mono',monospace] text-muted-foreground">{fmt$(b.tax)}</span>
                        </div>
                      ))}
                    </div>
                  ) : calcType === "break-even" ? (
                    <div className="space-y-3">
                      {[
                        { label: "Fixed Costs", value: beFixed },
                        { label: "Revenue at Break-Even", value: breakEven.revenue, emerald: true },
                        { label: "Variable Costs", value: breakEven.units * beVariable },
                        { label: "Contribution Margin", value: breakEven.contributionMargin, emerald: true },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center p-3 bg-card border border-border rounded-lg text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className={`font-['JetBrains_Mono',monospace] font-medium ${item.emerald ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                            {fmt$(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <GrowthChart
                      data={(() => {
                        if (calcType === "mortgage") return mort.amortization
                        if (calcType === "loan") return loan.schedule
                        if (calcType === "compound") return comp.growth
                        if (calcType === "savings") return savings.schedule.map(s => ({ ...s, value: s.balance }))
                        if (calcType === "retirement") return retirement.schedule.map(s => ({ ...s, value: s.balance }))
                        if (calcType === "investment") return investment.schedule
                        return []
                      })()}
                      isDark={isDark}
                      lines={
                        calcType === "compound"
                          ? [{ dataKey: "value", name: "Total Value", color: colors.blue }, { dataKey: "interest", name: "Interest Earned", color: colors.emerald }]
                          : calcType === "investment"
                          ? [{ dataKey: "value", name: "Portfolio Value", color: colors.blue }, { dataKey: "contributed", name: "Contributions", color: colors.emerald }]
                          : [{ dataKey: "balance", name: "Remaining Balance", color: colors.blue }, { dataKey: "cumulInterest", name: "Interest Paid", color: colors.amber }]
                      }
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    {calcType === "mortgage" || calcType === "loan" ? "Principal vs Interest" :
                     calcType === "compound" ? "Principal vs Interest Earned" :
                     calcType === "break-even" ? "Break-Even Breakdown" :
                     calcType === "tax" ? "Tax by Bracket" :
                     "Contributions vs Growth"}
                  </h3>
                  <PieBreakdown
                    data={(() => {
                      if (calcType === "mortgage") return [{ name: "Principal", value: Math.round(mort.principal) }, { name: "Interest", value: Math.round(mort.totalInterest) }]
                      if (calcType === "compound") return [{ name: "Principal", value: Math.round(cpPrincipal) }, { name: "Interest Earned", value: Math.round(comp.interest) }]
                      if (calcType === "loan") return [{ name: "Principal", value: Math.round(loanAmt) }, { name: "Interest", value: Math.round(loan.interest) }]
                      if (calcType === "savings") return [{ name: "Your Savings", value: Math.round(svCurrent + savings.totalContributions) }, { name: "Interest", value: Math.max(0, Math.round(savings.interestEarned)) }]
                      if (calcType === "retirement") return [{ name: "Contributions", value: Math.round(retirement.totalContributed) }, { name: "Growth", value: Math.round(retirement.nestEgg - retirement.totalContributed) }]
                      if (calcType === "investment") return [{ name: "Contributions", value: Math.round(invPrincipal + invMonthly * invYears * 12) }, { name: "Growth", value: Math.round(investment.fv - (invPrincipal + invMonthly * invYears * 12)) }]
                      if (calcType === "break-even") return [{ name: "Fixed Costs", value: Math.round(beFixed) }, { name: "Variable Costs", value: Math.round(breakEven.units * beVariable) }]
                      return [{ name: "Principal", value: 0 }, { name: "Interest", value: 0 }]
                    })()}
                    isDark={isDark}
                    colors={[colors.blue, colors.amber]}
                  />
                </div>
              </div>
            </div>

            {isTableVisible && (
              <div className="border-t border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Breakdown</h3>
                  {(calcType === "mortgage" || calcType === "loan") && (
                    <div className="flex bg-secondary rounded-lg p-0.5 gap-0.5">
                      <button
                        onClick={() => setTableTab("yearly")}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                          tableTab === "yearly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Yearly
                      </button>
                      <button
                        onClick={() => setTableTab("monthly")}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                          tableTab === "monthly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  )}
                </div>
                {tableTab === "monthly" && (calcType === "mortgage" || calcType === "loan") ? (
                  <DataTable
                    title="Monthly Breakdown (First 12 months)"
                    columns={[
                      { key: "month", label: "Month" },
                      { key: "payment", label: "Payment", format: "currency" as const },
                      { key: "principal", label: "Principal", format: "currency" as const },
                      { key: "interest", label: "Interest", format: "currency" as const },
                      { key: "balance", label: "Balance", format: "currency" as const },
                    ]}
                    data={(calcType === "mortgage" ? (() => {
                      const r = mortRate / 100 / 12
                      const monthly = mort.monthly
                      let bal = mort.principal
                      const months = []
                      for (let m = 1; m <= Math.min(12, mortTerm * 12); m++) {
                        const ip = bal * r
                        const pp = Math.min(monthly - ip, bal)
                        months.push({ month: m, payment: Math.round(monthly), principal: Math.round(pp), interest: Math.round(ip), balance: Math.round(Math.max(0, bal - pp)) })
                        bal = Math.max(0, bal - pp)
                      }
                      return months
                    })() : (() => {
                      const r = loanRate / 100 / 12
                      const monthly = loan.monthly
                      let bal = loanAmt
                      const months = []
                      for (let m = 1; m <= Math.min(12, loanTerm * 12); m++) {
                        const ip = bal * r
                        const pp = Math.min(monthly - ip, bal)
                        months.push({ month: m, payment: Math.round(monthly), principal: Math.round(pp), interest: Math.round(ip), balance: Math.round(Math.max(0, bal - pp)) })
                        bal = Math.max(0, bal - pp)
                      }
                      return months
                    })())}
                    defaultRows={12}
                  />
                ) : (
                  <DataTable
                    title="Year-by-Year Breakdown"
                    columns={amortColumns}
                    data={amortizationData}
                    defaultRows={5}
                  />
                )}
              </div>
            )}

            <div className="border-t border-border px-6 py-3 bg-secondary/30">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Educational purposes only.</span> Results are estimates based on standard formulas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdPlaceholder className="mx-auto max-w-7xl h-20 mb-8" />

      <SEOContentBlock meta={meta} calcType={calcType} />

      <TrustBadges meta={meta} />

      <AdPlaceholder className="mx-auto max-w-7xl h-20 my-8" />

      <RelatedContent currentId={calcType} relatedLinks={meta.related} />

      <AdPlaceholder className="mx-auto max-w-7xl h-20 my-8" />

      <button
        onClick={() => document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-20 right-4 z-30 lg:hidden w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Back to calculator"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}
