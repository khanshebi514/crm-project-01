SAI — Product & Architecture Constitution

Version

Version: 1.0
Status: Official project specification
Project: crm-project-01
Architecture Philosophy: SAI (Simple, Adaptive, Intelligent)

1. Vision

SAI is a user-first, multi-tenant SaaS business management platform designed primarily for small business and shop owners.

The goal is not simply to digitize business records.

The goal is to let a business owner manage daily work with the least possible friction, while SAI handles the complexity behind the scenes.

The software should adapt to the user's work, not force the user to adapt to the software.

SAI should eventually work through:

Normal graphical UI

Quick actions

AI chat

AI voice commands

Automation

Offline-first workflows

The user should not need to understand databases, synchronization, APIs, AI tools, or technical processes.

2. Core SAI Principles

These principles are architectural and product requirements.

2.1 Simple

The user should need:

Fewer clicks

Fewer fields

Fewer screens

Minimal data entry

Clear actions

Familiar workflows

Advanced information should be hidden behind Advanced details instead of being forced into every form.

2.2 Fast

The application should feel responsive.

Prefer:

Immediate UI feedback

Optimistic/local updates where safe

Background synchronization

Search-first workflows

Quick actions

Recent/frequent items

Avoid unnecessary:

Page reloads

Blocking loading screens

Long forms

Multi-step flows for simple tasks

2.3 Reliable

SAI must protect user work.

Important operations should not be casually lost because of:

Internet failure

Browser refresh

Temporary API failure

Device restart

Network instability

Critical operations should be persisted locally when appropriate and synchronized safely.

2.4 Offline-First

Offline support is a first-class requirement.

The shop owner should be able to continue important daily operations without an active internet connection.

The intended behavior is:

ONLINE
↓
Server + Local Data
↓
Normal operation

OFFLINE
↓
Local Database
↓
Pending Sync Queue
↓
Internet Returns
↓
Synchronization
↓
Server / PostgreSQL

Important

Browser localStorage is NOT the primary offline database.

For structured business data, SAI should use IndexedDB or an appropriate client-side database abstraction.

localStorage may be used for small preferences such as:

Theme preference

Sidebar state

UI preferences

2.5 Reusable

Do not create duplicate components when an existing reusable component can solve the problem.

Shared UI belongs in:

components/ui/
components/shared/
components/layout/

Feature-specific UI belongs in:

features/<feature>/components/

Business logic should not be duplicated across:

UI

AI

Voice

Automation

Instead, they should use the same server-side business services.

2.6 Intelligent

AI should assist the user rather than create another complicated interface.

Examples:

"How much did I sell today?"

"Who owes me the most?"

"Which products are low?"

"Add 20 Coke bottles to inventory."

AI should use controlled business tools/services instead of directly modifying the database.

2.7 Natural

Users should be able to interact through:

Clicks

Search

Chat

Voice

Example:

"Ali ko 2 Coke udhaar de do."

The system should understand the request and convert it into a controlled business operation.

2.8 Safe

AI and automated systems must respect:

Authentication

Tenant boundaries

User permissions

Business rules

Validation

Confirmation requirements

High-risk operations should require confirmation.

Examples:

Low-risk

"Show today's sales."

Can normally execute immediately.

High-risk

"Delete all products."

Should require explicit confirmation.

2.9 Scalable

SAI must be multi-tenant from the foundation.

Conceptually:

Platform
│
├── Business A
│ ├── Users
│ ├── Products
│ ├── Customers
│ ├── Sales
│ └── Expenses
│
├── Business B
│ ├── Users
│ ├── Products
│ ├── Customers
│ ├── Sales
│ └── Expenses
│
└── Business C

Business data must remain isolated.

2.10 Calm

The UI should feel:

Clean

Professional

Lightweight

Predictable

Comfortable

Avoid:

Excessive cards

Excessive colors

Huge dashboards

Unnecessary animations

Constant popups

Overloaded forms

Technical error messages

3. User Experience Philosophy

SAI is designed primarily for people who are busy running a business.

The user should be able to understand the important information within seconds.

A dashboard should prioritize:

Today's sales

Today's profit

Customer receivables

Supplier payables

Low-stock items

Recent activity

Important pending actions

Do not fill the dashboard with charts merely because charts are possible.

4. Quick Action Philosophy

Important daily actions should be immediately accessible.

The most important example is:

- NEW SALE

A typical sale should require only the information that is actually necessary:

Product
Quantity
Customer (optional for cash sale)
Payment type
Paid amount

The system should automatically calculate:

Subtotal

Total

Remaining balance

Profit

Stock deduction

Customer balance

Stock movement

5. Minimal Data Entry

Forms should start with essential information.

Example customer form:

Customer Name \*
Phone
Opening Balance

SAVE

Additional information can be placed under:

Advanced Details

The same principle applies to:

Products

Suppliers

Expenses

Sales

Purchases

6. Mobile-First and Responsive

SAI should work comfortably on:

Android phones

Tablets

Laptops

Desktop computers

