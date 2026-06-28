import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Newsletter } from "../../pages/Newsletter"
import { BottomNav } from "../shared/BottomNav"
import { SkipToContent } from "../shared/SkipToContent"
import { CookieBanner } from "../shared/CookieBanner"

export function MainLayout({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean
  toggleDarkMode: () => void
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif] antialiased">
      <SkipToContent />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main id="main-content" role="main">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
      <BottomNav />
      <CookieBanner />
    </div>
  )
}
