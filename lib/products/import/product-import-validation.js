export function validateImportedProduct(product) {
  const errors = [];

  if (!product.name) {
    errors.push("Product name is required");
  }

  if (!product.category) {
    errors.push("Category is required");
  }

  if (!product.unit) {
    errors.push("Unit is required");
  }

  if (product.salePrice === null || product.salePrice === undefined) {
    errors.push("Sale price is required");
  }

  if (product.purchasePrice !== null && product.purchasePrice < 0) {
    errors.push("Invalid purchase price");
  }

  return errors;
}
