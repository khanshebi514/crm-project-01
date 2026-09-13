import UnitForm from "@/components/units/UnitForm";
import UnitList from "@/components/units/UnitList";

import { getUnitsServer } from "@/lib/units/unit-page-query";

export default async function UnitsPage() {
  const units = await getUnitsServer();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Units</h1>

        <p className="text-sm text-text-secondary">
          Manage product measurement units
        </p>
      </div>

      <UnitForm />

      <UnitList units={units} />
    </div>
  );
}
