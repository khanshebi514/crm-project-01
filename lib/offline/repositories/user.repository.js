import { offlineDB } from "../db";

export const offlineUserRepository = {
  async save(user) {
    return await offlineDB.offlineUsers.put({
      ...user,
    });
  },

  async get(userId) {
    return await offlineDB.offlineUsers.where("userId").equals(userId).first();
  },

  async remove(userId) {
    return await offlineDB.offlineUsers.where("userId").equals(userId).delete();
  },
};
