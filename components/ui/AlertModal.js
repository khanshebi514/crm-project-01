"use client";

export default function AlertModal({
  open,
  title = "Error",
  message,
  buttonText = "OK",
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
          {message}
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="
            rounded-md
            bg-primary
            px-4
            py-2
            text-sm
            text-primary-foreground
            "
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
