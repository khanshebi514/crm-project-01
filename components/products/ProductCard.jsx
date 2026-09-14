import ProductEditModal from "./ProductEditModal";
import ProductDeleteButton from "./ProductDeleteButton";

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
      <div className="flex justify-between">
        <div>
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
        </div>

        <div className="flex gap-2">
          <ProductEditModal product={product} />

          <ProductDeleteButton productId={product.id} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {product.baseUnit && (
          <Row label="Base Unit" value={product.baseUnit.name} />
        )}

        {product.sku && <Row label="SKU" value={product.sku} />}

        {product.productUnits?.length > 0 && (
          <div className="pt-3">
            <p
              className="
              text-sm
              text-text-secondary
              mb-2
              "
            >
              Selling Units
            </p>

            <div className="space-y-2">
              {product.productUnits.map((item) => (
                <div
                  key={item.id}
                  className="
                    rounded-md
                    border
                    p-3
                    "
                >
                  <div className="flex justify-between">
                    <span>{item.unit.name}</span>

                    <span className="font-medium">
                      Rs {Number(item.sellingPrice).toFixed(2)}
                    </span>
                  </div>

                  <p
                    className="
                      text-xs
                      text-text-secondary
                      "
                  >
                    1 {item.unit.name}= {item.conversion}{" "}
                    {product.baseUnit?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p
            className="
                      text-xs
                      text-text-secondary
                      "
          >
            {product.purchasePrice
              ? `Purchase Price: Rs ${Number(product.purchasePrice).toFixed(2)}`
              : "Purchase  Price: N/A"}
          </p>
          <p
            className="
                      text-xs
                      text-text-secondary
                      "
          >
            {product.salePrice
              ? `Sale Price: Rs ${Number(product.salePrice).toFixed(2)}`
              : "Sale Price: N/A"}
          </p>
        </div>
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
