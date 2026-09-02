export async function createSale(payload) {
  const response = await fetch("/api/sales", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to create sale");
  }

  return data.sale;
}

export async function getSales() {
  const response = await fetch("/api/sales");

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch sales");
  }

  return data.sales;
}

export async function getSaleById(id) {
  const response = await fetch(`/api/sales/${id}`);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch sale");
  }

  return data.sale;
}
