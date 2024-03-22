/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "aboutAuthor" TEXT,
ADD COLUMN     "surname" TEXT NOT NULL DEFAULT 'not_set';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToSubcategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_title_key" ON "Subcategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToSubcategory_AB_unique" ON "_AuthorToSubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToSubcategory_B_index" ON "_AuthorToSubcategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToSubcategory" ADD CONSTRAINT "_AuthorToSubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToSubcategory" ADD CONSTRAINT "_AuthorToSubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
