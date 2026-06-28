import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { Search, X, TrendingUp, Clock, Star, ArrowRight, Trash2 } from "lucide-react"
import { CATEGORIES, FEATURED } from "../../lib/data"
import { useRecentSearches } from "../../hooks/useRecentSearches"

const POPULAR_SEARCHES = [
  "Mortgage", "Compound Interest", "Loan", "Retirement", "ROI",
  "Savings Goal", "Tax", "Break Even", "Investment",
]

const ALL_CALCULATORS = FEATURED.map((c) => ({
  id: c.id,
  title: c.title,
  category: "Featured",
  path: `/calculator/${c.id}`,
})).concat(
  CATEGORIES.map((c) => ({
    id: c.id,
    title: c.label,
    category: "Category",
    path: `/category/${c.id}`,
  }))
)

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { searches, add: addSearch, clear: clearSearches } = useRecentSearches()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const filtered = query.trim()
    ? ALL_CALCULATORS.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : []

  const handleNavigate = (path: string, q?: string) => {
    if (q) addSearch(q)
    navigate(path)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      if (filtered[selectedIndex]) {
        addSearch(query)
        navigate(filtered[selectedIndex].path)
        onClose()
      } else if (query.trim()) {
        addSearch(query)
        const found = ALL_CALCULATORS.find((c) =>
          c.title.toLowerCase().includes(query.toLowerCase())
        )
        if (found) {
          navigate(found.path)
          onClose()
        }
      }
    } else if (e.key === "Escape") {
      onClose()
    } else if (e.key === "Tab") {
      e.preventDefault()
      const focusable = overlayRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable && focusable.length > 0) {
        const first = focusable[0] as HTMLElement
        const last = focusable[focusable.length - 1] as HTMLElement
        if (e.shiftKey && document.activeElement === first) {
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus()
        }
      }
    }
  }

  const handlePopularClick = (s: string) => {
    addSearch(s)
    const found = ALL_CALCULATORS.find((c) =>
      c.title.toLowerCase().includes(s.toLowerCase())
    )
    if (found) {
      navigate(found.path)
      onClose()
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Search calculators"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={overlayRef}
        className="relative w-full max-w-xl mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search calculators..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-label="Search calculators"
            aria-autocomplete="list"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {query.trim() === "" ? (
          <div className="p-4 max-h-80 overflow-y-auto">
            {searches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Clock className="w-3 h-3" /> Recent Searches
                  </span>
                  <button
                    onClick={clearSearches}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear recent searches"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handlePopularClick(s)}
                      className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <TrendingUp className="w-3 h-3" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handlePopularClick(s)}
                    className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <Star className="w-3 h-3" /> Categories
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((c) => {
                  const Icon = c.icon
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleNavigate(`/category/${c.id}`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-left"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {c.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="p-2 max-h-80 overflow-y-auto" role="listbox">
            {filtered.map((item, i) => (
              <button
                key={item.id}
                role="option"
                aria-selected={i === selectedIndex}
                onClick={() => handleNavigate(item.path, query)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  i === selectedIndex
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No calculators found for &ldquo;{query}&rdquo;
          </div>
        )}

        <div className="border-t border-border px-4 py-2 bg-secondary/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>Tip: arrows to navigate, Enter to select, Esc to close</span>
          <span className="font-['JetBrains_Mono',monospace]">{filtered.length} results</span>
        </div>
      </div>
    </div>
  )
}
