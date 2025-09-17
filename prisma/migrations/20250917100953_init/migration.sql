-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "public"."DealType" AS ENUM ('ROOM_UPGRADE', 'FOOD_BEVERAGE', 'EXPERIENCE', 'CONCIERGE_SERVICE');

-- CreateTable
CREATE TABLE "public"."ServiceTask" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "public"."TaskStatus" NOT NULL DEFAULT 'PENDING',
    "roomNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UpsellDeal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "type" "public"."DealType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UpsellDeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceTask_status_idx" ON "public"."ServiceTask"("status");

-- CreateIndex
CREATE INDEX "ServiceTask_createdAt_idx" ON "public"."ServiceTask"("createdAt");

-- CreateIndex
CREATE INDEX "UpsellDeal_type_idx" ON "public"."UpsellDeal"("type");

-- CreateIndex
CREATE INDEX "UpsellDeal_createdAt_idx" ON "public"."UpsellDeal"("createdAt");
