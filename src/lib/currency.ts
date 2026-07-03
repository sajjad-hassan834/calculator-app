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
  { code: "SEK", symbol: "kr", name: "Swedish Krona", locale: "sv-SE" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", locale: "nb-NO" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", locale: "da-DK" },
  { code: "PLN", symbol: "z\u0142", name: "Polish Zloty", locale: "pl-PL" },
  { code: "CZK", symbol: "K\u010D", name: "Czech Koruna", locale: "cs-CZ" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", locale: "hu-HU" },
  { code: "ILS", symbol: "\u20AA", name: "Israeli Shekel", locale: "he-IL" },
  { code: "TRY", symbol: "\u20BA", name: "Turkish Lira", locale: "tr-TR" },
  { code: "ZAR", symbol: "R", name: "South African Rand", locale: "en-ZA" },
  { code: "AED", symbol: "\u062F.\u0625", name: "UAE Dirham", locale: "ar-AE" },
  { code: "SAR", symbol: "\u0631.\u0633", name: "Saudi Riyal", locale: "ar-SA" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", locale: "ms-MY" },
  { code: "THB", symbol: "\u0E3F", name: "Thai Baht", locale: "th-TH" },
  { code: "PHP", symbol: "\u20B1", name: "Philippine Peso", locale: "en-PH" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", locale: "id-ID" },
  { code: "VND", symbol: "\u20AB", name: "Vietnamese Dong", locale: "vi-VN" },
  { code: "PKR", symbol: "\u20A8", name: "Pakistani Rupee", locale: "en-PK" },
  { code: "BDT", symbol: "\u09F3", name: "Bangladeshi Taka", locale: "bn-BD" },
  { code: "NGN", symbol: "\u20A6", name: "Nigerian Naira", locale: "en-NG" },
  { code: "EGP", symbol: "\u00A3", name: "Egyptian Pound", locale: "ar-EG" },
  { code: "COP", symbol: "$", name: "Colombian Peso", locale: "es-CO" },
  { code: "CLP", symbol: "$", name: "Chilean Peso", locale: "es-CL" },
  { code: "PEN", symbol: "S/", name: "Peruvian Sol", locale: "es-PE" },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar", locale: "zh-TW" },
]

export function getCurrencySymbol(code: string): string {
  const currency = CURRENCIES.find((c) => c.code === code)
  return currency ? currency.symbol : code
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = CURRENCIES.find((c) => c.code === currencyCode)
  if (!currency) return `${currencyCode} ${amount.toLocaleString(undefined, { maximumFractionDigits: amount % 1 === 0 ? 0 : 2 })}`
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
