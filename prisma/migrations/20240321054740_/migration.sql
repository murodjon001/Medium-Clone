/*
  Warnings:

  - A unique constraint covering the columns `[confirmCode]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Author_confirmCode_key" ON "Author"("confirmCode");
