-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_saleId_fkey";

-- DropIndex
DROP INDEX "Customer_tenantId_deletedAt_idx";

-- DropIndex
DROP INDEX "Customer_tenantId_isActive_idx";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "customerId" TEXT,
ALTER COLUMN "saleId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Payment_customerId_idx" ON "Payment"("customerId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
