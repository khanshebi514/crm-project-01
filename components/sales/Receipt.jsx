function formatMoney(value) {
  return Number(value).toFixed(2);
}
export default function Receipt({ sale }) {
  return (
    <div
      className="
    receipt-container
    mx-auto
    max-w-xl
    rounded-xl
    border
    border-border
    bg-surface
    p-6
    text-text-primary
  "
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">{sale.tenant.name}</h1>

        <p className="mt-1 text-sm text-text-secondary">Sales Receipt</p>

        <p className="mt-2 text-sm text-text-secondary">{sale.saleNumber}</p>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Date</span>

          <span>{new Date(sale.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Customer</span>

          <span>{sale.customer?.name || "Walk-in Customer"}</span>
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <h2 className="font-semibold">Items</h2>

        <div className="mt-3 space-y-2">
          {sale.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.product.name} x {formatMoney(item.quantity)}
              </span>

              <span>Rs {formatMoney(item.lineTotal)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4 space-y-2">
        <SummaryRow
          label="Subtotal"
          value={`Rs ${formatMoney(sale.subtotal)}`}
        />

        <SummaryRow
          label="Discount"
          value={`Rs ${formatMoney(sale.discount)}`}
        />

        <SummaryRow label="Tax" value={`Rs ${formatMoney(sale.tax)}`} />

        <SummaryRow
          label="Total"
          value={`Rs ${formatMoney(sale.total)}`}
          bold
        />

        <SummaryRow label="Paid" value={`Rs ${formatMoney(sale.paidAmount)}`} />

        <SummaryRow
          label="Due"
          value={`Rs ${formatMoney(sale.dueAmount)}`}
          bold
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-text-secondary">{label}</span>

      <span className={bold ? "font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
