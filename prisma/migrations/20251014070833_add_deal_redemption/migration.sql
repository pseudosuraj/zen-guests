-- CreateTable
CREATE TABLE "DealRedemption" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "guestName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fulfilledAt" TIMESTAMP(3),

    CONSTRAINT "DealRedemption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DealRedemption" ADD CONSTRAINT "DealRedemption_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealRedemption" ADD CONSTRAINT "DealRedemption_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
