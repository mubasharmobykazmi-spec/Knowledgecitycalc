export type Region = 'rUK' | 'scotland'
export type PensionMethod = 'salary-sacrifice' | 'relief-at-source'
export type LoanPlan = 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5'

export interface Offer {
  id: string; name: string; region: Region; salary: number; bonus: number; taxableBenefits: number;
  employeePension: number; employerPension: number; pensionMethod: PensionMethod; loanPlan: LoanPlan; postgraduateLoan: boolean; otherDeductions: number;
}

export const taxYear = '2026/27'
export const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
export const preciseMoney = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 })

export const defaultOffer = (name: string): Offer => ({
  id: crypto.randomUUID(), name, region: 'rUK', salary: 55000, bonus: 0, taxableBenefits: 0,
  employeePension: 5, employerPension: 3, pensionMethod: 'salary-sacrifice', loanPlan: 'none', postgraduateLoan: false, otherDeductions: 0,
})

const rUKBands = [[37700, .2], [87440, .4], [Infinity, .45]]
// Scottish figures apply after the personal allowance for 2026/27.
const scottishBands = [[3967, .19], [12989, .2], [14136, .21], [31338, .42], [62710, .45], [Infinity, .48]]
const loanRules: Record<LoanPlan, [number, number]> = {
  none: [Infinity, 0], plan1: [26900, .09], plan2: [29385, .09], plan4: [33795, .09], plan5: [25000, .09],
}

function bandTax(income: number, bands: number[][]) {
  let remaining = Math.max(0, income), tax = 0
  for (const [width, rate] of bands) { const slice = Math.min(remaining, width); tax += slice * rate; remaining -= slice; if (remaining <= 0) break }
  return tax
}

export interface Results {
  gross: number; taxableIncome: number; incomeTax: number; employeeNI: number; employerNI: number;
  employeePension: number; employerPension: number; loan: number; takeHome: number; employerCost: number; effectiveRate: number;
}

export function calculate(o: Offer): Results {
  const cashGross = Math.max(0, o.salary + o.bonus)
  const employeePension = cashGross * Math.max(0, o.employeePension) / 100
  const employerPension = cashGross * Math.max(0, o.employerPension) / 100
  const sacrifice = o.pensionMethod === 'salary-sacrifice' ? employeePension : 0
  const niEarnings = Math.max(0, cashGross - sacrifice)
  const taxableGross = niEarnings + Math.max(0, o.taxableBenefits)
  const allowance = Math.max(0, 12570 - Math.max(0, taxableGross - 100000) / 2)
  const taxableIncome = Math.max(0, taxableGross - allowance)
  const incomeTax = bandTax(taxableIncome, o.region === 'scotland' ? scottishBands : rUKBands)
  const employeeNI = Math.max(0, Math.min(niEarnings, 50270) - 12570) * .08 + Math.max(0, niEarnings - 50270) * .02
  const employerNI = Math.max(0, niEarnings - 5000) * .15 + Math.max(0, o.taxableBenefits) * .15
  const [loanThreshold, loanRate] = loanRules[o.loanPlan]
  const undergraduateLoan = Math.max(0, niEarnings - loanThreshold) * loanRate
  const postgraduateLoan = o.postgraduateLoan ? Math.max(0, niEarnings - 21000) * .06 : 0
  const loan = undergraduateLoan + postgraduateLoan
  const pensionFromNet = o.pensionMethod === 'relief-at-source' ? employeePension * .8 : 0
  const takeHome = cashGross - sacrifice - incomeTax - employeeNI - loan - pensionFromNet - Math.max(0, o.otherDeductions)
  const employerCost = cashGross + employerNI + employerPension + Math.max(0, o.taxableBenefits)
  return { gross: cashGross + o.taxableBenefits, taxableIncome, incomeTax, employeeNI, employerNI, employeePension, employerPension, loan, takeHome, employerCost, effectiveRate: cashGross ? 1 - takeHome / cashGross : 0 }
}
