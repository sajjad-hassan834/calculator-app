export interface CurrencyOption {
  code: string
  symbol: string
  name: string
  locale: string
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "\u20AC", name: "Euro", locale: "de-DE" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound", locale: "en-GB" },
  { code: "JPY", symbol: "\u00A5", name: "Japanese Yen", locale: "ja-JP" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", locale: "de-CH" },
  { code: "CNY", symbol: "\u00A5", name: "Chinese Yuan", locale: "zh-CN" },
  { code: "INR", symbol: "\u20B9", name: "Indian Rupee", locale: "en-IN" },
  { code: "MXN", symbol: "Mex$", name: "Mexican Peso", locale: "es-MX" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", locale: "pt-BR" },
  { code: "KRW", symbol: "\u20A9", name: "South Korean Won", locale: "ko-KR" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", locale: "en-SG" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", locale: "en-NZ" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", locale: "en-HK" },
]

export function getCurrencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol || "$"
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = CURRENCIES.find((c) => c.code === currencyCode)
  if (!currency) return `$${amount.toLocaleString()}`
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  } catch {
    return `${currency.symbol}${amount.toLocaleString()}`
  }
}
