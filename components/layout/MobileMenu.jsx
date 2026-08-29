"use client";

import { useState } from "react";

export default function MobileMenu({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="
          rounded-md
          border
          border-border
          px-3
          py-2
          text-text-secondary
          hover:bg-surface-muted
        "
      >
        ☰
      </button>

      {open && (
        <div
          className="
          fixed
          inset-0
          z-50
          bg-background
        "
        >
          <div
            className="
            flex
            h-full
            flex-col
            border-r
            border-border
            bg-surface
            p-5
          "
          >
            <div
              className="
              mb-6
              flex
              items-center
              justify-between
            "
            >
              <h2
                className="
                text-xl
                font-bold
                text-text-primary
              "
              >
                SAI
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="
                  text-text-secondary
                "
              >
                ✕
              </button>
            </div>

            {children}
          </div>
        </div>
      )}
    </div>
  );
}
