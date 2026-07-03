import { User, Award, Calendar } from "lucide-react"

interface AuthorCardProps {
  name: string
  role: string
  credentials?: string
  bio?: string
  reviewedDate?: string
  variant?: "author" | "reviewer"
}

export function AuthorCard({
  name,
  role,
  credentials,
  bio,
  reviewedDate,
  variant = "author",
}: AuthorCardProps) {
  const initials = name.split(" ").map((n) => n[0]).join("")
  const isReviewer = variant === "reviewer"

  return (
    <div className="bg-background border border-border rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            isReviewer
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-primary/10 text-primary"
          }`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{name}</span>
            {isReviewer ? (
              <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            ) : (
              <User className="w-3.5 h-3.5 text-primary shrink-0" />
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{role}</div>
          {credentials && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-secondary/50 border border-border rounded text-[10px] font-medium text-muted-foreground">
              {credentials}
            </span>
          )}
          {bio && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">{bio}</p>
          )}
          {reviewedDate && (
            <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>Last {isReviewer ? "reviewed" : "updated"}: {reviewedDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function AuthorReviewBlock({
  author,
  reviewer,
  lastUpdated,
}: {
  author: { name: string; role: string; credentials?: string; bio?: string }
  reviewer: { name: string; role: string; credentials?: string; bio?: string }
  lastUpdated: string
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <AuthorCard
        name={author.name}
        role={author.role}
        credentials={author.credentials}
        bio={author.bio}
        reviewedDate={lastUpdated}
        variant="author"
      />
      <AuthorCard
        name={reviewer.name}
        role={reviewer.role}
        credentials={reviewer.credentials}
        bio={reviewer.bio}
        reviewedDate={lastUpdated}
        variant="reviewer"
      />
    </div>
  )
}
