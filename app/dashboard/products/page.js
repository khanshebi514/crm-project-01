import ProductForm from "@/components/products/ProductForm";
import ProductList from "@/components/products/ProductList";
import ProductExportButton from "@/components/products/ProductExportButton";
import ProductImportButton from "@/components/products/ProductImportButton";
import { getProductsServer } from "@/lib/products/product-page-query";

export default async function ProductsPage() {
  const products = await getProductsServer();

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
          </div>
          <div className="flex items-center gap-2">
            <ProductExportButton />
            <ProductImportButton />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Manage your products and pricing
        </p>
      </div>

      <ProductForm />

      <ProductList products={products} />
    </div>
  );
}
