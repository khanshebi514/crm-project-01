"use client";

export default function ProductSearch({ search, onSearch }) {
  return (
    <div>
      <label
        className="
text-sm
font-medium
text-text-secondary
"
      >
        Products
      </label>

      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search product..."
        className="
mt-2
w-full
rounded-md
border
border-input-border
px-3
py-2
text-sm
"
      />
    </div>
  );
}
