"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Modal from "@/components/ui/Modal";

import { useToast } from "@/context/ToastProvider";

import CategorySelect from "./CategorySelect";
import UnitSelect from "./UnitSelect";
import ProductUnitManager from "./ProductUnitManager";

export default function ProductEditModal({ product }) {
  const router = useRouter();

  const toast = useToast();

  const [open, setOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: product.name || "",

    sku: product.sku || "",

    barcode: product.barcode || "",

    categoryId: product.categoryId || "",

    baseUnitId: product.baseUnitId || "",

    minimumStock: product.minimumStock || "",

    purchasePrice: product.purchasePrice || "",

    salePrice: product.salePrice || "",

    trackStock: product.trackStock,
  });

  const [productUnits, setProductUnits] = useState([]);
  useEffect(() => {
    setProductUnits(
      product.productUnits?.map((item) => ({
        unitId: item.unitId,

        conversion: String(item.conversion),

        sellingPrice: String(item.sellingPrice),
      })) || [],
    );
  }, [product]);

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,

      [field]: value,
    }));
  }

  async function handleUpdate() {
    try {
      setSaving(true);

      console.log("EDIT PRODUCT DATA", product);

      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",

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

      toast.success("Product updated successfully");

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
      rounded-md
      border
      px-3
      py-1
      text-sm
      "
      >
        Edit
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Product"
        footer={
          <button
            disabled={saving}
            onClick={handleUpdate}
            className="
          rounded-md
          bg-primary
          px-4
          py-2
          text-primary-foreground
          "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        }
      >
        <div className="space-y-4">
          <input
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
            value={form.sku}
            onChange={(e) => updateField("sku", e.target.value)}
            placeholder="SKU"
            className="
        w-full
        rounded-md
        border
        px-3
        py-2
        "
          />

          <input
            value={form.barcode}
            onChange={(e) => updateField("barcode", e.target.value)}
            placeholder="Barcode"
            className="
        w-full
        rounded-md
        border
        px-3
        py-2
        "
          />

          <div>
            <label className="text-sm">Base Unit</label>

            <UnitSelect
              value={form.baseUnitId}
              onChange={(value) => updateField("baseUnitId", value)}
            />
          </div>

          <ProductUnitManager units={productUnits} setUnits={setProductUnits} />

          <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
            <input
              value={form.purchasePrice}
              onChange={(e) => updateField("purchasePrice", e.target.value)}
              placeholder="Purchase Price"
              className="
        w-auto
        rounded-md
        border
        px-3
        py-2
        "
            />
            <input
              value={form.salePrice}
              onChange={(e) => updateField("salePrice", e.target.value)}
              placeholder="Sale Price"
              className="
        w-auto
        rounded-md
        border
        px-3
        py-2
        "
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
