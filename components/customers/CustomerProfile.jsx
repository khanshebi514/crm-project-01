import CustomerBalance from "./CustomerBalance";
import CustomerSales from "./CustomerSales";
import CustomerLedger from "./ledger/CustomerLedger";

import CustomerPaymentButton from "./payments/CustomerPaymentButton";
import CustomerPaymentHistory from "./payments/CustomerPaymentHistory";

export default function CustomerProfile({ customer, ledger }) {
  return (
    <div className="space-y-6">
      <section
        className="
        rounded-xl
        border
        border-border
        bg-surface
        p-6
        "
      >
        <h1 className="text-2xl font-bold">{customer.name}</h1>

        <p className="mt-2 text-sm text-text-secondary">
          {customer.phone || "No phone"}
        </p>

        {customer.email && (
          <p className="text-sm text-text-secondary">{customer.email}</p>
        )}
      </section>

      <CustomerBalance customer={customer} />

      <CustomerPaymentButton customerId={customer.id} />

      <CustomerSales sales={customer.sales} />

      <CustomerPaymentHistory payments={customer.payments} />
      <CustomerLedger ledger={ledger} />
    </div>
  );
}
 