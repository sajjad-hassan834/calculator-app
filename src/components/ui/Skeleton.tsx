export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-secondary/50 rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <Skeleton className="w-11 h-11 rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function CalculatorSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
