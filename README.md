# 🏗️ Multi-Tenant E-Commerce Platform — Production Roadmap  

**Real, production-ready multi-tenant marketplace**

This document outlines every step required to go from **zero → live revenue → scalable SaaS** using:

- **Next.js 15 (App Router + Server Actions)**
- **PostgreSQL + Prisma**
- **Better Auth**
- **Stripe + Stripe Connect**
- **TailwindCSS + DaisyUI**
- **Vercel deployment**
- **Vercel Blob / UploadThing for storage**

Use this as the engineering plan for the entire project.

---

# ✅ PROJECT CHECKLIST

## 1. SETUP
- [ ] create Next.js 15 app (`create-next-app`)
- [ ] initialize Git + GitHub repo
- [ ] deploy initial app to Vercel
- [ ] install TailwindCSS
- [ ] install DaisyUI and configure theme
- [ ] add global layout + navigation (logo, dashboard links)
- [ ] configure `.env.local` and Vercel envs  
  - `DATABASE_URL`  
  - `STRIPE_SECRET_KEY`  
  - `STRIPE_WEBHOOK_SECRET`  
  - `STRIPE_CONNECT_CLIENT_ID`  

---

### 1.1 Homepage & Catalog Layout (Current Step)

**Setup**

- [ ] Install `lucide-react` for icons:  
      `npm install lucide-react`
- [ x] Create `lib/catalog-config.ts` with:
  - [ ] `CatalogTemplate` type
  - [ ] `FilterDefinition` type
  - [ ] `defaultCatalogTemplate` configuration
- [ ] Add a `placeholder-product.png` in `/public` (or replace with real images)

**🧱 Components**

- [ ] Create `components/layout/site-header.tsx`
  - [ ] Make it a client component (`"use client"`)
  - [ ] Implement logo + desktop nav
  - [ ] Implement mobile hamburger menu
  - [ ] Implement slide-over mobile panel with nav links + categories
  - [ ] Keep header sticky (`sticky top-0`)
  - [ ] Extract category pills into reusable `CategoryBar` inside `SiteHeader`
- [ ] Create `components/catalog/filter-sidebar.tsx`
  - [ ] Render filters based on `template.filters`
  - [ ] Support `select` and `search` filter types
  - [ ] Make sidebar sticky (`sticky top-28`) on desktop, hidden on mobile
- [ ] Create `components/catalog/product-grid.tsx`
  - [ ] Grid layout with product cards (name + brand + image)
- [ ] Create `components/layout/site-footer.tsx`
  - [ ] Simple footer with brand + © year

**🏠 Page wiring**

- [ ] Update `app/page.tsx` to:
  - [ ] Import `defaultCatalogTemplate`
  - [ ] Render `<SiteHeader template={template} />`
  - [ ] Wrap main content in the `max-w-6xl` container
  - [ ] Render `<FilterSidebar template={template} />` and `<ProductGrid />`
  - [ ] Append `<SiteFooter />`

**✅ Behavior checks**

- [ ] Scroll the page:
  - [ ] Header (nav + categories) stays fixed at the top
  - [ ] Sidebar stays pinned under header on desktop
  - [ ] Only the product grid “moves” visually
- [ ] Resize to mobile:
  - [ ] Desktop nav disappears
  - [ ] Hamburger appears and opens/closes the slide-over menu
  - [ ] Categories are visible inside the slide-over

**🔮 Future-proofing (for later phases)**

- [ ] Plan an onboarding flow that:
  - [ ] Lets store owners choose a `CatalogTemplate` (beats, ebooks, party PDFs, etc.)
  - [ ] Stores the chosen `templateId` on the `Store` record
- [ ] Have catalog pages fetch the right template for the active store and pass it into:
  - [ ] `SiteHeader`
  - [ ] `FilterSidebar`
  - [ ] Any future components that need categories/filters

---

