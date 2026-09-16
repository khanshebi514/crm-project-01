import * as XLSX from "xlsx";

function normalizeKey(key) {
  return String(key).toLowerCase().trim().replace(/\s+/g, " ");
}

export function parseProductFile(buffer) {
  const workbook = XLSX.read(buffer, {
    type: "buffer",
  });

  const sheetName = workbook.SheetNames[0];

  const sheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
  });

  return rows.map((row) => {
    const data = {};

    Object.keys(row).forEach((key) => {
      data[normalizeKey(key)] = row[key];
    });

    return {
      name: data["name"]?.toString().trim() || "",

      sku: data["sku"]?.toString().trim() || null,

      barcode: data["barcode"]?.toString().trim() || null,

      category: data["category"]?.toString().trim() || null,

      unit: data["unit"]?.toString().trim() || null,

      purchasePrice:
        data["purchase price"] !== "" ? Number(data["purchase price"]) : null,

      salePrice: data["sale price"] !== "" ? Number(data["sale price"]) : null,

      minimumStock:
        data["minimum stock"] !== "" ? Number(data["minimum stock"]) : null,
    };
  });
}
