import { useState } from "react"
import { fmtNum } from "../../lib/formatters"
import { Info } from "lucide-react"

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
}) {
  const [showTooltip, setShowTooltip] = useState(false)
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  const displayVal = formatDisplay ? formatDisplay(value) : fmtNum(value)

  const increment = () => onChange(Math.min(max, +(value + step).toFixed(2)))
  const decrement = () => onChange(Math.max(min, +(value - step).toFixed(2)))

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center gap-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
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
            onClick={decrement}
            className="w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            aria-label={`Decrease ${label}`}
            tabIndex={-1}
          >
            -
          </button>
          <div className="flex items-center gap-1 bg-secondary rounded-lg px-3 py-1.5 border border-border">
            {prefix && <span className="text-muted-foreground text-xs font-medium">{prefix}</span>}
            <input
              type="text"
              value={displayVal}
              inputMode="numeric"
              onChange={(e) => {
                const raw = e.target.value.replaceAll(",", "")
                const v = parseFloat(raw)
                if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
              }}
              className="bg-transparent text-right text-sm font-['JetBrains_Mono',monospace] font-medium w-20 outline-none text-foreground"
              aria-describedby={tooltip ? `${label}-desc` : undefined}
            />
            {suffix && <span className="text-muted-foreground text-xs font-medium">{suffix}</span>}
          </div>
          <button
            type="button"
            onClick={increment}
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
          onChange={(e) => onChange(parseFloat(e.target.value))}
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
        <span>{prefix}{formatDisplay ? formatDisplay(min) : fmtNum(min)}{suffix}</span>
        <span>{prefix}{formatDisplay ? formatDisplay(max) : fmtNum(max)}{suffix}</span>
      </div>
    </div>
  )
}
