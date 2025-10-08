-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hotelId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "revenue_ledger" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dealName" TEXT NOT NULL,
    "guestName" TEXT,
    "roomNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hotelId" TEXT NOT NULL,

    CONSTRAINT "revenue_ledger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "revenue_ledger_hotelId_idx" ON "revenue_ledger"("hotelId");

-- CreateIndex
CREATE INDEX "revenue_ledger_createdAt_idx" ON "revenue_ledger"("createdAt");

-- AddForeignKey
ALTER TABLE "revenue_ledger" ADD CONSTRAINT "revenue_ledger_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
