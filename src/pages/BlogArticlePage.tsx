import { useParams, Link } from "react-router"
import { ArrowLeft, Calendar, Clock, User, Share2, Printer } from "lucide-react"
import { SEOHead } from "../components/seo/SEOHead"
import { useMemo } from "react"
import { Breadcrumbs } from "../components/ui/Breadcrumbs"
import { generateArticleSchema, generateOrganizationSchema, generateBreadcrumbSchema } from "../lib/seo"
import { useBlogPostBySlug } from "../hooks/queries/useBlog"

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading, isError } = useBlogPostBySlug(slug)

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="h-6 w-32 bg-secondary rounded-full animate-pulse mb-8" />
        <div className="h-10 w-3/4 bg-secondary rounded-full animate-pulse mb-4" />
        <div className="h-4 w-1/2 bg-secondary rounded-full animate-pulse mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-secondary rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !article) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Article not found</h1>
        <p className="text-muted-foreground mt-2">The blog article you are looking for does not exist.</p>
        <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">Back to Blog</Link>
      </div>
    )
  }

  const pageUrl = `https://financecalculator.com/blog/${slug}`
  const paragraphs = article.content ? article.content.split("\n").filter(Boolean) : []

  const articleJsonLd = useMemo(() => [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { label: "Home", path: "/" },
      { label: "Blog", path: "/blog" },
      { label: article.title },
    ]),
    generateArticleSchema({
      headline: article.title,
      description: article.excerpt || article.title,
      datePublished: article.published_at || "",
      authorName: article.author_name || "FinanceCalc",
      url: pageUrl,
    }),
  ], [article, pageUrl])

  return (
    <div className="bg-background min-h-screen">
      <SEOHead
        title={`${article.title} — FinanceCalculator.com Blog`}
        description={article.excerpt || article.title}
        canonical={pageUrl}
        ogType="article"
        jsonLd={articleJsonLd}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Blog", path: "/blog" }, { label: article.title }]} />
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <h1 className="font-['DM_Serif_Display',serif] text-3xl lg:text-4xl text-foreground mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          {article.author_name && (
            <>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author_name}</span>
              </div>
              <span>·</span>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}</span>
          </div>
          {article.reading_time_minutes && (
            <>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{article.reading_time_minutes} min read</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => { navigator.clipboard.writeText(pageUrl) }}
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
          {paragraphs.length > 0 ? (
            paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base text-muted-foreground leading-relaxed mb-5">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-base text-muted-foreground leading-relaxed mb-5">
              {article.excerpt || "No content available for this article."}
            </p>
          )}
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
                to="/"
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
