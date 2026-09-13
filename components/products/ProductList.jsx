import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (!products.length) {
    return (
      <div
        className="
        rounded-xl
        border
        p-6
        text-center
        text-text-secondary
        "
      >
        No products found
      </div>
    );
  }

  return (
    <div
      className="
      grid
      gap-4
      md:grid-cols-2
      lg:grid-cols-3
      "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
