# User stories and acceptance criteria

Status reflects the current browser-only MVP.

| ID | Role | Linked job | Story | Status |
| --- | --- | --- | --- | --- |
| US-01 | Employee | Understand take-home pay | As an employee, I want to enter a pay package so that I can estimate annual and monthly take-home pay. | Implemented |
| US-02 | Employee | Compare offers | As an employee, I want to compare offers side by side so that I can understand the financial difference. | Implemented |
| US-03 | Employee | Understand tax-region impact | As an employee, I want to select Scotland or rest-of-UK so that the correct tax bands are estimated. | Implemented |
| US-04 | Employee | Understand pension trade-offs | As an employee, I want to choose a pension method so that I can compare its estimated pay impact. | Implemented |
| US-05 | Employee | Keep scenarios private | As an employee, I want scenarios stored on my device so that I can revisit them without an account. | Implemented |
| US-06 | Candidate | Prepare for negotiation | As a candidate, I want to name and export scenarios so that I can retain package options. | Implemented |
| US-07 | Recruiter / HR editor | Explain a package | As a recruiter, I want reusable organisation templates so that I can create consistent illustrations. | Not implemented |
| US-08 | Hiring manager | Review a shared package | As a hiring manager, I want to view authorised scenarios so that I can make a budget-aware decision. | Not implemented |
| US-09 | Organisation admin | Manage access | As an organisation admin, I want to assign and revoke roles so that compensation data remains protected. | Not implemented |
| US-10 | Tax-rule administrator | Publish approved rules | As a tax-rule administrator, I want to publish and roll back rule sets so that calculations use approved inputs. | Not implemented |

## US-01 — Estimate take-home pay

- Given a new offer, when an employee enters base salary, bonus, benefits, pension settings, loan options, and other deductions, then the app shows annual take-home pay.
- Given a calculated offer, when results are displayed, then estimated monthly take-home pay is also shown.
- Given a changed input, when an employee updates it, then displayed figures update without a page reload.
- Given a calculated offer, when the detailed breakdown is opened, then tax, employee NI, loan, pension, and employer contribution lines are shown.

## US-02 — Compare job offers

- Given two offers, when an employee changes either one, then the comparison table shows a separate result column for each offer.
- Given two or more offers, when the employee selects **Add offer**, then a new named offer card and comparison column are added.
- Given comparison results, when the table is visible, then it includes take-home pay, monthly take-home pay, employer pension, employer cost, and effective deduction rate.
- Given the comparison screen, when the employee selects **Show breakdown**, then the detailed table is displayed; when they select **Hide breakdown**, it is concealed.

## US-03 — Apply tax region

- Given England, Wales, or Northern Ireland, when an offer is calculated, then rest-of-UK income-tax bands are used.
- Given Scotland, when an offer is calculated, then Scottish income-tax bands are used.
- Given an existing offer, when the region changes, then only that offer recalculates using the selected region.

## US-04 — Compare pension methods

- Given pension percentages, when an offer is calculated, then employee and employer contributions are shown separately.
- Given salary sacrifice, when the calculation runs, then the employee contribution reduces estimated taxable and NI earnings.
- Given relief at source, when the calculation runs, then it remains distinct from salary sacrifice in the estimate.

## US-05 and US-06 — Private local scenarios and export

- Given an edited offer, when the browser refreshes, then saved offer data is restored from local storage.
- Given the offline MVP, when a user opens the app, then no sign-in is required.
- Given scenarios, when the user selects **Export**, then a JSON representation of the offers is downloaded.

## Future shared-product stories

The following are deliberately not implemented because they require a backend, authentication, and server-side authorisation.

- **US-07:** Given an authenticated HR editor, when they update an approved template, then authorised recruiters can use it; they cannot publish tax rules.
- **US-08:** Given a hiring manager with view-only permission, when they open a shared scenario, then they can view but cannot modify it.
- **US-09:** Given an organisation admin, when they assign or revoke a role, then the server applies the permission change to future requests.
- **US-10:** Given a proposed rule update, when a tax-rule administrator approves it, then the published version carries an effective date, source, approver, and version identifier; an approved prior version can be restored.
