/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `GeoCoordinate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `GeoCoordinate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GeoCoordinate" DROP CONSTRAINT "GeoCoordinate_placeId_fkey";

-- AlterTable
ALTER TABLE "GeoCoordinate" ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "placeId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GeoCoordinate_userId_key" ON "GeoCoordinate"("userId");

-- AddForeignKey
ALTER TABLE "GeoCoordinate" ADD CONSTRAINT "GeoCoordinate_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoCoordinate" ADD CONSTRAINT "GeoCoordinate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
