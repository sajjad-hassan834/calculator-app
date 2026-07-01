import { useNavigate } from "react-router"
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts"

interface KeyboardShortcutProviderProps {
  onOpenSearch: () => void
  onToggleDarkMode: () => void
}

export function KeyboardShortcutProvider({
  onOpenSearch,
  onToggleDarkMode,
}: KeyboardShortcutProviderProps) {
  useKeyboardShortcuts([
    { key: "/", handler: onOpenSearch },
    { key: "d", ctrl: true, shift: false, handler: onToggleDarkMode },
  ])

  return null
}
