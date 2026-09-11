export async function searchCustomers(query) {
  const response = await fetch(`/api/customers/search?q=${query}`);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Customer search failed");
  }

  return data.customers;
}
