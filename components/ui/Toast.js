"use client";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={
        type === "error"
          ? `
fixed
bottom-6
right-6
z-50
rounded-lg
bg-red-600
px-5
py-3
text-white
shadow-lg
`
          : `
fixed
bottom-6
right-6
z-50
rounded-lg
bg-green-600
px-5
py-3
text-white
shadow-lg
`
      }
    >
      <div className="flex items-center gap-4">
        <span>{message}</span>

        <button onClick={onClose} className="text-sm">
          ×
        </button>
      </div>
    </div>
  );
}
