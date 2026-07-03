import { Clock, RotateCcw, Trash2, X } from "lucide-react"
import { useCalculationHistory } from "../../hooks/useCalculationHistory"
import { fmt$ } from "../../lib/formatters"
import { useNavigate } from "react-router"

interface HistoryPanelProps {
  open: boolean
  onClose: () => void
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts
  if (diff < 60000) return "Just now"
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

function ResultValue({ value }: { value: number | string }) {
  if (typeof value === "number" && value > 1000) {
    return <span>{fmt$(value)}</span>
  }
  return <span>{String(value)}</span>
}

export function HistoryPanel({ open, onClose }: HistoryPanelProps) {
  const { history, deleteEntry, clearHistory } = useCalculationHistory()
  const navigate = useNavigate()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Calculation history"
      onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground text-base">Calculation History</h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{history.length}</span>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Clear all history"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Close history"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground font-medium">No history yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Your calculation results will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group bg-background border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-foreground">{entry.calculatorName}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{formatTime(entry.timestamp)}</div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          navigate(`/calculator/${entry.calculatorId}`)
                          onClose()
                        }}
                        className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                        aria-label="Reuse calculation"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-red-500"
                        aria-label="Delete entry"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(entry.results).slice(0, 3).map(([key, value]) => (
                      <span key={key} className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim()}:{" "}
                        <span className="font-medium text-foreground">
                          <ResultValue value={value} />
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="border-t border-border px-4 py-2.5 bg-secondary/30 text-xs text-muted-foreground text-center">
            Showing {history.length} calculation{history.length !== 1 ? "s" : ""} — stored locally on your device
          </div>
        )}
      </div>
    </div>
  )
}
