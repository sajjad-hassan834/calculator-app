import { useEffect } from "react"

interface Shortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  handler: () => void
  preventDefault?: boolean
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true
        const shiftMatch = shortcut.shift ? e.shiftKey : true
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase()

        if (ctrlMatch && shiftMatch && keyMatch) {
          if (shortcut.preventDefault !== false) {
            e.preventDefault()
          }
          shortcut.handler()
          return
        }
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [shortcuts])
}
