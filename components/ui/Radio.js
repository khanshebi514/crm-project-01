export default function Radio({
  id,
  label,
  helperText,
  error,
  disabled = false,
  className = "",
  containerClassName = "",
  ...props
}) {
  const radioId =
    id ||
    props.value ||
    props.name ||
    `radio-${String(label || "option")
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

  const helperId = `${radioId}-helper`;
  const errorId = `${radioId}-error`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  const radioClasses = [
    "peer",
    "mt-0.5",
    "size-5",
    "shrink-0",
    "cursor-pointer",
    "appearance-none",
    "rounded-full",
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
            id={radioId}
            type="radio"
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={radioClasses}
            {...props}
          />

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              size-2
              rounded-full
              bg-primary-foreground
              opacity-0
              peer-checked:opacity-100
            "
          />
        </div>

        {label && (
          <label
            htmlFor={radioId}
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
