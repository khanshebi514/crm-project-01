import { processSyncOperation } from "@/lib/sync/sync-service";

import { validateSyncOperation } from "@/lib/sync/sync-validation";

export async function POST(request) {
  try {
    const body = await request.json();

    validateSyncOperation(body);

    const result = await processSyncOperation(body);

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        success: false,

        message: error.message,
      },

      {
        status: 400,
      },
    );
  }
}
