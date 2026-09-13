"use client";

import { useEffect, useState } from "react";

export default function UnitSelect({ value, onChange }) {
  const [units, setUnits] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUnits() {
      try {
        const response = await fetch("/api/units");

        const data = await response.json();

        if (data.success) {
          setUnits(data.units);
        }
      } catch (error) {
        console.error("UNIT LOAD ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    loadUnits();
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
      <option value="">{loading ? "Loading units..." : "Select Unit"}</option>

      {units.map((unit) => (
        <option key={unit.id} value={unit.id}>
          {unit.name} ({unit.shortCode})
        </option>
      ))}
    </select>
  );
}
