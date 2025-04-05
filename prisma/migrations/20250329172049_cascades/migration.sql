-- DropForeignKey
ALTER TABLE "Happening" DROP CONSTRAINT "Happening_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "HappeningFollow" DROP CONSTRAINT "HappeningFollow_userId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceApplication" DROP CONSTRAINT "PlaceApplication_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceApplication" DROP CONSTRAINT "PlaceApplication_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_geoCoordinateId_fkey";

-- AddForeignKey
ALTER TABLE "Happening" ADD CONSTRAINT "Happening_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceApplication" ADD CONSTRAINT "PlaceApplication_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceApplication" ADD CONSTRAINT "PlaceApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HappeningFollow" ADD CONSTRAINT "HappeningFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_geoCoordinateId_fkey" FOREIGN KEY ("geoCoordinateId") REFERENCES "GeoCoordinate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
