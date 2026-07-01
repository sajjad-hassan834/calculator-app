import { Link } from "react-router"
import { Home, ArrowLeft, Search } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"

export function NotFoundPage() {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center">
      <SEOHead
        title="404 — Page Not Found | FinanceCalc"
        description="The page you are looking for does not exist or has been moved."
      />
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-['DM_Serif_Display',serif] text-4xl text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-2">Page not found</p>
        <p className="text-sm text-muted-foreground/60 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-200"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary/80 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
