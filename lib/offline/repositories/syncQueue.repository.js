import { offlineDB } from "../db";

export const syncQueueRepository = {
  async add(operation) {
    return await offlineDB.syncQueue.add({
      ...operation,

      status: operation.status ?? "PENDING",

      retryCount: operation.retryCount ?? 0,

      createdAt: new Date(),

      updatedAt: new Date(),
    });
  },

  async getPending() {
    return await offlineDB.syncQueue
      .where("status")
      .equals("PENDING")
      .toArray();
  },

  async getFailed() {
    return await offlineDB.syncQueue.where("status").equals("FAILED").toArray();
  },

  async updateStatus(id, status) {
    return await offlineDB.syncQueue.update(
      id,

      {
        status,

        updatedAt: new Date(),
      },
    );
  },

  async incrementRetry(id) {
    const item = await offlineDB.syncQueue.get(id);

    if (!item) {
      return;
    }

    return await offlineDB.syncQueue.update(
      id,

      {
        retryCount: item.retryCount + 1,

        updatedAt: new Date(),
      },
    );
  },

  async getById(id) {
    return await offlineDB.syncQueue.get(id);
  },

  async clearAll() {
    return await offlineDB.syncQueue.clear();
  },

  async remove(id) {
    return await offlineDB.syncQueue.delete(id);
  },
};
