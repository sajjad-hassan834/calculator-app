import { X, Trash2, Clock, Calculator } from "lucide-react"

export interface CalcHistoryEntry {
  id: string
  expression: string
  result: string
  timestamp: number
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  if (diff < 60000) return "Just now"
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

interface HistoryDrawerProps {
  open: boolean
  onClose: () => void
  onRecall: (value: string) => void
  history: CalcHistoryEntry[]
  onClear: () => void
  onRemove: (id: string) => void
}

export function HistoryDrawer({ open, onClose, onRecall, history, onClear, onRemove }: HistoryDrawerProps) {

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Calculation history"
      >
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Close history"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <Calculator className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">No history yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Completed calculations will appear here
              </p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="group relative bg-secondary/40 border border-border rounded-xl p-3 hover:bg-secondary/70 transition-colors cursor-pointer"
                  onClick={() => {
                    onRecall(entry.result)
                    onClose()
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onRecall(entry.result)
                      onClose()
                    }
                  }}
                >
                  <div className="text-xs text-muted-foreground/70 font-mono truncate pr-6">
                    {entry.expression}
                  </div>
                  <div className="text-base font-semibold text-foreground font-mono mt-0.5">
                    {entry.result}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] text-muted-foreground/50">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(entry.id)
                    }}
                    className="absolute top-2 right-2 p-1 rounded-md text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
                    aria-label="Remove entry"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="border-t border-border p-3 shrink-0">
              <button
              onClick={onClear}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear history
            </button>
          </div>
        )}
      </div>
    </>
  )
}
