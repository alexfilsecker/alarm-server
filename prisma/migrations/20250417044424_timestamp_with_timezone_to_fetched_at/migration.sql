-- AlterTable
ALTER TABLE "GmtOffset" ALTER COLUMN "fetchedAt" DROP DEFAULT,
ALTER COLUMN "fetchedAt" SET DATA TYPE TIMESTAMPTZ;
