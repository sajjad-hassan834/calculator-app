import { useState } from "react"
import { Copy, Check, Twitter, Linkedin, Mail, Link, FileDown, Printer, X } from "lucide-react"

interface ShareDialogProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  url: string
}

export function ShareDialog({ open, onClose, title, description, url }: ShareDialogProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedResult, setCopiedResult] = useState(false)

  if (!open) return null

  const resultText = `${title}\n${description}\n\nCalculate yours: ${url}`

  const shareLinks = [
    {
      label: "Copy Link",
      icon: copiedLink ? Check : Link,
      onClick: () => {
        navigator.clipboard.writeText(url).then(() => {
          setCopiedLink(true)
          setTimeout(() => setCopiedLink(false), 2000)
        })
      },
      color: copiedLink ? "text-emerald-500" : "text-primary",
    },
    {
      label: "Copy Result",
      icon: copiedResult ? Check : Copy,
      onClick: () => {
        navigator.clipboard.writeText(resultText).then(() => {
          setCopiedResult(true)
          setTimeout(() => setCopiedResult(false), 2000)
        })
      },
      color: copiedResult ? "text-emerald-500" : "text-primary",
    },
    {
      label: "Twitter",
      icon: Twitter,
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(resultText)}`,
          "_blank", "noopener,noreferrer"
        )
      },
      color: "text-sky-500",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      onClick: () => {
        window.open(
          `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank", "noopener,noreferrer"
        )
      },
      color: "text-blue-600",
    },
    {
      label: "Email",
      icon: Mail,
      onClick: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(resultText)}`,
          "_blank"
        )
      },
      color: "text-amber-600",
    },
    {
      label: "Print",
      icon: Printer,
      onClick: () => window.print(),
      color: "text-muted-foreground",
    },
    {
      label: "PDF",
      icon: FileDown,
      onClick: () => window.print(),
      color: "text-red-500",
    },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Share"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-base">Share</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <div className="bg-background border border-border rounded-xl p-3 mb-4">
            <div className="text-sm font-medium text-foreground truncate">{title}</div>
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {shareLinks.map((link) => {
              const Icon = link.icon
              return (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-background border border-border hover:bg-secondary hover:border-primary/30 transition-all duration-200"
                  aria-label={link.label}
                >
                  <Icon className={`w-5 h-5 ${link.color}`} />
                  <span className="text-[10px] text-muted-foreground font-medium">{link.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
