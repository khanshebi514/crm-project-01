"use client";

import { useEffect, useRef } from "react";

export default function Modal({
  open = false,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
  className = "",
}) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const sizeClass = sizes[size] || sizes.md;

  useEffect(() => {
    if (!open) return;

    previousActiveElement.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          [
            "button:not([disabled])",
            "a[href]",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            '[tabindex]:not([tabindex="-1"])',
          ].join(","),
        );

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      const firstFocusable = modalRef.current?.querySelector(
        [
          "button:not([disabled])",
          "a[href]",
          "input:not([disabled])",
          "select:not([disabled])",
          "textarea:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ].join(","),
      );

      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modalRef.current?.focus();
      }
    });

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);

      previousActiveElement.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (event) => {
    if (closeOnOverlay && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const titleId = "sai-modal-title";
  const descriptionId = "sai-modal-description";

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/40
        p-4
      "
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={[
          "relative",
          "w-full",
          sizeClass,
          "rounded-xl",
          "border",
          "border-border",
          "bg-surface",
          "text-text-primary",
          "shadow-lg",
          "outline-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {(title || description || showCloseButton) && (
          <div
            className="
              flex
              items-start
              justify-between
              gap-4
              border-b
              border-border
              px-5
              py-4
            "
          >
            <div className="min-w-0">
              {title && (
                <h2
                  id={titleId}
                  className="
                    text-lg
                    font-semibold
                    leading-tight
                    text-text-primary
                  "
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id={descriptionId}
                  className="
                    mt-1
                    text-sm
                    leading-normal
                    text-text-muted
                  "
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="
                  inline-flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  text-text-muted
                  transition-colors
                  duration-150
                  hover:bg-surface-secondary
                  hover:text-text-primary
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-focus-ring
                  disabled:pointer-events-none
                  disabled:opacity-50
                "
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path
                    d="M5 5l10 10M15 5 5 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="px-5 py-5">{children}</div>

        {footer && (
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-end
              gap-3
              border-t
              border-border
              px-5
              py-4
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
