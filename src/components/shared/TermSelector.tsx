export function TermSelector({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: number; label: string }[]
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
              value === o.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
