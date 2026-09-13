"use client";

export default function CustomerLedger({ ledger = [] }) {
  return (
    <section
      className="
      rounded-xl
      border
      border-border
      bg-surface
      p-6
      "
    >
      <h2 className="text-lg font-semibold">Customer Ledger</h2>

      {ledger.length === 0 ? (
        <p
          className="
          mt-4
          text-sm
          text-text-secondary
          "
        >
          No transactions available.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {ledger.map((entry) => (
            <div
              key={entry.id}
              className="
              rounded-lg
              border
              border-border
              p-4
              "
            >
              <div
                className="
                flex
                justify-between
                "
              >
                <div>
                  <p className="font-medium">
                    {entry.type === "SALE" ? "Sale" : "Payment Received"}
                  </p>

                  <p
                    className="
                    text-sm
                    text-text-secondary
                    "
                  >
                    {entry.description}
                  </p>

                  <p
                    className="
                    text-xs
                    text-text-secondary
                    mt-1
                    "
                  >
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className="
                  text-right
                  "
                >
                  <p
                    className={
                      entry.type === "SALE"
                        ? "font-semibold text-red-600"
                        : "font-semibold text-green-600"
                    }
                  >
                    {entry.type === "SALE" ? "+" : "-"}
                    Rs {entry.amount.toFixed(2)}
                  </p>

                  <p
                    className="
                    text-sm
                    text-text-secondary
                    "
                  >
                    Balance: Rs {entry.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
