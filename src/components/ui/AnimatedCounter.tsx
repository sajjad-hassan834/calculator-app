import { useState, useEffect, useRef } from "react"
import { fmt$, fmtPct, fmtNum } from "../../lib/formatters"

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 800,
  format,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  format?: "currency" | "percent" | "number"
}) {
  const [display, setDisplay] = useState(value)
  const raf = useRef<number>(0)
  const prevValue = useRef(value)

  useEffect(() => {
    if (value === prevValue.current) return
    const start = performance.now()
    const from = display
    const delta = value - from
    prevValue.current = value

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + delta * eased)
      if (progress < 1) {
        raf.current = requestAnimationFrame(step)
      }
    }

    raf.current = requestAnimationFrame(step)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [value, duration])

  const formatted = (() => {
    const val = display
    if (format === "currency") return fmt$(val).replace("$", "")
    if (format === "percent") return fmtPct(val, decimals)
    if (format === "number") return fmtNum(val)
    return val.toFixed(decimals)
  })()

  return (
    <span aria-live="polite" aria-atomic="true">
      {prefix}{formatted}{suffix}
    </span>
  )
}
