import CategoryList from "@/components/categories/CategoryList";

import CategoryForm from "@/components/categories/CategoryForm";

import { getCategoriesServer } from "@/lib/categories/category-page-query";

export default async function CategoriesPage() {
  const categories = await getCategoriesServer();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>

        <p className="text-sm text-text-secondary">
          Manage your product categories
        </p>
      </div>

      <CategoryForm />

      <CategoryList categories={categories} />
    </div>
  );
}
