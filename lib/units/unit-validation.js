export function validateUnitInput({ name, shortCode }) {
  if (!name || !name.trim()) {
    throw new Error("Unit name is required");
  }

  if (!shortCode || !shortCode.trim()) {
    throw new Error("Unit short code is required");
  }

  return true;
}