Important workflows should be designed mobile-first rather than designing desktop screens and shrinking them.

7. Search-First Experience

Search should be available wherever browsing large datasets becomes annoying.

Examples:

Search product...
Search customer...
Search supplier...
Search invoice...

Eventually SAI should support a global search:

Search anything...

Ali
Coke
INV-1023
ABC Supplier

AI can eventually provide natural-language search.

8. Offline User Experience

Offline status should be understandable but not annoying.

Examples:

✓ Synced

🟡 3 changes waiting to sync

🟠 Offline — changes saved safely

When synchronization completes:

✓ Everything synced

Do not expose technical terms such as:

API failure

IndexedDB error

Sync mutation

HTTP 500

unless the user is an administrator and the information is genuinely useful.

9. Offline Architecture

SAI should use an offline data layer.

Conceptually:

                 USER
                   │
        ┌──────────┼──────────┐
        ↓          ↓          ↓
       UI          AI        VOICE
        │          │          │
        └──────────┼──────────┘
                   ↓
             Business Service
                   ↓
          ┌────────┴────────┐
          ↓                 ↓
    Local Database      Server API
          │                 │
          ↓                 ↓
     Sync Queue        PostgreSQL
          │                 │
          └───────┬─────────┘
                  ↓
             Sync Engine

The exact client-side technology will be selected during the Offline-First phase.

10. Synchronization Requirements

The synchronization system should support:

Pending operations

Retry

Failure handling

Idempotency

Operation ordering where necessary

Conflict detection

Safe recovery

Sync status

Duplicate prevention

Example:

CREATE SALE
↓
Local transaction
↓
Sync Queue
↓
Server
↓
Success → Mark synced
Failure → Retry

11. Inventory and Stock Philosophy

Do not rely only on a mutable stock number.

Use a stock movement/event model.

Examples:

Opening Stock +100
Purchase +20
Sale -30
Return +2
Adjustment -1

---

Current Stock 91

This gives SAI:

Auditability

Better offline synchronization

Better reporting

Better debugging

Better inventory history

12. AI Architecture

AI must not directly write arbitrary SQL or bypass application rules.

Preferred architecture:

User
↓
AI
↓
Intent / Tool
↓
Authentication
↓
Permission Check
↓
Business Service
↓
Validation
↓
Database / Local Data

Example:

"Ali ko 2 Coke udhaar de do."

Becomes conceptually:

Customer → Ali
Product → Coke
Quantity → 2
Payment → Credit
Action → createSale()

The AI is an interface to business capabilities, not the business logic itself.

13. Voice Architecture

Voice is another interface to the same business services.

Voice
↓
Speech-to-Text
↓
AI Interpretation
↓
Tool
↓
Permission
↓
Business Service
↓
Database / Local Storage

This prevents duplicate business logic.

14. AI, Voice and UI Must Share Business Logic

A sale should not have three separate implementations:

UI Sale Logic
AI Sale Logic
Voice Sale Logic

Instead:

UI ─────┐
AI ─────┼──→ createSale()
Voice ──┘
↓
Business Rules
↓
Database

This is one of the most important architectural rules in SAI.

15. Multi-Tenant Architecture

Every business-owned record should be associated with its tenant/business.

Conceptually:

Authenticated User
↓
Business / Tenant
↓
Permission
↓
Business Service
↓
Database

Never trust a businessId sent blindly from the browser.

The server should establish the current tenant from authenticated context.

16. User Roles

At minimum:

Platform Owner
Business Owner
Staff

Platform Owner

Manages:

Businesses

Users

Plans

Subscriptions

Platform analytics

AI usage

Voice usage

System health

Support

Audit logs

Platform settings

Business Owner

Manages:

Sales

Inventory

Customers

Khata

Suppliers

Purchases

Expenses

Reports

Business settings

AI/Voice access

Staff

Access depends on assigned permissions.

17. Platform Admin

Platform administration is separate from business management.

/admin

Potential modules:

Businesses
Users
Plans
Subscriptions
Analytics
AI Usage
Voice Usage
System Health
Support
Audit Logs
Settings

Business users should use:

/dashboard

18. Architecture Structure

The project does NOT use a src directory.

The root architecture is:

crm-project-01/
│
├── app/
├── components/
├── features/
├── server/
├── lib/
├── prisma/
├── public/
├── docs/
│
├── .env
├── .env.example
├── .gitignore
├── jsconfig.json
├── package.json
└── postcss.config.mjs

19. Responsibility of Each Layer

app/

Routes, pages, layouts and API entry points.

app/
├── (auth)/
├── (dashboard)/
├── (platform)/
├── api/
├── layout.js
├── page.js
└── globals.css

The app layer should not become a dumping ground for business logic.

components/

Reusable presentation components.

components/
├── ui/
├── layout/
└── shared/

Examples:

Button
Input
Dialog
Table
Card
PageHeader
SearchBar
StatCard
EmptyState

features/

Feature-specific frontend/client logic.

features/
├── sales/
├── inventory/
├── customers/
├── suppliers/
├── purchases/
├── expenses/
├── reports/
├── billing/
├── ai/
└── voice/

