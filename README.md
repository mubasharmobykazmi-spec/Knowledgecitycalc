# Offerwise — UK Salary & Offer Calculator

Offerwise is a browser-only React application for comparing UK employment offers. It converts a headline salary into an easy-to-understand estimate of take-home pay, pension value, deductions, and employer cost.

The application is designed to work without a backend, user account, database, or third-party runtime API. Saved offer data stays in the browser on the user’s device.

> **Important:** Offerwise provides estimates for offer comparison. It is not payroll software and does not provide tax, financial, or legal advice.

## What the app does

Users can create and compare two or more named job offers. For each offer, the calculator accepts a salary package and produces annual and monthly estimates for:

- Take-home pay
- Income Tax
- Employee National Insurance
- Employer National Insurance
- Employee and employer pension contributions
- Student and postgraduate loan repayments
- Taxable benefit value
- Total compensation value
- Total employer cost
- Effective deduction rate

The comparison screen places each offer side by side and can reveal a detailed calculation breakdown.

## Target users

- UK employees deciding between job offers
- Candidates preparing for salary negotiations
- Employees assessing the value of benefits and pension contributions
- Recruiters and hiring managers who need an illustrative offer breakdown

## App roles and access model

### Current offline MVP

Offerwise does not currently have authentication, accounts, a server, or a shared database. Every visitor uses the application as a local **calculator user**. They can create, edit, compare, export, and delete only the offer scenarios stored in their own browser.

Because data never leaves the device, there is no cross-user access and no server-side role assignment in the current release.

| Role | Intended audience | Current access |
| --- | --- | --- |
| Calculator user | Employee, candidate, recruiter, or hiring manager | Create, edit, compare, export, and remove their browser-local offer scenarios. |
| Product maintainer | Development or product team | Updates the source code and bundled tax-rule configuration before a release. This is repository access, not application access. |

### Future role-based access control (RBAC)

If user accounts, organisation workspaces, or shared offer templates are introduced, add a backend and implement RBAC before allowing any shared data. The recommended roles are below.

| Role | Typical user | Permissions |
| --- | --- | --- |
| Employee | Individual employee or candidate | Create, view, edit, export, and delete only their own private scenarios. |
| Recruiter / HR editor | Recruiter or compensation specialist | Create and manage organisation offer templates; create and share scenarios for authorised candidates or employees. Cannot change tax-rule data or organisation access controls. |
| Hiring manager | Team manager | View organisation templates and scenarios explicitly shared with them; create comparison drafts if granted editor access. |
| Organisation admin | HR operations or workspace owner | Manage members, assign roles, manage organisation templates, and configure workspace-level defaults. |
| Tax-rule administrator | Authorised payroll/tax operations user | Review, approve, publish, and roll back versioned tax-rule data. Must not automatically receive access to private employee scenarios. |
| Platform administrator | Internal platform operations team | Maintain service availability, audit security events, and manage system configuration. Access to personal compensation data should be restricted, logged, and granted only when necessary. |

### RBAC principles for a future shared version

- Default every new scenario to private and owned by its creator.
- Enforce permissions on the server; hiding UI controls alone is not sufficient.
- Use least privilege: users receive only the minimum role and data access required.
- Keep tax-rule publishing separate from organisation/member administration.
- Record audit events for role changes, sharing, tax-rule publication, export, and deletion.
- Require explicit consent before sharing a scenario containing an employee’s salary or benefits data.
- Do not grant platform administrators automatic read access to user compensation data.

## Jobs To Be Done

Jobs To Be Done describe the outcome a person is trying to achieve, rather than a feature they are asking for. Each job below is linked to an app role so product decisions can remain focused on the user’s real motivation.

