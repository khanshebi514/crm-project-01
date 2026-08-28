export default function Select({
  id,
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  placeholder = "Select an option",
  options = [],
  className = "",
  containerClassName = "",
  ...props
}) {
  const selectId =
    id ||
    props.name ||
    `select-${String(label || "field")
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;

  const selectClasses = [
    "w-full",
    "h-11",
    "appearance-none",
    "rounded-md",
    "border",
    "bg-input-background",
    "px-3",
    "pr-10",
    "text-base",
    "text-text-primary",

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
          htmlFor={selectId}
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

      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-text-muted
          "
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-4">
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

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
