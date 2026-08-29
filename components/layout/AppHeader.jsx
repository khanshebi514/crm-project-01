import MobileMenu from "@/components/layout/MobileMenu";

export default function AppHeader({ title, subtitle, navigation }) {
  return (
    <header
      className="
      border-b
      border-border
      bg-surface
      px-6
      py-4
    "
    >
      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <div className="flex items-center gap-4">
          <MobileMenu>{navigation}</MobileMenu>

          <div>
            <h1
              className="
              text-xl
              font-semibold
              text-text-primary
            "
            >
              {title}
            </h1>

            <p
              className="
              text-sm
              text-text-secondary
            "
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
