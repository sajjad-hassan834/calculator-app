import { useReducer, useEffect, useRef, useCallback, useState } from "react"
import { History } from "lucide-react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { HistoryDrawer, type CalcHistoryEntry } from "./HistoryDrawer"

const MAX_HISTORY = 10

const OPERATOR_SYMBOL: Record<string, string> = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
}

interface CalcState {
  display: string
  expression: string
  firstOperand: number | null
  operator: string | null
  waitingForSecond: boolean
  justEvaluated: boolean
  error: string | null
  pendingExpression: string
  lastSecondDisplay: string
  lastOperator: string | null
  lastSecondValue: number | null
}

type CalcAction =
  | { type: "DIGIT"; digit: string }
  | { type: "DECIMAL" }
  | { type: "OPERATOR"; op: string }
  | { type: "EVALUATE" }
  | { type: "CLEAR" }
  | { type: "BACKSPACE" }
  | { type: "TOGGLE_SIGN" }
  | { type: "PERCENT" }
  | { type: "RECALL"; value: string }

const initialState: CalcState = {
  display: "0",
  expression: "",
  firstOperand: null,
  operator: null,
  waitingForSecond: false,
  justEvaluated: false,
  error: null,
  pendingExpression: "",
  lastSecondDisplay: "",
  lastOperator: null,
  lastSecondValue: null,
}

function formatNumber(value: number): string {
  if (!isFinite(value)) return "Error"
  const cleaned = parseFloat(value.toPrecision(12))
  if (Number.isInteger(cleaned) && Math.abs(cleaned) < 1e15) {
    return cleaned.toLocaleString("en-US")
  }
  if (Math.abs(cleaned) >= 1e15 || (Math.abs(cleaned) < 1e-10 && cleaned !== 0)) {
    return cleaned.toExponential(6)
  }
  const parts = cleaned.toLocaleString("en-US", {
    maximumFractionDigits: 10,
    useGrouping: true,
  })
  return parts
}

function calculate(a: number, op: string, b: number): number {
  let result: number
  switch (op) {
    case "+":
      result = a + b
      break
    case "-":
      result = a - b
      break
    case "*":
      result = a * b
      break
    case "/":
      if (b === 0) throw new Error("Cannot divide by zero")
      result = a / b
      break
    default:
      throw new Error("Unknown operator")
  }
  if (!isFinite(result)) throw new Error("Result is not finite")
  return parseFloat(result.toPrecision(12))
}

function calcReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case "DIGIT": {
      const d = action.digit
      if (state.error) return { ...initialState, display: d, expression: d }
      if (state.justEvaluated) {
        return { ...initialState, display: d, expression: d }
      }
      if (state.waitingForSecond) {
        return {
          ...state,
          display: d,
          waitingForSecond: false,
          expression: `${formatNumber(state.firstOperand!)} ${OPERATOR_SYMBOL[state.operator!]} ${d}`,
        }
      }
      const newDisplay = state.display === "0" ? d : state.display + d
      if (state.firstOperand !== null && state.operator) {
        return {
          ...state,
          display: newDisplay,
          expression: `${formatNumber(state.firstOperand)} ${OPERATOR_SYMBOL[state.operator]} ${newDisplay}`,
        }
      }
      return { ...state, display: newDisplay, expression: newDisplay }
    }

    case "DECIMAL": {
      if (state.error) return { ...initialState, display: "0.", expression: "0." }
      if (state.justEvaluated) {
        return { ...initialState, display: "0.", expression: "0." }
      }
      if (state.waitingForSecond) {
        return {
          ...state,
          display: "0.",
          waitingForSecond: false,
          expression: state.firstOperand !== null && state.operator
            ? `${formatNumber(state.firstOperand)} ${OPERATOR_SYMBOL[state.operator]} 0.`
            : "0.",
        }
      }
      if (state.display.includes(".")) return state
      const newDisplay = state.display + "."
      if (state.firstOperand !== null && state.operator) {
        return {
          ...state,
          display: newDisplay,
          expression: `${formatNumber(state.firstOperand)} ${OPERATOR_SYMBOL[state.operator]} ${newDisplay}`,
        }
      }
      return { ...state, display: newDisplay, expression: newDisplay }
    }

    case "OPERATOR": {
      const op = action.op
      const current = parseFloat(state.display)
      if (state.error) return { ...initialState, expression: "" }
      if (state.justEvaluated) {
        return {
          ...state,
          firstOperand: current,
          operator: op,
          waitingForSecond: true,
          justEvaluated: false,
          expression: `${state.display} ${OPERATOR_SYMBOL[op]} `,
          lastSecondDisplay: "",
        }
      }
      if (state.firstOperand !== null && state.operator !== null && !state.waitingForSecond) {
        try {
          const result = calculate(state.firstOperand, state.operator, current)
          const formatted = formatNumber(result)
          return {
            ...state,
            display: formatted,
            firstOperand: result,
            operator: op,
            waitingForSecond: true,
            expression: `${formatted} ${OPERATOR_SYMBOL[op]} `,
            lastSecondDisplay: state.display,
          }
        } catch (e: any) {
          return { ...state, display: "Error", error: e.message }
        }
      }
      if (state.operator !== null && state.waitingForSecond) {
        return { ...state, operator: op, expression: `${state.display} ${OPERATOR_SYMBOL[op]} ` }
      }
      return {
        ...state,
        firstOperand: current,
        operator: op,
        waitingForSecond: true,
        expression: `${state.display} ${OPERATOR_SYMBOL[op]} `,
        lastSecondDisplay: "",
      }
    }

    case "EVALUATE": {
      if (state.error) return initialState
      if (state.justEvaluated && state.lastOperator !== null && state.lastSecondValue !== null) {
        const current = parseFloat(state.display)
        try {
          const result = calculate(current, state.lastOperator, state.lastSecondValue)
          const resultStr = formatNumber(result)
          const opSym = OPERATOR_SYMBOL[state.lastOperator]
          return {
            ...state,
            display: resultStr,
            expression: `${formatNumber(current)} ${opSym} ${formatNumber(state.lastSecondValue)} = ${resultStr}`,
            firstOperand: result,
            pendingExpression: `${formatNumber(current)} ${opSym} ${formatNumber(state.lastSecondValue)}`,
          }
        } catch (e: any) {
          return { ...state, display: "Error", error: (e as Error).message }
        }
      }
      if (state.operator === null || state.firstOperand === null) return state
      const secondVal = state.waitingForSecond
        ? state.firstOperand
        : parseFloat(state.display)
      const secondDisplay = state.waitingForSecond
        ? formatNumber(state.firstOperand)
        : state.display
      try {
        const result = calculate(state.firstOperand, state.operator, secondVal)
        const resultStr = formatNumber(result)
        const opSym = OPERATOR_SYMBOL[state.operator]
        const firstStr = formatNumber(state.firstOperand)
        return {
          ...state,
          display: resultStr,
          expression: `${firstStr} ${opSym} ${secondDisplay} = ${resultStr}`,
          firstOperand: result,
          operator: null,
          waitingForSecond: false,
          justEvaluated: true,
          error: null,
          pendingExpression: `${firstStr} ${opSym} ${secondDisplay}`,
          lastSecondDisplay: secondDisplay,
          lastOperator: state.operator,
          lastSecondValue: secondVal,
        }
      } catch (e: any) {
        return {
          ...state,
          display: "Error",
          expression: `${formatNumber(state.firstOperand)} ${OPERATOR_SYMBOL[state.operator]} ${secondDisplay} = Error`,
          error: (e as Error).message,
          justEvaluated: true,
        }
      }
    }

    case "CLEAR":
      return { ...initialState }

    case "BACKSPACE": {
      if (state.error || state.justEvaluated || state.waitingForSecond) return state
      const newDisplay = state.display.length <= 1 || (state.display.length === 2 && state.display.startsWith("-"))
        ? "0"
        : state.display.slice(0, -1)
      return { ...state, display: newDisplay, expression: newDisplay }
    }

    case "TOGGLE_SIGN": {
      if (state.error || state.justEvaluated || state.display === "0") return state
      const newDisplay = state.display.startsWith("-")
        ? state.display.slice(1)
        : "-" + state.display
      return { ...state, display: newDisplay }
    }

    case "PERCENT": {
      if (state.error || state.display === "0") return state
      const num = parseFloat(state.display) / 100
      return { ...state, display: formatNumber(num) }
    }

    case "RECALL": {
      return { ...initialState, display: action.value, expression: action.value }
    }

    default:
      return state
  }
}

