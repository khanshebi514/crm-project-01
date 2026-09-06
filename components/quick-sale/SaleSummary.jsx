export default function SaleSummary({
  subtotal = 0,
  paymentType = "PAID",
  receivedAmount = 0,
  remainingAmount = 0,
  onComplete,
}) {
  return (
    <section>
      <h3
        className="
          text-sm
          font-medium
          text-text-secondary
        "
      >
        Summary
      </h3>

      <div
        className="
          mt-3
          rounded-lg
          border
          border-border
          bg-surface-secondary
          p-4
        "
      >
        <div
          className="
            space-y-3
            text-sm
          "
        >
          <div
            className="
              flex
              justify-between
            "
          >
            <span className="text-text-secondary">Subtotal</span>

            <span className="font-medium text-text-primary">Rs {subtotal}</span>
          </div>

          <div
            className="
              flex
              justify-between
            "
          >
            <span className="text-text-secondary">Payment</span>

            <span className="font-medium text-text-primary">{paymentType}</span>
          </div>

          {paymentType === "PARTIAL" && (
            <div
              className="
                flex
                justify-between
              "
            >
              <span className="text-text-secondary">Remaining</span>

              <span className="font-medium text-text-primary">
                Rs {remainingAmount}
              </span>
            </div>
          )}

          <div
            className="
              border-t
              border-border
              pt-3
              flex
              justify-between
            "
          >
            <span
              className="
              font-semibold
              text-text-primary
            "
            >
              Total
            </span>

            <span
              className="
              text-xl
              font-bold
              text-text-primary
            "
            >
              Rs {subtotal}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="
            mt-5
            w-full
            rounded-md
            bg-primary
            py-2.5
            text-sm
            font-medium
            text-primary-foreground
            hover:bg-primary-hover
          "
        >
          Complete Sale
        </button>
      </div>
    </section>
  );
}
