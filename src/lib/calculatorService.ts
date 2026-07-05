import type { CalcMeta } from "./calculatorMeta"
import { getCalculatorBySlug } from "../services/calculator.service"

export async function enrichMetaFromApi(
  calcType: string,
  localMeta: CalcMeta | undefined,
): Promise<CalcMeta | null> {
  if (!localMeta) return null
  try {
    const apiCalc = await getCalculatorBySlug(calcType)
    if (!apiCalc) return localMeta

    const faqs = (apiCalc.faqs || []).filter((f: any) => f.is_published !== false)
    const references = (apiCalc.references || []).map((r: any) => ({
      label: r.title,
      url: r.url || "",
    }))

    return {
      ...localMeta,
      title: apiCalc.name || localMeta.title,
      desc: apiCalc.description || apiCalc.short_description || localMeta.desc,
      shortDesc: apiCalc.short_description || localMeta.shortDesc,
      formula: apiCalc.formula_expression || localMeta.formula,
      faqs: faqs.length > 0
        ? faqs.map((f: any) => ({ q: f.question, a: f.answer }))
        : localMeta.faqs || [],
      references: references.length > 0 ? references : localMeta.references,
      lastUpdated: apiCalc.updated_at
        ? new Date(apiCalc.updated_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : localMeta.lastUpdated,
      uses: (apiCalc.view_count || 0) > 1000
        ? `${(apiCalc.view_count / 1000).toFixed(1)}M`
        : `${apiCalc.view_count || 0}`,
      popular: apiCalc.is_popular || localMeta.popular,
    }
  } catch {
    return localMeta
  }
}
