"use client";

import { useEffect, useRef, useState } from "react";

import { syncQueueRepository } from "@/lib/offline/repositories/syncQueue.repository";

import { startSync } from "@/lib/offline/sync/sync-engine";

export default function OfflineSyncTestPage() {
  const [result, setResult] = useState("Running sync test...");
  const testStarted = useRef(false);

  useEffect(() => {
    if (testStarted.current) {
      return;
    }

    testStarted.current = true;

    async function runTest() {
      const syncId = `test-sync-${crypto.randomUUID()}`;

      try {
        await syncQueueRepository.clearAll();

        console.log("✓ Old queue cleaned");
        console.log("================================================");

        console.log("SAI SYNC PIPELINE TEST");

        console.log("================================================");

        /*
          Create Offline Operation
        */

        console.log("▶ Creating offline queue operation");

        await syncQueueRepository.add({
          id: syncId,

          entity: "TEST_ENTITY",

          operation: "CREATE",

          payload: JSON.stringify({
            message: "Hello SAI Sync",
          }),
        });

        console.log("✓ Queue item created", syncId);

        /*
          Verify Pending
        */

        const before = await syncQueueRepository.getPending();

        const pendingItem = before.find((item) => item.id === syncId);

        if (!pendingItem) {
          throw new Error("Queue item was not created");
        }

        console.log("✓ Operation is pending");

        /*
          Start Sync
        */

        console.log("▶ Starting sync engine");

        const syncResult = await startSync();

        console.log("Sync result:", syncResult);

        /*
          Verify Final Status
        */

        const syncedOperation = await syncQueueRepository.getById(syncId);

        if (!syncedOperation) {
          throw new Error("Synced operation not found");
        }

        if (syncedOperation.status !== "SYNCED") {
          throw new Error(`Expected SYNCED but got ${syncedOperation.status}`);
        }

        console.log("✓ Operation SYNCED successfully");

        /*
          Cleanup
        */

        await syncQueueRepository.remove(syncId);

        console.log("✓ Cleanup completed");

        console.log("================================================");

        console.log("✅ SAI SYNC PIPELINE TEST PASSED");

        console.log("================================================");

        setResult("✅ SAI SYNC PIPELINE TEST PASSED");
      } catch (error) {
        console.error(error);

        // cleanup if failed

        try {
          await syncQueueRepository.remove(syncId);
        } catch {}

        setResult(
          "❌ " + (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    }

    runTest();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">SAI Sync Pipeline Test</h1>

      <p className="mt-4">{result}</p>
    </div>
  );
}
