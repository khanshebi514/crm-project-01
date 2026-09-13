import CategoryCard from "./CategoryCard";

export default function CategoryList({ categories = [] }) {
  return (
    <div
      className="
grid
gap-4
md:grid-cols-2
lg:grid-cols-3
"
    >
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
