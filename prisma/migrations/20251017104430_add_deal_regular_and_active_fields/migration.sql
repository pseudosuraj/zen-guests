-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "category" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isRegular" BOOLEAN NOT NULL DEFAULT false;