| Role | When… | I want to… | So I can… | Product outcome |
| --- | --- | --- | --- | --- |
| Employee | I receive a job offer or pay-rise proposal | enter my salary, pension, deductions, and benefits | understand what I will actually receive after deductions | Clear annual and monthly take-home estimate with a transparent breakdown. |
| Employee | I am deciding between offers with different salaries and benefits | compare packages side by side | choose the offer that best supports my financial priorities | Net-pay, pension, benefits, and total-package differences are visible in one comparison. |
| Employee | My salary approaches or exceeds a tax threshold | see why a higher salary may not increase my take-home by the expected amount | negotiate with a realistic view of marginal deductions | Tax bands, Personal Allowance taper, and effective deduction rate are explained. |
| Employee | I am considering a pension contribution change | compare salary sacrifice with relief at source | make an informed decision about my net pay and pension value | Pension method and employee/employer contribution effects are shown. |
| Candidate | I am preparing for a salary negotiation | model several compensation proposals privately | set a realistic target and explain the trade-offs confidently | Editable scenarios can be saved, renamed, and exported locally. |
| Recruiter / HR editor | I need to explain an offer clearly to a candidate | create a standardised illustrative breakdown | communicate the whole package, not just base pay | Consistent offer templates and comparison summaries in a future shared version. |
| Recruiter / HR editor | A candidate asks about the value of benefits or employer pension | show the employer’s contribution alongside employee take-home pay | answer accurately and build trust without promising a final payslip result | Separate employee and employer cost/value figures with an estimate disclaimer. |
| Hiring manager | I need to choose between package options for a candidate | review authorised offer comparisons | make a compensation decision within the available budget | View-only or editor access to explicitly shared scenarios and total employer-cost estimates. |
| Organisation admin | My organisation needs consistent offer modelling | control templates, member access, and workspace defaults | reduce inconsistent calculations and protect salary information | Role-managed workspace, approved templates, and auditable sharing in a future shared version. |
| Tax-rule administrator | A new tax year or HMRC update changes a rule | review and publish a versioned rule set | ensure calculations use approved, traceable inputs | Versioned tax rules with source references, review dates, approval, and rollback. |
| Platform administrator | I operate a shared version of the product | monitor availability and investigate operational issues | keep the platform dependable without unnecessary access to compensation data | Audited, least-privilege operational access and privacy-preserving support processes. |

## User stories and acceptance criteria

The stories below are linked to the Jobs To Be Done section. Status reflects the current browser-only MVP, not the intended future product.

| ID | Role | Linked job | User story | Status |
| --- | --- | --- | --- | --- |
| US-01 | Employee | Understand actual take-home pay | As an employee, I want to enter my pay package so that I can estimate my annual and monthly take-home pay. | **Implemented** |
| US-02 | Employee | Compare offers | As an employee, I want to compare offers side by side so that I can understand the financial difference between them. | **Implemented** |
| US-03 | Employee | Understand tax-region impact | As an employee, I want to select Scotland or the rest of the UK so that the estimate uses the appropriate income-tax bands. | **Implemented** |
| US-04 | Employee | Understand pension trade-offs | As an employee, I want to choose salary sacrifice or relief at source so that I can compare their estimated impact on my pay. | **Implemented** |
| US-05 | Employee | Keep scenarios private | As an employee, I want my scenarios saved on my device so that I can return to them without creating an account. | **Implemented** |
| US-06 | Candidate | Prepare for negotiation | As a candidate, I want to name and export scenarios so that I can retain and discuss possible packages. | **Implemented** |
| US-07 | Recruiter / HR editor | Explain a package | As a recruiter, I want reusable organisation offer templates so that I can provide consistent illustrative packages. | **Not implemented** — requires accounts, a backend, and shared storage. |
| US-08 | Hiring manager | Review a shared package | As a hiring manager, I want to view authorised scenarios so that I can make a budget-aware offer decision. | **Not implemented** — requires scenario sharing and RBAC. |
| US-09 | Organisation admin | Manage access | As an organisation admin, I want to assign roles and remove access so that compensation data is protected. | **Not implemented** — requires authentication, a backend, and RBAC enforcement. |
| US-10 | Tax-rule administrator | Publish approved tax rules | As a tax-rule administrator, I want to review, approve, publish, and roll back rule sets so that calculators use traceable inputs. | **Not implemented** — current rules are source-controlled application code. |
| US-11 | Platform administrator | Operate securely | As a platform administrator, I want audit records for sensitive actions so that I can investigate access and rule changes. | **Not implemented** — no server or shared data exists in the MVP. |

### US-01 — Estimate take-home pay

**Role:** Employee  
**Linked job:** Understand actual take-home pay

**Acceptance criteria**

- Given a new offer, when the employee enters base salary, bonus, benefits, pension settings, loan options, and other deductions, then the app shows annual take-home pay.
- Given a calculated offer, when results are displayed, then the app also shows estimated monthly take-home pay.
- Given a changed money or percentage input, when the employee updates the input, then the displayed results update without submitting a form or reloading the page.
- Given a calculated offer, when the employee opens the breakdown, then Income Tax, employee NI, student-loan deduction, employee pension, employer NI, and employer pension are shown separately.

### US-02 — Compare job offers

**Role:** Employee  
**Linked job:** Compare offers

**Acceptance criteria**

