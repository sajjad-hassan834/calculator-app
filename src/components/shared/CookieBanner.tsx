import { useState, useEffect } from "react"
import { X, Cookie } from "lucide-react"
import { Link } from "react-router"

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

  const reject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-4 shadow-lg"
      role="alertdialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-description"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p id="cookie-description" className="text-xs text-muted-foreground">
              We use essential cookies for functionality and anonymized analytics to improve your experience.
              By clicking "Accept", you consent to our use of cookies.{" "}
              <Link to="/legal/cookies" className="text-primary hover:underline whitespace-nowrap">
                Learn more
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={reject}
            className="flex-1 sm:flex-none px-4 py-2 bg-secondary border border-border rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Accept All
          </button>
          <button
            onClick={accept}
            className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
