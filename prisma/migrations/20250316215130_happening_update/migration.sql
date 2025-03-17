-- AlterTable
ALTER TABLE "Happening" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "externalLinks" TEXT[],
ADD COLUMN     "helpingHandsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxParticipants" INTEGER,
ADD COLUMN     "postsEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "privacyLevel" TEXT NOT NULL DEFAULT 'open',
ADD COLUMN     "recurrencePattern" TEXT,
ADD COLUMN     "tags" TEXT[];
