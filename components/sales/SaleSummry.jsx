import Button from "@/components/ui/Button";

export default function SaleSummary({ subtotal, onComplete }) {
  return (
    <div
      className="
        rounded-lg
        border
        border-border
        bg-surface
        p-5
        space-y-4
      "
    >
      <div className="flex justify-between">
        <span className="text-text-secondary">Total</span>

        <span className="font-semibold text-text-primary">{subtotal}</span>
      </div>

      <Button onClick={onComplete}>Complete Sale</Button>
    </div>
  );
}
