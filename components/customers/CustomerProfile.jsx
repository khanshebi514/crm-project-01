import CustomerBalance from "./CustomerBalance";
import CustomerSales from "./CustomerSales";

export default function CustomerProfile({ customer }) {
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

      <CustomerSales sales={customer.sales} />
    </div>
  );
}
