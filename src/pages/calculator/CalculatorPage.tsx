import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { useParams, Link } from "react-router"
import {
  Copy, Check, Printer, Share2, Info, FileSpreadsheet, FileText,
  ArrowLeft, ArrowUp, Download, MoreHorizontal, X
} from "lucide-react"
import { SliderInput } from "../../components/shared/SliderInput"
import { TermSelector } from "../../components/shared/TermSelector"
import { ResultCard } from "../../components/shared/ResultCard"
import { GrowthChart, PieBreakdown, getChartColors } from "../../components/shared/ChartSection"
import { Breadcrumbs } from "../../components/ui/Breadcrumbs"
import { Badge } from "../../components/ui/Badge"
import { InfoCard } from "../../components/ui/InfoCard"
import { DataTable } from "../../components/ui/DataTable"
import { SEOContentBlock } from "../../components/shared/SEOContentBlock"
import { TrustBadges } from "../../components/shared/TrustBadges"
import { RelatedContent } from "../../components/shared/RelatedContent"
import { AdPlaceholder } from "../../components/ui/AdPlaceholder"
import { SEOHead } from "../../components/seo/SEOHead"
import { FavoriteButton } from "../../components/shared/FavoriteButton"
import { AIInsights } from "../../components/shared/AIInsights"
import { ShareDialog } from "../../components/shared/ShareDialog"
import { EnhancedResultCard } from "../../components/shared/EnhancedResultCard"
import { fmt$, fmtPct, fmtNum } from "../../lib/formatters"
import { getCalculatorConfig } from "../../lib/configs"
import { useCalculatorState } from "../../hooks/useCalculatorState"
import { useCalculationHistory } from "../../hooks/useCalculationHistory"
import { useCurrency } from "../../lib/CurrencyContext"
import { generateCalculatorSchema, generateBreadcrumbSchema, generateFAQSchema } from "../../lib/seo"
import { PER_CALCULATOR_FAQS } from "../../components/shared/SEOContentBlock"
import { exportToExcel, exportToImage } from "../../lib/exportUtils"
import { trackEvent } from "../../lib/analytics"

function fmtVal(v: number, format?: string, currencyCode = "USD"): string {
  switch (format) {
    case "currency": return fmt$(v, false, currencyCode)
    case "percent": return fmtPct(v, 1)
    case "number": return fmtNum(v)
    default: return String(v)
  }
}

