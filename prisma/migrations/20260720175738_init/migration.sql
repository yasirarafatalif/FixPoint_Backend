-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "cardBrand" TEXT,
ADD COLUMN     "cardIssuer" TEXT,
ADD COLUMN     "cardType" TEXT;
