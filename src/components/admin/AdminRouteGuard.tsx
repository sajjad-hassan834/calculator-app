import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router"

function getAuthToken(): string | null {
  try {
    return localStorage.getItem("admin_token")
  } catch {
    return null
  }
}

export function AdminRouteGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    const token = getAuthToken()
    if (token === "owner-authorized") {
      setAuthed(true)
    } else {
      setAuthed(false)
      navigate("/", { replace: true })
    }
  }, [navigate])

  if (authed === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground animate-pulse">Verifying access...</div>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <p className="text-muted-foreground text-sm">This page could not be found.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
