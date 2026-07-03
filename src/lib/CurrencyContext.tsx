import { createContext, useContext, useCallback, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { formatCurrency, getCurrencySymbol } from "./currency"
import { setActiveCurrency } from "./formatters"

interface CurrencyContextValue {
  currency: string
  setCurrency: (code: string) => void
  format: (amount: number) => string
  symbol: string
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  format: (n: number) => `$${n.toLocaleString()}`,
  symbol: "$",
})

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useLocalStorage("preferredCurrency", "USD")

  useEffect(() => {
    setActiveCurrency(currency)
  }, [currency])

  const format = useCallback(
    (amount: number) => formatCurrency(amount, currency),
    [currency]
  )

  const symbol = getCurrencySymbol(currency)

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, symbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
