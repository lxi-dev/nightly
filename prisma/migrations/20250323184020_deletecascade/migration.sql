-- DropForeignKey
ALTER TABLE "HappeningFollow" DROP CONSTRAINT "HappeningFollow_happeningId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_happeningId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_placeId_fkey";

-- AddForeignKey
ALTER TABLE "HappeningFollow" ADD CONSTRAINT "HappeningFollow_happeningId_fkey" FOREIGN KEY ("happeningId") REFERENCES "Happening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_happeningId_fkey" FOREIGN KEY ("happeningId") REFERENCES "Happening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
