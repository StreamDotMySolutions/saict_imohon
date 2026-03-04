# SAICT iMohon — Development Prompt

## Project Overview

**SAICT iMohon** is a Malaysian government item request and distribution management system. Staff submit equipment requests (*permohonan*), which flow through a multi-level approval chain before being distributed. The system tracks every stage — from initial request to physical delivery and acceptance — with a full audit trail.

**Language convention:** All user-facing labels, buttons, and messages are in Bahasa Malaysia. Code identifiers use English.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 10, PHP 8.1+, MySQL |
| Auth | Laravel Sanctum (stateless token) |
| Authorization | Spatie Permission |
| Frontend | React 18, Create React App, React Router v6 |
| UI | React-Bootstrap 5, FontAwesome |
| State | Zustand |
| HTTP | Axios (`REACT_APP_BACKEND_URL`) |

---

## Roles

Six roles exist via Spatie Permission. Routes are grouped by role under `/api/{role}/`:

| Role | Bahasa Label | Responsibility |
|---|---|---|
| `user` | Pemohon | Submit equipment requests, accept delivered items |
| `manager` | Pengurus | First-level approval of requests |
| `admin` | Pentadbir | Process approved requests, create distributions, set delivery info |
| `boss` | Pengarah | Second-level approval of distribution packages |
| `system` | Sistem | System-level management |
| `guest` | Tetamu | Read-only guest access |

---

## Core Workflow

### Phase 1 — Permohonan (Request)

```
User creates MohonRequest (draft)
  └─> User submits → MohonApproval created (step=1, status=pending) → sent to Manager
        └─> Manager approves → MohonApproval (step=2, status=approved)
              └─> Admin receives → MohonApproval updated (step=3, status=pending) [Dalam Proses Admin]
                    └─> Admin processes → MohonApproval (step=4, status=approved) → MohonRequest fully approved
              └─> Manager rejects → MohonApproval (step=2, status=rejected) → flow ends
```

### Phase 2 — Agihan (Distribution)

```
Admin creates MohonDistributionRequest for approved MohonRequest
  └─> Admin assigns inventory items → MohonDistributionItem records
        └─> Admin submits to Boss → MohonDistributionApproval (step=1, status=pending)
              └─> Boss approves → MohonDistributionApproval (step=2, status=approved)
                    └─> Admin sets delivery info → MohonDistributionItemDelivery per item
                          └─> User accepts delivery → MohonDistributionItemAcceptance per item
              └─> Boss rejects → MohonDistributionApproval (step=2, status=rejected)
```

---

## MohonApproval State Machine

| step | status | Meaning | Actor |
|---|---|---|---|
| 0 | pending | Draft (not yet submitted) | User |
| 1 | pending | Submitted, awaiting Manager | Manager |
| 2 | approved | Manager approved | Manager |
| 2 | rejected | Manager rejected | Manager |
| 3 | pending | Dalam Proses Admin | Admin |
| 3 | approved | Admin processed | Admin |
| 4 | approved | Fully approved, ready for distribution | Admin |
| 4 | rejected | Admin rejected | Admin |

MohonRequest fields: `step` (mirrors latest approval step), `status` (mirrors latest approval status).

---

## MohonDistributionApproval State Machine

| step | status | Meaning |
|---|---|---|
| 0 | pending | Draft distribution (admin creating) |
| 1 | pending | Submitted to Boss, awaiting approval |
| 2 | approved | Boss approved |
| 2 | rejected | Boss rejected |

---

## Admin Agihan Page — Tab Logic

The Admin Agihan page (`/admin/agihan`) lists **MohonRequests** that are fully approved (`step=4, status=approved`), filtered by tab:

| Tab | Bahasa | Filter |
|---|---|---|
| `baharu` | Baharu | No distribution request submitted to boss yet |
| `menunggu` | Menunggu | Distribution submitted to boss (step=1, pending) |
| `lulus` | Lulus | Boss approved (step=2, approved) |
| `gagal` | Gagal | Boss rejected (step=2, rejected) |

### Action buttons per tab

