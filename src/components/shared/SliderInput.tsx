import { useState, useId, useRef, useCallback } from "react"
import { fmtNum } from "../../lib/formatters"
import { useCurrency } from "../../lib/CurrencyContext"
import { Info, AlertTriangle } from "lucide-react"

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
  formatDisplay,
  tooltip,
  validate,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  onChange: (v: number) => void
  formatDisplay?: (v: number) => string
  tooltip?: string
  validate?: (v: number) => string | null
}) {
  const { symbol } = useCurrency()
  const [showTooltip, setShowTooltip] = useState(false)
  const [touched, setTouched] = useState(false)
  const [editing, setEditing] = useState(false)
  const [raw, setRaw] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  const disp = formatDisplay ? formatDisplay(value) : fmtNum(value)
  const error = touched && validate ? validate(value) : null

  const sym = (s: string | undefined) => s?.replace(/\$/g, symbol) ?? ""

  const commit = useCallback((v: number) => {
    if (!touched) setTouched(true)
    onChange(v)
  }, [touched, onChange])

  const isDecimal = step < 1

  return (
    <div className="space-y-2.5 min-w-0">
      <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-1.5 min-w-0 shrink">
          {label}
          {tooltip && (
            <span
              className="relative inline-flex"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            >
              <button
                type="button"
                className="w-4 h-4 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Help for ${label}`}
                tabIndex={-1}
              >
                <Info className="w-2.5 h-2.5" />
              </button>
              {showTooltip && (
                <span
                  role="tooltip"
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-[11px] rounded-lg shadow-lg whitespace-nowrap z-10 pointer-events-none"
                  aria-live="polite"
                >
                  {tooltip}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                </span>
              )}
            </span>
          )}
        </label>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => commit(Math.max(min, +(value - step).toFixed(2)))}
            className="w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            aria-label={`Decrease ${label}`}
            tabIndex={-1}
          >
            -
          </button>
          <div className="flex items-center gap-1 bg-secondary rounded-lg px-3 py-1.5 border border-border">
            {prefix && <span className="text-muted-foreground text-xs font-medium">{sym(prefix)}</span>}
            <input
              ref={inputRef}
              type="text"
              value={editing ? raw : disp}
              inputMode={isDecimal ? "decimal" : "numeric"}
              onFocus={() => { setEditing(true); setRaw(String(value)) }}
              onBlur={() => { setEditing(false); setRaw("") }}
              onChange={(e) => {
                if (!touched) setTouched(true)
                const s = e.target.value.replace(/,/g, "")
                if (s === "" || s === "-" || s === "." || /^-?\d*\.?\d*$/.test(s)) {
                  setRaw(s)
                }
                const v = parseFloat(s)
                if (!isNaN(v) && s !== "" && s !== "." && s !== "-") {
                  commit(Math.min(max, Math.max(min, v)))
                }
              }}
              className={`bg-transparent text-right text-sm font-['JetBrains_Mono',monospace] font-medium w-16 min-w-0 outline-none text-foreground ${error ? "text-red-600 dark:text-red-400" : ""}`}
              aria-describedby={tooltip ? `${label}-desc` : undefined}
              aria-invalid={!!error}
              aria-errormessage={error ? `${id}-error` : undefined}
            />
            {suffix && <span className="text-muted-foreground text-xs font-medium">{suffix}</span>}
          </div>
          <button
            type="button"
            onClick={() => commit(Math.min(max, +(value + step).toFixed(2)))}
            className="w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            aria-label={`Increase ${label}`}
            tabIndex={-1}
          >
            +
          </button>
        </div>
      </div>
      <div className="relative h-1.5 rounded-full bg-secondary/50">
        <div
          className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => commit(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-md pointer-events-none transition-all"
          style={{ left: `calc(${pct}% - 8px)`, zIndex: 1 }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground font-['JetBrains_Mono',monospace]">
        <span>{sym(prefix)}{formatDisplay ? formatDisplay(min) : fmtNum(min)}{suffix}</span>
        <span>{sym(prefix)}{formatDisplay ? formatDisplay(max) : fmtNum(max)}{suffix}</span>
      </div>

      {error && (
        <div
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 animate-in slide-in-from-top-1 fade-in duration-200"
        >
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
