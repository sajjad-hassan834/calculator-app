import { useState } from "react"
import { Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-['DM_Serif_Display',serif] text-2xl lg:text-3xl text-white mb-3">
          Stay Financially Informed
        </h2>
        <p className="text-blue-200 mb-8 text-sm">
          Weekly insights, new calculators, and financial tips — delivered free.
        </p>
        {done ? (
          <div className="flex items-center justify-center gap-2 text-white font-medium">
            <Check className="w-5 h-5 text-emerald-300" /> You are subscribed. Thank you!
          </div>
        ) : (
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-300/60 text-sm outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              onClick={() => { if (email) setDone(true) }}
              className="px-5 py-3 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </div>
        )}
        <p className="text-xs text-blue-300/60 mt-4">No spam. Unsubscribe at any time. We respect your privacy.</p>
      </div>
    </section>
  )
}
