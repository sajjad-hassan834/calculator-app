import { DollarSign, Check } from "lucide-react"
import { CURRENCIES } from "../../lib/currency"
import { useState, useRef, useEffect } from "react"

interface CurrencySelectorProps {
  value: string
  onChange: (code: string) => void
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const current = CURRENCIES.find((c) => c.code === value) || CURRENCIES[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`Currency: ${current.code}`}
        aria-expanded={open}
      >
        <DollarSign className="w-3.5 h-3.5" />
        <span>{current.code}</span>
        <span className="text-muted-foreground/60">{current.symbol}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50" role="listbox">
          <div className="p-1 max-h-60 overflow-y-auto">
            {CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onChange(currency.code)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  currency.code === value
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary"
                }`}
                role="option"
                aria-selected={currency.code === value}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8">{currency.symbol}</span>
                  <div className="text-left">
                    <span className="text-sm">{currency.code}</span>
                    <span className="text-xs text-muted-foreground ml-1.5">{currency.name}</span>
                  </div>
                </div>
                {currency.code === value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
