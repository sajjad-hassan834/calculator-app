import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  text: string
}

const INITIAL_MESSAGE = `Hello! I'm your financial assistant. I can help you understand our calculators, financial concepts, and how to use this site. Try asking me:

- "How do I calculate my mortgage payment?"
- "What's the difference between APR and interest rate?"
- "How much should I save for retirement?"
- "How does compound interest work?"`

const RESPONSES: Record<string, string> = {
  mortgage: "To calculate your mortgage payment, go to our Mortgage Calculator and enter the home price, down payment, interest rate, and loan term. The calculator will show your monthly payment, total interest, and full amortization schedule.",
  "compound interest": "Compound interest is interest earned on both your initial principal and previously accumulated interest. The formula is A = P(1 + r/n)^(nt). Use our Compound Interest Calculator to see how your money can grow over time.",
  retirement: "A common rule of thumb is to save 15% of your pre-tax income for retirement. Use our Retirement Planner to check if you're on track. It projects your savings growth and shows how much you can withdraw monthly in retirement.",
  apr: "APR (Annual Percentage Rate) includes both the interest rate and lender fees, giving you the true cost of borrowing. The interest rate is just the base rate. APR is always higher than or equal to the interest rate.",
  "credit score": "Your credit score significantly affects the interest rates you qualify for. Scores above 760 typically get the best rates. Improving your score by paying bills on time and reducing credit utilization can save you thousands.",
  budget: "A good starting point is the 50/30/20 rule: 50% of income for needs, 30% for wants, and 20% for savings and debt repayment. Our Savings Goal Calculator can help you plan for specific targets.",
}

function findResponse(input: string): string {
  const lower = input.toLowerCase()

  for (const [key, response] of Object.entries(RESPONSES)) {
    if (lower.includes(key)) {
      return response
    }
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! How can I help you with your financial questions today?"
  }
  if (lower.includes("thank")) {
    return "You're welcome! Feel free to ask if you have any other questions."
  }
  if (lower.includes("calculat")) {
    return "We have calculators for mortgages, loans, investments, compound interest, retirement planning, savings goals, ROI, taxes, break-even analysis, and more. Which one would you like to learn about?"
  }

  return "I'm not sure I understand. Try asking about mortgages, compound interest, retirement, APR, credit scores, budgeting, or any of our calculators. You can also browse our Help Center for more detailed guides."
}

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: INITIAL_MESSAGE }])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = findResponse(text)
      setMessages((prev) => [...prev, { role: "assistant", text: response }])
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-4 z-30 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:opacity-90 transition-all duration-200 hover:scale-105"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {open && (
        <div
          className="fixed bottom-40 right-4 z-30 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: "calc(100vh - 200px)" }}
          role="dialog"
          aria-label="AI financial assistant"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-primary/5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Finance Assistant</div>
              <div className="text-xs text-muted-foreground">Ask me anything about finance</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ minHeight: 200 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-primary/10"
                    : "bg-emerald-500/10"
                }`}>
                  {msg.role === "user"
                    ? <User className="w-3.5 h-3.5 text-primary" />
                    : <Bot className="w-3.5 h-3.5 text-emerald-500" />
                  }
                </div>
                <div className={`rounded-xl px-3.5 py-2.5 max-w-[85%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="bg-secondary rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                className="flex-1 px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                aria-label="Ask a financial question"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
              This is an automated assistant for educational guidance
            </p>
          </div>
        </div>
      )}
    </>
  )
}
