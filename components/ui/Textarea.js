export default function Textarea({
  id,
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  containerClassName = "",
  ...props
}) {
  const textareaId =
    id ||
    props.name ||
    `textarea-${String(label || "field")
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;

  const textareaClasses = [
    "w-full",
    "min-h-28",
    "resize-y",
    "rounded-md",
    "border",
    "bg-input-background",
    "px-3",
    "py-3",
    "text-base",
    "text-text-primary",
    "placeholder:text-input-placeholder",

    "transition-colors",
    "duration-150",

    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-focus-ring",
    "focus-visible:ring-offset-1",
    "focus-visible:ring-offset-background",

    error ? "border-danger focus-visible:ring-danger" : "border-input-border",

    "disabled:cursor-not-allowed",
    "disabled:bg-surface-muted",
    "disabled:text-text-disabled",
    "disabled:opacity-70",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div
      className={["flex w-full flex-col gap-2", containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-text-primary"
        >
          {label}

          {required && (
            <span className="ml-1 text-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={textareaClasses}
        {...props}
      />

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-sm text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
