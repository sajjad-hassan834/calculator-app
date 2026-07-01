import { Link } from "react-router"
import { Home, RefreshCw, WifiOff } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"

export function OfflinePage() {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center">
      <SEOHead title="Offline — FinanceCalculator.com" description="You are currently offline. Some features may be unavailable." noIndex />
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="font-['DM_Serif_Display',serif] text-3xl text-foreground mb-2">You&apos;re Offline</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your internet connection appears to be offline. Some calculators may still work since they run locally in your browser.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-200"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary/80 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </div>
    </div>
  )
}
