"use client";

import UnitSelect from "./UnitSelect";

export default function ProductUnitManager({ units, setUnits }) {
  function addUnit() {
    setUnits([
      ...units,

      {
        unitId: "",

        conversion: "",

        sellingPrice: "",
      },
    ]);
  }

  function updateUnit(index, field, value) {
    const updated = [...units];

    updated[index][field] = value;

    setUnits(updated);
  }

  function removeUnit(index) {
    setUnits(units.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">Selling Units</h3>

        <button
          type="button"
          onClick={addUnit}
          className="
rounded-md
border
px-3
py-1
text-sm
"
        >
          + Add Unit
        </button>
      </div>

      {units.map((item, index) => (
        <div
          key={index}
          className="
rounded-lg
border
p-4
space-y-3
"
        >
          <UnitSelect
            value={item.unitId}
            onChange={(value) => updateUnit(index, "unitId", value)}
          />

          <input
            type="number"
            placeholder="Conversion e.g 6"
            value={item.conversion}
            onChange={(e) => updateUnit(index, "conversion", e.target.value)}
            className="
w-full
rounded-md
border
px-3
py-2
"
          />

          <input
            type="number"
            placeholder="Selling price"
            value={item.sellingPrice}
            onChange={(e) => updateUnit(index, "sellingPrice", e.target.value)}
            className="
w-full
rounded-md
border
px-3
py-2
"
          />

          <button
            type="button"
            onClick={() => removeUnit(index)}
            className="
text-sm
text-red-600
"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
