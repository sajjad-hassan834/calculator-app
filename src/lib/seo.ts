import type { CalcMeta } from "./calculatorMeta"

export function generateCalculatorSchema(meta: CalcMeta, url: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.title,
    description: meta.desc,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: meta.author.name,
    },
  }
}

export function generateBreadcrumbSchema(items: { label: string; path?: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.path ? { item: `https://financecalc.com${item.path}` } : {}),
    })),
  }
}

export function generateFAQSchema(faqs: { q: string; a: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }
}

export function generateWebSiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FinanceCalc",
    url: "https://financecalc.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://financecalc.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}
