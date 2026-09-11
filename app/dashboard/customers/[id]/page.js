import { getCustomerByIdServer } from "@/lib/customers/customer-query";

import CustomerProfile from "@/components/customers/CustomerProfile";

export default async function CustomerPage({ params }) {
  const { id } = await params;

  const customer = await getCustomerByIdServer(id);

  return (
    <div className="p-6">
      <CustomerProfile customer={customer} />
    </div>
  );
}
