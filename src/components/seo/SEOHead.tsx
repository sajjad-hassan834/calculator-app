import { useEffect } from "react"

interface SEOHeadProps {
  title: string
  description?: string
  canonical?: string
  jsonLd?: object[]
  ogImage?: string
  ogType?: string
  noIndex?: boolean
}

const SITE_NAME = "FinanceCalculator.com"
const DEFAULT_OG_IMAGE = "https://financecalc.com/og-image.png"
export function SEOHead({
  title,
  description,
  canonical,
  jsonLd,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex,
}: SEOHeadProps) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const cleanupFns: (() => void)[] = []

    const addMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name"
      const existing = document.head.querySelector(`meta[${attr}="${name}"]`)
      if (existing) {
        existing.setAttribute("content", content)
        return
      }
      const meta = document.createElement("meta")
      meta.setAttribute(attr, name)
      meta.content = content
      document.head.appendChild(meta)
      cleanupFns.push(() => meta.remove())
    }

    const addLink = (rel: string, href: string) => {
      const existing = document.head.querySelector(`link[rel="${rel}"]`)
      if (existing) {
        existing.setAttribute("href", href)
        return
      }
      const link = document.createElement("link")
      link.rel = rel
      link.href = href
      document.head.appendChild(link)
      cleanupFns.push(() => link.remove())
    }

    addMeta("description", description || "")
    addMeta("robots", noIndex ? "noindex, nofollow" : "index, follow")

    if (canonical) {
      addLink("canonical", canonical)
    }

    addMeta("og:title", title, true)
    addMeta("og:description", description || "", true)
    addMeta("og:image", ogImage, true)
    addMeta("og:locale", "en_US", true)
    addMeta("og:url", canonical || window.location.href, true)
    addMeta("og:type", ogType, true)
    addMeta("og:site_name", SITE_NAME, true)

    addMeta("twitter:card", "summary_large_image")
    addMeta("twitter:title", title)
    addMeta("twitter:description", description || "")
    addMeta("twitter:image", ogImage)
    addMeta("twitter:site", "@financecalc")
    addMeta("twitter:creator", "@financecalc")

    // Structured data
    if (jsonLd?.length) {
      jsonLd.forEach((data) => {
        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.textContent = JSON.stringify(data)
        document.head.appendChild(script)
        cleanupFns.push(() => script.remove())
      })
    }

    return () => {
      document.title = prevTitle
      cleanupFns.forEach((fn) => fn())
    }
  }, [title, description, canonical, jsonLd, ogImage, ogType, noIndex])

  return null
}
