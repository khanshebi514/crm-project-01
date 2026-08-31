import { startSync } from "./sync-engine";

export function registerSyncListener() {
  if (typeof window === "undefined") {
    return;
  }

  window.addEventListener(
    "online",

    () => {
      console.log("Network restored. Starting sync...");

      startSync();
    },
  );
}
