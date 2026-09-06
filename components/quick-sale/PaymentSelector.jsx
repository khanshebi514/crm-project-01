"use client";

export default function PaymentSelector({
  value,
  onChange,
  total = 0,
  receivedAmount = 0,
  setReceivedAmount,
  remainingAmount = 0,
}) {
  const payments = [
    {
      id: "PAID",
      label: "Paid",
    },
    {
      id: "KHATA",
      label: "Khata",
    },
    {
      id: "PARTIAL",
      label: "Partial",
    },
  ];

  return (
    <section>
      <h3
        className="
        text-sm
        font-semibold
        text-text-primary
      "
      >
        Payment
      </h3>

      <div
        className="
          mt-4
          grid
          gap-3
          md:grid-cols-3
        "
      >
        {payments.map((payment) => (
          <button
            key={payment.id}
            type="button"
            onClick={() => onChange(payment.id)}
            className={`
              rounded-lg
              border
              p-4
              transition

              ${
                value === payment.id
                  ? "border-primary bg-info-background"
                  : "border-border"
              }

            `}
          >
            {payment.label}
          </button>
        ))}
      </div>

      {value === "PARTIAL" && (
        <div className="mt-5 space-y-3">
          <div>
            <label
              className="
              text-sm
              text-text-secondary
            "
            >
              Amount Received
            </label>

            <input
              type="number"
              value={receivedAmount}
              placeholder="Enter received amount"
              onChange={(e) => setReceivedAmount(e.target.value)}
              className="
                mt-2
                w-full
                rounded-md
                border
                border-input-border
                px-3
                py-2
              "
            />
          </div>

          <div
            className="
              rounded-lg
              bg-surface-secondary
              p-3
            "
          >
            <p className="text-sm text-text-secondary">Remaining Khata</p>

            <p
              className="
              mt-1
              font-bold
              text-text-primary
            "
            >
              Rs {remainingAmount}
            </p>
          </div>
        </div>
      )}

      {value === "KHATA" && (
        <div className="mt-5 space-y-3">
          <input
            placeholder="Customer name (optional)"
            className="
              w-full
              rounded-md
              border
              border-input-border
              px-3
              py-2
            "
          />

          <input
            placeholder="Phone number (optional)"
            className="
              w-full
              rounded-md
              border
              border-input-border
              px-3
              py-2
            "
          />
        </div>
      )}
    </section>
  );
}
