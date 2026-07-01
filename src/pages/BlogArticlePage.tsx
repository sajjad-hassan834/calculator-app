import { useParams, Link } from "react-router"
import { ArrowLeft, Calendar, Clock, User, Share2, Printer } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"
import { useState, useMemo } from "react"

const BLOG_CONTENT: Record<string, {
  title: string
  description: string
  author: string
  role: string
  date: string
  readTime: string
  content: string[]
}> = {
  "understanding-mortgage-rates": {
    title: "Understanding Mortgage Rates: A Complete Guide for 2026",
    description: "Learn how mortgage rates are determined, what influences them, and how to get the best rate for your home purchase.",
    author: "Sarah Chen",
    role: "Senior Financial Analyst",
    date: "June 15, 2026",
    readTime: "8 min",
    content: [
      "Mortgage rates are one of the most important factors in determining the affordability of a home. Even a 0.5% difference in your interest rate can translate to tens of thousands of dollars over the life of a 30-year loan.",
      "Mortgage rates are influenced by several key factors. The Federal Reserve's monetary policy sets the overall direction of interest rates. When the Fed raises or lowers the federal funds rate, mortgage rates tend to follow. Inflation is another major driver — lenders charge higher rates when inflation is high to maintain their real returns.",
      "Your personal financial profile also plays a crucial role. Lenders evaluate your credit score, debt-to-income ratio, loan-to-value ratio, and down payment size. Borrowers with excellent credit (760+) typically qualify for the lowest rates. A larger down payment reduces the lender's risk and often results in a better rate.",
      "There are several types of mortgage rates to consider. Fixed-rate mortgages lock in your rate for the entire loan term, providing predictable monthly payments. Adjustable-rate mortgages (ARMs) start with a lower rate that adjusts periodically based on market conditions. While ARMs can save money in the short term, they carry the risk of higher payments in the future.",
      "To get the best mortgage rate, shop around with multiple lenders. Compare not just the interest rate but also the APR, which includes lender fees. Consider paying points to buy down your rate if you plan to stay in the home for many years. Lock your rate when you find a good deal, as rates can change daily.",
      "Use our Mortgage Calculator to estimate your monthly payments, total interest, and amortization schedule for different rate scenarios. Compare 15-year vs 30-year terms to see which aligns with your financial goals.",
    ],
  },
  "power-of-compound-interest": {
    title: "The Power of Compound Interest: Why Einstein Called It the Eighth Wonder",
    description: "Discover how compound interest works, why starting early matters, and how to harness it for long-term wealth.",
    author: "Sarah Chen",
    role: "Senior Financial Analyst",
    date: "June 10, 2026",
    readTime: "6 min",
    content: [
      "Albert Einstein reportedly called compound interest the eighth wonder of the world. 'He who understands it, earns it; he who doesn't, pays it.' Whether or not he actually said this, the principle holds true — compound interest is the most powerful force in personal finance.",
      "Compound interest works by earning returns on your returns. When you invest $10,000 and earn 7% in the first year, you have $10,700. In the second year, you earn 7% on $10,700 — not just your original $10,000. This compounding effect accelerates over time, creating exponential growth.",
      "The most important factor in compound growth is time. An investor who starts at age 25 with $5,000 and adds $200 monthly until age 65 will accumulate significantly more than someone who starts at age 35, even if the late starter contributes more each month. This is why financial advisors emphasize starting early.",
      "The frequency of compounding also matters. Daily compounding yields slightly more than monthly, which yields more than annual compounding. While the differences are small in the short term, they become meaningful over decades.",
      "The Rule of 72 is a quick mental shortcut: divide 72 by your expected annual return to estimate how many years it will take to double your money. At 7% returns, your money doubles approximately every 10.3 years (72 ÷ 7 = 10.3).",
      "Use our Compound Interest Calculator to see how different rates, time periods, and contribution amounts affect your long-term growth. The visual charts make it easy to understand the power of exponential growth.",
    ],
  },
  "retirement-planning-101": {
    title: "Retirement Planning 101: A Step-by-Step Guide to Building Your Nest Egg",
    description: "Everything you need to know about retirement planning — from 401(k)s to IRAs to withdrawal strategies.",
    author: "Dr. James Mitchell",
    role: "PhD Economics, Certified Financial Planner",
    date: "June 5, 2026",
    readTime: "10 min",
    content: [
      "Retirement planning is the process of accumulating enough wealth to maintain your desired lifestyle after you stop working. The key is to start early, be consistent, and make informed choices about savings vehicles and investment strategies.",
      "The most common retirement savings vehicles are employer-sponsored 401(k) plans and Individual Retirement Accounts (IRAs). A 401(k) allows you to contribute pre-tax dollars, reducing your taxable income. Many employers offer matching contributions — typically 3-6% of your salary — which is essentially free money.",
      "Traditional IRAs offer tax-deductible contributions, while Roth IRAs are funded with after-tax dollars but offer tax-free withdrawals in retirement. Your choice depends on your current tax bracket versus expected bracket in retirement.",
      "A common rule of thumb is to save 15% of your pre-tax income for retirement, including any employer match. If you start in your 20s, 15% is usually sufficient. If you start later, you may need to save 20-25%.",
      "Your investment allocation should become more conservative as you approach retirement. A common strategy is to hold a portfolio of 70-80% stocks and 20-30% bonds during your working years, gradually shifting toward bonds as you near retirement.",
      "In retirement, a safe withdrawal rate is typically 3-4% of your nest egg annually. This means if you have $1 million saved, you can safely withdraw $30,000-$40,000 per year adjusted for inflation. Use our Retirement Planner to check if you are on track.",
    ],
  },
  "saving-for-down-payment": {
    title: "How to Save for a Down Payment: A Realistic Plan for First-Time Buyers",
    description: "Practical strategies to save for your first home, including budgeting tips, savings goals, and assistance programs.",
    author: "Sarah Chen",
    role: "Senior Financial Analyst",
    date: "May 28, 2026",
    readTime: "7 min",
    content: [
      "Saving for a down payment is often the biggest hurdle for first-time homebuyers. While 20% down is ideal to avoid Private Mortgage Insurance (PMI), many programs allow for much lower down payments — as little as 3% for conventional loans and 3.5% for FHA loans.",
      "The first step is to set a clear savings target. If homes in your area cost $300,000, a 10% down payment would be $30,000. Add 2-5% for closing costs, so your total target might be $35,000-$45,000. Use our Savings Goal Calculator to determine exactly how much to save each month.",
      "High-yield savings accounts currently offer 4-5% APY, making them ideal for short-term savings goals. Money market accounts and CDs can offer slightly higher rates if you lock in your money for a fixed term. Avoid investing your down payment in the stock market if you plan to buy within 3-5 years.",
      "Consider these strategies to accelerate your savings: automate transfers to a dedicated savings account, redirect windfalls (tax refunds, bonuses) toward your goal, reduce discretionary spending, and consider a side hustle for extra income.",
      "First-time homebuyer programs can help. FHA loans require only 3.5% down. Fannie Mae and Freddie Mac offer conventional loans with 3% down for qualified buyers. Many states offer down payment assistance grants or low-interest loans.",
      "Use our Mortgage Calculator to estimate your monthly payment for different down payment scenarios. You might find that a smaller down payment is more feasible than you think, especially with current interest rates and assistance programs.",
    ],
  },
  "tax-strategies-for-investors": {
    title: "Tax Strategies for Investors: Minimize Your Tax Burden Legally",
    description: "Learn about tax-loss harvesting, capital gains, dividend taxation, and strategies to keep more of your returns.",
    author: "Dr. James Mitchell",
    role: "PhD Economics, Certified Financial Planner",
    date: "May 20, 2026",
    readTime: "9 min",
    content: [
      "Taxes can significantly impact your investment returns. Understanding how different types of investment income are taxed — and using strategies to minimize that tax — can save you thousands of dollars over time.",
      "Capital gains are classified as short-term (assets held less than one year) or long-term (held more than one year). Short-term gains are taxed at your ordinary income rate, which can be as high as 37%. Long-term gains receive favorable tax treatment, with rates of 0%, 15%, or 20% depending on your income.",
      "Tax-loss harvesting is a strategy where you sell investments at a loss to offset capital gains elsewhere in your portfolio. Losses can offset an unlimited amount of gains, plus up to $3,000 of ordinary income per year. Unused losses carry forward indefinitely.",
      "Dividends are classified as qualified or non-qualified. Qualified dividends are taxed at the lower long-term capital gains rates, while non-qualified dividends are taxed as ordinary income. Holding dividend-paying stocks for more than 60 days within the 121-day window around the ex-dividend date qualifies them for the lower rate.",
      "Tax-advantaged accounts are the most powerful tool for tax-efficient investing. 401(k)s and Traditional IRAs offer tax-deferred growth, meaning you pay taxes only when you withdraw. Roth IRAs offer tax-free growth — you pay taxes on contributions now but never on withdrawals.",
      "Use our Tax Calculator to estimate your tax bracket and effective tax rate. Understanding your marginal rate helps you make informed decisions about Roth vs Traditional contributions, tax-loss harvesting, and investment placement across taxable and tax-advantaged accounts.",
    ],
  },
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const [copied, setCopied] = useState(false)
  const article = slug ? BLOG_CONTENT[slug] : null

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Article not found</h1>
        <p className="text-muted-foreground mt-2">The blog article you are looking for does not exist.</p>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">Back to Blog</Link>
      </div>
    )
  }

  const pageUrl = `https://financecalculator.com/blog/${slug}`

  const articleJsonLd = useMemo(() => [{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.date,
    publisher: {
      "@type": "Organization",
      name: "FinanceCalculator.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  }], [article, pageUrl])

  return (
    <div className="bg-background min-h-screen">
      <SEOHead
        title={`${article.title} — FinanceCalculator.com Blog`}
        description={article.description}
        canonical={pageUrl}
        ogType="article"
        jsonLd={articleJsonLd}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
            <span className="text-xs text-muted-foreground/60">({article.role})</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                navigator.clipboard.writeText(pageUrl).then(() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                })
              }}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Copy link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-base text-muted-foreground leading-relaxed mb-5">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Was this article helpful?</p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/contact"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
              <Link
                to={`/calculator/${slug?.includes("mortgage") ? "mortgage" : slug?.includes("compound") ? "compound" : slug?.includes("retirement") ? "retirement" : slug?.includes("saving") ? "savings" : "tax"}`}
                className="px-4 py-2 bg-secondary border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
              >
                Try the Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
