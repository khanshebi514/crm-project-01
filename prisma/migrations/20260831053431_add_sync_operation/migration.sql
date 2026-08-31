-- CreateTable
CREATE TABLE "SyncOperation" (
    "id" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "response" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyncOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SyncOperation_operationId_key" ON "SyncOperation"("operationId");

-- CreateIndex
CREATE INDEX "SyncOperation_tenantId_idx" ON "SyncOperation"("tenantId");

-- CreateIndex
CREATE INDEX "SyncOperation_userId_idx" ON "SyncOperation"("userId");

-- CreateIndex
CREATE INDEX "SyncOperation_operationId_idx" ON "SyncOperation"("operationId");

-- AddForeignKey
ALTER TABLE "SyncOperation" ADD CONSTRAINT "SyncOperation_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncOperation" ADD CONSTRAINT "SyncOperation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
