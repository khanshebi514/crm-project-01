import { getSaleByIdServer } from "@/lib/sales/sale-query";

import Receipt from "@/components/sales/Receipt";
import ReceiptActions from "@/components/sales/ReceiptActions";

export default async function ReceiptPage({ params }) {
  const { id } = await params;

  const sale = await getSaleByIdServer(id);

  return (
    <div className="p-6">
      <Receipt sale={sale} />

      <ReceiptActions />
    </div>
  );
}
