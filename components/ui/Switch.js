export default function Switch({
  id,
  label,
  helperText,
  error,
  disabled = false,
  className = "",
  containerClassName = "",
  ...props
}) {
  const switchId =
    id ||
    props.name ||
    `switch-${String(label || "setting")
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

  const helperId = `${switchId}-helper`;
  const errorId = `${switchId}-error`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div
      className={["flex w-full flex-col gap-2", containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {label && (
            <label
              htmlFor={switchId}
              className={[
                "block text-sm font-medium text-text-primary",
                disabled
                  ? "cursor-not-allowed text-text-disabled"
                  : "cursor-pointer",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </label>
          )}

          {error ? (
            <p id={errorId} role="alert" className="mt-1 text-sm text-danger">
              {error}
            </p>
          ) : helperText ? (
            <p id={helperId} className="mt-1 text-sm text-text-muted">
              {helperText}
            </p>
          ) : null}
        </div>

        <label
          htmlFor={switchId}
          className={[
            "relative inline-flex shrink-0",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            id={switchId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className="peer sr-only"
            {...props}
          />

          <span
            className={[
              "relative",
              "h-6",
              "w-11",
              "rounded-full",
              "border",
              "border-input-border",
              "bg-surface-muted",

              "transition-colors",
              "duration-150",

              "peer-checked:border-primary",
              "peer-checked:bg-primary",

              "peer-focus-visible:outline-none",
              "peer-focus-visible:ring-2",
              "peer-focus-visible:ring-focus-ring",
              "peer-focus-visible:ring-offset-2",
              "peer-focus-visible:ring-offset-background",

              "peer-disabled:opacity-50",

              error ? "border-danger" : "",

              className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span
              aria-hidden="true"
              className="
                absolute
                left-0.5
                top-0.5
                size-5
                rounded-full
                bg-white
                shadow-sm
                transition-transform
                duration-150
                peer-checked:translate-x-5
              "
            />
          </span>
        </label>
      </div>
    </div>
  );
}
