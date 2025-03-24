-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "applicationsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
