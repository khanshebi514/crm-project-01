"use client";

import { useEffect, useState } from "react";

export default function CategorySelect({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");

        const data = await response.json();

        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("CATEGORY LOAD ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
      w-full
      rounded-md
      border
      px-3
      py-2
      "
    >
      <option value="">
        {loading ? "Loading categories..." : "Select Category"}
      </option>

      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
