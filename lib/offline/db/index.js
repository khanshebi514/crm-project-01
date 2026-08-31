import Dexie from "dexie";

import { tables, databaseVersion } from "./schema";

class SAIDatabase extends Dexie {
  constructor() {
    super("SAI_Offline_DB");

    this.version(databaseVersion).stores(tables);
  }
}

export const offlineDB = new SAIDatabase();
