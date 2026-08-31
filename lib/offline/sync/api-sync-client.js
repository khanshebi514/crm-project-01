export async function sendSyncOperation(operation) {
  const response = await fetch("/api/sync", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      operationId: operation.id,

      tenantId: operation.tenantId,

      userId: operation.userId,

      entity: operation.entity,

      operation: operation.operation,

      payload:
        typeof operation.payload === "string"
          ? JSON.parse(operation.payload)
          : operation.payload,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Sync API failed");
  }

  return data;
}