| Tab | Buttons shown |
|---|---|
| `baharu` | AgihanDraftModal (create/edit distribution), AgihanViewModal (if items exist) |
| `menunggu` | AgihanViewModal |
| `lulus` | AgihanLulusModal (set delivery), AgihanViewModal |
| `gagal` | AgihanViewModal |

**AgihanViewModal** contains two internal tabs: **Agihan** (distribution detail + delivery management) and **Laporan** (full printable report with a Cetak button).

---

## Key Models & Relationships

```
User
  ├─ UserProfile → UserDepartment
  └─ MohonRequest (many)
       ├─ reference_no: MOHON-{YYYY}-{NNNN}   (auto-generated on create)
       ├─ step, status                          (mirrors latest MohonApproval)
       ├─ MohonItem (many) → Category (Nested Set via kalnoy/nestedset)
       ├─ MohonApproval (many, ordered ASC)
       └─ MohonDistributionRequest (many, ordered DESC)
            ├─ reference_no: AGIHAN-{YYYY}-{NNNN}  (auto-generated on create)
            ├─ MohonDistributionApproval (many)
            │    └─ boss_id → User (boss who approved/rejected)
            └─ MohonDistributionItem (many)
                 ├─ category_id → Category
                 ├─ inventory_id → Inventory (vendor info)
                 ├─ mohon_item_id → MohonItem (original request line)
                 ├─ type: 'new' | 'replace'
                 ├─ MohonDistributionItemDelivery (one)
                 │    └─ pic_name, pic_phone, date_start, date_end
                 └─ MohonDistributionItemAcceptance (one)
                      └─ installation_date, pic_name, pic_phone
```

---

## API Route Structure

All routes are under `/api/` with Sanctum auth. Routes are split by role file under `routes/roles/`.

### User routes (`/api/user/`)
- `GET  /mohon-requests` — list user's requests
- `POST /mohon-requests` — create draft
- `GET  /mohon-requests/{id}` — show detail
- `DELETE /mohon-requests/{id}` — delete draft
- `POST /mohon-approvals/{mohonRequestId}` — submit to manager
- `GET  /mohon-items/categories` — category tree
- `GET  /mohon-items/{mohonRequestId}` — list items for a request
- `POST /mohon-items/{mohonRequestId}` — add item
- `PUT  /mohon-items/{id}` — update item
- `DELETE /mohon-items/{id}` — remove item
- `GET  /agihan` — view own approved distributions
- `POST /mohon-distribution-item-acceptances/{itemId}` — accept delivery

### Manager routes (`/api/manager/`)
- `GET  /mohon-requests` — list requests pending approval
- `PUT  /mohon-approvals/{mohonRequestId}` — approve or reject

### Admin routes (`/api/admin/`)
- `GET  /agihan/mohon?tab={tab}` — paginated list for admin agihan page
- `GET  /agihan/{mohonId}` — detail of one mohon with distribution data
- `POST /mohon-distribution-requests/{mohonRequestId}` — create distribution
- `POST /mohon-distribution-items/{requestId}/create` — add item to distribution
- `POST /mohon-distribution-items/{requestId}/sync` — sync items
- `POST /mohon-distribution-items/{requestId}/remove` — remove item
- `POST /mohon-distribution-approvals/{requestId}` — submit to boss
- `POST /mohon-distribution-item-deliveries/{itemId}` — set delivery info
- `GET  /users`, `POST /users`, `PUT /users/{id}` — user management
- `GET  /inventories`, `POST /inventories`, etc. — inventory management

### Boss routes (`/api/boss/`)
- `GET  /mohon-distribution-requests/{status}` — list by status (pending/approved/rejected)
- `GET  /mohon-distribution/{id}` — show detail
- `PUT  /mohon-distribution-approvals/{requestId}` — approve or reject

### Global routes (`/api/global/`)
- `GET  /mohon-requests/{id}` — view any request (used by Reporting)

---

## Frontend Page Structure

