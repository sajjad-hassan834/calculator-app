const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

type EventName =
  | "page_view"
  | "calculator_used"
  | "search_used"
  | "result_copied"
  | "result_exported"
  | "result_shared"
  | "favorite_added"
  | "favorite_removed"
  | "history_viewed"
  | "theme_toggled"
  | "error_occurred"

interface AnalyticsEvent {
  name: EventName
  properties?: Record<string, string | number | boolean>
  timestamp: number
}

const EVENT_QUEUE: AnalyticsEvent[] = []

function getSessionId(): string {
  let sid = sessionStorage.getItem("analytics_session_id")
  if (!sid) {
    sid = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
    sessionStorage.setItem("analytics_session_id", sid)
  }
  return sid
}

async function sendToBackend(event: AnalyticsEvent) {
  try {
    const sessionId = getSessionId()
    switch (event.name) {
      case "page_view": {
        await fetch(`${API_URL}/api/v1/analytics/track/page-view`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page_type: event.properties?.page_type || "unknown",
            page_id: event.properties?.page_id || null,
            url: event.properties?.path || window.location.pathname,
            referrer: document.referrer || null,
            session_id: sessionId,
            time_on_page: null,
          }),
        })
        break
      }
      case "calculator_used": {
        await fetch(`${API_URL}/api/v1/analytics/track/calculator-usage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calculator_id: event.properties?.calculator_id || null,
            calculator_slug: event.properties?.calculator_slug || null,
            session_id: sessionId,
            time_on_page: event.properties?.time_on_page || null,
          }),
        })
        break
      }
      case "search_used": {
        await fetch(`${API_URL}/api/v1/analytics/track/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: event.properties?.query || "",
            result_count: event.properties?.result_count || 0,
            session_id: sessionId,
            clicked_result: event.properties?.clicked_result || null,
            clicked_result_type: event.properties?.clicked_result_type || null,
          }),
        })
        break
      }
    }
  } catch {
    // silently fail - analytics should never block the app
  }
}

function sendToAnalytics(event: AnalyticsEvent) {
  if (typeof window === "undefined") return

  // Store in localStorage for later analysis
  try {
    const stored = JSON.parse(localStorage.getItem("analytics_events") || "[]") as AnalyticsEvent[]
    stored.push(event)
    localStorage.setItem("analytics_events", JSON.stringify(stored.slice(-100)))
  } catch { /* ignore */ }

  // Google Analytics 4
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || ""
  if (typeof window !== "undefined" && (window as any).gtag && gaId) {
    try {
      ;(window as any).gtag("event", event.name, {
        ...event.properties,
        event_timestamp: event.timestamp,
      })
    } catch { /* ignore */ }
  }

  // Backend tracking API (fire and forget)
  sendToBackend(event)
}

export function trackEvent(name: EventName, properties?: Record<string, string | number | boolean>) {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: Date.now(),
  }

  EVENT_QUEUE.push(event)
  sendToAnalytics(event)
}

export function trackPageView(path: string) {
  trackEvent("page_view", { path, page_type: "page" })

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || ""
  if (typeof window !== "undefined" && (window as any).gtag && gaId) {
    try {
      ;(window as any).gtag("config", gaId, {
        page_path: path,
      })
    } catch { /* ignore */ }
  }
}
