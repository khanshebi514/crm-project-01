import * as XLSX from "xlsx";

export function generateProductExcel(products) {
  const data = products.map((product) => ({
    Name: product.name,

    SKU: product.sku || "",

    Barcode: product.barcode || "",

    Category: product.category?.name || "",

    Unit: product.baseUnit?.name || "",

    "Purchase Price":
      product.purchasePrice !== null && product.purchasePrice !== undefined
        ? Number(product.purchasePrice)
        : "",

    "Sale Price":
      product.salePrice !== null && product.salePrice !== undefined
        ? Number(product.salePrice)
        : "",

    "Minimum Stock":
      product.minimumStock !== null && product.minimumStock !== undefined
        ? Number(product.minimumStock)
        : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  return XLSX.write(workbook, {
    type: "buffer",

    bookType: "xlsx",
  });
}
