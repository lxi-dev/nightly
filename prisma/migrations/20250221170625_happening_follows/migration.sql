-- CreateTable
CREATE TABLE "HappeningFollow" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "happeningId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HappeningFollow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HappeningFollow_userId_happeningId_key" ON "HappeningFollow"("userId", "happeningId");

-- AddForeignKey
ALTER TABLE "HappeningFollow" ADD CONSTRAINT "HappeningFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HappeningFollow" ADD CONSTRAINT "HappeningFollow_happeningId_fkey" FOREIGN KEY ("happeningId") REFERENCES "Happening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
