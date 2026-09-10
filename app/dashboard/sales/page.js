import Link from "next/link";

import { getSalesServer } from "@/lib/sales/sale-query";

import SalesHistory from "@/components/sales/SalesHistory";

export default async function SalesPage() {
  const sales = await getSalesServer();

  return (
    <div>
      <section
        className="
          mb-6
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <h2 className="sai-page-title">Sales</h2>

          <p className="sai-page-description">
            View previous sales and create new orders.
          </p>
        </div>

        <Link
          href="/dashboard/sales/new"
          className="
            inline-flex
            w-fit
            items-center
            justify-center
            rounded-md
            bg-primary
            px-4
            py-2
            text-sm
            font-medium
            text-primary-foreground
            transition
            hover:bg-primary-hover
          "
        >
          + New Sale
        </Link>
      </section>

      <SalesHistory sales={sales} />
    </div>
  );
}
