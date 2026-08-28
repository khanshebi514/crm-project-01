export default function Separator({
  orientation = "horizontal",
  className = "",
  decorative = true,
  ...props
}) {
  const isHorizontal = orientation === "horizontal";

  const classes = [
    "shrink-0",
    "bg-border",

    isHorizontal ? "h-px w-full" : "h-full w-px",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role={decorative ? "presentation" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={classes}
      {...props}
    />
  );
}
