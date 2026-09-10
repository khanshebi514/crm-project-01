"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/api-client";
import { createSale } from "@/lib/sales/sale-client";

import CustomerSelector from "./CustomerSelector";
import ProductSearch from "./ProductSearch";
import ProductResults from "./ProductResults";
import SaleCart from "./SaleCart";
import PaymentSelector from "./PaymentSelector";
import SaleSummary from "./SaleSummary";

import Modal from "@/components/ui/Modal";

export default function QuickSaleForm() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [taxRate, setTaxRate] = useState(0);

  const [cart, setCart] = useState([]);

  const [discount, setDiscount] = useState("");

  const [paymentType, setPaymentType] = useState("PAID");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const [receivedAmount, setReceivedAmount] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!search) {
      setProducts([]);

      return;
    }

    const timer = setTimeout(async () => {
      try {
        const result = await apiClient(`/api/products/search?q=${search}`);

        setProducts(result.products || []);
      } catch (error) {
        console.error("Product search failed", error);

        setProducts([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);
  function addProduct(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  function removeProduct(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0,
  );

  const discountAmount = Number(discount || 0);

  const discountedTotal = Math.max(subtotal - discountAmount, 0);

  const taxAmount = (discountedTotal * Number(taxRate || 0)) / 100;

  const finalTotal = discountedTotal + taxAmount;

  const remainingAmount = Math.max(finalTotal - Number(receivedAmount || 0), 0);

  async function handleConfirmSale() {
    try {
      setSaving(true);

      const sale = await createSale({
        customerId: null,

        items: cart.map((item) => ({
          productId: item.id,

          quantity: item.quantity,

          unitPrice: Number(item.salePrice),
        })),

        discount: Number(discount || 0),

        tax: Number(taxAmount || 0),

        paidAmount: Number(
          paymentType === "PAID" ? finalTotal : receivedAmount || 0,
        ),

        paymentMethod: paymentMethod,
      });

      setConfirmOpen(false);

      router.push(`/dashboard/sales/${sale.id}/receipt`);

      setConfirmOpen(false);
    } catch (error) {
      console.error("SALE FAILED", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <CustomerSelector />

      <div>
        <ProductSearch search={search} onSearch={setSearch} />

        <ProductResults
          search={search}
          products={products}
          onAdd={addProduct}
        />
      </div>

      <SaleCart
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeProduct}
      />

      {/* Discount */}

      <div>
        <label
          className="
            text-sm
            font-medium
            text-text-secondary
          "
        >
          Discount
        </label>

        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Enter discount amount"
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

      <PaymentSelector
        value={paymentType}
        onChange={setPaymentType}
        total={finalTotal}
        receivedAmount={receivedAmount}
        setReceivedAmount={setReceivedAmount}
        remainingAmount={remainingAmount}
      />

      <SaleSummary
        subtotal={subtotal}
        discount={discount}
        tax={taxAmount}
        total={finalTotal}
        paymentType={paymentType}
        receivedAmount={receivedAmount}
        remainingAmount={remainingAmount}
        onComplete={() => {
          setConfirmOpen(true);
        }}
      />

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Complete Sale"
        description="Please confirm this order before creating the receipt."
        footer={
          <>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="
              rounded-md
              border
              border-border
              px-4
              py-2
              text-sm
            "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmSale}
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
              {saving ? "Creating..." : "Confirm Sale"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <SummaryRow label="Items" value={`${cart.length} items`} />

          <SummaryRow label="Subtotal" value={`Rs ${subtotal}`} />

          <SummaryRow label="Discount" value={`Rs ${discount || 0}`} />

          <SummaryRow label="Final Total" value={`Rs ${finalTotal}`} bold />
          <SummaryRow label="Tax" value={`Rs ${taxAmount}`} />

          <SummaryRow label="Payment" value={paymentType} />

          {paymentType === "PARTIAL" && (
            <>
              <SummaryRow
                label="Received"
                value={`Rs ${receivedAmount || 0}`}
              />

              <SummaryRow
                label="Remaining Khata"
                value={`Rs ${remainingAmount}`}
                bold
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <div
      className="
flex
justify-between
"
    >
      <span className="text-sm text-text-secondary">{label}</span>

      <span
        className={
          bold ? "font-bold text-text-primary" : "font-medium text-text-primary"
        }
      >
        {value}
      </span>
    </div>
  );
}
