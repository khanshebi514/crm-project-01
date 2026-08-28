export function Card({ children, className = "", ...props }) {
  const classes = [
    "rounded-lg",
    "border",
    "border-border",
    "bg-surface",
    "text-text-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  const classes = ["flex", "flex-col", "gap-1.5", "px-5", "pt-5", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  const classes = [
    "text-lg",
    "font-semibold",
    "leading-tight",
    "text-text-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "", ...props }) {
  const classes = ["text-sm", "leading-normal", "text-text-muted", className]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "", ...props }) {
  const classes = ["px-5", "py-5", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  const classes = [
    "flex",
    "items-center",
    "gap-3",
    "border-t",
    "border-border",
    "px-5",
    "py-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
