"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ProductSearch({ products = [], onAddProduct }) {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="space-y-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
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
              <p
                className="
                font-medium
                text-text-primary
              "
              >
                {product.name}
              </p>

              <p
                className="
                text-sm
                text-text-secondary
              "
              >
                {product.salePrice}
              </p>
            </div>

            <Button onClick={() => onAddProduct(product)}>Add</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
