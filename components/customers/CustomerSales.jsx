export default function CustomerSales({ sales = [] }) {
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
      <h2 className="font-semibold">Sales History</h2>

      <div className="mt-4 space-y-3">
        {sales.length === 0 ? (
          <p className="text-sm text-text-secondary">No sales found</p>
        ) : (
          sales.map((sale) => (
            <div
              key={sale.id}
              className="
flex
justify-between
border-b
border-border
pb-3
"
            >
              <div>
                <p className="font-medium">{sale.saleNumber}</p>

                <p className="text-sm text-text-secondary">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="font-semibold">
                Rs {Number(sale.total).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
