-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "happeningId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_happeningId_fkey" FOREIGN KEY ("happeningId") REFERENCES "Happening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
