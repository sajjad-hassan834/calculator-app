import { Link } from "react-router"
import { SEOHead } from "../components/seo/SEOHead"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import { Breadcrumbs } from "../components/ui/Breadcrumbs"
import { useBlogPosts } from "../hooks/queries/useBlog"

export function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts()
  console.log("BlogPage rendered", { posts, isLoading })

  return (
    <div className="bg-background min-h-screen">
      <SEOHead
        title="Financial Blog — FinanceCalculator.com"
        description="Expert articles on mortgages, investing, retirement planning, taxes, and personal finance. Learn to make better financial decisions."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Blog" }]} />

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

        {isLoading ? (
          <div className="space-y-6">
            <pre className="text-xs text-red-500">Loading...</pre>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 bg-secondary rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {(posts || []).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ease-out group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      {post.category_name && (
                        <>
                          <span className="text-primary font-medium">{post.category_name}</span>
                          <span>·</span>
                        </>
                      )}
                      <Calendar className="w-3 h-3" />
                      <span>{post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}</span>
                      {post.reading_time_minutes && (
                        <>
                          <span>·</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.reading_time_minutes} min</span>
                        </>
                      )}
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
