export function validateProductInput({
  name,
  purchasePrice = null,
  salePrice,
  minimumStock = null,
}) {
  if (!name || !name.trim()) {
    throw new Error("Product name is required");
  }

  if (name.trim().length < 2) {
    throw new Error("Product name must be at least 2 characters");
  }

  if (
    purchasePrice !== null &&
    purchasePrice !== "" &&
    Number(purchasePrice) < 0
  ) {
    throw new Error("Purchase price cannot be negative");
  }

  if (salePrice === undefined || salePrice === null || salePrice === "") {
    throw new Error("Sale price is required");
  }

  if (Number(salePrice) < 0) {
    throw new Error("Sale price cannot be negative");
  }

  if (
    minimumStock !== null &&
    minimumStock !== "" &&
    Number(minimumStock) < 0
  ) {
    throw new Error("Minimum stock cannot be negative");
  }

  return true;
}