export function CalculatorPage() {
  const { type } = useParams<{ type: string }>()
  const calcType = type || "mortgage"
  const config = getCalculatorConfig(calcType)

  const { currency } = useCurrency()
  const { addEntry } = useCalculationHistory()
  const [shareOpen, setShareOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  // Close "More" menu on outside click
  useEffect(() => {
    if (!moreOpen) return
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [moreOpen])

  if (!config) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Calculator not found</h1>
        <p className="text-muted-foreground mt-2">The calculator you are looking for does not exist.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
      </div>
    )
  }

  const meta = config.meta

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
  const [tableTab, setTableTab] = useState<"yearly" | "monthly">("yearly")

  const { values, setValue, results } = useCalculatorState(config)

  // Save to history when results change
  useEffect(() => {
    if (Object.keys(results).length > 0) {
      const timer = setTimeout(() => {
        addEntry({
          calculatorId: calcType,
          calculatorName: meta.title,
          inputs: { ...values },
          results: Object.fromEntries(
            Object.entries(results).map(([k, v]) => [k, typeof v === "number" ? v : String(v)])
          ) as Record<string, number | string>,
        })
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [results, addEntry, calcType, meta.title, values])

  // Track calculator usage once
  useEffect(() => {
    trackEvent("calculator_used", { calculator: calcType, category: meta.category })
  }, [calcType, meta.category])

  const copyResult = useCallback(() => {
    const text = config.copyTemplate(results)
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
    trackEvent("result_copied", { calculator: calcType })
  }, [config, results, calcType])

  const exportCSV = useCallback(() => {
    if (!config.csvData) return
    const { columns, rows } = config.csvData(results)
    const csv = columns.map(c => c.label).join(",") + "\n" + rows.map(r => columns.map(c => r[c.key]).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `${calcType}-results.csv`; a.click()
    URL.revokeObjectURL(url)
    trackEvent("result_exported", { calculator: calcType, format: "csv" })
  }, [config, results, calcType])

  const exportJSON = useCallback(() => {
    const data = {
      calculator: meta.title,
      inputs: values,
      results,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `${calcType}-results.json`; a.click()
    URL.revokeObjectURL(url)
    trackEvent("result_exported", { calculator: calcType, format: "json" })
  }, [meta.title, values, results, calcType])

  const Icon = meta.icon

  const resultHighlight = {
    label: config.highlight.label,
    value: fmtVal(results[config.highlight.valueKey], config.highlight.format, currency),
  }

  const isTableVisible = config.tableData != null
  const hasMonthly = config.hasMonthlyTable && (calcType === "mortgage" || calcType === "loan")

  const growthChartData = useMemo(() => config.growthChart.data(results), [config, results])
  const showGrowthChart = growthChartData.length > 0 && config.growthChart.lines.length > 0

  const growthChartLines = useMemo(() =>
    config.growthChart.lines.map(l => ({
      ...l,
      color: colors[l.colorKey as keyof typeof colors] || l.colorKey,
    })),
  [config, colors])

  const pieData = useMemo(() => config.pieChart.data(values, results), [config, values, results])

  const pageUrl = `https://financecalculator.com/calculator/${calcType}`
  const faqs = PER_CALCULATOR_FAQS[calcType] || []

  const jsonLd = useMemo(() => {
    const schemas: object[] = [
      generateCalculatorSchema(meta, pageUrl),
      generateBreadcrumbSchema([
        { label: "Home", path: "/" },
        { label: meta.category, path: `/category/${meta.category.toLowerCase()}` },
        { label: meta.title },
      ]),
    ]
    if (faqs.length > 0) {
      schemas.push(generateFAQSchema(faqs))
    }
    return schemas
  }, [meta, pageUrl, faqs])

  return (
    <div className="bg-background">
      <SEOHead
        title={`${meta.title} — Free Online Financial Calculator | FinanceCalculator.com`}
        description={meta.desc}
        canonical={pageUrl}
        jsonLd={jsonLd}
        ogType="website"
      />

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
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden" role="region" aria-label={`${meta.title} calculator`}>
              {/* ── Card toolbar ─────────────────────────────────── */}
              <div className="flex items-center gap-2 px-4 sm:px-6 py-3.5 border-b border-border min-w-0">
                {/* Title group */}
                <div className="flex-1 min-w-0 mr-2">
                  <h2 className="font-semibold text-foreground text-sm sm:text-base truncate">{meta.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">Results update in real time</p>
                </div>

                {/* Primary actions — always visible */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <FavoriteButton meta={meta} />

                  <button
                    onClick={copyResult}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy results"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                  </button>

                  <button
                    onClick={() => setShareOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Print"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Print</span>
                  </button>

                  {/* More dropdown — secondary export actions */}
                  <div className="relative" ref={moreRef}>
                    <button
                      onClick={() => setMoreOpen((p) => !p)}
                      aria-expanded={moreOpen}
                      aria-haspopup="true"
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="More export options"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">More</span>
                    </button>

                    {moreOpen && (
                      <div
                        className="absolute right-0 top-full mt-1.5 z-50 w-48 bg-card border border-border rounded-xl shadow-xl py-1.5 animate-in fade-in slide-in-from-top-1"
                        role="menu"
                      >
                        <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-border">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Export</span>
                          <button onClick={() => setMoreOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close menu">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {config.csvData && (
                          <button
                            onClick={() => { exportCSV(); setMoreOpen(false) }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            role="menuitem"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            Export CSV
                          </button>
                        )}
                        <button
                          onClick={() => { exportJSON(); setMoreOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          role="menuitem"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Export JSON
                        </button>
                        {isTableVisible && config.tableData && (
                          <button
                            onClick={() => {
                              const td = config.tableData!(results)
                              exportToExcel(td, `${calcType}-results`)
                              setMoreOpen(false)
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            role="menuitem"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            Export Excel
                          </button>
                        )}
                        <button
                          onClick={() => { exportToImage("calculator-section", `${calcType}-results`); setMoreOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          role="menuitem"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Save as Image
                        </button>
                        <button
                          onClick={() => { window.print(); setMoreOpen(false) }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          role="menuitem"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Export PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            <div className="grid lg:grid-cols-5 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
              <div className="lg:col-span-3 p-6 space-y-6">
                {config.inputs.map((input) => {
                  if (input.type === "select") {
                    const val = values[input.key] ?? input.default
                    return (
                      <TermSelector
                        key={input.key}
                        label={input.label}
                        options={input.options}
                        value={val}
                        onChange={(v) => setValue(input.key, v)}
                      />
                    )
                  }
                  const val = values[input.key] ?? input.default
                  return (
                    <SliderInput
                      key={input.key}
                      label={input.label}
                      value={val}
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      prefix={input.prefix}
                      suffix={input.suffix}
                      onChange={(v) => setValue(input.key, v)}
                      formatDisplay={input.formatDisplay}
                      tooltip={input.tooltip}
                      validate={input.validate}
                    />
                  )
                })}

                <InfoCard icon={<Info className="w-4 h-4" />} title="Formula Used" variant="info">
                  <code className="text-xs font-['JetBrains_Mono',monospace]">{meta.formula}</code>
                </InfoCard>
              </div>

              <div className="lg:col-span-2 p-6 space-y-4 bg-secondary/20">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4" id="calculator-results-heading">Results</div>
                <div aria-live="polite" aria-atomic="true" aria-labelledby="calculator-results-heading" role="region">
                <EnhancedResultCard
                  meta={meta}
                  results={results}
                  resultHighlight={resultHighlight}
                />

                <div className="grid grid-cols-2 gap-3">
                  {config.results.map((r) => (
                    <ResultCard
                      key={r.key}
                      label={r.label}
                       value={fmtVal(results[r.key], r.format, currency)}
                      color={r.color}
                    />
                  ))}
                  {calcType === "mortgage" && (
                    <ResultCard
                      label="Interest / Total"
                      value={fmtPct((results.totalInterest / results.total) * 100, 1)}
                      color="text-emerald-600 dark:text-emerald-400"
                    />
                  )}
                  {calcType === "loan" && (
                    <ResultCard
                      label="Interest / Loan"
                      value={fmtPct((results.interest / values.loanAmt) * 100, 1)}
                      color="text-amber-600 dark:text-amber-400"
                    />
                  )}
                  {calcType === "compound" && (
                    <ResultCard
                      label="Money Multiplier"
                      value={`${(results.fv / values.cpPrincipal).toFixed(2)}x`}
                    />
                  )}
                  {calcType === "retirement" && (
                    <>
                      <ResultCard label="Retirement Age" value={`${values.rtRetire}`} />
                      <ResultCard label="Years in Retirement" value={`${values.rtLife - values.rtRetire}`} />
                    </>
                  )}
                  {calcType === "roi" && (
                    <>
                      <ResultCard label="Initial Investment" value={fmt$(values.roiInvest, false, currency)} />
                      <ResultCard label="Final Value" value={fmt$(values.roiFinal, false, currency)} />
                    </>
                  )}
                  {calcType === "investment" && (
                    <ResultCard
                      label="Return %"
                      value={fmtPct((results.interest / results.totalContributions) * 100, 1)}
                      color="text-emerald-600 dark:text-emerald-400"
                    />
                  )}
                  {calcType === "tax" && (
                    <>
                      <ResultCard label="Taxable Income" value={fmt$(values.taxIncome, false, currency)} />
                    </>
                  )}
                  {calcType === "break-even" && (
                    <>
                      <ResultCard label="Fixed Costs" value={fmt$(values.beFixed, false, currency)} />
                      <ResultCard label="Variable Costs" value={fmt$(results.units * values.beVariable, false, currency)} />
                    </>
                  )}
                  {calcType === "savings" && (
                    <ResultCard label="Target Amount" value={fmt$(values.svTarget, false, currency)} />
                  )}
                </div>
              </div>
              </div>
            </div>

            <div className="border-t border-border p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">{config.growthChart.title}</h3>
                  {calcType === "tax" ? (
                    <div className="space-y-2">
                      {results.breakdown.map((b: any, i: number) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-card border border-border rounded-lg text-sm">
                          <div>
                            <span className="text-foreground font-medium">{fmtPct(b.rate, 0)}</span>
                            <span className="text-muted-foreground ml-2">{b.label}</span>
                          </div>
                          <span className="font-['JetBrains_Mono',monospace] text-muted-foreground">{fmt$(b.tax, false, currency)}</span>
                        </div>
                      ))}
                    </div>
                  ) : calcType === "break-even" ? (
                    <div className="space-y-3">
                      {[
                        { label: "Fixed Costs", value: values.beFixed },
                        { label: "Revenue at Break-Even", value: results.revenue, emerald: true },
                        { label: "Variable Costs", value: results.units * values.beVariable },
                        { label: "Contribution Margin", value: results.contributionMargin, emerald: true },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center p-3 bg-card border border-border rounded-lg text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className={`font-['JetBrains_Mono',monospace] font-medium ${item.emerald ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                            {fmt$(item.value, false, currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : showGrowthChart ? (
                    <GrowthChart
                      data={growthChartData}
                      isDark={isDark}
                      lines={growthChartLines}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">No chart data available.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">{config.pieChart.title}</h3>
                  {pieData.length > 0 ? (
                    <PieBreakdown
                      data={pieData}
                      isDark={isDark}
                      colors={[colors.blue, colors.amber, colors.emerald]}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">No chart data available.</p>
                  )}
                </div>
              </div>
            </div>

            {isTableVisible && config.tableData && (
              <div className="border-t border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Breakdown</h3>
                  {hasMonthly && (
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
                {tableTab === "monthly" && hasMonthly && config.monthlyTableData ? (
                  <DataTable
                    title="Monthly Breakdown (First 12 months)"
                    columns={config.monthlyTableData!(values, results).columns}
                    data={config.monthlyTableData!(values, results).rows}
                    defaultRows={12}
                  />
                ) : (
                  <DataTable
                    title="Year-by-Year Breakdown"
                    columns={config.tableData!(results).columns}
                    data={config.tableData!(results).rows}
                    defaultRows={5}
                  />
                )}
              </div>
            )}

            <div className="border-t border-border px-6 py-3 bg-secondary/30 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Educational purposes only.</span> Results are estimates based on standard formulas.
              </p>
              <span className="text-xs text-muted-foreground">v{meta.lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      <AdPlaceholder className="mx-auto max-w-7xl h-20 mb-8" />

      <AIInsights calcType={calcType} values={values} results={results} />

      <SEOContentBlock meta={meta} calcType={calcType} />

      <TrustBadges meta={meta} />

      <AdPlaceholder className="mx-auto max-w-7xl h-20 my-8" />

      <RelatedContent currentId={calcType} relatedLinks={meta.related} meta={meta} />

      <AdPlaceholder className="mx-auto max-w-7xl h-20 my-8" />

      <ShareDialog
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={meta.title}
        description={meta.desc}
        url={pageUrl}
      />

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
