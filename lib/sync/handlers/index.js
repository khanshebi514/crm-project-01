import { testSyncHandler } from "./test.handler";

import { saleSyncHandler } from "./sale.handler";

export const syncHandlers = {
  TEST_ENTITY: testSyncHandler,

  SALE: saleSyncHandler,
};
