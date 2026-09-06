"use client";
import QuickSaleForm from "@/components/quick-sale/QuickSaleForm";

export default function NewSalePage() {
  return (
    <div>
      <section className="sai-page-header">
        <h2 className="sai-page-title">Quick Sale</h2>

        <p className="sai-page-description">
          Create a sale quickly without leaving your business dashboard.
        </p>
      </section>

      <QuickSaleForm />
    </div>
  );
}
