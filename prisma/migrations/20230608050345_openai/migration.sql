-- CreateTable
CREATE TABLE "DailyQuote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT NOT NULL,
    "creationDate" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyQuote_creationDate_key" ON "DailyQuote"("creationDate");
