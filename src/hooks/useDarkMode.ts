import { useState, useEffect, useCallback } from "react"

function getSystemPreference(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function getStoredPreference(): boolean | null {
  try {
    const stored = localStorage.getItem("theme")
    if (stored === "dark") return true
    if (stored === "light") return false
    return null
  } catch {
    return null
  }
}

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

export function useDarkMode(): [boolean, () => void] {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = getStoredPreference()
    if (stored !== null) return stored
    return getSystemPreference()
  })

  useEffect(() => {
    applyTheme(darkMode)
  }, [darkMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => {
      const stored = getStoredPreference()
      if (stored === null) {
        setDarkMode(e.matches)
      }
    }
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev
      localStorage.setItem("theme", next ? "dark" : "light")
      return next
    })
  }, [])

  return [darkMode, toggleDarkMode]
}
