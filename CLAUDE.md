# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SAICT iMohon** — A Malaysian government item request and distribution management system. Staff submit equipment requests (*permohonan*), which flow through a multi-level approval chain before being distributed. The system tracks every stage from initial request to physical delivery and acceptance with a full audit trail.

**Language convention:** All user-facing labels, buttons, and messages are in **Bahasa Malaysia**. Code identifiers use English.

## Architecture

Full-stack application with two separate sub-projects:

- **`backend/`** — Laravel 10 REST API (PHP 8.1+, MySQL)
- **`frontend/`** — React 18 SPA (Create React App + React Router v6)

### Backend (`backend/`)

**Auth:** Laravel Sanctum (token-based, stateless)
**Authorization:** Spatie Permission (6 roles: `user`, `manager`, `admin`, `boss`, `system`, `guest`)
**Activity Logging:** Spatie Activity Log on User, UserProfile, Category, Inventory models
**Categories:** Nested Set pattern via `kalnoy/nestedset`

**Route structure** — role-grouped under `/api/{role}/` with middleware `auth:sanctum` + `role:{role}`:
- `routes/api.php` — auth endpoints (login, register, NRIC login, password reset)
- `routes/roles/` — `admin.php`, `manager.php`, `user.php`, `boss.php`, `system.php`, `global.php`
- `routes/web.php` — email verification, test mail

**Controller organization** — mirrors route grouping under `app/Http/Controllers/{Admin,Manager,User,Boss,System,Global,Auth}/`

**Service layer** — business logic separated from controllers in `app/Services/`:
`MohonService`, `MohonApprovalService`, `MohonDistributionRequestService`, `MohonDistributionItemService`, `DistributionApprovalService`, `DistributionAcceptanceService`, `CategoryService`, `InventoryService`, `UserService`, `AccountService`, `ItemRequestService`
- `app/Services/Administrations/` — admin-specific services (MohonService, MohonDistributionService)

**FormRequests** — 42 validation classes in `app/Http/Requests/` organized by domain

**Helper:** `PaginationHelper` adds sequential numbering to paginated results

### Frontend (`frontend/`)

**UI:** React-Bootstrap 5 + FontAwesome icons
**State management:** Zustand stores (per-feature, using `createResourceStore` factory in `src/libs/`)
**HTTP:** Axios with interceptors (`src/libs/axios.js`) — auto-injects Bearer token, handles 401/403 redirects
**Auth:** Token stored in `localStorage`, validated on page load via `GET /api/logged-user`
**Protected routes:** `src/libs/ProtectedRoute.js` — checks auth + email verification before rendering

**Layouts:** Role-specific layouts using composition pattern:
- `src/layouts/Layout.js` reads `user.role` and renders the matching layout
- Each role layout (Admin, Boss, Manager, System, User, Default) provides its own `TopNavBar`
- `RoleLayout` is the base template accepting `TopNavBar` and `Footer` as props

**Pages:** Feature-folder structure in `src/pages/` — each feature has its own folder with `store.js`, `components/`, and modals

## Development Commands

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve          # http://127.0.0.1:8000

# Testing
./vendor/bin/pest          # run all tests
./vendor/bin/pest --filter TestName   # run single test
php artisan tinker         # REPL
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start    # http://localhost:3000
npm run build
npm test
```

## Environment Setup

**Backend `.env`:**
```
FRONTEND_URL=http://localhost:3000
DB_DATABASE=imohon_dev
CACHE_DRIVER=array
```

**Frontend `.env`:**
```
REACT_APP_BACKEND_URL=http://127.0.0.1:8000/api
REACT_APP_MODE=production
REACT_APP_SHOW_CREDENTIALS=false
```

## Core Workflow

### Phase 1 — Permohonan (Request)
```
User creates MohonRequest (draft)
  └─> User submits → MohonApproval (step=1, pending) → sent to Manager
        └─> Manager approves → step=2, approved
              └─> Admin receives → step=3, pending (Dalam Proses Admin)
                    └─> Admin processes → step=4, approved → fully approved
              └─> Manager rejects → step=2, rejected → flow ends
