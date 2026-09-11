"use client";

import { useEffect, useState } from "react";

import { searchCustomers } from "@/lib/customers/customer-search-client";

export default function CustomerSelector({ value, onChange }) {
  const [search, setSearch] = useState("");

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setCustomers([]);

      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const result = await searchCustomers(search);

        setCustomers(result || []);
      } catch (error) {
        console.error("CUSTOMER SEARCH FAILED", error);

        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  function handleSelect(customer) {
    onChange(customer);

    setSearch(customer.name);

    setCustomers([]);
  }

  return (
    <div className="space-y-3">
      <label
        className="
        text-sm
        font-medium
        text-text-secondary
        "
      >
        Customer
      </label>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search customer by name or phone..."
        className="
        w-full
        rounded-md
        border
        border-input-border
        px-3
        py-2
        text-sm
        "
      />

      {loading && <p className="text-sm text-text-secondary">Searching...</p>}

      {customers.length > 0 && (
        <div
          className="
            flex
            gap-3
            overflow-x-auto
            pb-3
            "
        >
          {customers.map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() => handleSelect(customer)}
              className="
                  min-w-[240px]
                  rounded-lg
                  border
                  border-border
                  bg-surface
                  p-4
                  text-left
                  hover:border-primary
                  "
            >
              <div className="font-semibold">{customer.name}</div>

              <div
                className="
                    mt-1
                    text-sm
                    text-text-secondary
                    "
              >
                {customer.phone || "No phone"}
              </div>

              <div
                className="
                    mt-3
                    text-sm
                    font-medium
                    "
              >
                Khata: Rs {Number(customer.openingBalance || 0).toFixed(2)}
              </div>
            </button>
          ))}
        </div>
      )}

      {value && (
        <div
          className="
            rounded-md
            bg-surface-muted
            p-3
            text-sm
            "
        >
          Selected Customer: <span className="font-semibold">{value.name}</span>
        </div>
      )}
    </div>
  );
}
