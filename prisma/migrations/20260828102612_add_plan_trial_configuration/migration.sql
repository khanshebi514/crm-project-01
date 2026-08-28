-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trialDays" INTEGER NOT NULL DEFAULT 14;

-- CreateIndex
CREATE INDEX "Plan_isDefault_idx" ON "Plan"("isDefault");
