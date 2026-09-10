import Link from "next/link";

function money(value) {
  return Number(value ?? 0).toFixed(2);
}

function statusLabel(status) {
  if (status === "COMPLETED") {
    return "Paid";
  }

  if (status === "PARTIALLY_PAID") {
    return "Partial";
  }

  if (status === "UNPAID") {
    return "Khata";
  }

  return status;
}

function statusClasses(status) {
  if (status === "COMPLETED") {
    return "bg-success-background text-success";
  }

  if (status === "PARTIALLY_PAID") {
    return "bg-warning-background text-warning";
  }

  if (status === "UNPAID") {
    return "bg-danger-background text-danger";
  }

  return "bg-surface-muted text-text-secondary";
}

export default function SalesHistory({ sales = [] }) {
  if (!sales.length) {
    return (
      <div
        className="
          rounded-lg
          border
          border-border
          bg-surface
          px-5
          py-10
          text-center
        "
      >
        <p className="font-medium text-text-primary">No sales yet</p>

        <p className="mt-1 text-sm text-text-secondary">
          Your completed sales will appear here.
        </p>

        <Link
          href="/dashboard/sales/new"
          className="
            mt-5
            inline-flex
            rounded-md
            bg-primary
            px-4
            py-2
            text-sm
            font-medium
            text-primary-foreground
            hover:bg-primary-hover
          "
        >
          Create First Sale
        </Link>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-lg
        border
        border-border
        bg-surface
      "
    >
      {sales.map((sale, index) => (
        <div
          key={sale.id}
          className={`
            flex
            flex-col
            gap-3
            px-4
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between

            ${index !== sales.length - 1 ? "border-b border-border" : ""}
          `}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/dashboard/sales/${sale.id}/receipt`}
                className="
                  font-medium
                  text-text-primary
                  hover:text-primary
                "
              >
                {sale.saleNumber}
              </Link>

              <span
                className={`
                  rounded-full
                  px-2
                  py-0.5
                  text-xs
                  font-medium
                  ${statusClasses(sale.status)}
                `}
              >
                {statusLabel(sale.status)}
              </span>
            </div>

            <div
              className="
                mt-1
                flex
                flex-wrap
                gap-x-4
                gap-y-1
                text-sm
                text-text-secondary
              "
            >
              <span>{sale.customer?.name || "Walk-in Customer"}</span>

              <span>{sale._count?.items ?? 0} items</span>

              <span>{new Date(sale.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              justify-between
              gap-5
              sm:justify-end
            "
          >
            <div className="text-right">
              <p className="font-semibold text-text-primary">
                Rs {money(sale.total)}
              </p>

              {Number(sale.dueAmount) > 0 && (
                <p className="text-xs text-warning">
                  Due Rs {money(sale.dueAmount)}
                </p>
              )}
            </div>

            <Link
              href={`/dashboard/sales/${sale.id}/receipt`}
              className="
                rounded-md
                border
                border-border
                px-3
                py-2
                text-sm
                font-medium
                text-text-secondary
                transition
                hover:border-primary
                hover:text-primary
              "
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
