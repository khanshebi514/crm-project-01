export default function CustomerPaymentHistory({ payments = [] }) {
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
      <h2 className="font-semibold">Payment History</h2>

      {payments.length === 0 ? (
        <p
          className="
          mt-4
          text-sm
          text-text-secondary
          "
        >
          No payments recorded yet.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="
              flex
              items-center
              justify-between
              rounded-lg
              border
              border-border
              p-4
              "
            >
              <div>
                <p className="font-medium">{payment.method}</p>

                <p
                  className="
                  text-sm
                  text-text-secondary
                  "
                >
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString()
                    : new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div
                className="
                font-semibold
                "
              >
                Rs {Number(payment.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
