import { Link } from "react-router"
import { Home, RefreshCw, AlertTriangle } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"

interface ErrorPageProps {
  status?: number
  message?: string
}

export function ErrorPage({ status = 500, message = "Something went wrong" }: ErrorPageProps) {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center">
      <SEOHead
        title={`${status} — Error | FinanceCalc`}
        description="An unexpected error occurred. Please try again later."
        noIndex
      />
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="font-['DM_Serif_Display',serif] text-4xl text-foreground mb-2">{status}</h1>
        <p className="text-lg text-muted-foreground mb-2">{message}</p>
        <p className="text-sm text-muted-foreground/60 mb-8">
          Please try refreshing the page or come back later.
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
            <RefreshCw className="w-4 h-4" /> Refresh Page
          </button>
        </div>
      </div>
    </div>
  )
}
