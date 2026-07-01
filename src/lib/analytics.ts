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

function sendToAnalytics(event: AnalyticsEvent) {
  if (typeof window === "undefined") return

  // Store in localStorage for later analysis
  try {
    const stored = JSON.parse(localStorage.getItem("analytics_events") || "[]") as AnalyticsEvent[]
    stored.push(event)
    localStorage.setItem("analytics_events", JSON.stringify(stored.slice(-100)))
  } catch { /* ignore */ }

  // Google Analytics 4 (placeholder - add your measurement ID)
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      ;(window as any).gtag("event", event.name, {
        ...event.properties,
        event_timestamp: event.timestamp,
      })
    } catch { /* ignore */ }
  }
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
  trackEvent("page_view", { path })

  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      ;(window as any).gtag("config", "G-XXXXXXXXXX", {
        page_path: path,
      })
    } catch { /* ignore */ }
  }
}
