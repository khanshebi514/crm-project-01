"use client";

import { useEffect, useState } from "react";

import { getCustomers, createCustomer } from "@/lib/customers/customer-client";

import CustomerList from "@/components/customers/CustomerList";
import CustomerForm from "@/components/customers/CustomerForm";
import CustomerSearch from "@/components/customers/CustomerSearch";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  async function loadCustomers() {
    const data = await getCustomers();

    setCustomers(data);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleCreate(data) {
    await createCustomer(data);

    setShowForm(false);

    loadCustomers();
  }

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <section className="sai-page-header">
        <h2 className="sai-page-title">Customers</h2>

        <p className="sai-page-description">
          Manage customers and khata records.
        </p>
      </section>

      <div className="flex justify-between">
        <CustomerSearch value={search} onChange={setSearch} />

        <button
          onClick={() => setShowForm(true)}
          className="
rounded-md
bg-primary
px-4
py-2
text-sm
text-primary-foreground
"
        >
          + Add Customer
        </button>
      </div>

      {showForm && (
        <CustomerForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <CustomerList customers={filteredCustomers} />
    </div>
  );
}
