-- CreateTable
CREATE TABLE "Happening" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "text" TEXT,
    "dateHappening" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Happening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HappeningInvitees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HappeningInvitees_AB_unique" ON "_HappeningInvitees"("A", "B");

-- CreateIndex
CREATE INDEX "_HappeningInvitees_B_index" ON "_HappeningInvitees"("B");

-- AddForeignKey
ALTER TABLE "Happening" ADD CONSTRAINT "Happening_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HappeningInvitees" ADD CONSTRAINT "_HappeningInvitees_A_fkey" FOREIGN KEY ("A") REFERENCES "Happening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HappeningInvitees" ADD CONSTRAINT "_HappeningInvitees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
