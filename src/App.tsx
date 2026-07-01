import { BrowserRouter, Routes, Route } from "react-router"
import { lazy, Suspense } from "react"
import { MainLayout } from "./components/layout/MainLayout"
import { ScrollToTop } from "./components/layout/ScrollToTop"
import { useDarkMode } from "./hooks/useDarkMode"
import { CalculatorSkeleton } from "./components/ui/Skeleton"
import { ErrorBoundary } from "./components/shared/ErrorBoundary"
import { NotFoundPage } from "./pages/NotFoundPage"
import { ErrorPage } from "./pages/ErrorPage"
import { OfflinePage } from "./pages/OfflinePage"

const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })))
const CalculatorPage = lazy(() => import("./pages/calculator/CalculatorPage").then(m => ({ default: m.CalculatorPage })))
const CategoryPage = lazy(() => import("./pages/category/CategoryPage").then(m => ({ default: m.CategoryPage })))
const LegalPage = lazy(() => import("./pages/legal/LegalPage").then(m => ({ default: m.LegalPage })))
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })))
const HelpCenterPage = lazy(() => import("./pages/HelpCenterPage").then(m => ({ default: m.HelpCenterPage })))
const BlogPage = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })))
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage").then(m => ({ default: m.BlogArticlePage })))
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage").then(m => ({ default: m.AccessibilityPage })))
const SitemapPage = lazy(() => import("./pages/SitemapPage").then(m => ({ default: m.SitemapPage })))

function LayoutWrapper() {
  const [darkMode, toggleDarkMode] = useDarkMode()
  return (
    <div className={darkMode ? "dark" : ""}>
      <ScrollToTop />
      <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  )
}

function SuspenseFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CalculatorSkeleton />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route index element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><HomePage /></ErrorBoundary></Suspense>} />
          <Route path="calculator/:type" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><CalculatorPage /></ErrorBoundary></Suspense>} />
          <Route path="category/:id" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><CategoryPage /></ErrorBoundary></Suspense>} />
          <Route path="legal/:type" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><LegalPage /></ErrorBoundary></Suspense>} />
          <Route path="about" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><AboutPage /></ErrorBoundary></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><ContactPage /></ErrorBoundary></Suspense>} />
          <Route path="help" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><HelpCenterPage /></ErrorBoundary></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><BlogPage /></ErrorBoundary></Suspense>} />
          <Route path="blog/:slug" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><BlogArticlePage /></ErrorBoundary></Suspense>} />
          <Route path="accessibility" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><AccessibilityPage /></ErrorBoundary></Suspense>} />
          <Route path="sitemap" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><SitemapPage /></ErrorBoundary></Suspense>} />
          <Route path="offline" element={<Suspense fallback={<SuspenseFallback />}><OfflinePage /></Suspense>} />
          <Route path="500" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><ErrorPage status={500} message="Something went wrong" /></ErrorBoundary></Suspense>} />
          <Route path="*" element={<Suspense fallback={<SuspenseFallback />}><ErrorBoundary><NotFoundPage /></ErrorBoundary></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
