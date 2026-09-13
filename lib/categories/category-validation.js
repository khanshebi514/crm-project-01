export function validateCategoryInput({ name }) {
  if (!name || !name.trim()) {
    throw new Error("Category name is required");
  }

  if (name.trim().length < 2) {
    throw new Error("Category name must be at least 2 characters");
  }

  return true;
}
