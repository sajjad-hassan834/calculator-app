import { Link } from "react-router"
import { SEOHead } from "../components/seo/SEOHead"
import { Calendar, Clock, ArrowRight, TrendingUp, BookOpen, Home, PiggyBank, Shield, Percent } from "lucide-react"

const BLOG_POSTS = [
  {
    slug: "understanding-mortgage-rates",
    title: "Understanding Mortgage Rates: A Complete Guide for 2026",
    excerpt: "Learn how mortgage rates are determined, what influences them, and how to get the best rate for your home purchase.",
    category: "Mortgage",
    icon: Home,
    gradient: "from-blue-500 to-blue-700",
    author: "Sarah Chen",
    date: "June 15, 2026",
    readTime: "8 min",
  },
  {
    slug: "power-of-compound-interest",
    title: "The Power of Compound Interest: Why Einstein Called It the Eighth Wonder",
    excerpt: "Discover how compound interest works, why starting early matters, and how to harness it for long-term wealth.",
    category: "Investing",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-emerald-700",
    author: "Sarah Chen",
    date: "June 10, 2026",
    readTime: "6 min",
  },
  {
    slug: "retirement-planning-101",
    title: "Retirement Planning 101: A Step-by-Step Guide to Building Your Nest Egg",
    excerpt: "Everything you need to know about retirement planning — from 401(k)s to IRAs to withdrawal strategies.",
    category: "Retirement",
    icon: Shield,
    gradient: "from-rose-500 to-rose-700",
    author: "Dr. James Mitchell",
    date: "June 5, 2026",
    readTime: "10 min",
  },
  {
    slug: "saving-for-down-payment",
    title: "How to Save for a Down Payment: A Realistic Plan for First-Time Buyers",
    excerpt: "Practical strategies to save for your first home, including budgeting tips, savings goals, and assistance programs.",
    category: "Savings",
    icon: PiggyBank,
    gradient: "from-amber-500 to-amber-700",
    author: "Sarah Chen",
    date: "May 28, 2026",
    readTime: "7 min",
  },
  {
    slug: "tax-strategies-for-investors",
    title: "Tax Strategies for Investors: Minimize Your Tax Burden Legally",
    excerpt: "Learn about tax-loss harvesting, capital gains, dividend taxation, and strategies to keep more of your returns.",
    category: "Tax",
    icon: Percent,
    gradient: "from-indigo-500 to-indigo-700",
    author: "Dr. James Mitchell",
    date: "May 20, 2026",
    readTime: "9 min",
  },
]

export function BlogPage() {
  return (
    <div className="bg-background min-h-screen">
      <SEOHead
        title="Financial Blog — FinanceCalculator.com"
        description="Expert articles on mortgages, investing, retirement planning, taxes, and personal finance. Learn to make better financial decisions."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Blog</span>
        </nav>

        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground mb-2">
            Financial Blog
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Expert insights, guides, and strategies to help you make smarter financial decisions
          </p>
        </div>

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => {
            const Icon = post.icon
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ease-out group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${post.gradient} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="text-primary font-medium">{post.category}</span>
                      <span>·</span>
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-semibold text-foreground text-lg mb-1.5 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
