"use client";

export default function ConfirmModal({
  open,
  title = "Confirm Action",
  description = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      "
    >
      <div
        className="
        w-full
        max-w-md
        rounded-xl
        bg-surface
        p-6
        shadow-xl
        "
      >
        <h2 className="text-lg font-semibold">{title}</h2>

        <p
          className="
          mt-3
          text-sm
          text-text-secondary
          "
        >
          {description}
        </p>

        <div
          className="
          mt-6
          flex
          justify-end
          gap-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
            rounded-md
            border
            border-border
            px-4
            py-2
            text-sm
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={
              danger
                ? `
              rounded-md
              bg-red-600
              px-4
              py-2
              text-sm
              text-white
              `
                : `
              rounded-md
              bg-primary
              px-4
              py-2
              text-sm
              text-primary-foreground
              `
            }
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
