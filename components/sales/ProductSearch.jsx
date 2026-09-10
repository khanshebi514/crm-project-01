"use client";

import Input from "@/components/ui/Input";

export default function ProductSearch({ search, onSearch }) {
  return (
    <div>
      <Input
        placeholder="Search product..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
