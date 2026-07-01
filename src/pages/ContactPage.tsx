import { useState } from "react"
import { Link } from "react-router"
import { Send, Check, AlertCircle } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = "Name is required"
    if (!email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email"
    if (!subject.trim()) errs.subject = "Subject is required"
    if (!message.trim()) errs.message = "Message is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      setSent(true)
    }
  }

  return (
    <div className="bg-background">
      <SEOHead
        title="Contact Us — FinanceCalc"
        description="Have a question or suggestion? Contact the FinanceCalc team. We'd love to hear from you."
        canonical="https://financecalc.com/contact"
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground font-medium" aria-current="page">Contact</span>
        </nav>

        <h1 className="font-['DM_Serif_Display',serif] text-3xl text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">Have a question, suggestion, or feedback? We'd love to hear from you.</p>

        {sent ? (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <Check className="w-12 h-12 text-emerald-500 mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-semibold text-foreground text-lg mb-2">Message Sent!</h2>
            <p className="text-sm text-muted-foreground">Thank you for reaching out. We'll get back to you as soon as possible.</p>
            <button onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); setErrors({}) }} className="mt-4 text-sm text-primary hover:underline">Send another message</button>
          </div>
        ) : (
          <form
            className="bg-card border border-border rounded-2xl p-8 space-y-5"
            onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2.5 bg-background border ${errors.name ? "border-red-500" : "border-border"} rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30`}
                placeholder="Your name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-errormessage={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name && <p id="contact-name-error" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 bg-background border ${errors.email ? "border-red-500" : "border-border"} rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30`}
                placeholder="your@email.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-errormessage={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email && <p id="contact-email-error" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`w-full px-4 py-2.5 bg-background border ${errors.subject ? "border-red-500" : "border-border"} rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30`}
                placeholder="How can we help?"
                aria-required="true"
                aria-invalid={!!errors.subject}
                aria-errormessage={errors.subject ? "contact-subject-error" : undefined}
              />
              {errors.subject && <p id="contact-subject-error" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full px-4 py-2.5 bg-background border ${errors.message ? "border-red-500" : "border-border"} rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/30 resize-none`}
                placeholder="Your message..."
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-errormessage={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message && <p id="contact-message-error" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
