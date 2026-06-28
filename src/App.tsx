import { BrowserRouter, Routes, Route } from "react-router"
import { lazy, Suspense } from "react"
import { MainLayout } from "./components/layout/MainLayout"
import { ScrollToTop } from "./components/layout/ScrollToTop"
import { AdminRouteGuard } from "./components/admin/AdminRouteGuard"
import { useDarkMode } from "./hooks/useDarkMode"
import { CalculatorSkeleton } from "./components/ui/Skeleton"

const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })))
const CalculatorPage = lazy(() => import("./pages/calculator/CalculatorPage").then(m => ({ default: m.CalculatorPage })))
const CategoryPage = lazy(() => import("./pages/category/CategoryPage").then(m => ({ default: m.CategoryPage })))
const LegalPage = lazy(() => import("./pages/legal/LegalPage").then(m => ({ default: m.LegalPage })))
const AboutPage = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })))
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })))

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
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route index element={<Suspense fallback={<SuspenseFallback />}><HomePage /></Suspense>} />
          <Route path="calculator/:type" element={<Suspense fallback={<SuspenseFallback />}><CalculatorPage /></Suspense>} />
          <Route path="category/:id" element={<Suspense fallback={<SuspenseFallback />}><CategoryPage /></Suspense>} />
          <Route path="legal/:type" element={<Suspense fallback={<SuspenseFallback />}><LegalPage /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<SuspenseFallback />}><AboutPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<SuspenseFallback />}><ContactPage /></Suspense>} />
          <Route path="accessibility" element={<Suspense fallback={<SuspenseFallback />}><AboutPage /></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<SuspenseFallback />}><HomePage /></Suspense>} />
          <Route path="sitemap" element={<Suspense fallback={<SuspenseFallback />}><HomePage /></Suspense>} />
        </Route>

        <Route
          path="admin"
          element={
            <Suspense fallback={<SuspenseFallback />}>
              <AdminRouteGuard>
                <AdminDashboard />
              </AdminRouteGuard>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
