import UnitCard from "./UnitCard";

export default function UnitList({ units }) {
  if (!units.length) {
    return (
      <div
        className="
rounded-xl
border
p-6
text-center
text-text-secondary
"
      >
        No units found
      </div>
    );
  }

  return (
    <div
      className="
grid
gap-4
md:grid-cols-3
"
    >
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
