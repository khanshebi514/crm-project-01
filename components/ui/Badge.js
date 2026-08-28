const variants = {
  default: "bg-surface-secondary text-text-secondary border border-border",

  success: "bg-success-background text-success border border-success/20",

  warning: "bg-warning-background text-warning border border-warning/20",

  danger: "bg-danger-background text-danger border border-danger/20",

  info: "bg-info-background text-info border border-info/20",

  primary: "bg-primary/10 text-primary border border-primary/20",
};

const sizes = {
  sm: "h-5 px-2 text-xs",
  md: "h-6 px-2.5 text-xs",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...props
}) {
  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;

  const classes = [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1.5",
    "whitespace-nowrap",
    "rounded-full",
    "font-medium",
    "leading-none",

    variantClass,
    sizeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {dot && (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      )}

      {children}
    </span>
  );
}
