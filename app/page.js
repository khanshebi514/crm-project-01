"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Customer Details"
        description="Review the customer information."
      >
        Customer content goes here.
      </Modal>
    </>
  );
}
