/*
  Warnings:

  - You are about to drop the column `userId` on the `GeoCoordinate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[geoCoordinateId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GeoCoordinate" DROP CONSTRAINT "GeoCoordinate_userId_fkey";

-- DropIndex
DROP INDEX "GeoCoordinate_userId_key";

-- AlterTable
ALTER TABLE "GeoCoordinate" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "geoCoordinateId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_geoCoordinateId_key" ON "User"("geoCoordinateId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_geoCoordinateId_fkey" FOREIGN KEY ("geoCoordinateId") REFERENCES "GeoCoordinate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
