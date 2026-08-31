import { syncHandlers } from "./handlers";

export async function routeSyncOperation(operation) {
  const handler = syncHandlers[operation.entity];

  if (!handler) {
    throw new Error(`Unsupported entity ${operation.entity}`);
  }

  return await handler(operation);
}
