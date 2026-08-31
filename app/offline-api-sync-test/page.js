"use client";

import { useEffect, useState } from "react";

import { syncQueueRepository } from "@/lib/offline/repositories/syncQueue.repository";

import { processSyncQueue } from "@/lib/offline/sync/sync-processor";

export default function OfflineApiSyncTestPage() {
  const [result, setResult] = useState("Running offline API sync test...");

  useEffect(() => {
    async function runTest() {
      try {
        console.log("SAI OFFLINE API SYNC TEST");

        /*
 Get test environment
*/

        const envResponse = await fetch(
          "/api/internal/create-sync-test-environment",
          {
            method: "POST",
          },
        );

        const env = await envResponse.json();

        if (!env.success) {
          throw new Error(env.message);
        }

        console.log("✓ Environment created");

        const operationId = `offline-api-${crypto.randomUUID()}`;

        /*
 Create Offline Queue Item
*/

        await syncQueueRepository.add({
          id: operationId,

          tenantId: env.tenantId,

          userId: env.userId,

          entity: "TEST_ENTITY",

          operation: "CREATE",

          payload: JSON.stringify({
            message: "Offline to API test",
          }),
        });

        console.log("✓ Offline queue created");

        /*
 Run real sync
*/

        const syncResult = await processSyncQueue();

        console.log("Sync Result", syncResult);

        setResult("✅ OFFLINE → API SYNC TEST PASSED");
      } catch (error) {
        console.error(error);

        setResult("❌ " + error.message);
      }
    }

    runTest();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">SAI Offline API Sync Test</h1>

      <p className="mt-4">{result}</p>
    </div>
  );
}
