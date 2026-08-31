import { processSyncQueue } from "./sync-processor";

let syncRunning = false;

export async function startSync() {
  if (syncRunning) {
    return {
      success: false,

      message: "Sync already running",
    };
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return {
      success: false,

      message: "Device is offline",
    };
  }

  try {
    syncRunning = true;

    console.log("SAI Sync Started");

    const result = await processSyncQueue();

    console.log("SAI Sync Completed", result);

    return {
      success: true,

      ...result,
    };
  } catch (error) {
    console.error(
      "SAI Sync Failed",

      error,
    );

    return {
      success: false,

      error: error.message,
    };
  } finally {
    syncRunning = false;
  }
}

export function isSyncRunning() {
  return syncRunning;
}
