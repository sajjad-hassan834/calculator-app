import { useState } from "react"
import { Check, AlertCircle } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const handleSubscribe = () => {
    const trimmed = email.trim()
    if (!trimmed) {
      setError("Please enter your email address")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <section className="py-16 bg-primary" aria-labelledby="newsletter-heading">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="newsletter-heading" className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-white mb-3">
          Stay Financially Informed
        </h2>
        <p className="text-blue-200 mb-8 text-sm">
          Weekly insights, new calculators, and financial tips — delivered free.
        </p>
        {done ? (
          <div className="flex items-center justify-center gap-2 text-white font-medium" role="status">
            <Check className="w-5 h-5 text-emerald-300" aria-hidden="true" /> You are subscribed. Thank you!
          </div>
        ) : (
          <>
            <div className="flex gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError("") }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe() }}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-300/60 text-sm outline-none focus:ring-2 focus:ring-white/30"
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="px-5 py-3 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </div>
            {error && <p id="newsletter-error" className="text-xs text-red-300 mt-2 flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
          </>
        )}
        <p className="text-xs text-blue-300/60 mt-4">No spam. Unsubscribe at any time. We respect your privacy.</p>
      </div>
    </section>
  )
}
