"use client";

import { useState } from "react";
import CustomerPaymentForm from "./CustomerPaymentForm";

import Modal from "@/components/ui/Modal";

export default function CustomerPaymentButton({ customerId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
        rounded-md
        bg-primary
        px-4
        py-2
        text-sm
        text-primary-foreground
        "
      >
        Receive Payment
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Receive Customer Payment"
        description="Record payment received from customer."
      >
        <CustomerPaymentForm
          customerId={customerId}
          onSuccess={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
