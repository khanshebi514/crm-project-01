# SAI Dashboard V2 Design

## 1. Vision

The SAI Dashboard is not designed as a traditional CRM reporting page.

Most CRM and ERP systems overload users with:

- Multiple charts
- Large tables
- Complex reports
- Too many actions

SAI follows a different philosophy:

> The dashboard is the business command center.

A shop owner should understand the current business situation within seconds and perform daily tasks without navigating through multiple screens.

---

# 2. SAI Dashboard Philosophy

The dashboard answers five important business questions:

## 1. How much did I sell today?

Business owner needs immediate sales visibility.

Example:

Today's Sales

Rs 45,000

---

## 2. How much profit did I make?

Sales alone does not show business health.

Example:

Today's Profit

Rs 8,500

---

## 3. How much money did I receive?

The owner needs cash visibility.

Example:

Received

Rs 30,000

---

## 4. How much money is pending?

Many businesses operate on credit.

Example:

Customer Due

Rs 15,000

---

## 5. What needs my attention?

SAI should guide the owner.

Example:

Attention Required

Customers with pending payments
Low stock products
Pending supplier payments

---

# 3. Dashboard Structure

The dashboard contains four major sections.

---

# Section 1 — Business Overview

Purpose:

Provide a quick snapshot of today's business.

Current design:

+----------------+ +----------------+
| Sales | | Customers |
| Today's Sales | | Total Customers|
+----------------+ +----------------+

+----------------+ +----------------+
| Products | | Stock |
| Inventory | | Available |
+----------------+ +----------------+

will be replaced with:

+----------------+ +----------------+
| Sales | | Profit |
| Today's Sales | | Today's Profit |
+----------------+ +----------------+

+----------------+ +----------------+
| Received | | Due Amount |
| Money Collected| | Pending Money |
+----------------+ +----------------+

Reason:

These metrics represent business decisions, not stored data.

---

# Section 2 — Quick Actions

## Purpose

Quick Actions represent the most common daily operations.

The user should not search through modules.

Instead:

Dashboard
↓
Quick Action
↓
Complete Task

---

## Quick Actions

### Quick Sale

Purpose:

Create a sale within seconds.

Flow:

Open Quick Sale

↓

Select Product

↓

Adjust Quantity

↓

Choose Payment

↓

Complete Sale

↓

Print / Share Receipt

---

### Receive Payment

Purpose:

Record customer payment.

Example:

Customer clears previous balance.

Flow:

Select Customer

↓

Enter Amount

↓

Update Balance

---

### Add Customer

Purpose:

Quickly save a customer.

Required:

Name
Phone
Opening Balance(optional)

---

### Add Product

Purpose:

Quickly add a new product.

Required:

Product Name
Sale Price
Purchase Price
Stock

---

# Section 3 — Business Alerts

## Purpose

SAI should not only display information.

SAI should help users make decisions.

Example:

Needs Attention

⚠ 10 customers have pending payments

⚠ 5 products are low in stock

⚠ Supplier payment due tomorrow

---

# Section 4 — Recent Activity

Purpose:

Give confidence about recent business operations.

Example:

Recent Activity

Sale #1024
Customer: Ali Store
Amount: Rs 2500

Stock Added
Product: Sugar
Quantity: 100

Payment Received
Customer: Ahmed
Amount: Rs 5000

---

# 4. Quick Sale Philosophy

Quick Sale is the main daily operation of SAI.

It should NOT be a complicated sales page.

Traditional approach:

Sales Module

↓

Create Sale

↓

Customer

↓

Products

↓

Payment

↓

Invoice

SAI approach:

Dashboard

↓

Quick Sale

↓

Products

↓

Payment

↓

Receipt

Minimum clicks.

---

# 5. Sales Module vs Quick Sale

## Quick Sale

Purpose:

Daily fast transactions.

Used by:

- Shop owner
- Cashier
- Sales staff

Features:

- Product selection
- Cart
- Payment
- Receipt

---

## Sales Module

Purpose:

Historical record management.

Features:

- Previous sales
- Search
- Filters
- Sale details
- Returns
- Reports

---

# 6. Payment Philosophy

SAI supports real business payment behavior.

Payment types:

## Paid

Customer pays immediately.

Total: 5000

Paid: 5000

Due: 0

---

## Khata / Credit

Customer pays later.

Total: 5000

Paid: 0

Due: 5000

---

## Partial Payment

Customer pays some amount.

Total: 5000

Paid: 2000

Due: 3000

---

# 7. Design Rules

SAI Dashboard must avoid:

❌ Too many charts

❌ Complex tables

❌ Unnecessary statistics

❌ Accounting complexity

❌ Long workflows

---

SAI should prioritize:

✅ Speed

✅ Simplicity

✅ Clear actions

✅ Business awareness

✅ Mobile-friendly experience

---

# 8. Future Expansion

Future dashboard improvements:

- AI business suggestions
- Sales comparison
- Best-selling products
- Expense insights
- Customer behavior insights

These should be added without increasing complexity.

---

# Final Principle

SAI is not built to show more information.

SAI is built to help business owners do more with less effort.

> Less clicking. Less confusion. More business.
