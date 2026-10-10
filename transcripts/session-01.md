# Session 01 — Product discovery and MVP implementation

## Purpose

Define and begin implementing an offline React calculator for UK employees to compare salary, benefits, tax, pension, and employer-cost estimates.

## Product decisions captured

- **Audience:** UK-based employees and candidates; recruiters and hiring managers are secondary audiences.
- **Primary outcome:** Compare offers using estimated take-home pay and total employer cost, rather than headline salary alone.
- **Tax year:** UK 2026/27.
- **Coverage:** England, Wales, Northern Ireland, and Scotland.
- **Deployment:** React single-page application with no backend dependency.
- **Privacy:** Offers are kept in browser local storage and can be exported as JSON.
- **Comparison:** Users can create and compare multiple offers side by side.

## MVP delivered

- React, TypeScript, and Vite application scaffold.
- Offer input forms for salary, bonus, taxable benefits, pension, loans, deductions, and tax region.
- Estimated Income Tax, employee NI, employer NI, pension, student-loan, take-home-pay, and employer-cost calculations.
- Salary-sacrifice and relief-at-source selection.
- Local persistence, JSON export, responsive interface, and a detailed calculation view.
- Production build validation using `npm run build`.

## Important limitations recorded

- The calculator is an estimate, not payroll software or tax/legal advice.
- Rules are annual approximations and do not reproduce all payroll-period rounding or individual tax-code circumstances.
- The offline MVP has no accounts, sharing, organisation administration, or RBAC enforcement.
- Future shared scenarios require a backend and the RBAC design defined in `docs/app-roles.md`.

## Documentation created

- `docs/app-roles.md`
- `docs/jobs-to-be-done.md`
- `docs/user-stories.md`
