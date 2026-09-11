import CustomerCard from "./CustomerCard";

export default function CustomerList({ customers = [] }) {
  if (!customers.length) {
    return (
      <div
        className="
        rounded-lg
        border
        border-border
        bg-surface
        p-6
        text-center
        text-text-secondary
        "
      >
        No customers found.
      </div>
    );
  }

  return (
    <div
      className="
      grid
      gap-4
      md:grid-cols-2
      lg:grid-cols-3
      "
    >
      {customers.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
