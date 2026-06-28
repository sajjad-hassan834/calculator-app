import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-4 shadow-lg" role="alert" aria-label="Cookie consent">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          We use essential cookies for functionality and anonymized analytics. By continuing, you accept our{" "}
          <a href="/legal/cookies" className="text-primary hover:underline">Cookie Policy</a>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
          <button
            onClick={accept}
            className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
