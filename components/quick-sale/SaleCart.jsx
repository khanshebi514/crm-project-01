"use client";

export default function SaleCart({ cart = [], onUpdateQuantity, onRemove }) {
  const total = cart.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0,
  );

  return (
    <section>
      <h3
        className="
        text-sm
        font-semibold
        text-text-primary
      "
      >
        Cart
      </h3>

      <div
        className="
          mt-4
          max-h-[400px]
          space-y-3
          overflow-y-auto
          pr-2
        "
      >
        {cart.length === 0 && (
          <div
            className="
              rounded-lg
              border
              border-border
              bg-surface-secondary
              p-4
              text-sm
              text-text-secondary
            "
          >
            No products added yet.
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
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
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                  font-medium
                  text-text-primary
                "
                >
                  {item.name}
                </p>

                <p
                  className="
                  text-sm
                  text-text-secondary
                "
                >
                  Rs {item.salePrice}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="
                  text-sm
                  text-danger
                "
              >
                Remove
              </button>
            </div>

            <div
              className="
                mt-4
                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                flex
                items-center
                gap-3
              "
              >
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="
                    size-8
                    rounded-md
                    border
                    border-border
                  "
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="
                    size-8
                    rounded-md
                    border
                    border-border
                  "
                >
                  +
                </button>
              </div>

              <p
                className="
                font-semibold
                text-text-primary
              "
              >
                Rs {item.salePrice * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          mt-5
          flex
          justify-between
          border-t
          border-border
          pt-4
        "
      >
        <span
          className="
          font-medium
          text-text-primary
        "
        >
          Total
        </span>

        <span
          className="
          font-bold
          text-text-primary
        "
        >
          Rs {total}
        </span>
      </div>
    </section>
  );
}
