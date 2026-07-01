import { useState } from "react"
import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Newsletter } from "../../pages/Newsletter"
import { BottomNav } from "../shared/BottomNav"
import { SkipToContent } from "../shared/SkipToContent"
import { CookieBanner } from "../shared/CookieBanner"
import { AIAssistant } from "../shared/AIAssistant"
import { KeyboardShortcutProvider } from "../shared/KeyboardShortcutProvider"
import { CurrencyProvider } from "../../lib/CurrencyContext"

export function MainLayout({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean
  toggleDarkMode: () => void
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif] antialiased">
        <SkipToContent />
        <KeyboardShortcutProvider
          onOpenSearch={() => setSearchOpen(true)}
          onToggleDarkMode={toggleDarkMode}
        />
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          externalSearchOpen={searchOpen}
          onExternalSearchClose={() => setSearchOpen(false)}
        />
        <main id="main-content" role="main">
          <Outlet />
        </main>
        <Newsletter />
        <Footer />
        <BottomNav />
        <CookieBanner />
        <AIAssistant />
      </div>
    </CurrencyProvider>
  )
}
