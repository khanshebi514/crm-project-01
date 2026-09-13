import UnitEditModal from "./UnitEditModal";

import UnitDeleteButton from "./UnitDeleteButton";

export default function UnitCard({ unit }) {
  return (
    <div
      className="
rounded-xl
border
border-border
bg-surface
p-5
"
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{unit.name}</h3>

          <p
            className="
text-sm
text-text-secondary
"
          >
            {unit.shortCode}
          </p>
        </div>

        <div className="flex gap-2">
          <UnitEditModal unit={unit} />

          <UnitDeleteButton unitId={unit.id} />
        </div>
      </div>
    </div>
  );
}
