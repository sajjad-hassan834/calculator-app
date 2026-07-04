import { useState } from "react"
import {
  ChevronDown, ChevronUp, BookOpen, Lightbulb, AlertCircle, HelpCircle,
  ArrowRight,
} from "lucide-react"
import type { CalcMeta } from "../../lib/calculatorMeta"
import { EXPANDED_CONTENT, type CalculatorExpandedContent } from "../../lib/expandedContent"
import { EducationalIllustration, FormulaInfographic, TrustInfographic, ComparisonChart, FeaturedImage } from "../visual"

interface FAQ {
  q: string
  a: string
}

function CalculatorFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-background border border-border rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-foreground text-sm pr-4">{faq.q}</span>
            {open === i ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
          </button>
          {open === i && (
            <div className="px-5 pb-4 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed pt-3">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const CALCULATOR_IMAGE_MAP: Record<string, { src: string; alt: string; caption: string }> = {
  mortgage: {
    src: "/images/mortgage/mortgage-hero.svg",
    alt: "Mortgage calculator illustration showing monthly payment and amortization breakdown",
    caption: "Understand every component of your home loan payment",
  },
  loan: {
    src: "/images/loan/personal-loan.svg",
    alt: "Personal loan calculator illustration with loan amount and interest breakdown",
    caption: "Borrow smart with full visibility into your loan terms",
  },
  compound: {
    src: "/images/investments/compound-interest-growth.svg",
    alt: "Compound interest growth chart showing exponential investment growth over 30 years",
    caption: "See how your money grows exponentially over time",
  },
  savings: {
    src: "/images/savings/savings-goal.svg",
    alt: "Savings goal calculator showing target amount and monthly contributions needed",
    caption: "Turn your financial dreams into achievable plans",
  },
  retirement: {
    src: "/images/retirement/retirement-planning.svg",
    alt: "Retirement planning illustration showing nest egg projection and withdrawal strategy",
    caption: "Plan your retirement with confidence",
  },
  roi: {
    src: "/images/investments/roi-infographic.svg",
    alt: "ROI calculator showing initial investment, final value, and annualized returns",
    caption: "Measure investment performance accurately",
  },
  investment: {
    src: "/images/investments/investment-portfolio.svg",
    alt: "Investment portfolio illustration showing asset allocation diversification",
    caption: "Build and track your investment portfolio",
  },
  tax: {
    src: "/images/tax/tax-filing.svg",
    alt: "Tax calculator showing income tax breakdown by bracket",
    caption: "Understand your tax liability before you file",
  },
  "break-even": {
    src: "/images/business/break-even-analysis.svg",
    alt: "Break-even analysis illustration showing profit and cost relationships",
    caption: "Know exactly how many units you need to sell to profit",
  },
  basic: {
    src: "/images/homepage/finance-dashboard.svg",
    alt: "Basic calculator for everyday arithmetic operations",
    caption: "Simple, fast arithmetic for everyday calculations",
  },
}

const EXPANDED_FAQS: Record<string, FAQ[]> = {
  mortgage: [
    { q: "What is a good down payment for a mortgage?", a: "A 20% down payment is ideal because it eliminates the need for Private Mortgage Insurance (PMI). However, many lenders offer conventional loans with as little as 3-5% down. FHA loans require only 3.5% down but come with mortgage insurance premiums. Use our calculator to compare how different down payment amounts affect your monthly payment and total interest." },
    { q: "Should I choose a 15-year or 30-year mortgage?", a: "A 30-year mortgage offers lower monthly payments but significantly more total interest. A 15-year mortgage has higher monthly payments but you build equity much faster and pay far less interest. Use this calculator to compare both scenarios side by side with your specific numbers." },
    { q: "How does my credit score affect my mortgage rate?", a: "Credit scores directly impact the interest rate lenders offer you. A score of 760+ typically gets the best rates, while scores below 620 may face higher rates or difficulty qualifying. Improving your score before applying can save tens of thousands over the loan term." },
    { q: "What is included in my monthly mortgage payment?", a: "Your monthly payment typically includes principal and interest (P&I), property taxes, homeowners insurance, and possibly PMI or HOA fees. This calculator estimates P&I only. Use our full affordability analysis to factor in taxes and insurance." },
    { q: "What is the difference between pre-qualification and pre-approval?", a: "Pre-qualification is an informal estimate based on self-reported information. Pre-approval involves a lender reviewing your credit and financial documents to provide a conditional commitment for a specific loan amount. Pre-approval carries more weight with sellers." },
    { q: "Can I make extra payments to pay off my mortgage faster?", a: "Yes. Most lenders allow extra principal payments without penalty. Even small additional payments can significantly reduce your total interest and shorten your loan term. Use our amortization schedule to see the impact of extra payments." },
    { q: "How do interest rates affect home affordability?", a: "A 1% increase in interest rate can reduce your buying power by approximately 10%. For example, at 6% you might qualify for a $400,000 loan, but at 7% the same payment only supports a $370,000 loan. Locking in a favorable rate matters enormously." },
    { q: "What are closing costs and how much should I expect to pay?", a: "Closing costs typically range from 2% to 5% of the home purchase price and include loan origination fees, appraisal, title insurance, escrow, and recording fees. Always request a Loan Estimate from your lender to see the full breakdown before committing." },
    { q: "Should I buy points to lower my interest rate?", a: "Mortgage points (each costing 1% of the loan amount) typically reduce your rate by 0.25%. If you plan to stay in the home for several years, buying points can be worthwhile. Calculate your break-even period to decide if points make sense for your situation." },
    { q: "What is an amortization schedule and why does it matter?", a: "An amortization schedule shows each payment's split between principal and interest over the life of your loan. In early years, most of your payment goes to interest. Seeing this schedule helps you understand the true cost of borrowing and the benefits of extra payments." },
  ],
  compound: [
    { q: "What is the Rule of 72?", a: "The Rule of 72 is a quick mental math shortcut: divide 72 by your annual return rate to estimate how many years it will take to double your money. For example, at 8% return: 72 / 8 = 9 years to double. At 6%: 72 / 6 = 12 years." },
    { q: "How does compounding frequency affect growth?", a: "More frequent compounding means interest is calculated and added to your principal more often. Daily compounding yields slightly more than monthly, which yields more than annual. The difference becomes more significant over longer time periods and at higher rates." },
    { q: "What is a realistic long-term return rate?", a: "The S&P 500 has historically averaged 7-10% annual returns before inflation. A conservative estimate for long-term planning is 6-8%. After accounting for inflation (2-3%), real returns are typically 4-6%. Past performance does not guarantee future results." },
    { q: "How much do I need to invest to reach $1 million?", a: "The amount depends on your timeline and expected return. At 8% annual return: investing $10,000 today and $500/month reaches $1M in about 28 years. Without the initial lump sum, you would need about $670/month. Starting earlier dramatically reduces the monthly amount needed." },
    { q: "What is the difference between simple and compound interest?", a: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest. Over 30 years, $10,000 at 8% simple interest grows to $34,000. The same amount at 8% compounded annually grows to $100,627." },
    { q: "How does inflation affect compound interest calculations?", a: "Inflation reduces the purchasing power of future dollars. While your investment may grow to a large nominal amount, its real value (adjusted for inflation) will be lower. For long-term planning, use a real return rate (nominal return minus expected inflation) of 4-6%." },
    { q: "What is the best compounding frequency?", a: "More frequent compounding (daily) maximizes your returns, but the marginal benefit decreases. The difference between monthly and daily compounding is typically small — less than 0.1% annually. The most important factor is time in the market, not compounding frequency." },
    { q: "How do taxes affect compound growth?", a: "Taxes can significantly reduce your effective compound growth. In a taxable account, you pay taxes on interest, dividends, and capital gains each year, reducing the amount that compounds. Tax-advantaged accounts like IRAs and 401(k)s allow your investments to compound tax-deferred or tax-free." },
    { q: "Can compound interest work against me?", a: "Yes. Compound interest works against you on credit cards and loans. If you carry a balance, interest is charged on your unpaid interest from previous months, causing your debt to grow exponentially. This is why paying off high-interest debt should be a top financial priority." },
    { q: "How often should I check my investment growth?", a: "While our calculator lets you check anytime, obsessing over short-term fluctuations is counterproductive. Compound growth works best over years and decades. Reviewing your portfolio quarterly or annually is sufficient for long-term investors." },
  ],
  loan: [
    { q: "What is the difference between secured and unsecured loans?", a: "Secured loans are backed by collateral (like a car or home) and typically have lower interest rates. Unsecured loans have no collateral requirement but usually have higher rates because the lender takes on more risk." },
    { q: "How does my credit score affect my loan rate?", a: "Your credit score is one of the primary factors lenders use to determine your interest rate. A higher score qualifies you for lower rates. Checking your credit report annually and improving your score before applying can save significant money." },
    { q: "What is APR and how is it different from the interest rate?", a: "APR (Annual Percentage Rate) includes both the interest rate and any lender fees, giving you the true cost of borrowing. The interest rate only reflects the cost of borrowing the principal. APR is always equal to or higher than the interest rate." },
    { q: "Should I choose a shorter or longer loan term?", a: "Shorter terms have higher monthly payments but significantly less total interest. Longer terms have lower monthly payments but cost more in total interest. Use our calculator to compare terms and find the balance that works for your budget." },
    { q: "Can I pay off my loan early?", a: "Most personal loans allow early repayment, but some charge prepayment penalties. Check your loan agreement before making extra payments. If there is no penalty, paying off your loan early saves you the remaining interest." },
    { q: "What is debt consolidation and when does it make sense?", a: "Debt consolidation combines multiple debts into a single loan, ideally at a lower interest rate. This makes sense if you can qualify for a rate lower than your current average rate and commit to not running up new debt on the paid-off accounts." },
    { q: "How much can I borrow with a personal loan?", a: "Personal loan amounts typically range from $1,000 to $100,000. The amount you qualify for depends on your credit score, income, debt-to-income ratio, and the lender's policies. Use our calculator to see how different loan amounts affect your payments." },
    { q: "What fees should I watch for with personal loans?", a: "Common fees include origination fees (1-8% of loan amount), prepayment penalties, late payment fees, and returned check fees. Origination fees are deducted from your loan proceeds, so the amount you receive is less than the loan amount." },
    { q: "How do personal loans affect my credit score?", a: "Applying for a loan triggers a hard inquiry (temporary 5-10 point drop). The loan itself adds to your credit mix, which can help your score. Making on-time payments builds positive payment history. Missing payments damages your score significantly." },
    { q: "What is the difference between fixed and variable rate loans?", a: "Fixed-rate loans have an interest rate that stays the same for the entire term, giving predictable payments. Variable-rate loans have rates that can change based on market conditions, potentially starting lower but carrying the risk of future increases." },
  ],
  savings: [
    { q: "How much should I have in my emergency fund?", a: "Most financial experts recommend 3-6 months of essential living expenses in an easily accessible savings account. If your income is variable or your job market is unstable, aim for 6-12 months. Use our calculator to determine how much to save each month to reach your goal." },
    { q: "What is the best type of savings account for my goal?", a: "For short-term goals (under 2 years), a high-yield savings account or money market account offers liquidity and decent returns. For medium-term goals (2-5 years), consider CDs for higher rates. For long-term goals (5+ years), investments may offer better growth." },
    { q: "How does compound interest help my savings?", a: "Compound interest means you earn interest on your interest. Over time, this accelerates your savings growth. For example, saving $500/month at 4% APY grows to $74,000 in 10 years — about $14,000 of which comes from interest alone." },
    { q: "What is a realistic savings account interest rate?", a: "As of 2025-2026, high-yield savings accounts offer 3.5-5.0% APY, while traditional savings accounts offer 0.01-0.50% APY. Online banks typically offer the highest rates. Always compare rates before opening an account." },
    { q: "How can I save money when living paycheck to paycheck?", a: "Start with micro-saving: automate small transfers ($10-25 per week) to a separate account. Reduce one recurring expense and redirect that money to savings. Use windfalls (tax refunds, bonuses) to jumpstart your emergency fund. Every dollar saved builds momentum." },
    { q: "What is the 50/30/20 budget rule?", a: "The 50/30/20 rule allocates 50% of after-tax income to needs (housing, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. This simple framework helps ensure consistent progress toward financial goals." },
    { q: "How do I stay motivated to save for long-term goals?", a: "Break large goals into smaller milestones and celebrate each achievement. Automate your savings so the decision happens once. Use visual trackers or our savings calculator to watch your progress. Remind yourself of the why behind each goal regularly." },
    { q: "Should I pay off debt or save first?", a: "Generally, build a small emergency fund ($1,000-2,000) first, then focus on high-interest debt (over 7-8% APR). Once high-interest debt is managed, build a full emergency fund while making minimum payments on low-interest debt." },
    { q: "How does inflation affect my savings?", a: "Inflation erodes the purchasing power of your money over time. If your savings earns 4% but inflation is 3%, your real return is only 1%. For long-term goals, consider investing a portion of your savings to outpace inflation." },
    { q: "What is an automated savings plan?", a: "An automated savings plan automatically transfers a specified amount from your checking to savings account on a regular schedule (weekly, bi-weekly, or monthly). Studies show that automation increases savings success rates from 30% to over 90%." },
  ],
  retirement: [
    { q: "How much do I need to save for retirement?", a: "A common rule of thumb is to save 10-15% of your income throughout your working years. By age 30, aim to have 1x your salary saved; by 40, 3x; by 50, 6x; by 60, 8x; and by 67, 10x your final salary. Our calculator helps you find your personalized target." },
    { q: "What is the 4% rule?", a: "The 4% rule suggests you can withdraw 4% of your retirement savings in your first year of retirement, adjusted for inflation each subsequent year, with a high probability of your savings lasting 30 years. This is a guideline, not a guarantee." },
    { q: "Should I choose a Roth or Traditional retirement account?", a: "Choose Roth if you expect to be in a higher tax bracket in retirement (pay taxes now at a lower rate). Choose Traditional if you want a tax deduction now and expect to be in a lower bracket in retirement. Many people benefit from having both types." },
    { q: "When should I start saving for retirement?", a: "The best time to start is now — the power of compound interest means early contributions are disproportionately valuable. Starting at 25 instead of 35 can mean hundreds of thousands of dollars more at retirement, even with the same total contributions." },
    { q: "What is a 401(k) employer match and how does it work?", a: "An employer match is free money your company contributes to your 401(k) based on your contributions, typically up to 3-6% of your salary. Always contribute enough to get the full match — it is an immediate 100% return on your investment." },
    { q: "How does Social Security factor into retirement planning?", a: "Social Security replaces approximately 40% of pre-retirement income for average earners. The full retirement age is 67 for those born after 1960. Claiming early (age 62) reduces benefits permanently; delaying to 70 increases them. Use our planner alongside Social Security estimates." },
    { q: "What is the difference between a 401(k) and an IRA?", a: "A 401(k) is an employer-sponsored plan with higher contribution limits ($23,000 in 2025, plus $7,500 catch-up after 50) and often includes employer matching. An IRA is an individual account you open yourself with lower limits ($7,000, plus $1,000 catch-up) but more investment choices." },
    { q: "How much of my pre-retirement income will I need in retirement?", a: "Most retirees need 70-80% of their pre-retirement income to maintain their lifestyle. Healthcare costs often increase, but work-related expenses, commuting, and retirement savings contributions decrease. Our calculator helps you estimate your specific needs." },
    { q: "What is sequence-of-returns risk?", a: "Sequence-of-returns risk is the danger of experiencing poor investment returns early in retirement when you are withdrawing money. A market downturn in your first few years of retirement can significantly reduce how long your savings last, even if long-term average returns are good." },
    { q: "Can I retire early with FIRE (Financial Independence, Retire Early)?", a: "FIRE requires aggressive saving (50-70% of income) and typically a nest egg of 25-30 times your annual expenses. The math works: save 70% of income for 8-10 years, and your savings can support you indefinitely. Our calculator helps model different FIRE scenarios." },
  ],
  roi: [
    { q: "What is considered a good ROI?", a: "A good ROI depends on the risk level and time horizon. Generally, stock market investments averaging 7-10% annually are considered good. For business investments, a 15-20% ROI is often the target. Real estate typically yields 8-12%. Always compare against alternative investments." },
    { q: "What is the difference between ROI and annualized ROI?", a: "Total ROI measures the total return over the entire investment period. Annualized ROI converts that to an average per-year return, allowing fair comparison between investments of different durations. Always use annualized ROI when comparing investments held for different periods." },
    { q: "How do I calculate ROI for a rental property?", a: "For rental properties, ROI = (Annual Rental Income - Annual Expenses) / Total Investment. Include purchase price, closing costs, repairs, and any renovation costs in Total Investment. Account for vacancy rates (5-10%) and property management fees (8-12% of rent)." },
    { q: "What costs should I include when calculating ROI?", a: "Include all costs: purchase price, transaction fees, commissions, renovation costs, ongoing maintenance, taxes, insurance, and financing costs. Excluding any of these inflates your ROI and leads to inaccurate comparisons." },
    { q: "How does leverage affect ROI?", a: "Leverage (borrowing money to invest) amplifies both gains and losses. A 20% down payment on a property that appreciates 10% yields a 50% ROI on your cash investment. However, if the property declines 10%, you lose 50% of your investment. Leverage magnifies risk proportionally." },
    { q: "What is a negative ROI and when might it be acceptable?", a: "A negative ROI means you lost money on the investment. This may be acceptable for strategic investments like business technology upgrades that improve efficiency, education that increases earning potential, or home improvements that enhance quality of life but only partially recoup costs." },
    { q: "How do taxes affect my actual ROI?", a: "Taxes reduce your net returns. Short-term investments (held under 1 year) are taxed as ordinary income (up to 37%). Long-term investments benefit from lower capital gains rates (0-20%). Tax-advantaged accounts like IRAs can defer or eliminate these taxes." },
    { q: "What is risk-adjusted ROI?", a: "Risk-adjusted ROI accounts for the uncertainty of returns. Two investments might have the same expected ROI, but the one with lower volatility is more attractive. The Sharpe ratio is a common measure of risk-adjusted returns: (Return - Risk-Free Rate) / Standard Deviation." },
    { q: "How does inflation affect real ROI?", a: "Inflation reduces purchasing power. If your nominal ROI is 8% but inflation is 3%, your real ROI is only 4.85% (calculated as (1.08/1.03 - 1) × 100). For long-term planning, always consider real (inflation-adjusted) returns." },
    { q: "What is opportunity cost in ROI analysis?", a: "Opportunity cost is the return you could have earned from the next best alternative investment. If you invest in a project with 5% ROI while the stock market returns 10%, your true economic cost is the 5% difference. Always consider opportunity costs when evaluating investments." },
  ],
  investment: [
    { q: "How much should I invest each month?", a: "A common guideline is to invest 15-20% of your gross income for retirement. If that is not feasible, start with what you can and increase by 1-2% each year. Even $100/month invested at 8% grows to over $150,000 in 30 years." },
    { q: "What is dollar-cost averaging?", a: "Dollar-cost averaging means investing a fixed amount at regular intervals regardless of market conditions. This strategy buys more shares when prices are low and fewer when prices are high, potentially reducing the average cost per share over time." },
    { q: "How do I choose between lump-sum and periodic investing?", a: "Lump-sum investing historically outperforms dollar-cost averaging about two-thirds of the time because markets tend to rise over time. However, DCA reduces the emotional impact of investing a large sum just before a market decline. Choose based on your risk tolerance." },
    { q: "What asset allocation should I use?", a: "A common rule of thumb is: 100 minus your age = percentage in stocks. At age 30: 70% stocks, 30% bonds. Adjust based on your risk tolerance. Younger investors can afford more stocks for growth; older investors shift toward bonds for stability." },
    { q: "How do fees affect my investment growth?", a: "Fees compound just like returns. A 1% annual fee reduces your ending portfolio by approximately 25-30% over 30 years compared to a no-fee alternative. Always prioritize low-cost index funds and ETFs with expense ratios under 0.10%." },
    { q: "What is the difference between active and passive investing?", a: "Active investing tries to beat the market through stock selection and timing. Passive investing aims to match market returns through low-cost index funds. Research consistently shows that most active managers fail to beat their benchmarks over long periods." },
    { q: "How often should I rebalance my portfolio?", a: "Most experts recommend rebalancing annually or when any asset class drifts more than 5% from your target allocation. Rebalancing ensures your risk level stays consistent and enforces a disciplined 'buy low, sell high' approach." },
    { q: "What is a diversified portfolio?", a: "A diversified portfolio spreads investments across different asset classes (stocks, bonds, real estate, cash), sectors (technology, healthcare, finance), and geographic regions (US, international, emerging markets) to reduce risk without necessarily sacrificing returns." },
    { q: "How do dividends contribute to total return?", a: "Dividends typically contribute about 40% of the S&P 500's total long-term return. Reinvesting dividends accelerates compound growth significantly. Over 30 years, reinvested dividends can account for more than half of your total portfolio value." },
    { q: "What should I do during a market downturn?", a: "Stay invested and, if possible, increase your contributions. Market downturns are buying opportunities for long-term investors. Selling during a crash locks in losses. Historically, markets have always recovered from downturns and reached new highs." },
  ],
  tax: [
    { q: "What is the difference between marginal and effective tax rates?", a: "Your marginal tax rate is the rate applied to your last dollar of income (your highest bracket). Your effective tax rate is your total tax divided by total income — the average rate you actually pay. The effective rate is always lower than the marginal rate under a progressive system." },
    { q: "How do tax brackets work in a progressive system?", a: "In a progressive system, different portions of your income are taxed at different rates. For example, if you are a single filer with $95,000 income: the first $11,600 is taxed at 10%, the next $35,550 at 12%, and the remaining $47,850 at 22%. Only the income in each bracket is taxed at that rate." },
    { q: "What is the standard deduction for 2025-2026?", a: "For 2025, the standard deduction is $15,000 for single filers, $22,500 for head of household, and $30,000 for married filing jointly. These amounts are adjusted annually for inflation. Most taxpayers take the standard deduction rather than itemizing." },
    { q: "How can I lower my taxable income?", a: "Common strategies include contributing to traditional 401(k) or IRA accounts (reduces income by contribution amount), using Health Savings Accounts (HSAs), claiming the standard or itemized deductions, and harvesting investment losses to offset gains." },
    { q: "What is tax-loss harvesting?", a: "Tax-loss harvesting involves selling investments that have declined in value to realize capital losses, which can offset capital gains and up to $3,000 of ordinary income per year. Unused losses carry forward to future years. This strategy can reduce your annual tax bill." },
    { q: "How are capital gains taxed?", a: "Short-term capital gains (assets held under 1 year) are taxed as ordinary income at your marginal rate. Long-term capital gains (held over 1 year) are taxed at preferential rates: 0% for income up to $47,025, 15% for income up to $518,900, and 20% above that." },
    { q: "What is the difference between a tax credit and a tax deduction?", a: "A tax credit directly reduces your tax bill dollar-for-dollar (a $1,000 credit saves you $1,000 in taxes). A tax deduction reduces your taxable income (a $1,000 deduction saves you $220 if you are in the 22% bracket). Credits are generally more valuable." },
    { q: "How does marriage affect my taxes?", a: "Marriage can result in either a 'marriage bonus' or 'marriage penalty' depending on your income levels. Couples with similar incomes may face a penalty due to bracket overlap. Couples with one higher earner often benefit from lower combined rates. Use our calculator to compare filing jointly vs separately." },
    { q: "What is the Alternative Minimum Tax (AMT)?", a: "The AMT is a parallel tax system designed to ensure high-income taxpayers pay a minimum amount. You calculate your tax under both the regular system and the AMT system, then pay the higher amount. The AMT exemption amount in 2025 is $85,700 for single filers and $133,300 for married couples." },
    { q: "How do retirement contributions affect my taxes?", a: "Traditional retirement account contributions reduce your current taxable income, saving you taxes at your marginal rate now. Roth contributions do not reduce current taxes but allow tax-free withdrawals in retirement. The choice depends on whether you expect higher or lower rates in the future." },
  ],
  "break-even": [
    { q: "What is a good break-even point for a new business?", a: "A break-even period of 6-18 months is considered healthy for most small businesses. If your break-even point requires selling more units than your market can support, you may need to adjust your pricing, reduce costs, or reconsider your business model." },
    { q: "How can I lower my break-even point?", a: "Reduce fixed costs (negotiate rent, outsource non-core functions), increase prices (even 5% can significantly lower break-even), reduce variable costs (find cheaper suppliers, improve efficiency), or increase sales volume through marketing and improved conversion." },
    { q: "What is contribution margin and why does it matter?", a: "Contribution margin is your selling price minus variable costs per unit. It represents how much each sale contributes to covering fixed costs and generating profit. A higher contribution margin means fewer sales needed to break even and more profit from each additional sale." },
    { q: "How often should I recalculate my break-even point?", a: "Recalculate whenever your costs or prices change significantly, at least quarterly for most businesses. Seasonal businesses should calculate break-even for each season. Startups should model break-even monthly until they reach profitability." },
    { q: "What is the difference between cash break-even and accounting break-even?", a: "Cash break-even considers only actual cash outflows (excluding non-cash expenses like depreciation). Accounting break-even includes all expenses. Cash break-even is more relevant for short-term survival analysis, while accounting break-even provides the full profitability picture." },
    { q: "How does break-even analysis help with pricing decisions?", a: "Break-even analysis shows the minimum price you must charge to cover costs at different sales volumes. It helps you evaluate whether a proposed price is viable, how much you can discount during promotions, and whether a price increase is necessary to maintain profitability." },
    { q: "Can break-even analysis be used for service businesses?", a: "Yes. For service businesses, replace 'units' with 'billable hours' or 'service contracts.' Fixed costs include office rent and salaries. Variable costs include billable labor, software licenses per client, and travel expenses related to service delivery." },
    { q: "What is margin of safety?", a: "Margin of safety is the difference between your actual or projected sales and your break-even sales. A higher margin of safety means your business can withstand sales declines before becoming unprofitable. Aim for a margin of safety of at least 20-30%." },
    { q: "How do economies of scale affect break-even analysis?", a: "As production increases, average fixed cost per unit decreases (spreading fixed costs over more units). You may also negotiate lower variable costs at higher volumes. This means your break-even point may decrease as you scale, making each additional unit more profitable." },
    { q: "What is the difference between break-even analysis for products vs multi-product businesses?", a: "For multi-product businesses, calculate a weighted average contribution margin based on your sales mix. Each product may have different prices and costs. Changes in sales mix (selling more of one product versus another) will shift your overall break-even point." },
  ],
  basic: [
    { q: "What operations does the basic calculator support?", a: "The basic calculator supports addition (+), subtraction (-), multiplication (x), and division (/). It also includes percent (%), sign toggle (+/-), and clear (AC) functions. For more advanced calculations, try our specialized financial calculators." },
    { q: "How do I use the keyboard with this calculator?", a: "You can use your keyboard for all operations: number keys (0-9) for digits, + - * / for operators, Enter or = to calculate, Backspace to delete the last digit, and Escape to clear everything. The calculator is fully keyboard-accessible." },
    { q: "Does the calculator follow order of operations?", a: "This calculator evaluates operations sequentially (left to right) as you press the equals button, not by mathematical precedence (PEMDAS). For example, 2 + 3 x 4 = 20 (not 14). For calculations requiring precedence, evaluate each operation separately." },
    { q: "What happens if I divide by zero?", a: "Dividing by zero displays 'Error' on the screen. Press AC or Escape to clear the error and start a new calculation. The calculator handles this edge case gracefully without crashing." },
    { q: "How accurate are the calculations?", a: "Calculations use standard JavaScript floating-point arithmetic with precision of up to 12 significant digits. Very large numbers (over 1 quadrillion) and very small numbers use scientific notation. Results are cleaned to avoid floating-point display issues like 0.1 + 0.2 = 0.30000000000000004." },
    { q: "How long is my calculation history stored?", a: "Your history is stored in your browser's local storage and persists until you clear it. The last 10 calculations are saved. History is private to your browser and does not sync across devices. You can clear individual entries or all history from the history drawer." },
    { q: "Can I use this calculator offline?", a: "Yes. The calculator works entirely in your browser with no server communication required. Once the page loads, you can disconnect from the internet and continue using all calculator functions, including history storage." },
    { q: "What is the maximum number I can enter?", a: "The calculator supports numbers up to approximately 15 digits. Results larger than 1 quadrillion are displayed in scientific notation. For financial calculations involving large numbers, consider using our specialized calculators." },
  ],
}

function getFAQs(calcType: string): FAQ[] {
  const expanded = EXPANDED_FAQS[calcType]
  if (expanded) return expanded
  const defaults: FAQ[] = [
    { q: "How accurate are these financial calculators?", a: "Our calculators use standard financial formulas and provide highly accurate estimates based on the inputs you provide. Actual figures may vary based on specific terms, fees, and individual circumstances. Always consult a qualified professional for major financial decisions." },
    { q: "Do I need an account to use these tools?", a: "No. All calculators on FinanceCalculator.com are completely free with no registration required. All calculations run locally in your browser, and we never store your personal financial data on our servers." },
    { q: "Can I use these calculators for non-USD currencies?", a: "Yes. The calculators work with any currency. The mathematics are currency-agnostic — simply enter your values in your local currency and interpret the results accordingly." },
    { q: "Are the calculations really free?", a: "Yes, 100% free. All calculators on FinanceCalculator.com are completely free to use with no limits, no registration, and no hidden charges. We believe financial literacy tools should be accessible to everyone." },
    { q: "How do you ensure the calculations are accurate?", a: "All calculators use well-established financial formulas sourced from standard textbooks and regulatory guidelines. Each calculator undergoes review by financial professionals and is tested against known scenarios for accuracy." },
    { q: "Do you store my financial data?", a: "No. All calculations run locally in your browser using JavaScript. Your financial data never leaves your device. We do not collect, store, or transmit your inputs or results to any server." },
    { q: "Can I save or export my results?", a: "Yes. Each calculator provides options to copy results to your clipboard, export as CSV or JSON, and save the results page as a PDF or image for your records." },
    { q: "How often are the calculators updated?", a: "We continuously review and update our calculators to ensure accuracy and compliance with current financial standards. Tax calculators are updated annually to reflect new bracket changes." },
    { q: "Who creates and reviews your calculator content?", a: "Our content is developed by financial professionals including analysts, CFPs, and economists. Every calculator and educational resource undergoes review by qualified experts before publication." },
    { q: "What should I do if I find an error?", a: "Please contact us through our feedback form. We take accuracy seriously and investigate all reported issues promptly. If an error is confirmed, we prioritize fixing it and notifying affected users." },
  ]
  return defaults
}

export function getCalculatorFAQs(calcType: string): FAQ[] {
  return getFAQs(calcType)
}

export function SEOContentBlock({ meta, calcType }: { meta: CalcMeta; calcType: string }) {
  const faqs = getFAQs(calcType)
  const expanded = EXPANDED_CONTENT[calcType] as CalculatorExpandedContent | undefined

  return (
    <section className="py-12 bg-card border-t border-border" aria-label={`About the ${meta.title}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['DM_Serif_Display',serif] text-2xl text-foreground mb-6">
          About the {meta.title}
        </h2>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5" />
            {meta.readingTime} read
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            meta.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
            meta.difficulty === "Intermediate" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
            "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}>
            {meta.difficulty}
          </span>
          <span className="text-xs text-muted-foreground">
            Updated {meta.lastUpdated}
          </span>
        </div>

        <div className="space-y-6">
          {CALCULATOR_IMAGE_MAP[calcType] && (
            <FeaturedImage
              src={CALCULATOR_IMAGE_MAP[calcType].src}
              alt={CALCULATOR_IMAGE_MAP[calcType].alt}
              caption={CALCULATOR_IMAGE_MAP[calcType].caption}
              aspectRatio="21/9"
            />
          )}

          {expanded?.extendedIntroduction && (
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">What This Calculator Does</h3>
              {expanded.extendedIntroduction.split("\n\n").map((p, i) => (
                <p key={i} className={`text-sm text-muted-foreground leading-relaxed ${i > 0 ? "mt-3" : ""}`}>
                  {p}
                </p>
              ))}
            </div>
          )}

          <EducationalIllustration calculatorId={calcType} />

          {!expanded?.extendedIntroduction && (
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">What This Calculator Does</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{meta.introduction}</p>
            </div>
          )}

          {expanded?.extendedWhyMatters && (
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Why This Calculator Matters</h3>
              {expanded.extendedWhyMatters.split("\n\n").map((p, i) => (
                <p key={i} className={`text-sm text-muted-foreground leading-relaxed ${i > 0 ? "mt-3" : ""}`}>
                  {p}
                </p>
              ))}
            </div>
          )}

          {!expanded?.extendedWhyMatters && (
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Why It Matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{meta.whyMatters}</p>
            </div>
          )}

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">How the Calculation Works</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{meta.howItWorks}</p>
          </div>

          {meta.whenToUse.length > 0 && (
            <div className="bg-background border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">When to Use This Calculator</h3>
              <ul className="space-y-2">
                {meta.whenToUse.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">--</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meta.benefits.length > 0 && (
            <div className="bg-background border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Benefits</h3>
              <ul className="space-y-2">
                {meta.benefits.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">--</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FormulaInfographic
            formula={meta.formula}
            explanation={meta.explanation}
            variables={meta.variables}
            workflowSteps={expanded?.methodologySteps || []}
          />

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-3">Step-by-Step Example</h3>
            <p className="text-sm text-muted-foreground mb-3">{meta.example.desc}</p>
            <ol className="list-decimal list-inside space-y-1.5">
              {meta.example.steps.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground font-['JetBrains_Mono',monospace]">{step}</li>
              ))}
            </ol>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Interpreting Your Results</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{meta.interpretation}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-500" /> Advantages
              </h4>
              <ul className="space-y-2">
                {meta.advantages.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">--</span> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Limitations
              </h4>
              <ul className="space-y-2">
                {meta.limitations.map((l, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">--</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {meta.commonMistakes.length > 0 && (
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" /> Common Mistakes
              </h4>
              <ul className="space-y-2">
                {meta.commonMistakes.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">--</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meta.tips.length > 0 && (
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-500" /> Helpful Tips
              </h4>
              <ul className="space-y-2">
                {meta.tips.map((t, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">--</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {expanded?.comparisonData?.map((chart, i) => (
            <ComparisonChart
              key={i}
              title={chart.label}
              bars={chart.values}
            />
          ))}

          {meta.glossary.length > 0 && (
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" /> Glossary
              </h4>
              <dl className="space-y-3">
                {meta.glossary.map((g) => (
                  <div key={g.term}>
                    <dt className="text-sm font-medium text-foreground">{g.term}</dt>
                    <dd className="text-sm text-muted-foreground mt-0.5">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {meta.relatedCategories.length > 0 && (
            <div className="bg-background border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Related Categories</h3>
              <div className="flex flex-wrap gap-2">
                {meta.relatedCategories.map((cat, i) => (
                  <a
                    key={i}
                    href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
          )}

          {expanded && (
            <TrustInfographic
              methodologySteps={expanded.methodologySteps}
              accuracyProcess={expanded.accuracyProcess}
              reviewProcess={expanded.reviewProcess}
              trustStats={expanded.trustStats}
            />
          )}

          <div className="bg-background border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-3">Frequently Asked Questions</h3>
            <CalculatorFAQ faqs={faqs} />
          </div>

          {expanded?.relatedGuides && expanded.relatedGuides.length > 0 && (
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Related Guides</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {expanded.relatedGuides.map((guide) => (
                  <a
                    key={guide.title}
                    href={guide.url}
                    className="group bg-background border border-border rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{guide.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">Educational purposes only.</span>{" "}
                  The content and calculations provided by this tool are for educational and informational purposes
                  only. They do not constitute financial advice, investment advice, or a recommendation of any
                  financial product or strategy. Results are estimates based on standard formulas and
                  user-provided inputs. Actual results may vary based on specific terms, fees, market conditions,
                  and individual circumstances. Always consult a qualified financial advisor, tax professional,
                  or legal expert before making financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
