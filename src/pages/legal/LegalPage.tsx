import { useParams, Link } from "react-router"
import { SEOHead } from "../../components/seo/SEOHead"

const LEGAL_CONTENT: Record<string, { title: string; lastUpdated: string; content: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "June 1, 2026",
    content: [
      "FinanceCalculator.com respects your privacy. We do not collect, store, or share any personal financial data you enter into our calculators.",
      "All calculations are performed locally in your browser. No data is transmitted to our servers.",
      "We may collect anonymized analytics data (page views, time on site) to improve our services. This data cannot be used to identify you personally.",
      "We use cookies for essential functionality (e.g., dark mode preference). No third-party tracking cookies are used without your consent.",
      "If you subscribe to our newsletter, your email address is stored securely and used only to send you the content you requested. You can unsubscribe at any time.",
      "We do not sell, rent, or share your personal information with third parties.",
      "Our website may contain links to third-party sites. We are not responsible for their privacy practices.",
      "By using FinanceCalculator.com, you consent to this privacy policy.",
    ],
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "June 1, 2026",
    content: [
      "FinanceCalculator.com provides financial calculators and educational content for informational purposes only.",
      "All calculations are estimates based on standard financial formulas. They should not be considered as financial advice.",
      "You agree not to use our calculators for any unlawful purpose or in violation of any applicable laws.",
      "We reserve the right to modify or discontinue any part of our service at any time without notice.",
      "We are not liable for any damages arising from the use or inability to use our calculators.",
      "Our content may change over time. We make no guarantees about accuracy, completeness, or timeliness.",
      "By using FinanceCalculator.com, you accept these terms of service.",
    ],
  },
  cookies: {
    title: "Cookie Policy",
    lastUpdated: "June 1, 2026",
    content: [
      "FinanceCalculator.com uses cookies to enhance your browsing experience and provide essential functionality.",
      "Essential cookies: These are required for basic site functionality, such as remembering your dark mode preference.",
      "Analytics cookies: We use anonymized analytics to understand how visitors use our site, helping us improve the experience.",
      "You can control cookies through your browser settings. Disabling cookies may affect some site functionality.",
      "We do not use advertising cookies or third-party tracking cookies without your explicit consent.",
      "For more information about how we handle your data, see our Privacy Policy.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    lastUpdated: "June 1, 2026",
    content: [
      "The calculators and content on FinanceCalculator.com are for educational and informational purposes only.",
      "They do not constitute financial advice, investment advice, or a recommendation of any specific financial product or strategy.",
      "All calculations are estimates based on standard formulas and user-provided inputs. Actual results may vary significantly.",
      "Always consult with a qualified financial advisor, tax professional, or legal expert before making financial decisions.",
      "We make no representations or warranties about the accuracy, completeness, or suitability of the information provided.",
      "Past performance shown in calculators is not indicative of future results. Investment values can go down as well as up.",
      "By using this website, you acknowledge that you understand and accept these limitations.",
    ],
  },
}

export function LegalPage() {
  const { type } = useParams<{ type: string }>()
  const content = type ? LEGAL_CONTENT[type] : null

  if (!content) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="text-muted-foreground mt-2">The legal page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <SEOHead
        title={`${content.title} — FinanceCalc`}
        description={`Read FinanceCalc's ${content.title.toLowerCase()}. Learn about how we handle your data, terms of service, and legal information.`}
        canonical={`https://financecalc.com/legal/${type}`}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/legal/privacy" className="hover:text-foreground transition-colors">Legal</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{content.title}</span>
        </nav>

        <h1 className="font-['DM_Serif_Display',serif] text-3xl text-foreground mb-2">{content.title}</h1>
        <p className="text-xs text-muted-foreground mb-8">Last updated: {content.lastUpdated}</p>

        <div className="space-y-4">
          {content.content.map((paragraph, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
