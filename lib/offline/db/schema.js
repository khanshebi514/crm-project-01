export const databaseVersion = 1;

export const tables = {
  metadata: `
  &key,
  value
`,

  syncQueue: `
     id,
    entity,
    operation,
    status,
    retryCount,
    createdAt,
    updatedAt
  `,

  offlineUsers: `
    id,
  userId,
  tenantId,
  permissions
  `,
};