- Given two default offers, when the employee changes values in either offer, then the comparison table shows a separate result column for each offer.
- Given two or more offers, when the employee selects **Add offer**, then a new named offer card and comparison column are added.
- Given offer results, when the comparison table is visible, then it shows take-home pay, monthly take-home pay, employer pension, total employer cost, and effective deduction rate for every offer.
- Given the comparison screen, when the employee selects **Show breakdown**, then the additional calculation-breakdown table is displayed; when they select **Hide breakdown**, it is concealed.

### US-03 — Apply the selected tax region

**Role:** Employee  
**Linked job:** Understand tax-region impact

**Acceptance criteria**

- Given an offer configured for England, Wales, or Northern Ireland, when the employee calculates it, then rest-of-UK income-tax bands are used.
- Given an offer configured for Scotland, when the employee calculates it, then Scottish income-tax bands are used.
- Given an existing offer, when the employee changes its tax region, then only that offer’s calculated figures update using the selected region.

### US-04 — Compare pension methods

**Role:** Employee  
**Linked job:** Understand pension trade-offs

**Acceptance criteria**

- Given an offer, when the employee enters employee and employer pension percentages, then both contribution values are shown in the detailed results.
- Given an offer using salary sacrifice, when the calculation runs, then the employee pension amount reduces the estimated taxable and NI earnings.
- Given an offer using relief at source, when the calculation runs, then the app keeps the selected pension method distinct from salary sacrifice in its estimate.

### US-05 — Save local scenarios privately

**Role:** Employee  
**Linked job:** Keep scenarios private

**Acceptance criteria**

- Given an edited offer, when the employee refreshes the browser, then the saved offer data is restored from browser local storage.
- Given the offline MVP, when an employee uses the application, then no sign-in or account-creation screen is required.
- Given a saved scenario, when the employee selects **Export**, then the browser downloads a JSON representation of the current offers.

### US-07 — Manage organisation templates

**Role:** Recruiter / HR editor  
**Linked job:** Explain a package

**Acceptance criteria — not implemented**

- Given an authenticated HR editor, when they create or edit an organisation template, then authorised recruiters can use the updated template.
- Given a recruiter without tax-rule administrator rights, when they use the app, then they cannot publish or alter tax-rule data.
- Given a candidate scenario, when a recruiter shares it, then sharing requires explicit selection of the recipient and is recorded in an audit log.

### US-08 and US-09 — Shared access and administration

**Roles:** Hiring manager; Organisation admin  
**Linked jobs:** Review a shared package; Manage access

**Acceptance criteria — not implemented**

- Given a hiring manager with view-only permission, when they open a shared scenario, then they can view but cannot modify it.
- Given an organisation admin, when they assign or revoke a role, then the server applies the new permissions to future requests.
- Given a user without access to a scenario, when they attempt to open it directly, then the server denies access and does not return the scenario data.

### US-10 and US-11 — Govern rules and platform operations

**Roles:** Tax-rule administrator; Platform administrator  
**Linked jobs:** Publish approved tax rules; Operate securely

**Acceptance criteria — not implemented**

- Given a proposed tax-rule update, when a tax-rule administrator approves and publishes it, then the published version includes an effective date, source reference, approver, and version identifier.
- Given a published rule set, when a tax-rule administrator rolls it back, then newly calculated scenarios use the selected prior approved version.
- Given a sensitive action such as role change, scenario share, export, or tax-rule publication, when it occurs, then the system records an audit event containing the actor, action, timestamp, and target.

## Supported calculation areas

- Tax regions: England, Wales, Northern Ireland, and Scotland
- Tax year: UK 2026/27
- Income tax bands and Personal Allowance taper
- Employee and employer Class 1 National Insurance estimates
- Annual base salary, expected bonus, commission, and taxable benefits
- Salary-sacrifice and relief-at-source pension options
- Student Loan Plans 1, 2, 4, and 5
- Optional postgraduate loan repayment
- Custom annual deductions

## Technology

- React
- TypeScript
- Vite
- Browser `localStorage` for saved offers
- Static client-side deployment; no backend services

## Product documentation

Detailed product documentation is organised separately from the technical setup instructions:

- [App roles and RBAC](docs/app-roles.md)
- [Jobs To Be Done](docs/jobs-to-be-done.md)
- [User stories and acceptance criteria](docs/user-stories.md)
- [Session 01 transcript](transcripts/session-01.md)

## Prerequisites

- Node.js 20 or later (Node 24 is also supported)
- npm 10 or later
- A modern browser such as Chrome, Edge, Firefox, or Safari

Check that Node and npm are available:

