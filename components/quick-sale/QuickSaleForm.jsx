"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { apiClient } from "@/lib/api/api-client";
import { createSale } from "@/lib/sales/sale-client";
import { calculateSaleTotals } from "@/lib/sales/sale-calculator";

import CustomerSelector from "./CustomerSelector";
import ProductSearch from "./ProductSearch";
import ProductResults from "./ProductResults";
import SaleCart from "./SaleCart";
import PaymentSelector from "./PaymentSelector";
import SaleSummary from "./SaleSummary";

import Modal from "@/components/ui/Modal";

export default function QuickSaleForm() {
  const router = useRouter();

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [discount, setDiscount] = useState("");

  const [taxRate, setTaxRate] = useState(0);

  const [paymentType, setPaymentType] = useState("PAID");

  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const [receivedAmount, setReceivedAmount] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  /*
    PRODUCT SEARCH
  */

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

  /*
    CART FUNCTIONS
  */

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

  /*
      SALE CALCULATION
  */

  const totals = calculateSaleTotals({
    cart,

    discount,

    taxRate,

    receivedAmount,
  });

  const {
    subtotal,

    discountAmount,

    taxAmount,

    total,

    remaining,
  } = totals;

  async function handleConfirmSale() {
    try {
      setSaving(true);

      const sale = await createSale({
        customerId: selectedCustomer?.id ?? null,

        items: cart.map((item) => ({
          productId: item.id,

          quantity: item.quantity,

          unitPrice: Number(item.salePrice),
        })),

        discount: discountAmount,

        tax: taxAmount,

        paidAmount: Number(
          paymentType === "PAID" ? total : receivedAmount || 0,
        ),

        paymentMethod,
      });

      setConfirmOpen(false);

      router.push(`/dashboard/sales/${sale.id}/receipt`);
    } catch (error) {
      console.error("SALE FAILED", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <CustomerSelector
        value={selectedCustomer}
        onChange={setSelectedCustomer}
      />

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

      <div>
        <label className="text-sm font-medium">Discount</label>

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
px-3
py-2
"
        />
      </div>

      <PaymentSelector
        value={paymentType}
        onChange={setPaymentType}
        total={total}
        receivedAmount={receivedAmount}
        setReceivedAmount={setReceivedAmount}
        remainingAmount={remaining}
      />

      <SaleSummary
        subtotal={subtotal}
        discount={discountAmount}
        tax={taxAmount}
        total={total}
        paymentType={paymentType}
        receivedAmount={receivedAmount}
        remainingAmount={remaining}
        onComplete={() => setConfirmOpen(true)}
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
        <div className="space-y-5">
          {/* Customer Information */}

          <div
            className="
      rounded-lg
      bg-surface-muted
      p-4
      space-y-2
      "
          >
            <h3 className="font-semibold">Customer</h3>

            <SummaryRow
              label="Name"
              value={selectedCustomer?.name || "Walk-in Customer"}
            />

            {selectedCustomer?.phone && (
              <SummaryRow label="Phone" value={selectedCustomer.phone} />
            )}

            {selectedCustomer?.openingBalance && (
              <SummaryRow
                label="Previous Khata"
                value={`Rs ${selectedCustomer.openingBalance}`}
              />
            )}
          </div>

          {/* Sale Information */}

          <div
            className="
      rounded-lg
      border
      border-border
      p-4
      space-y-2
      "
          >
            <h3 className="font-semibold">Sale Summary</h3>

            <SummaryRow label="Items" value={`${cart.length} items`} />

            <SummaryRow label="Subtotal" value={`Rs ${subtotal}`} />

            <SummaryRow label="Discount" value={`Rs ${discountAmount}`} />

            <SummaryRow label="Tax" value={`Rs ${taxAmount}`} />

            <SummaryRow label="Final Total" value={`Rs ${total}`} bold />
          </div>

          {/* Payment Information */}

          <div
            className="
      rounded-lg
      border
      border-border
      p-4
      space-y-2
      "
          >
            <h3 className="font-semibold">Payment</h3>

            <SummaryRow label="Payment Type" value={paymentType} />

            <SummaryRow label="Payment Method" value={paymentMethod} />

            {paymentType === "PARTIAL" && (
              <>
                <SummaryRow
                  label="Received"
                  value={`Rs ${receivedAmount || 0}`}
                />

                <SummaryRow
                  label="Remaining Khata"
                  value={`Rs ${remaining}`}
                  bold
                />
              </>
            )}

            {paymentType === "PAID" && selectedCustomer && (
              <SummaryRow label="Customer Balance" value="No new due" />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-text-secondary">{label}</span>

      <span className={bold ? "font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
