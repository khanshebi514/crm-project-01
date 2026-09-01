"use client";

import { useEffect, useState } from "react";

import { syncQueueRepository } from "@/lib/offline/repositories/syncQueue.repository";

import { startSync } from "@/lib/offline/sync/sync-engine";

export default function OfflineSaleSyncTestPage() {
  const [result, setResult] = useState("Running offline sale sync test...");

  useEffect(() => {
    async function runTest() {
      try {
        console.log("================================");

        console.log("SAI OFFLINE SALE SYNC TEST");

        console.log("================================");

        /*
          Step 1:
          Create test environment
        */

        const envResponse = await fetch(
          "/api/internal/create-sale-sync-test-environment",
          {
            method: "POST",
          },
        );

        const envData = await envResponse.json();

        if (!envData.success) {
          throw new Error(envData.message);
        }

        const { tenantId, userId, productId } = envData.environment;

        console.log("✓ Environment created", envData.environment);

        /*
          Step 2:
          Add offline SALE operation
        */

        const operationId = `offline-sale-${crypto.randomUUID()}`;

        await syncQueueRepository.add({
          id: operationId,

          tenantId,

          userId,

          entity: "SALE",

          operation: "CREATE",

          payload: JSON.stringify({
            customerId: null,

            items: [
              {
                productId,

                quantity: 2,

                unitPrice: 100,
              },
            ],

            discount: 0,

            tax: 0,

            paidAmount: 200,

            paymentMethod: "CASH",
          }),
        });

        console.log("✓ Offline SALE queued");

        /*
          Step 3:
          Run sync engine
        */

        await startSync();

        /*
          Step 4:
          Verify queue status
        */

        const operation = await syncQueueRepository.getById(operationId);

        console.log("Operation status:", operation);

        if (operation && operation.status !== "SYNCED") {
          throw new Error(`Expected SYNCED but got ${operation.status}`);
        }

        setResult("✅ OFFLINE SALE SYNC TEST PASSED");
      } catch (error) {
        console.error("Offline sale sync failed", error);

        setResult("❌ " + error.message);
      }
    }

    runTest();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">SAI Offline Sale Sync Test</h1>

      <p className="mt-4">{result}</p>
    </div>
  );
}
