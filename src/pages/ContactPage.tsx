import { useState } from "react"
import { Link } from "react-router"
import { Send, Check } from "lucide-react"

export function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Contact</span>
        </nav>

        <h1 className="font-['DM_Serif_Display',serif] text-3xl text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">Have a question, suggestion, or feedback? We'd love to hear from you.</p>

        {sent ? (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <Check className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="font-semibold text-foreground text-lg mb-2">Message Sent!</h2>
            <p className="text-sm text-muted-foreground">Thank you for reaching out. We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input type="text" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <input type="text" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30" placeholder="How can we help?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea rows={5} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30 resize-none" placeholder="Your message..." />
            </div>
            <button
              onClick={() => setSent(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
