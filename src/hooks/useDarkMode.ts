import { useState, useEffect } from "react"

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false
    const stored = localStorage.getItem("theme")
    if (stored) return stored === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return [dark, () => setDark((d) => !d)] as const
}
