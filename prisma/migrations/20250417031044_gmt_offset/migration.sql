-- CreateTable
CREATE TABLE "GmtOffset" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GmtOffset_pkey" PRIMARY KEY ("id")
);
