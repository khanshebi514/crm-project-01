import { sendSyncOperation } from "../api-sync-client";

export async function apiSyncHandler(operation) {
  console.log("CLIENT API SYNC:", operation.id);

  const result = await sendSyncOperation(operation);

  return result;
}
