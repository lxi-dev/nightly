/*
  Warnings:

  - A unique constraint covering the columns `[happeningId,placeId,id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_happeningId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "placeId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "happeningId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "description" TEXT,
    "heartPlace" BOOLEAN NOT NULL,
    "openingHours" JSONB,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoCoordinate" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "GeoCoordinate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaceFollowers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GeoCoordinate_placeId_key" ON "GeoCoordinate"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaceFollowers_AB_unique" ON "_PlaceFollowers"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaceFollowers_B_index" ON "_PlaceFollowers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Post_happeningId_placeId_id_key" ON "Post"("happeningId", "placeId", "id");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoCoordinate" ADD CONSTRAINT "GeoCoordinate_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_happeningId_fkey" FOREIGN KEY ("happeningId") REFERENCES "Happening"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceFollowers" ADD CONSTRAINT "_PlaceFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceFollowers" ADD CONSTRAINT "_PlaceFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
