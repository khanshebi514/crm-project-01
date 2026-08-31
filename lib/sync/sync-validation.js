export function validateSyncOperation(data) {
  const required = ["operationId", "tenantId", "userId", "entity", "operation"];

  for (const field of required) {
    if (!data[field]) {
      throw new Error(`${field} is required`);
    }
  }

  return true;
}
