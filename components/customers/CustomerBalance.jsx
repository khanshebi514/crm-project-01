export default function CustomerBalance({ customer }) {
  const summary = customer.financialSummary || {};

  return (
    <div
      className="
      rounded-xl
      border
      border-border
      bg-surface
      p-6
      "
    >
      <h2 className="font-semibold">Financial Summary</h2>

      <div className="mt-5 space-y-4">
        <Row label="Previous Khata" value={summary.previousKhata} />

        <Row label="Total Sales" value={summary.totalSales} />

        <Row label="Total Paid" value={summary.totalPaid} />

        <div className="border-t pt-4">
          <Row label="Net Khata" value={summary.netKhata} bold />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-text-secondary">{label}</span>

      <span className={bold ? "font-bold text-xl" : "font-medium"}>
        Rs {Number(value || 0).toFixed(2)}
      </span>
    </div>
  );
}
