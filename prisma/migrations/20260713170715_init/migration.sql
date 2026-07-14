-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "discription" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "technicianId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicianProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
