# App roles and RBAC

## Current offline MVP

Offerwise has no authentication, accounts, server, shared database, or shared scenarios. Every visitor is a local calculator user and can create, edit, compare, export, and remove only the scenarios held in that browser’s local storage.

| Role | Audience | Access in the current MVP |
| --- | --- | --- |
| Calculator user | Employee, candidate, recruiter, or hiring manager | Create, edit, compare, export, and remove browser-local offer scenarios. |
| Product maintainer | Development or product team | Update application source and bundled tax-rule configuration before a release. This is repository access, not in-app access. |

## Future RBAC model

Accounts and RBAC are not required for the offline MVP. They become mandatory before scenarios, templates, or compensation data are shared between people.

| Role | Typical user | Future permissions |
| --- | --- | --- |
| Employee | Employee or candidate | Manage only their own private scenarios. |
| Recruiter / HR editor | Recruiter or compensation specialist | Manage approved organisation templates and authorised candidate scenarios. Cannot publish tax rules or change member access. |
| Hiring manager | Team manager | View scenarios explicitly shared with them; edit only when editor permission is granted. |
| Organisation admin | HR operations or workspace owner | Manage members, roles, templates, and organisation defaults. |
| Tax-rule administrator | Payroll or tax operations user | Review, approve, publish, and roll back versioned rule sets. Does not automatically access private scenarios. |
| Platform administrator | Internal platform operations | Maintain platform configuration and investigate audited incidents using least privilege. |

## RBAC principles

- Make scenarios private by default and assign an owner.
- Enforce authorisation on the server, rather than only hiding controls in the interface.
- Apply least privilege and explicit sharing.
- Separate tax-rule publishing rights from organisation-access administration.
- Audit role changes, shares, exports, deletion, and tax-rule publication.
- Require explicit consent before sharing salary or benefits data.
- Do not give platform administrators automatic access to compensation data.
