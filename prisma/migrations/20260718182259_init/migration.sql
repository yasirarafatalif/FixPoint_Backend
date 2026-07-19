/*
  Warnings:

  - Made the column `categoryId` on table `Services` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LogInRole" AS ENUM ('CUSTOMER', 'TECHNICIAN');

-- CreateEnum
CREATE TYPE "TechnicianBookingStatus" AS ENUM ('AVAILABLE', 'BOOKED');

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_categoryId_fkey";

-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