```

### Phase 2 — Agihan (Distribution)
```
Admin creates MohonDistributionRequest for approved MohonRequest
  └─> Admin assigns inventory items → MohonDistributionItem records
        └─> Admin submits to Boss → MohonDistributionApproval (step=1, pending)
              └─> Boss approves → step=2, approved
                    └─> Admin sets delivery info → MohonDistributionItemDelivery
                          └─> User accepts delivery → MohonDistributionItemAcceptance
              └─> Boss rejects → step=2, rejected
```

### MohonApproval State Machine

| step | status | Meaning | Actor |
|------|--------|---------|-------|
| 0 | pending | Draft (not yet submitted) | User |
| 1 | pending | Submitted, awaiting Manager | Manager |
| 2 | approved/rejected | Manager decision | Manager |
| 3 | pending/approved | Admin processing | Admin |
| 4 | approved/rejected | Final decision, ready for distribution | Admin |

`MohonRequest.step` and `MohonRequest.status` mirror the latest MohonApproval values.

### MohonDistributionApproval State Machine

| step | status | Meaning |
|------|--------|---------|
| 0 | pending | Draft (admin creating) |
| 1 | pending | Submitted to Boss |
| 2 | approved/rejected | Boss decision |

## Key Models and Relationships

```
User → UserProfile → UserDepartment
User → MohonRequest (many)
  ├─ reference_no: MOHON-{YYYY}-{NNNN} (auto-generated via booted() hook)
  ├─ MohonItem (many) → Category (Nested Set)
  ├─ MohonApproval (many, ordered ASC)
  └─ MohonDistributionRequest (many, ordered DESC)
       ├─ reference_no: AGIHAN-{YYYY}-{NNNN}
       ├─ MohonDistributionApproval (many) → boss_id → User
       └─ MohonDistributionItem (many)
            ├─ category_id → Category
            ├─ inventory_id → Inventory
            ├─ mohon_item_id → MohonItem
            ├─ type: 'new' | 'replace'
            ├─ MohonDistributionItemDelivery (one)
            └─ MohonDistributionItemAcceptance (one)
```

## Coding Patterns

### Backend
- Service layer handles all business logic; controllers are thin
- `auth('sanctum')->user()` for current user inside services
- `withCount()` used heavily for item counts in list views
- Eager loading via `with([...])` chains — always load what the frontend needs in one query
- Approval records are never updated in place; new records are inserted to preserve audit trail
- Status values are strings (`'pending'`, `'approved'`, `'rejected'`) — no enums

### Frontend
- Store pattern: `createResourceStore(url)` provides `setValue`, `getValue`, `emptyData`, `setError`
- No Zustand store in modal-only components; use local `useState`
- After a mutation (save/delete), call `fetchData()` to re-fetch rather than mutating local state
- `enforceFocus={false}` on nested modals to prevent Bootstrap focus trap issues
- `scrollable` on xl modals for long content
- Refresh pattern: `store.setValue('refresh', true)` triggers re-fetch in index components
- Delivery/acceptance modals use acknowledge checkbox (`deliveryAck`) before save is enabled

### UI Conventions
- Bootstrap variant mapping: `warning`+`text='dark'` = pending, `success` = approved, `danger` = rejected, `secondary` = draft, `info` = view buttons, `primary` = reference badges / submit
- Modal sizes: `xl` for data-heavy, `centered` for confirmation/form
- Date display: `created_at` as `d M Y` (e.g. `04 Mar 2026`); `date_start`/`date_end` stored as `Y-m-d`
- Pagination: Laravel `paginate(10)->withQueryString()` on backend; frontend uses `links` array

## Notes

- **NRIC login:** Malaysian ID-based login available alongside email/password (`POST /api/login-by-nric`)
- **Email verification:** Required after registration; backend sends link, frontend checks `email_verified_at` — unverified users see a blocking card
- **Mailer:** Mailgun (`postmaster.mygovuc.gov.my`) with 4 mailables: MohonNotification, AgihanNotification, EmailToPelulus1, MyTestEmail
- **CORS:** Open (`*`) for development; Sanctum stateful domains include `localhost:3000`
- **Mobile:** Desktop-only app — layout components show alerts on mobile (768px breakpoint)
- **Testing framework:** Pest PHP 2 (wraps PHPUnit 10)