```
src/pages/
├── Mohon/                     # User: create/manage permohonan
├── MohonApproval/             # Manager: approve/reject requests
├── AdminAgihan/               # Admin: distribute approved mohon
│   ├── index.js               # Main list with tabs (baharu/menunggu/lulus/gagal)
│   ├── AgihanDraftModal.js    # Create/edit distribution package
│   ├── AgihanViewModal.js     # View agihan detail; tabs: Agihan + Laporan
│   └── AgihanLulusModal.js    # Set delivery per item (lulus tab)
├── MohonDistributionItem-v2/  # Admin: full-page distribution management
│   ├── index.js               # Page wrapper with breadcrumb
│   └── components/
│       └── MohonDistributionItemIndex.js  # Reusable card grid + delivery modal
├── BossAgihan/                # Boss: approve/reject distribution requests
├── UserAgihan/                # User: view and accept delivered items
└── Reporting/
    ├── ReportingModal.js      # Printable report modal (badge trigger)
    └── show.js                # ShowAgihan component (full report content)
```

---

## UI Conventions

- **Bootstrap variant mapping:**
  - `warning` + `text='dark'` = Menunggu / pending
  - `success` = Diluluskan / approved
  - `danger` = Ditolak / rejected
  - `secondary` = Draf
  - `info` = View/Agihan buttons
  - `primary` = Reference number badges, submit actions

- **Modal sizes:** `xl` for data-heavy modals, `centered` for confirmation/form modals

- **Pagination:** Laravel `paginate(10)->withQueryString()` on backend; frontend uses `links` array with `dangerouslySetInnerHTML` for `«`/`»` labels

- **Date display:** `created_at` cast as `d M Y` (e.g. `04 Mar 2026`); `date_start`/`date_end` stored as `Y-m-d`

- **Reference numbers:**
  - Requests: `MOHON-{YYYY}-{NNNN}` (e.g. `MOHON-2026-0001`)
  - Distributions: `AGIHAN-{YYYY}-{NNNN}` (e.g. `AGIHAN-2026-0001`)
  - Auto-generated via model `booted()` hook after create

---

## Coding Patterns

### Backend
- Service layer handles all business logic; controllers are thin
- `auth('sanctum')->user()` for current user inside services
- `withCount()` used heavily for item counts in list views
- Eager loading via `with([...])` chains — always load what the frontend needs in one query
- Approval records are never updated in place; new records are inserted to preserve audit trail

### Frontend
- No Zustand store in modal-only components; use local `useState`
- After a mutation (save/delete), call `fetchData()` to re-fetch rather than mutating local state
- `enforceFocus={false}` on nested modals to prevent Bootstrap focus trap issues
- `scrollable` on xl modals for long content
- The `refresh` pattern: set `store.setValue('refresh', true)` to trigger re-fetch in index components
- Delivery/acceptance modals use an acknowledge checkbox (`deliveryAck`) that must be checked before save is enabled

---

## What Has Been Built

- [x] User: create/submit/manage permohonan with items
- [x] Manager: list, approve, reject permohonan
- [x] Admin: process permohonan, create distribution packages
- [x] Admin: assign inventory items to distribution, sync/remove items
- [x] Admin: submit distribution to Boss for approval
- [x] Boss: list, view, approve/reject distribution requests
- [x] Admin: set delivery details per item (after Boss approves)
- [x] User: view and accept delivered items
- [x] Admin Agihan page with 4 tabs (baharu/menunggu/lulus/gagal)
- [x] AgihanViewModal with Agihan + Laporan tabs, print support
- [x] Full printable report (ShowAgihan) with requester info, items, approvals, distribution history
- [x] Email notifications (Mailgun)
- [x] Reference numbers on both requests and distributions

## What May Still Need Work

- [ ] Dashboard / summary statistics per role
- [ ] Notifications in-app (bell icon / notification list)
- [ ] User: track delivery status of their own accepted items
- [ ] Admin: bulk delivery info entry across multiple items
- [ ] Boss: dashboard with pending approval count
- [ ] Reporting: export to PDF (currently only browser print)
- [ ] Admin: re-submit rejected distributions (after boss rejects)
- [ ] Audit log view in admin panel
