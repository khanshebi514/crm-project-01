import { shouldRetry } from "./retry-manager";

import { syncQueueRepository } from "@/lib/offline/repositories/syncQueue.repository";

import { syncHandlers } from "./handlers";

export async function processSyncQueue() {
  const pendingOperations = await syncQueueRepository.getPending();

  console.log("Pending operations:", pendingOperations);

  if (pendingOperations.length === 0) {
    return {
      processed: 0,
    };
  }

  let processed = 0;

  for (const operation of pendingOperations) {
    console.log("Processing operation:", operation.id);
    await processOperation(operation);

    processed++;
  }

  return {
    processed,
  };
}

async function processOperation(operation) {
  try {
    await syncQueueRepository.updateStatus(
      operation.id,

      "PROCESSING",
    );

    const handler = syncHandlers[operation.entity];

    if (!handler) {
      throw new Error(`No sync handler found for ${operation.entity}`);
    }

    await handler(operation);

    await syncQueueRepository.updateStatus(
      operation.id,

      "SYNCED",
    );
  } catch (error) {
    console.error(
      "Sync failed:",

      operation,

      error,
    );

    if (shouldRetry(operation)) {
      await syncQueueRepository.incrementRetry(operation.id);

      await syncQueueRepository.updateStatus(
        operation.id,

        "PENDING",
      );
    } else {
      await syncQueueRepository.updateStatus(
        operation.id,

        "FAILED_PERMANENT",
      );
    }
  }
}
