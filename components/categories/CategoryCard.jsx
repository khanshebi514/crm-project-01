"use client";

import { useState } from "react";

import CategoryEditModal from "./CategoryEditModal";

import CategoryDeleteButton from "./CategoryDeleteButton";

export default function CategoryCard({ category }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div
        className="
      rounded-xl
      border
      border-border
      bg-surface
      p-5
      "
      >
        <h3 className="font-semibold">{category.name}</h3>

        <p
          className="
        text-sm
        text-text-secondary
        "
        >
          {category._count?.products || 0} Products
        </p>

        <div
          className="
        mt-4
        flex
        gap-2
        "
        >
          <button
            onClick={() => setEditOpen(true)}
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

          <CategoryDeleteButton categoryId={category.id} />
        </div>
      </div>

      <CategoryEditModal
        category={category}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}
