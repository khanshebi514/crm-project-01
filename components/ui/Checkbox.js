export default function Checkbox({
  id,
  label,
  helperText,
  error,
  disabled = false,
  className = "",
  containerClassName = "",
  ...props
}) {
  const checkboxId =
    id ||
    props.name ||
    `checkbox-${String(label || "field")
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

  const helperId = `${checkboxId}-helper`;
  const errorId = `${checkboxId}-error`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  const checkboxClasses = [
    "mt-0.5",
    "size-5",
    "shrink-0",
    "cursor-pointer",
    "appearance-none",
    "rounded-sm",
    "border",
    "border-input-border",
    "bg-input-background",

    "transition-colors",
    "duration-150",

    "checked:border-primary",
    "checked:bg-primary",

    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-focus-ring",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",

    "disabled:cursor-not-allowed",
    "disabled:bg-surface-muted",
    "disabled:opacity-50",

    error ? "border-danger" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={["flex w-full flex-col gap-2", containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex shrink-0 items-center justify-center">
          <input
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={checkboxClasses}
            {...props}
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="
              pointer-events-none
              absolute
              size-3.5
              text-primary-foreground
              opacity-0
              peer-checked:opacity-100
            "
          >
            <path
              d="M4 10.5 8 14l8-8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {label && (
          <label
            htmlFor={checkboxId}
            className={[
              "cursor-pointer text-sm text-text-primary",
              disabled ? "cursor-not-allowed text-text-disabled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </label>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="pl-8 text-sm text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="pl-8 text-sm text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
