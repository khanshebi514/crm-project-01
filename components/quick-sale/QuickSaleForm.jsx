"use client";

import { useState } from "react";

import CustomerSelector from "./CustomerSelector";
import ProductSearch from "./ProductSearch";
import ProductResults from "./ProductResults";
import SaleCart from "./SaleCart";
import PaymentSelector from "./PaymentSelector";
import SaleSummary from "./SaleSummary";

import Modal from "@/components/ui/Modal";

const demoProducts = [
  {
    id: "1",
    name: "Sugar 2kg",
    salePrice: 350,
  },
  {
    id: "2",
    name: "Cooking Oil 2L",
    salePrice: 600,
  },
  {
    id: "3",
    name: "Rice 5kg",
    salePrice: 900,
  },
  {
    id: "4",
    name: "Milk Pack",
    salePrice: 220,
  },
];

export default function QuickSaleForm() {
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [discount, setDiscount] = useState("");

  const [paymentType, setPaymentType] = useState("PAID");

  const [receivedAmount, setReceivedAmount] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);

  const filteredProducts = search
    ? demoProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

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

  const finalTotal = Math.max(subtotal - Number(discount || 0), 0);

  const remainingAmount = Math.max(finalTotal - Number(receivedAmount || 0), 0);

  return (
    <div className="space-y-5">
      <CustomerSelector />

      <div>
        <ProductSearch search={search} onSearch={setSearch} />

        <ProductResults
          search={search}
          products={filteredProducts}
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
              className="
              rounded-md
              bg-primary
              px-4
              py-2
              text-sm
              text-primary-foreground
            "
            >
              Confirm Sale
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <SummaryRow label="Items" value={`${cart.length} items`} />

          <SummaryRow label="Subtotal" value={`Rs ${subtotal}`} />

          <SummaryRow label="Discount" value={`Rs ${discount || 0}`} />

          <SummaryRow label="Final Total" value={`Rs ${finalTotal}`} bold />

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