## 2. DATABASE & PRISMA
- [ ] create Postgres database (Neon or Vercel Postgres)
- [ ] install Prisma + initialize schema
- [ ] create core models:
  - [ ] `User` (roles, stripeCustomerId)
  - [ ] `Store` (tenant, slug, stripeAccountId)
  - [ ] `Product` (storeId, price, fileUrl)
  - [ ] `Purchase` (userId, productId, storeId)
- [ ] define enums:
  - [ ] `Role = CUSTOMER | CREATOR | ADMIN`
- [ ] add constraints:
  - [ ] `@@unique([storeId, slug])` for products
- [ ] add indexes:
  - [ ] by storeId, userId, createdAt
- [ ] create shared Prisma client singleton
- [ ] run initial migrations

---

## 3. AUTHENTICATION (BETTER AUTH)
- [ ] install & configure Better Auth
- [ ] setup email/password auth
- [ ] optional: Google OAuth provider
- [ ] map Better Auth user → Prisma `User`
- [ ] install middleware enforcing authentication on dashboard routes
- [ ] seed an `ADMIN` user (you)
- [ ] add role assignment logic:
  - [ ] default: `CUSTOMER`
  - [ ] when becoming creator: set role to `CREATOR`

---

## 4. MULTI-TENANT STORES

### Store Creation
- [ ] “Become a Creator” onboarding page
- [ ] server action to:
  - [ ] create `Store`
  - [ ] assign user role = `CREATOR`
  - [ ] generate unique slug from store name

### Store Dashboard
- [ ] `/dashboard/store` page
- [ ] edit store name/description
- [ ] show Stripe Connect status
- [ ] ALL server actions verify:
  - `store.ownerId === session.user.id`

### Public Storefront
- [ ] `/stores` → list all stores
- [ ] `/stores/[slug]` → show creator products

---

## 5. PRODUCTS (CREATOR CRUD)

### Creator Product Management
- [ ] `/dashboard/products`
- [ ] `/dashboard/products/new`
- [ ] `/dashboard/products/[id]/edit`
- [ ] ability to:
  - [ ] create product
  - [ ] edit product
  - [ ] delete or archive product
- [ ] validation with Zod (name, price, file)
- [ ] ownership check in every action

### Public Product Page
- [ ] `/products/[storeSlug]/[productSlug]`
- [ ] show:
  - [ ] product title, price, description
  - [ ] creator info
  - [ ] Buy button → triggers Stripe checkout

---

## 6. DIGITAL PRODUCT STORAGE

- [ ] choose provider: Vercel Blob or UploadThing
- [ ] creator upload UI in product form
- [ ] persist file URL in `Product.fileUrl`
- [ ] secure download route:
  - `/downloads/[purchaseId]`
  - verify:
    - purchase exists
    - `purchase.userId === session.user.id`
  - stream or redirect to file

- [ ] optional:
  - signed URLs
  - expiring download links

---

## 7. STRIPE + STRIPE CONNECT (MONEY FLOW)

### Stripe Setup
- [ ] create Stripe account
- [ ] enable Stripe Connect (Standard)
- [ ] install Stripe SDK
- [ ] create `lib/stripe.ts` helper

### Connect Onboarding
- [ ] `/dashboard/billing`
- [ ] “Connect Stripe” button
- [ ] server action:
  - create onboarding link
  - redirect creator to Stripe
- [ ] return URL handler updates `Store.stripeAccountId`

### Payment Flow (Customer)
- [ ] on “Buy” click → server action:
  - [ ] check authentication
  - [ ] ensure product exists and is active
  - [ ] ensure store has `stripeAccountId`
  - [ ] create or retrieve Stripe customer
  - [ ] create Checkout Session:
    - `line_items`
    - `payment_intent_data[application_fee_amount]` = platform fee
    - `transfer_data[destination]` = creator’s stripe account
  - [ ] create a `Purchase` record with status `pending`
  - [ ] redirect to Stripe Checkout

