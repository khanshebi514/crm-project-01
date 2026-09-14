export function validateProductInput({
  name,

  productUnits = [],
}) {
  if (!name || !name.trim()) {
    throw new Error("Product name is required");
  }

  if (!productUnits || productUnits.length === 0) {
    throw new Error("At least one selling unit is required");
  }

  for (const item of productUnits) {
    if (!item.unitId) {
      throw new Error("Unit is required");
    }

    if (
      item.conversion === undefined ||
      item.conversion === "" ||
      Number(item.conversion) <= 0
    ) {
      throw new Error("Invalid unit conversion");
    }

    if (
      item.sellingPrice === undefined ||
      item.sellingPrice === "" ||
      Number(item.sellingPrice) < 0
    ) {
      throw new Error("Selling price is required");
    }
  }

  return true;
}
