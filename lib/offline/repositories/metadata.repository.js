import { offlineDB } from "../db";

export const metadataRepository = {
  async set(key, value) {
    return await offlineDB.metadata.put({
      key,

      value,
    });
  },

  async get(key) {
    return await offlineDB.metadata.where("key").equals(key).first();
  },

  async remove(key) {
    return await offlineDB.metadata.where("key").equals(key).delete();
  },
};
