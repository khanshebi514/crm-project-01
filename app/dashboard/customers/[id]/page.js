import { getCustomerLedgerServer } from "@/lib/customers/customer-ledger-query";

import CustomerProfile from "@/components/customers/CustomerProfile";

export default async function CustomerPage({ params }) {
  const { id } = await params;

  const data = await getCustomerLedgerServer(id);
  console.log("Customer data:", data);

  return (
    <div className="p-6">
      <CustomerProfile customer={data.customer} ledger={data.ledger} />
    </div>
  );
}
