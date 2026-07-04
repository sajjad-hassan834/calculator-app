import { useState, useRef, useEffect } from "react"
import { ImageIcon } from "lucide-react"

interface FeaturedImageProps {
  src: string
  alt: string
  caption?: string
  credit?: string
  aspectRatio?: string
  priority?: boolean
}

export function FeaturedImage({
  src,
  alt,
  caption,
  credit,
  aspectRatio = "16/9",
  priority = false,
}: FeaturedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [shouldLoad, setShouldLoad] = useState(priority)

  useEffect(() => {
    if (priority || !imgRef.current) {
      setShouldLoad(true)
      return
    }
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observerRef.current?.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observerRef.current.observe(imgRef.current)
    return () => observerRef.current?.disconnect()
  }, [priority])

  return (
    <figure
      ref={imgRef}
      className="relative overflow-hidden rounded-2xl bg-secondary/30 border border-border"
      style={{ aspectRatio }}
      role="img"
      aria-label={alt}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 animate-pulse">
          <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
        </div>
      )}

      {shouldLoad && !error && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/20 text-muted-foreground">
          <ImageIcon className="w-8 h-8 mb-2 opacity-40" />
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {(caption || credit) && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
          {caption && <p className="text-xs text-white/90">{caption}</p>}
          {credit && <p className="text-[10px] text-white/60 mt-0.5">Credit: {credit}</p>}
        </figcaption>
      )}
    </figure>
  )
}
