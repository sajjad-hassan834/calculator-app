import { useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"

export interface CalcHistoryEntry {
  id: string
  calculatorId: string
  calculatorName: string
  inputs: Record<string, number>
  results: Record<string, number | string>
  timestamp: number
}

const MAX_HISTORY = 50

export function useCalculationHistory() {
  const [history, setHistory] = useLocalStorage<CalcHistoryEntry[]>("calcHistory", [])

  const addEntry = useCallback(
    (entry: Omit<CalcHistoryEntry, "id" | "timestamp">) => {
      const newEntry: CalcHistoryEntry = {
        ...entry,
        id: `${entry.calculatorId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: Date.now(),
      }
      setHistory((prev) => [newEntry, ...prev].slice(0, MAX_HISTORY))
    },
    [setHistory]
  )

  const deleteEntry = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((e) => e.id !== id))
    },
    [setHistory]
  )

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [setHistory])

  const getHistoryForCalculator = useCallback(
    (calculatorId: string) => {
      return history.filter((e) => e.calculatorId === calculatorId)
    },
    [history]
  )

  return {
    history,
    addEntry,
    deleteEntry,
    clearHistory,
    getHistoryForCalculator,
  }
}
