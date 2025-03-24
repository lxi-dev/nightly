-- AlterTable
ALTER TABLE "Happening" ADD COLUMN     "venueId" TEXT,
ALTER COLUMN "venue" DROP NOT NULL;