```powershell
node --version
npm --version
```

If either command is not found immediately after installing Node, close and reopen PowerShell or VS Code so it reloads your `PATH` environment variable.

## Installation

From the project folder:

```powershell
cd C:\Users\kazmi\Calculator-Assignment
npm install
```

## Start the development app

```powershell
npm run dev
```

Vite will print a local URL, normally:

```text
http://localhost:5173/
```

Open that address in a browser. The current local demo may also be available at `http://127.0.0.1:5173/` while the development server is running.

## Production build

Create an optimised static build with:

```powershell
npm run build
```

The generated deployable files are placed in `dist/`. They can be hosted on any static web host because the app has no server-side requirements.

Preview the production build locally:

```powershell
npm run preview
```

## Tests and validation

The project currently uses TypeScript and Vite production compilation as its automated validation step:

```powershell
npm run build
```

This command type-checks the React/TypeScript code and bundles the production application. It passed successfully during the initial implementation.

Dedicated unit tests have not yet been added. The next recommended tests cover:

- Personal Allowance taper at £100,000 and £125,140
- Income-tax band boundaries for rest-of-UK and Scotland
- Employee and employer NI thresholds
- Salary-sacrifice versus relief-at-source pension calculations
- Each student-loan threshold and the postgraduate-loan combination
- Browser local-storage save/restore behaviour

## Project structure

```text
src/
  main.tsx        React user interface and local offer management
  rules.ts        Pure tax, NI, pension, loan, and employer-cost calculations
  styles.css      Responsive application styling
  vite-env.d.ts   Vite TypeScript declarations
index.html        Vite HTML entry point
vite.config.ts    Vite and React configuration
```

## Data and privacy

- Offer data is stored in the browser using `localStorage`.
- No user account is created.
- The app does not send salary, benefits, or comparison data to a backend.
- Users can export their offers as a JSON file for backup or transfer.

## AI tool and model disclosure

This initial MVP was created with **Codex, based on GPT-5**, as an AI coding assistant. The assistant was used to scaffold the React/Vite application, implement the user interface and calculation engine, configure the project, and research the stated UK 2026/27 tax and loan-rule inputs from HMRC sources.

AI-generated code should be reviewed, tested, and approved by a qualified developer and, for tax-rule accuracy, an appropriate UK payroll or tax professional before production use.

## Manual code changes made

The following implementation work was made manually in this repository:

- Created the Vite/React/TypeScript project configuration.
- Added all app UI, styling, and browser-local persistence.
- Added a separate calculation module in `src/rules.ts`.
- Added UK 2026/27 tax-region, NI, pension, employer-cost, and student-loan logic.
- Added application build dependencies and TypeScript type dependencies.
- Added the Vite client declaration required for CSS imports during TypeScript compilation.
- Removed an external web-font dependency so the user interface does not need a font provider at runtime.

## Calculation assumptions and limitations

The calculator deliberately uses standardised annual estimates rather than trying to reproduce a payslip exactly.

- It assumes a standard employee scenario and does not model individual PAYE tax codes, prior-period pay, or payroll-period rounding.
- National Insurance is calculated as an annual estimate; real payroll deductions may vary by weekly or monthly pay period.
- The Personal Allowance is reduced above £100,000 using the standard £1 reduction for each £2 of adjusted net income.
- Salary sacrifice reduces the estimate of taxable and NI earnings; relief at source is displayed as a net-pay pension contribution estimate.
- Taxable benefits are included in taxable income and an estimated employer Class 1A NI cost.
- Employer cost includes cash salary, employer NI, employer pension, and the entered taxable-benefit value.
- Employer-specific items such as Employment Allowance, Apprenticeship Levy allocation, specialist NI categories, company-car benefit calculations, share options, and complex benefits-in-kind are not included.
- Student-loan values are annual estimates. Actual deductions are pay-period based and are rounded by payroll.
- The app does not calculate dividends, self-employment income, capital gains, Child Benefit charge, Gift Aid, Marriage Allowance, or other specialist tax reliefs.

## Tax-rule maintenance

All main calculation values live in `src/rules.ts`. Before each UK tax year, review and update:

- Personal Allowance and taper limits
- Income-tax bands and rates, including Scottish bands
- NI thresholds and rates
- Student and postgraduate loan thresholds/rates
- Any benefit-in-kind or employer-cost assumptions

Use current official HMRC guidance as the source of record before publishing an update.
#   K n o w l e d g e c i t y c a l c  
 #   K n o w l e d g e c i t y c a l c  
 # Knowledgecitycalc
