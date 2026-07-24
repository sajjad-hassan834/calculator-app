import { useState, useEffect, useRef, useMemo } from "react"
import { useNavigate } from "react-router"
import { Search, X, TrendingUp, Clock, Star, ArrowRight, Trash2, Command } from "lucide-react"
import { CATEGORIES } from "../../lib/data"
import { SEARCH_INDEX } from "../../lib/searchData"
import { useRecentSearches } from "../../hooks/useRecentSearches"
import { motion, AnimatePresence } from "framer-motion"
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

  const filtered = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    const scored = SEARCH_INDEX.map((entry) => {
      let score = 0
      const titleLower = entry.title.toLowerCase()
      const descLower = entry.description.toLowerCase()
      if (titleLower === q) score += 100
      if (titleLower.startsWith(q)) score += 80
      if (titleLower.includes(q)) score += 60
      if (entry.synonyms.some((s) => s.toLowerCase().includes(q))) score += 50
      if (entry.keywords.some((k) => k.toLowerCase().includes(q))) score += 40
      if (descLower.includes(q)) score += 20
      return { ...entry, score }
    })
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
    return scored
  }, [query])

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
        const found = SEARCH_INDEX.find((c) =>
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
    const found = SEARCH_INDEX.find((c) =>
      c.title.toLowerCase().includes(s.toLowerCase())
    )
    if (found) {
      navigate(found.path)
      onClose()
    }
  }

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Search calculators"
          onKeyDown={(e) => { if (e.key === "Escape") onClose() }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50 bg-background/50">
              <Search className="w-5 h-5 text-primary shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search tools, calculators, or topics..."
                className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                role="combobox"
                aria-expanded={filtered.length > 0}
                aria-label="Search calculators"
                aria-autocomplete="list"
                aria-controls="search-results"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {query.trim() === "" ? (
              <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {searches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" /> Recent Searches
                      </span>
                      <button
                        onClick={clearSearches}
                        className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Clear recent searches"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searches.map((s) => (
                        <button
                          key={s}
                          onClick={() => handlePopularClick(s)}
                          className="px-3 py-1.5 bg-secondary/40 hover:bg-primary/10 border border-border/50 hover:border-primary/30 rounded-full text-xs text-foreground hover:text-primary transition-all duration-200 shadow-sm hover:shadow"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <span className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    <TrendingUp className="w-3.5 h-3.5" /> Popular Calculators
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SEARCH_INDEX.slice(0, 6).map((entry) => (
                      <button
                        key={entry.id}
                        onClick={() => handleNavigate(entry.path)}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/20 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-border/50 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                          <Command className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground group-hover:text-primary truncate transition-colors">{entry.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{entry.category}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    <Star className="w-3.5 h-3.5" /> Browse Categories
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map((c) => {
                      const Icon = c.icon
                      return (
                        <button
                          key={c.id}
                          onClick={() => handleNavigate(`/category/${c.id}`)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all text-left"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="truncate">{c.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : filtered.length > 0 ? (
              <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar" role="listbox" id="search-results">
                {filtered.map((item, i) => {
                  const category = CATEGORIES.find(c => c.id === item.category.toLowerCase().replace(/ /g, '-')) || CATEGORIES[0]
                  const Icon = category.icon
                  
                  return (
                    <button
                      key={item.id}
                      role="option"
                      aria-selected={i === selectedIndex}
                      onClick={() => handleNavigate(item.path, query)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 border ${
                        i === selectedIndex
                          ? "bg-primary/10 border-primary/20 shadow-sm"
                          : "bg-transparent border-transparent hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          i === selectedIndex ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 text-left flex-1">
                          <span className={`block text-sm font-semibold truncate ${
                            i === selectedIndex ? "text-primary" : "text-foreground"
                          }`}>
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground truncate block mt-0.5">
                            {item.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 pl-4">
                        <span className="hidden sm:block text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-secondary text-muted-foreground">
                          {item.category}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${i === selectedIndex ? "text-primary translate-x-1" : "text-muted-foreground"}`} />
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="text-base font-semibold text-foreground mb-1">No results found</div>
                <div className="text-sm text-muted-foreground">
                  We couldn't find anything matching "{query}". Try different keywords.
                </div>
              </div>
            )}

            <div className="border-t border-border/50 px-4 py-3 bg-background/80 flex items-center justify-between text-xs text-muted-foreground">
              <span className="hidden sm:flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-secondary font-sans font-medium text-[10px]">↑↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-secondary font-sans font-medium text-[10px]">Enter</kbd> to select</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-secondary font-sans font-medium text-[10px]">Esc</kbd> to close</span>
              </span>
              <span className="sm:hidden">Swipe to explore</span>
              <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{filtered.length} results</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
