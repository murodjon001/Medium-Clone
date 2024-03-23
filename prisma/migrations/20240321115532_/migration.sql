/*
  Warnings:

  - A unique constraint covering the columns `[confirmCode]` on the table `Superuser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Superuser" ADD COLUMN     "confirmCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Superuser_confirmCode_key" ON "Superuser"("confirmCode");
