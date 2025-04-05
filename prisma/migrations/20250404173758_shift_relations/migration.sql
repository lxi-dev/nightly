/*
  Warnings:

  - A unique constraint covering the columns `[userId,timeSlotId]` on the table `ShiftApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ShiftApplication_userId_scheduleId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ShiftApplication_userId_timeSlotId_key" ON "ShiftApplication"("userId", "timeSlotId");
