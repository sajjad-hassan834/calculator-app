import { SEOHead } from "../components/seo/SEOHead"
import { Shield, Keyboard, Eye, Ear, MousePointer, Type } from "lucide-react"

const FEATURES = [
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description: "All interactive elements are accessible via keyboard. Use Tab to navigate, Enter to activate, and Escape to close dialogs.",
  },
  {
    icon: Eye,
    title: "Visual Design",
    description: "High contrast ratios meet WCAG 2.2 AA standards. Content remains readable on all screen sizes with resizable text.",
  },
  {
    icon: Ear,
    title: "Screen Reader Support",
    description: "Semantic HTML structure with ARIA labels, landmarks, and live regions ensure compatibility with screen readers.",
  },
  {
    icon: MousePointer,
    title: "Focus Management",
    description: "Visible focus indicators, logical tab order, and focus trapping in modals for seamless interaction.",
  },
  {
    icon: Type,
    title: "Readable Content",
    description: "Clear typography, proper heading hierarchy, and descriptive link text help all users navigate content.",
  },
  {
    icon: Shield,
    title: "WCAG 2.2 AA Compliant",
    description: "We strive to meet all WCAG 2.2 AA success criteria including contrast, keyboard accessibility, and error identification.",
  },
]

export function AccessibilityPage() {
  return (
    <>
      <SEOHead
        title="Accessibility | FinanceCalc"
        description="FinanceCalc is committed to providing an accessible experience for all users. Learn about our WCAG 2.2 AA compliance and accessibility features."
        canonical="https://financecalc.com/accessibility"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl text-foreground mb-4">
            Accessibility
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            FinanceCalc is committed to ensuring digital accessibility for all users, regardless of ability.
            We continuously work to conform to WCAG 2.2 AA standards and improve the user experience for everyone.
          </p>
        </div>

        {/* Standards */}
        <div className="mb-12">
          <h2 className="font-['DM_Serif_Display',serif] text-xl text-foreground mb-4">Standards & Compliance</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Our accessibility efforts are guided by the Web Content Accessibility Guidelines (WCAG) version 2.2 Level AA.
              These guidelines outline best practices for making web content accessible to users with disabilities,
              including visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Perceivable — Information and user interface components must be presentable to users in ways they can perceive</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Operable — User interface components and navigation must be operable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Understandable — Information and the operation of user interface must be understandable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Robust — Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="font-['DM_Serif_Display',serif] text-xl text-foreground mb-4">Our Accessibility Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-card border border-border rounded-xl p-5">
                  <Icon className="w-5 h-5 text-primary mb-3" />
                  <h3 className="text-sm font-medium text-foreground mb-2">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-['DM_Serif_Display',serif] text-xl text-foreground mb-3">Report an Issue</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            If you encounter any accessibility barriers or have suggestions for improvement, please contact us.
            We aim to respond within 2 business days.
          </p>
          <a
            href="mailto:accessibility@financecalc.com"
            className="inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            accessibility@financecalc.com
          </a>
        </div>

        {/* Last updated */}
        <p className="mt-8 text-xs text-muted-foreground">Last updated: June 2026</p>
      </div>
    </>
  )
}