export function BasicCalculator() {
  const [state, dispatch] = useReducer(calcReducer, initialState)
  const [history, setHistory] = useLocalStorage<CalcHistoryEntry[]>("basicCalcHistory", [])
  const [historyOpen, setHistoryOpen] = useState(false)
  const prevJustEvaluated = useRef(false)
  const expressionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expressionRef.current) {
      expressionRef.current.scrollLeft = expressionRef.current.scrollWidth
    }
  }, [state.expression])

  useEffect(() => {
    if (state.justEvaluated && !prevJustEvaluated.current && state.pendingExpression) {
      const entry: CalcHistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        expression: state.pendingExpression,
        result: state.display,
        timestamp: Date.now(),
      }
      setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY))
    }
    prevJustEvaluated.current = state.justEvaluated
  }, [state.justEvaluated, state.pendingExpression, state.display, setHistory])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return

      let key = e.key

      if (e.code.startsWith("Numpad")) {
        const numpadMap: Record<string, string> = {
          Numpad0: "0", Numpad1: "1", Numpad2: "2", Numpad3: "3",
          Numpad4: "4", Numpad5: "5", Numpad6: "6", Numpad7: "7",
          Numpad8: "8", Numpad9: "9", NumpadDecimal: ".",
          NumpadAdd: "+", NumpadSubtract: "-", NumpadMultiply: "*",
          NumpadDivide: "/", NumpadEnter: "Enter",
        }
        key = numpadMap[e.code] || key
      }

      if (/^[0-9]$/.test(key)) {
        e.preventDefault()
        dispatch({ type: "DIGIT", digit: key })
        return
      }
      if (key === ".") {
        e.preventDefault()
        dispatch({ type: "DECIMAL" })
        return
      }
      if (["+", "-", "*", "/"].includes(key)) {
        e.preventDefault()
        dispatch({ type: "OPERATOR", op: key })
        return
      }
      if (key === "Enter" || key === "=") {
        e.preventDefault()
        dispatch({ type: "EVALUATE" })
        return
      }
      if (key === "Backspace") {
        e.preventDefault()
        dispatch({ type: "BACKSPACE" })
        return
      }
      if (key === "Escape") {
        e.preventDefault()
        dispatch({ type: "CLEAR" })
        return
      }
      if (key === "%") {
        e.preventDefault()
        dispatch({ type: "PERCENT" })
        return
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const recallFromHistory = useCallback((value: string) => {
    dispatch({ type: "RECALL", value })
  }, [])

  const isDefaultState = state.display === "0" && !state.operator && !state.firstOperand && !state.error

  return (
    <div className="relative">
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden" role="region" aria-label="Basic calculator">
        <div className="px-5 pt-5 pb-3 bg-background/50 border-b border-border space-y-1">
          <div
            ref={expressionRef}
            className="text-right text-sm text-muted-foreground/60 font-mono truncate h-5 leading-5 overflow-x-auto scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            aria-label="Expression"
          >
            {state.expression || <span className="opacity-0">placeholder</span>}
          </div>
          <div
            className={`text-right text-3xl sm:text-4xl font-semibold font-mono tracking-tight transition-all duration-150 ${
              state.error
                ? "text-destructive"
                : state.justEvaluated
                ? "text-primary"
                : "text-foreground"
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            {state.error || state.display}
          </div>
        </div>

        <div className="p-3 grid grid-cols-4 gap-2">
          <CalcButton
            label={isDefaultState ? "AC" : "C"}
            ariaLabel={isDefaultState ? "Clear all" : "Clear"}
            variant="clear"
            onClick={() => dispatch({ type: "CLEAR" })}
          />

          <CalcButton
            label="⌫"
            ariaLabel="Backspace"
            variant="delete"
            onClick={() => dispatch({ type: "BACKSPACE" })}
          />

          <CalcButton
            label="%"
            ariaLabel="Percent"
            variant="utility"
            onClick={() => dispatch({ type: "PERCENT" })}
          />

          <CalcButton
            label="÷"
            ariaLabel="Divide"
            variant="operator"
            onClick={() => dispatch({ type: "OPERATOR", op: "/" })}
          />

          <CalcButton label="7" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "7" })} />
          <CalcButton label="8" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "8" })} />
          <CalcButton label="9" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "9" })} />

          <CalcButton
            label="×"
            ariaLabel="Multiply"
            variant="operator"
            onClick={() => dispatch({ type: "OPERATOR", op: "*" })}
          />

          <CalcButton label="4" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "4" })} />
          <CalcButton label="5" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "5" })} />
          <CalcButton label="6" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "6" })} />

          <CalcButton
            label="−"
            ariaLabel="Subtract"
            variant="operator"
            onClick={() => dispatch({ type: "OPERATOR", op: "-" })}
          />

          <CalcButton label="1" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "1" })} />
          <CalcButton label="2" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "2" })} />
          <CalcButton label="3" variant="number" onClick={() => dispatch({ type: "DIGIT", digit: "3" })} />

          <CalcButton
            label="+"
            ariaLabel="Add"
            variant="operator"
            onClick={() => dispatch({ type: "OPERATOR", op: "+" })}
          />

          <div className="col-span-2">
            <CalcButton
              label="0"
              variant="number"
              className="w-full"
              onClick={() => dispatch({ type: "DIGIT", digit: "0" })}
            />
          </div>

          <CalcButton
            label="."
            ariaLabel="Decimal point"
            variant="number"
            onClick={() => dispatch({ type: "DECIMAL" })}
          />

          <CalcButton
            label="="
            ariaLabel="Calculate"
            variant="equals"
            onClick={() => dispatch({ type: "EVALUATE" })}
          />
        </div>

        <div className="px-4 pb-3">
          <button
            onClick={() => setHistoryOpen(true)}
            className="group relative flex items-center justify-center gap-1.5 w-full py-2 text-xs font-medium text-muted-foreground/60 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-150"
          >
            <History className="w-3.5 h-3.5 transition-transform duration-150 group-hover:scale-110" />
            History
            {history.length > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                {history.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onRecall={recallFromHistory}
        history={history}
        onClear={() => setHistory([])}
        onRemove={(id) => setHistory((prev) => prev.filter((e) => e.id !== id))}
      />
    </div>
  )
}

type ButtonVariant = "number" | "operator" | "clear" | "delete" | "equals" | "utility"

interface CalcButtonProps {
  label: string
  ariaLabel?: string
  variant: ButtonVariant
  onClick: () => void
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  number:
    "bg-secondary text-foreground hover:bg-secondary/70 active:bg-secondary/90 shadow-sm",
  operator:
    "bg-accent text-accent-foreground hover:bg-accent/70 active:bg-accent/90 shadow-sm",
  clear:
    "bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 active:bg-amber-500/35",
  delete:
    "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 active:bg-red-500/30",
  equals:
    "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/110 shadow-md",
  utility:
    "bg-secondary/50 text-muted-foreground hover:bg-secondary/70 active:bg-secondary/90",
}

const sizeStyles: Record<ButtonVariant, string> = {
  number: "text-lg sm:text-xl",
  operator: "text-lg sm:text-xl",
  clear: "text-base sm:text-lg",
  delete: "text-lg sm:text-xl",
  equals: "text-xl sm:text-2xl",
  utility: "text-base sm:text-lg",
}

function CalcButton({ label, ariaLabel, variant, onClick, className = "" }: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`
        h-14 sm:h-16 rounded-xl font-medium
        active:scale-95 active:shadow-none
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
        select-none cursor-pointer
        transition-all duration-100 ease-out
        ${variantStyles[variant]}
        ${sizeStyles[variant]}
        ${className}
      `}
    >
      {label}
    </button>
  )
}
