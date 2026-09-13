export default function ProductCard({ product }) {
  return (
    <div
      className="
      rounded-xl
      border
      border-border
      bg-surface
      p-5
      "
    >
      <h3 className="font-semibold">{product.name}</h3>

      {product.category && (
        <p
          className="
            text-sm
            text-text-secondary
            "
        >
          {product.category.name}
        </p>
      )}

      <div className="mt-4 space-y-2">
        <Row label="Sale Price" value={`Rs ${product.salePrice}`} />

        {product.purchasePrice && (
          <Row label="Purchase Price" value={`Rs ${product.purchasePrice}`} />
        )}

        {product.sku && <Row label="SKU" value={product.sku} />}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div
      className="
      flex
      justify-between
      "
    >
      <span
        className="
        text-sm
        text-text-secondary
        "
      >
        {label}
      </span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
