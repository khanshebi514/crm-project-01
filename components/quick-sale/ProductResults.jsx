"use client";

export default function ProductResults({ products = [], onAdd, search }) {
  if (!search || !products.length) return null;

  return (
    <div
      className="
mt-3
flex
gap-2
overflow-x-auto
pb-2
"
    >
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onAdd(product)}
          className="
min-w-[150px]
rounded-md
border
border-border
px-3
py-2
text-left
hover:border-primary
"
        >
          <p
            className="
text-sm
font-medium
"
          >
            {product.name}
          </p>

          <p
            className="
text-xs
text-text-secondary
"
          >
            Rs {product.salePrice}
          </p>
        </button>
      ))}
    </div>
  );
}
