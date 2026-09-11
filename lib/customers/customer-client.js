export async function createCustomer(payload) {
  const response = await fetch("/api/customers", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to create customer");
  }

  return data.customer;
}

export async function getCustomers() {
  const response = await fetch("/api/customers");

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch customers");
  }

  return data.customers;
}

export async function getCustomerById(id) {
  const response = await fetch(`/api/customers/${id}`);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch customer");
  }

  return data.customer;
}

export async function updateCustomer(id, payload) {
  const response = await fetch(`/api/customers/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update customer");
  }

  return data.customer;
}

export async function deleteCustomer(id) {
  const response = await fetch(`/api/customers/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to delete customer");
  }

  return true;
}
