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
  SEK: { symbol: "kr", locale: "sv-SE" },
  NOK: { symbol: "kr", locale: "nb-NO" },
  DKK: { symbol: "kr", locale: "da-DK" },
  PLN: { symbol: "z\u0142", locale: "pl-PL" },
  CZK: { symbol: "K\u010D", locale: "cs-CZ" },
  HUF: { symbol: "Ft", locale: "hu-HU" },
  ILS: { symbol: "\u20AA", locale: "he-IL" },
  TRY: { symbol: "\u20BA", locale: "tr-TR" },
  ZAR: { symbol: "R", locale: "en-ZA" },
  AED: { symbol: "\u062F.\u0625", locale: "ar-AE" },
  SAR: { symbol: "\u0631.\u0633", locale: "ar-SA" },
  MYR: { symbol: "RM", locale: "ms-MY" },
  THB: { symbol: "\u0E3F", locale: "th-TH" },
  PHP: { symbol: "\u20B1", locale: "en-PH" },
  IDR: { symbol: "Rp", locale: "id-ID" },
  VND: { symbol: "\u20AB", locale: "vi-VN" },
  PKR: { symbol: "\u20A8", locale: "en-PK" },
  BDT: { symbol: "\u09F3", locale: "bn-BD" },
  NGN: { symbol: "\u20A6", locale: "en-NG" },
  EGP: { symbol: "\u00A3", locale: "ar-EG" },
  COP: { symbol: "$", locale: "es-CO" },
  CLP: { symbol: "$", locale: "es-CL" },
  PEN: { symbol: "S/", locale: "es-PE" },
  TWD: { symbol: "NT$", locale: "zh-TW" },
}

function getSymbol(code: string): string {
  return CURRENCY_MAP[code]?.symbol || "$"
}

function getLocale(code: string): string {
  return CURRENCY_MAP[code]?.locale || "en-US"
}
