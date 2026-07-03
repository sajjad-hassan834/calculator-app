import { useParams, Link } from "react-router"
import { SEOHead } from "../../components/seo/SEOHead"
import { Breadcrumbs } from "../../components/ui/Breadcrumbs"

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
  editorial: {
    title: "Editorial Policy",
    lastUpdated: "June 1, 2026",
    content: [
      "FinanceCalculator.com is committed to providing accurate, unbiased, and educational financial content. Our editorial policy governs how we create, review, and maintain all content on the platform.",
      "All calculator algorithms and formulas are based on standard financial mathematics and industry-accepted methodologies. Each formula is documented and explained in plain language on its respective calculator page.",
      "Content is written by qualified financial professionals and reviewed by subject matter experts before publication. Author and reviewer credentials are displayed on every calculator page.",
      "We disclose the methodology, formulas, assumptions, and limitations of every calculator. Users should understand that results are estimates for educational purposes and not personalized financial advice.",
      "Editorial independence is paramount. We do not accept payment for favorable coverage, calculator placement, or content modifications. Sponsored content, if any, will be clearly labeled.",
      "All content includes the date of last review. Outdated content is either updated or removed. Readers can report potential inaccuracies through our Contact page.",
      "Our editorial team reviews tax-related content annually to reflect changes in tax laws, brackets, and regulations. Other calculators are reviewed quarterly or when financial methodologies change.",
    ],
  },
  review: {
    title: "Review Policy",
    lastUpdated: "June 1, 2026",
    content: [
      "Every calculator and article on FinanceCalculator.com undergoes a rigorous review process by qualified subject matter experts before publication.",
      "Our review process includes: verification of all mathematical formulas and algorithms, fact-checking of all claims and statistics, readability and comprehension testing, accessibility compliance review, and SEO metadata optimization.",
      "Reviewers are selected based on their professional credentials and domain expertise. Each reviewer's name and credentials are displayed alongside the calculator or article they reviewed.",
      "Reviews are conducted at the following intervals: initial review before publication, quarterly review for all calculator content, annual review for tax and regulatory content, and ad-hoc review when significant errors or omissions are identified.",
      "Readers who identify errors or inconsistencies can report them through our Contact page. Reported issues are escalated to the appropriate reviewer and addressed within 5 business days.",
      "Substantive corrections are documented in our Corrections Policy. Minor edits (typos, formatting) are made without formal correction notices.",
    ],
  },
  sources: {
    title: "Sources & References Policy",
    lastUpdated: "June 1, 2026",
    content: [
      "FinanceCalculator.com is committed to transparency in our sources and references. Every calculator page includes a Sources & References section citing the authoritative sources used.",
      "We prioritize primary sources including government agencies (IRS, SEC, CFPB, FDIC, Federal Reserve), academic research and peer-reviewed journals, industry standards organizations, and authoritative financial textbooks and references.",
      "Secondary sources are used when primary sources are unavailable. These include reputable financial publications (Investopedia, Bloomberg, Reuters), established financial institutions and their research, and leading financial education platforms.",
      "All sources are verified at the time of citation and reviewed periodically for continued accuracy and relevance. Broken or outdated links are corrected or removed during quarterly reviews.",
      "Users can access all references directly through links provided on each calculator page. References are presented with the source name, publication title, and direct URL where available.",
      "We encourage users to consult the original sources for deeper understanding of the financial concepts and methodologies used in our calculators.",
    ],
  },
  corrections: {
    title: "Corrections Policy",
    lastUpdated: "June 1, 2026",
    content: [
      "FinanceCalculator.com is committed to accuracy and transparency. When errors are identified in our content or calculators, we correct them promptly and clearly communicate the correction.",
      "Errors are classified into three categories: Critical errors (incorrect formulas or calculations that produce wrong results), Significant errors (factual inaccuracies in content that could mislead users), and Minor errors (typos, formatting issues, broken links that do not affect understanding or results).",
      "Our correction process includes: identification and verification of the error (via internal review or user report), assignment to the appropriate subject matter expert, correction implementation within the applicable timeframe, and documentation of the correction.",
      "Critical errors are addressed within 24 hours and trigger an immediate review of all related content. A correction notice is added to the affected page for 30 days.",
      "Significant errors are addressed within 5 business days. The corrected content is noted in the page's revision history.",
      "Minor errors are addressed during the next scheduled review cycle (within 90 days).",
      "Users who identify errors are encouraged to report them through our Contact page. We thank and acknowledge users who help us maintain the accuracy and quality of our content.",
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
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Legal", path: "/legal/privacy" }, { label: content.title }]} />

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
