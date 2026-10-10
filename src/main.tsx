import { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { calculate, defaultOffer, money, preciseMoney, type LoanPlan, type Offer } from './rules'
import './styles.css'

const fieldLabels: Record<string, string> = { salary: 'Base salary', bonus: 'Expected bonus / commission', taxableBenefits: 'Taxable benefits value', employeePension: 'Your pension contribution', employerPension: 'Employer pension contribution', otherDeductions: 'Other annual deductions' }
const loanLabels: Record<LoanPlan, string> = { none: 'No undergraduate loan', plan1: 'Plan 1', plan2: 'Plan 2', plan4: 'Plan 4 (Scotland)', plan5: 'Plan 5' }

function OfferForm({ offer, update, remove }: { offer: Offer; update: (offer: Offer) => void; remove: () => void }) {
  const result = calculate(offer)
  const set = (key: keyof Offer, value: Offer[keyof Offer]) => update({ ...offer, [key]: value } as Offer)
  return <section className="offer-card">
    <div className="offer-header"><input aria-label="Offer name" className="offer-name" value={offer.name} onChange={e => set('name', e.target.value)} /> <button className="icon-button" onClick={remove} aria-label={`Remove ${offer.name}`}>×</button></div>
    <div className="form-grid">
      <label>Tax region<select value={offer.region} onChange={e => set('region', e.target.value)}><option value="rUK">England, Wales or N. Ireland</option><option value="scotland">Scotland</option></select></label>
      {Object.entries(fieldLabels).map(([key, label]) => <label key={key}>{label}{key.includes('Pension') ? <div className="input-suffix"><input type="number" min="0" value={offer[key as keyof Offer] as number} onChange={e => set(key as keyof Offer, Number(e.target.value))} /><span>%</span></div> : <div className="input-prefix"><span>£</span><input type="number" min="0" value={offer[key as keyof Offer] as number} onChange={e => set(key as keyof Offer, Number(e.target.value))} /></div>}</label>)}
      <label>Pension method<select value={offer.pensionMethod} onChange={e => set('pensionMethod', e.target.value)}><option value="salary-sacrifice">Salary sacrifice</option><option value="relief-at-source">Relief at source</option></select></label>
      <label>Student loan<select value={offer.loanPlan} onChange={e => set('loanPlan', e.target.value)}>{Object.entries(loanLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className="check"><input type="checkbox" checked={offer.postgraduateLoan} onChange={e => set('postgraduateLoan', e.target.checked)} /> Also repaying a postgraduate loan</label>
    </div>
    <p className="note">Your estimated take-home: <strong>{money.format(result.takeHome)} / year</strong> · {preciseMoney.format(result.takeHome / 12)} / month</p>
  </section>
}

function App() {
  const [offers, setOffers] = useState<Offer[]>(() => { try { return JSON.parse(localStorage.getItem('offerwise-offers') || '') } catch { return [defaultOffer('Offer A'), defaultOffer('Offer B')] } })
  const [details, setDetails] = useState(false)
  useEffect(() => localStorage.setItem('offerwise-offers', JSON.stringify(offers)), [offers])
  const results = useMemo(() => offers.map(o => ({ offer: o, result: calculate(o) })), [offers])
  const update = (index: number, offer: Offer) => setOffers(items => items.map((item, i) => i === index ? offer : item))
  const exportData = () => { const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([JSON.stringify(offers, null, 2)], { type: 'application/json' })); link.download = 'offerwise-offers.json'; link.click(); URL.revokeObjectURL(link.href) }
  return <main>
    <header><div><p className="eyebrow">UK OFFER COMPARISON · 2026/27</p><h1>See what an offer is <em>really</em> worth.</h1><p className="intro">Compare take-home pay, pension and employer cost — entirely in your browser.</p></div><div className="actions"><button onClick={() => setOffers([...offers, defaultOffer(`Offer ${String.fromCharCode(65 + offers.length)}`)])}>+ Add offer</button><button className="secondary" onClick={exportData}>Export</button></div></header>
    <div className="warning">Estimate only — not payroll, financial, tax or legal advice. Uses standard UK employee assumptions; rules are shown as UK 2026/27.</div>
    <div className="offers">{offers.map((offer, index) => <OfferForm key={offer.id} offer={offer} update={next => update(index, next)} remove={() => setOffers(items => items.length > 2 ? items.filter((_, i) => i !== index) : items)} />)}</div>
    <section className="comparison"><div className="section-title"><div><p className="eyebrow">THE COMPARISON</p><h2>At a glance</h2></div><button className="secondary" onClick={() => setDetails(!details)}>{details ? 'Hide' : 'Show'} breakdown</button></div><div className="table-wrap"><table><thead><tr><th>Annual estimate</th>{results.map(({ offer }) => <th key={offer.id}>{offer.name}</th>)}</tr></thead><tbody>{[
      ['Take-home pay', 'takeHome'], ['Monthly take-home', 'monthly'], ['Employer pension', 'employerPension'], ['Total employer cost', 'employerCost'], ['Effective deduction rate', 'effectiveRate'],
    ].map(([label, key]) => <tr className={key === 'takeHome' ? 'highlight' : ''} key={key}><td>{label}</td>{results.map(({ offer, result }) => <td key={offer.id}>{key === 'monthly' ? preciseMoney.format(result.takeHome / 12) : key === 'effectiveRate' ? `${(result.effectiveRate * 100).toFixed(1)}%` : money.format(result[key as keyof typeof result] as number)}</td>)}</tr>)}</tbody></table></div>
    {details && <div className="table-wrap detail"><table><thead><tr><th>Calculation breakdown</th>{results.map(({ offer }) => <th key={offer.id}>{offer.name}</th>)}</tr></thead><tbody>{[['Gross package', 'gross'], ['Taxable income', 'taxableIncome'], ['Income tax', 'incomeTax'], ['Employee NI', 'employeeNI'], ['Student loan', 'loan'], ['Your pension', 'employeePension'], ['Employer NI', 'employerNI']].map(([label, key]) => <tr key={key}><td>{label}</td>{results.map(({ offer, result }) => <td key={offer.id}>{money.format(result[key as keyof typeof result] as number)}</td>)}</tr>)}</tbody></table></div>}</section>
    <footer>Saved automatically on this device · No account or server required · UK 2026/27 rule set</footer>
  </main>
}
createRoot(document.getElementById('root')!).render(<App />)
