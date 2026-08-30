SAI Database Design

Architecture

SAI uses a three-layer relational database architecture:

1. SAI Platform Layer

Manages the SaaS platform itself.

User

PlatformAdmin

Plan

Feature

PlanFeature

Subscription

SubscriptionInvoice

SubscriptionPayment

PlatformAudit

2. Tenant / Business Layer

Represents each shop or business using SAI.

Tenant

Membership

BusinessSettings

3. Shop Operations Layer

Stores each tenant's daily business data.

Customer

Supplier

Category

Product

StockMovement

Sale

SaleItem

Payment

Expense

Core Relationships

User
├── PlatformAdmin
└── Membership → Tenant

Plan → Subscription → Tenant

Plan → PlanFeature → Feature

Tenant
├── Memberships
├── Customers
├── Suppliers
├── Products
├── Sales
├── Payments
├── Expenses
└── BusinessSettings

Sale → SaleItem → Product
Product → StockMovement

Database Rules

Every business-owned record must be scoped by tenantId.

Platform roles and tenant roles are separate.

Plans control purchased features and limits.

Membership roles control staff permissions.

SaaS subscription payments are separate from shop payments.

Use offline-friendly UUID/CUID IDs.

Use decimal-safe types for money.

Preserve historical sale prices in SaleItem.

Use stock movements for inventory history.

Use soft delete for important business records.

Keep the database powerful internally while keeping SAI simple for users.

Complex internally. Simple externally.
