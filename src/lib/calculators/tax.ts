export function calcTaxBracket(
  income: number,
  brackets: { min: number; max: number; rate: number }[]
) {
  let totalTax = 0
  const breakdown = []
  for (const b of brackets) {
    if (income > b.min) {
      const taxable = Math.min(income, b.max) - b.min
      const tax = taxable * (b.rate / 100)
      totalTax += tax
      breakdown.push({
        label: `$${b.min.toLocaleString()} - $${b.max.toLocaleString()}`,
        rate: b.rate,
        taxable: Math.round(taxable),
        tax: Math.round(tax),
      })
    }
  }
  const effectiveRate = (totalTax / income) * 100
  const marginalRate = brackets.find(
    (b) => income > b.min && income <= b.max
  )?.rate ?? brackets[brackets.length - 1].rate
  return {
    totalTax: Math.round(totalTax),
    effectiveRate,
    marginalRate,
    takeHome: Math.round(income - totalTax),
    breakdown,
  }
}
