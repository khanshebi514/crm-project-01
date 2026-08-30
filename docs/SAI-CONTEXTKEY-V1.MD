PROJECT:
name: SAI
type: Multi-Tenant SaaS CRM Platform
stack:
frontend: Next.js 16.3.1 App Router
runtime: Node.js
database: PostgreSQL
orm: Prisma 7.10.0
adapter: PrismaPg
styling: TailwindCSS
auth:
password: Argon2
session: database-backed hashed token sessions

ARCHITECTURE_PRINCIPLE:

core: - Multi tenant SaaS - Server first security - Role based authorization - Permission driven access - Modular business domains

DESIGN_SYSTEM:

theme:
background: "#ffffff"
primary: "#2563eb"
primary_hover: "#1d4ed8"
secondary: "#64748b"
accent: "#0ea5e9"
success: "#16a34a"
danger: "#dc2626"

typography:
font: Arial
scale: Tailwind standard

rules: - Always use existing SAI tokens - Do not create random colors - Keep UI professional SaaS style - Reuse components

DATABASE_ARCHITECTURE:

core_models:

    User:
      purpose: Global identity

    Tenant:
      purpose: Business/company isolation

    Membership:
      purpose: User belongs to tenant

      important:
        role belongs here
        NOT on User


    MembershipRole:
      values:
        - OWNER
        - MANAGER
        - CASHIER
        - STAFF


    AuthSession:
      purpose:
        database session management


    Subscription:
      purpose:
        tenant subscription

SECURITY_FLOW:

request:

    1:
      Authentication:
        verify user identity

    2:
      Session:
        validate active session

    3:
      Tenant:
        resolve business context

    4:
      Membership:
        verify user belongs to tenant

    5:
      Permission:
        check allowed action

AUTH_SYSTEM:

completed:

    registration:
      creates:
        - User
        - Tenant
        - OWNER Membership
        - BusinessSettings
        - Trial Subscription


    login:
      flow:
        - verify Argon2 password
        - create AuthSession
        - return session token


    logout:
      flow:
        - revoke session
        - blocked token rejected

SESSION_RULES:

file:
lib/auth/session.js

exports:

    createSession()

    getSessionByToken()

    revokeSession()

rules:

    - token stored hashed
    - never store plain token
    - session expiry exists

TENANT_SECURITY:

completed:

    tenant_isolation:
      verified:

        - user cannot access other tenant
        - tenant spoofing blocked
        - cross tenant relation rejected

AUTHORIZATION:

database:

    Permission:
      fields:
        - key
        - description


    RolePermission:
      mapping:

        Role -> Permission

engine:

    file:
      lib/auth/permissions.js


    functions:

      getUserPermissions()

      can()

      requirePermission()

ROLE_BEHAVIOR:

OWNER:

    access:
      full tenant control

MANAGER:

    access:
      business operations

CASHIER:

    allowed:
      - sale.create
      - sale.view
      - customer.view


    blocked:
      - product.delete

STAFF:

    limited:
      - product.view
      - customer.view

COMPLETED_PHASES:

PHASE_1:
status: COMPLETE

PHASE_2:
status: COMPLETE
contains: - SAI Design System

PHASE_3:
status: COMPLETE

contains:

    - Prisma schema
    - Tenant isolation
    - Database relations

PHASE_4:
status: COMPLETE

contains:

    4.01:
      Authentication architecture

    4.02:
      Auth folder structure

    4.03:
      Auth database

    4.04:
      Login/register/session engine

    4.05:
      Admin and user routing

    4.06:
      Application shell

    4.07:
      RBAC + Permissions

    4.08:
      Final security validation

TEST_RESULTS:

tenant_test:
status: PASS

authentication_test:
status: PASS

auth_flow_test:
status: PASS

permission_test:
status: PASS

final_security_test:
status: PASS

IMPORTANT_RULES:

- Never overwrite working Prisma schema blindly

- Prisma relation syntax:

  correct:
  user User @relation(fields:[userId],references:[id],onDelete:Restrict,onUpdate:Cascade)

- Do not create duplicate files unnecessarily

- Prefer complete files instead of many tiny changes

- Check existing architecture before adding code

- Keep server side security first

- Do not trust frontend permissions only

CURRENT_STATE:

Phase:
4_COMPLETE

Next:

    Phase_5:
      Business Modules Development

NEXT_RECOMMENDED:

Phase_5.01:
Dashboard Architecture

Then:

    - Business Profile
    - User Management
    - Products
    - Categories
    - Inventory
    - Sales/POS
    - Reports
