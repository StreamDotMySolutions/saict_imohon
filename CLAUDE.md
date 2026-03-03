# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SAICT iMohon** — A Malaysian government item request and distribution management system. Users submit requests (mohon), managers and bosses approve them through a multi-level workflow, admins manage distributions, and users accept delivered items.

## Architecture

Full-stack application with two separate sub-projects:

- **`backend/`** — Laravel 10 REST API (PHP 8.1+)
- **`frontend/`** — React 18 SPA (Create React App + React Router v6)

### Backend (`backend/`)

**Auth:** Laravel Sanctum (token-based, stateless)
**Authorization:** Spatie Permission (6 roles: `user`, `manager`, `admin`, `boss`, `system`, `guest`)
**Activity Logging:** Spatie Activity Log on User, UserProfile, Category, Inventory models
**Categories:** Nested Set pattern via `kalnoy/nestedset`

**Route structure** — role-grouped under `/api/{role}/`:
- `routes/api.php` — auth endpoints + includes role files
- `routes/roles/` — `admin.php`, `manager.php`, `user.php`, `boss.php`, `system.php`, `global.php`
- `routes/web.php` — email verification, test mail

**Controller organization** — mirrors route grouping:
```
app/Http/Controllers/
├── Admin/     Manager/     User/     Boss/     System/     Global/
├── Auth/      (Sanctum login, register, password reset)
```

**Service layer** — business logic separated from controllers:
`MohonService`, `MohonApprovalService`, `MohonDistributionService`, `DistributionApprovalService`, `CategoryService`, `InventoryService`, `UserService`, `AccountService`

**Key workflow:** User submits → Manager approves → Admin creates distribution → Boss approves distribution → User accepts items

### Frontend (`frontend/`)

**State management:** Zustand stores
**HTTP:** Axios (base URL from `REACT_APP_BACKEND_URL`)
**Layouts:** Role-specific layouts in `src/layouts/components/` (AdminLayout, BossLayout, ManagerLayout, SystemLayout, UserLayout, DefaultLayout)

## Development Commands

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed

# Dev server
php artisan serve          # runs on http://127.0.0.1:8000

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

npm start    # dev server on http://localhost:3000
npm run build
npm test
```

## Environment Setup

**Backend `.env` key values:**
```
FRONTEND_URL=http://localhost:3000   # used for email verification redirect links
DB_DATABASE=imohon_dev
```

**Frontend `.env` key values:**
```
REACT_APP_BACKEND_URL=http://127.0.0.1:8000/api
REACT_APP_MODE=production
```

## Key Models and Relationships

```
User → UserProfile → UserDepartment
User → MohonRequest → MohonItem → Category (Nested Set)
MohonRequest → MohonApproval (manager approval)
MohonRequest → MohonDistributionRequest → MohonDistributionItem → MohonDistributionItemDelivery
MohonDistributionRequest → MohonDistributionApproval (boss approval)
MohonDistributionItem → MohonDistributionItemAcceptance (user acceptance)
```

## Notes

- **NRIC login:** Malaysian ID-based login available alongside email/password (`POST /api/login-by-nric`)
- **Email verification:** Required after registration; backend sends link, frontend redirected via `GET /web/email/verify/{id}/{hash}`
- **Mailer:** Mailgun (`postmaster.mygovuc.gov.my`)
- **Testing framework:** Pest PHP 2 (wraps PHPUnit 10)
