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
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/sales/${id}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch sale");
  }

  return data.sale;
}
