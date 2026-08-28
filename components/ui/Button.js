const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",

  secondary:
    "bg-surface-secondary text-text-primary border border-border hover:bg-surface-muted",

  outline:
    "bg-transparent text-text-primary border border-border hover:bg-surface-secondary",

  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary",

  danger: "bg-danger text-white hover:opacity-90 active:opacity-80",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  const classes = [
    // Base
    "inline-flex items-center justify-center gap-2",
    "rounded-md",
    "font-medium",
    "whitespace-nowrap",
    "select-none",

    // Interaction
    "transition-colors duration-150",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-focus-ring",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",

    // Disabled
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",

    // Width
    fullWidth ? "w-full" : "",

    // Variant + size
    variantClass,
    sizeClass,

    // Custom extension
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <svg
          className="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />

          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-90"
          />
        </svg>
      )}

      <span>{children}</span>
    </button>
  );
}
