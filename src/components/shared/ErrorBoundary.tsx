import { Component, type ErrorInfo, type ReactNode } from "react"
import { Link } from "react-router"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    if (typeof window !== "undefined" && "gtag" in window) {
      try {
        ;(window as any).gtag?.("event", "error", {
          error_type: "react_boundary",
          error_message: error.message,
        })
      } catch {}
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h1 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-2">Something went wrong</h1>
            <p className="text-muted-foreground text-sm mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="px-4 py-2 bg-secondary border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
