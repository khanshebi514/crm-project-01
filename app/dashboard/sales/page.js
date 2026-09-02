"use client";

import { useEffect, useState } from "react";

import ProductSearch from "@/components/sales/ProductSearch";
import SaleCart from "@/components/sales/SaleCart";
import PaymentPanel from "@/components/sales/PaymentPanel";
import SaleSummary from "@/components/sales/SaleSummry";

import { createSale } from "@/lib/sales/sale-client";

export default function SalesPage() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Product loading failed", error);
      }
    }

    loadProducts();
  }, []);

  function addProduct(product) {
    const existing = cart.find((item) => item.productId === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );

      return;
    }

    setCart([
      ...cart,

      {
        productId: product.id,

        name: product.name,

        quantity: 1,

        unitPrice: Number(product.salePrice),
      },
    ]);
  }

  function removeProduct(productId) {
    setCart(cart.filter((item) => item.productId !== productId));
  }

  function changeQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeProduct(productId);

      return;
    }

    setCart(
      cart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,

    0,
  );

  async function completeSale() {
    try {
      setLoading(true);

      setMessage("");

      const sale = await createSale({
        customerId: null,

        items: cart.map((item) => ({
          productId: item.productId,

          quantity: item.quantity,

          unitPrice: item.unitPrice,
        })),

        discount: 0,

        tax: 0,

        paidAmount: total,

        paymentMethod,
      });

      setMessage(`Sale completed: ${sale.saleNumber}`);

      setCart([]);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="sai-page-header">
        <h1 className="sai-page-title">New Sale</h1>

        <p className="sai-page-description">Create a quick business sale</p>
      </div>

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <div className="space-y-6">
          <div className="sai-card">
            <h2 className="sai-section-title mb-4">Products</h2>

            <ProductSearch products={products} onAddProduct={addProduct} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="sai-card">
            <h2 className="sai-section-title mb-4">Cart</h2>

            <SaleCart
              items={cart}
              onRemove={removeProduct}
              onQuantityChange={changeQuantity}
            />
          </div>

          <div className="sai-card">
            <PaymentPanel
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          <SaleSummary subtotal={total} onComplete={completeSale} />

          {loading && <p className="text-text-secondary">Processing sale...</p>}

          {message && <p className="text-success">{message}</p>}
        </div>
      </div>
    </div>
  );
}