### Stripe Webhook (Critical)
- [ ] create route handler: `/api/stripe/webhook`
- [ ] verify signature with `STRIPE_WEBHOOK_SECRET`
- [ ] handle:
  - [ ] `checkout.session.completed`
    - [ ] mark purchase `paid`
    - [ ] grant access in library
    - [ ] send optional receipt email
  - [ ] `payment_intent.payment_failed`
  - [ ] refunds (later)
- [ ] store processed `eventId` for idempotency

---

## 8. CUSTOMER LIBRARY

- [ ] `/account/library`
- [ ] fetch `Purchase` records for logged in user
- [ ] show downloads for purchased products
- [ ] enforce:
  - only purchased items appear
  - only file downloads that match purchase

---

## 9. MULTI-TENANCY SAFETY

- [ ] every query must be scoped by:
  - `storeId`
  - OR `store.slug`
  - OR `userId` when customer-specific
- [ ] composite uniques:
  - `@@unique([storeId, slug])`
- [ ] centralized helper for store lookup
- [ ] permission checks:
  - creators only see their data
  - customers only see their purchases
  - admin can see everything
- [ ] manual tests for cross-data leakage

---

## 10. SECURITY & VALIDATION

- [ ] Zod validation for all server actions
- [ ] sanitize HTML if using rich text
- [ ] secure cookies via Better Auth
- [ ] rate limiting:
  - [ ] login
  - [ ] signup
  - [ ] checkout session creation
- [ ] CSP headers + security headers
- [ ] protect webhook endpoint (signature validation)
- [ ] log all permission failures

---

## 11. UI / UX (TAILWIND + DAISYUI)

### Platform Landing Page
- [ ] hero section
- [ ] CTA for creators & customers
- [ ] “How it works” steps

### Creator Dashboard
- [ ] store overview (sales, connect status)
- [ ] quick links (Add product, view orders)
- [ ] notifications: missing Stripe account, incomplete onboarding

### Customer Experience
- [ ] clean store browsing experience
- [ ] product detail pages
- [ ] simplified “Buy Now” flow → Stripe Checkout
- [ ] post-purchase “Thank you” page

### General UI
- [ ] responsive design
- [ ] accessibility basics
- [ ] light/dark mode (optional)

---

## 12. EMAILS & TRUST PAGES

- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Refund policy
- [ ] transactional emails via Resend/Postmark:
  - [ ] welcome email
  - [ ] purchase confirmation
  - [ ] successful payout notification (optional)
  - [ ] password reset

---

## 13. OBSERVABILITY & OPS

- [ ] Sentry error tracking
- [ ] structured logging for:
  - [ ] webhook events
  - [ ] payment failures
- [ ] daily automated DB backups
- [ ] uptime monitoring (UptimeRobot → `/api/health`)
- [ ] production build optimizations
- [ ] monitor cold starts, DB connection pool

---

## 14. SCALE & “AFTER V1” ENHANCEMENTS  

### Store-Related
- [ ] subdomains for stores (`storeSlug.yourdomain.com`)
- [ ] store SEO metadata
- [ ] store analytics dashboard (sales, revenue, conversions)

### Product-Related
- [ ] bundles
- [ ] coupons / discounts
- [ ] reviews & ratings
- [ ] product variants (if needed)

### Platform Features
- [ ] platform-level analytics (GMV, fees)
- [ ] fraud detection tools
- [ ] admin dashboard for moderation
- [ ] feature flags system
- [ ] webhook retry dashboard (monitor Stripe issues)

---

# ⚠️ Why You Can’t Rely Only on Server Actions for Stripe  

### Server Actions are synchronous.  
Stripe payments are **asynchronous**.

Reasons:
1. User may never return to your site  
2. 3D Secure / SCA can finalize later  
3. Server actions have no built-in retry mechanics  
4. Refunds, disputes, chargebacks are reported via webhooks

**Conclusion:**  
Use server actions to **start** payments,  
Use webhooks to **finalize** and **verify** payments.  

---

# 🤔 Should We Use tRPC?

**V1: No.**  
Server Actions + Route Handlers cover everything.

Add tRPC only if:
- building Expo/mobile  
- exposing a public API  
- needing a shared backend boundary
