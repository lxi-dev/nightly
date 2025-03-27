/*
  Warnings:

  - You are about to drop the column `heartPlace` on the `Place` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "heartPlace",
ADD COLUMN     "group" BOOLEAN NOT NULL DEFAULT false;
