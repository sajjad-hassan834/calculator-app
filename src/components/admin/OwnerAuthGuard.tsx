import { useState, useEffect, type ReactNode } from "react"
import { Link } from "react-router"

const ADMIN_SECRET = import.meta.env.VITE_ADMIN_PASSPHRASE || ""

function getStoredToken(): string | null {
  try {
    return localStorage.getItem("fc_admin_token")
  } catch {
    return null
  }
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-muted-foreground">404</span>
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-1">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-200"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}

export function OwnerAuthGuard({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = getStoredToken()
    setAuthed(!!ADMIN_SECRET && stored === ADMIN_SECRET)
  }, [])

  if (authed === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground animate-pulse">Verifying access...</div>
      </div>
    )
  }

  if (!authed) {
    return <NotFound />
  }

  return <>{children}</>
}