server/

Server-side business services.

Examples:

server/sales/
server/inventory/
server/customers/
server/suppliers/
server/purchases/
server/expenses/
server/reports/

The same services can be used by:

UI

AI

Voice

Automation

lib/

Shared infrastructure.

lib/
├── db/
├── auth/
├── tenant/
├── validation/
├── ai/
├── voice/
├── permissions/
├── logging/
└── utils/

20. Database Philosophy

Initial technology direction:

Next.js
↓
Server Layer
↓
Prisma
↓
PostgreSQL

The database should be relational because SAI contains strongly related business data:

Business
Users
Products
Customers
Suppliers
Sales
Sale Items
Purchases
Payments
Khata Transactions
Expenses
Stock Movements
Subscriptions

Offline storage is a separate client-side synchronization layer and does not replace the central PostgreSQL database.

21. Design System

SAI uses a centralized visual theme.

The goal is to avoid hard-coded visual decisions scattered across components.

The central theme should control:

Brand colors

Backgrounds

Surfaces

Text

Borders

Accent colors

Typography

Radius

Shadows

Transitions

Primary theme configuration belongs in the global styling system.

Components should consume the theme rather than defining their own independent color systems.

22. Development Philosophy

Do not build the entire application at once.

Use:

Plan
↓
Design
↓
Build
↓
Test
↓
Review
↓
Improve
↓
Next Feature

Prefer vertical slices.

Example:

Quick Sale
↓
UI
↓
Validation
↓
Server Service
↓
Database
↓
Offline Support
↓
Testing

A feature is not considered complete merely because its UI exists.

23. Official Development Phases

Phase 01 — Foundation

Next.js

JavaScript

App Router

Project structure

Environment configuration

Git

Documentation

Phase 02 — SAI Design System

Global theme

Typography

Spacing

Reusable UI

Layout system

Responsive rules

Phase 03 — Database + Multi-Tenancy

ERD

Prisma schema

PostgreSQL

Business/Tenant model

Core relationships

Phase 04 — Authentication + Permissions

Authentication

Sessions

Roles

Permissions

Tenant guards

Phase 05 — Offline-First Foundation

Local database

IndexedDB abstraction

Sync queue

Online/offline detection

Retry

Idempotency

Conflict strategy

Recovery

Phase 06 — Quick Sale

Product search

Customer selection

Sale items

Cash/Credit

Payment

Stock deduction

Khata

Profit

Receipt

Offline sale

Phase 07 — Core Business Modules

Inventory

Import/Export

Customers

Khata

Suppliers

Purchases

Expenses

Phase 08 — Dashboard + Reports

Sales

Profit

Receivables

Payables

Stock

Expenses

Business reports

Phase 09 — AI Chat

AI provider

Tool system

Intent handling

Permissions

Read operations

Controlled write operations

Confirmation system

Phase 10 — Voice

Speech-to-text

Voice interface

AI interpretation

Tool execution

Offline-aware behavior

Phase 11 — Automation

n8n integration

Notifications

Reminders

Scheduled reports

Low-stock automation

Phase 12 — SaaS Platform

Plans

Subscriptions

Usage limits

Billing

Platform Admin

Business management

AI/Voice usage

Phase 13 — Production

Security

Tenant isolation testing

Business logic testing

AI tool testing

Offline/sync testing

Error monitoring

Performance

Deployment

Backups

Production hardening

24. What SAI Should Feel Like

A successful SAI experience should feel like:

Open SAI
↓
Immediately understand today's situation
↓
Quickly perform the required action
↓
No unnecessary forms
↓
No unnecessary navigation
↓
No fear of losing work
↓
Works even when internet disappears
↓
AI/Voice available when useful
↓
System quietly handles the complexity

25. The Ultimate SAI Principle

The user should never need to understand how SAI works internally.

They should simply be able to run their business.

SAI should handle the complexity of:

Databases

Synchronization

Permissions

APIs

AI

Voice

Automation

Multi-tenancy

Reporting

while presenting the user with a simple, reliable and natural experience.

26. Non-Negotiable Rules

Before implementing a major feature, ask:

Does this make the user's work easier?

Can we reduce the number of clicks?

Can we reduce required data entry?

Does it work well on mobile?

What happens when the internet is unavailable?

Can the component be reused?

Is business logic separated from UI?

Can AI and voice use the same business service?

Does the operation respect tenant isolation?

Does the operation respect permissions?

Can the user understand the result immediately?

Are we adding complexity without real user value?

If the answer to these questions is not satisfactory, redesign the feature before implementing it.

Final SAI Definition

SAI is a simple, adaptive, intelligent and reliable business management SaaS platform that allows business owners to manage their daily operations through a minimal interface, AI, voice and automation, while continuing to work safely during network interruptions and synchronizing data when connectivity returns.

Simple for the user.
Structured for the developer.
Reusable by default.
AI-ready.
Voice-ready.
Offline-ready.
Secure.
Scalable.
Calm.
