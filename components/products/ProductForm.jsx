"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/context/ToastProvider";

import CategorySelect from "./CategorySelect";
import UnitSelect from "./UnitSelect";
import ProductUnitManager from "./ProductUnitManager";

export default function ProductForm() {
  const router = useRouter();

  const toast = useToast();

  const [saving, setSaving] = useState(false);

  const [productUnits, setProductUnits] = useState([]);

  const [form, setForm] = useState({
    name: "",

    sku: "",

    barcode: "",

    categoryId: "",

    baseUnitId: "",

    minimumStock: "",
    buyPrice: "",
    salePrice: "",

    trackStock: true,
  });

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,

      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch("/api/products", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,

          productUnits,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Product created successfully");

      setForm({
        name: "",
        sku: "",
        barcode: "",
        categoryId: "",
        baseUnitId: "",
        buyPrice: "",
        salePrice: "",
        minimumStock: "",
        trackStock: true,
      });

      setProductUnits([]);

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to create product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
rounded-xl
border
border-border
bg-surface
p-6
space-y-5
"
    >
      <h2 className="font-semibold">Add Product</h2>

      <input
        placeholder="Product name"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="
w-full
rounded-md
border
px-3
py-2
"
      />

      <CategorySelect
        value={form.categoryId}
        onChange={(value) => updateField("categoryId", value)}
      />

      <input
        placeholder="SKU"
        value={form.sku}
        onChange={(e) => updateField("sku", e.target.value)}
        className="
w-full
rounded-md
border
px-3
py-2
"
      />

      <input
        placeholder="Barcode"
        value={form.barcode}
        onChange={(e) => updateField("barcode", e.target.value)}
        className="
w-full
rounded-md
border
px-3
py-2
"
      />

      <div>
        <label className="text-sm font-medium">Base Unit</label>

        <UnitSelect
          value={form.baseUnitId}
          onChange={(value) => updateField("baseUnitId", value)}
        />
      </div>

      <ProductUnitManager units={productUnits} setUnits={setProductUnits} />
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="Buy Price"
          value={form.buyPrice}
          onChange={(e) => updateField("buyPrice", e.target.value)}
          className="
w-auto
rounded-md
border
px-3
py-2
"
        />

        <input
          type="number"
          placeholder="Sale Price"
          value={form.salePrice}
          onChange={(e) => updateField("salePrice", e.target.value)}
          className="
w-auto
rounded-md
border
px-3
py-2
"
        />
      </div>

      <input
        type="number"
        placeholder="Minimum Stock"
        value={form.minimumStock}
        onChange={(e) => updateField("minimumStock", e.target.value)}
        className="
w-full
rounded-md
border
px-3
py-2
"
      />

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={form.trackStock}
          onChange={(e) => updateField("trackStock", e.target.checked)}
        />
        Track Stock
      </label>

      <button
        disabled={saving}
        className="
rounded-md
bg-primary
px-4
py-2
text-sm
text-primary-foreground
"
      >
        {saving ? "Saving..." : "Add Product"}
      </button>
    </form>
  );
}
