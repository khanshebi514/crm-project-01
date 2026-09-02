"use client";

import Button from "@/components/ui/Button";

export default function SaleCart({ items = [], onRemove, onQuantityChange }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.productId}
          className="
            flex
            items-center
            justify-between
            rounded-lg
            border
            border-border
            bg-surface
            p-4
          "
        >
          <div>
            <p className="font-medium text-text-primary">{item.name}</p>

            <p className="text-sm text-text-secondary">
              {item.quantity} × {item.unitPrice}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                onQuantityChange(item.productId, item.quantity - 1)
              }
            >
              -
            </Button>

            <span>{item.quantity}</span>

            <Button
              onClick={() =>
                onQuantityChange(item.productId, item.quantity + 1)
              }
            >
              +
            </Button>

            <Button onClick={() => onRemove(item.productId)}>Remove</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
