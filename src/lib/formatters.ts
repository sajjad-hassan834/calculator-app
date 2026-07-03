let _activeCurrency = "USD"

export function setActiveCurrency(cc: string) {
  _activeCurrency = cc
}

export function fmt$(n: number, compact = false, currencyCode?: string): string {
  const code = currencyCode || _activeCurrency
  if (compact) {
    if (n >= 1_000_000) return `${getSymbol(code)}${(n / 1_000_000).toFixed(2)}M`
    if (n >= 1_000) return `${getSymbol(code)}${(n / 1_000).toFixed(1)}K`
  }
  try {
    return new Intl.NumberFormat(getLocale(code), {
      style: "currency",
      currency: code,
      maximumFractionDigits: n % 1 === 0 ? 0 : 2,
    }).format(n)
  } catch {
    return `${getSymbol(code)}${n.toLocaleString()}`
  }
}

export function fmtPct(n: number, decimals = 2): string {
  return `${n.toFixed(decimals)}%`
}

export function fmtNum(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n))
}

const CURRENCY_MAP: Record<string, { symbol: string; locale: string }> = {
  USD: { symbol: "$", locale: "en-US" },
  EUR: { symbol: "\u20AC", locale: "de-DE" },
  GBP: { symbol: "\u00A3", locale: "en-GB" },
  JPY: { symbol: "\u00A5", locale: "ja-JP" },
  CAD: { symbol: "C$", locale: "en-CA" },
  AUD: { symbol: "A$", locale: "en-AU" },
  CHF: { symbol: "CHF", locale: "de-CH" },
  CNY: { symbol: "\u00A5", locale: "zh-CN" },
  INR: { symbol: "\u20B9", locale: "en-IN" },
  MXN: { symbol: "Mex$", locale: "es-MX" },
  BRL: { symbol: "R$", locale: "pt-BR" },
  KRW: { symbol: "\u20A9", locale: "ko-KR" },
  SGD: { symbol: "S$", locale: "en-SG" },
  NZD: { symbol: "NZ$", locale: "en-NZ" },
  HKD: { symbol: "HK$", locale: "en-HK" },
}

function getSymbol(code: string): string {
  return CURRENCY_MAP[code]?.symbol || "$"
}

function getLocale(code: string): string {
  return CURRENCY_MAP[code]?.locale || "en-US"
}
