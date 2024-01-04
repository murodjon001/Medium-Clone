/*
  Warnings:

  - The `like` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "like",
ADD COLUMN     "like" INTEGER;

-- CreateTable
CREATE TABLE "LikePost" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "LikePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LikePostToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LikePost_user_id_key" ON "LikePost"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_LikePostToPost_AB_unique" ON "_LikePostToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LikePostToPost_B_index" ON "_LikePostToPost"("B");

-- AddForeignKey
ALTER TABLE "LikePost" ADD CONSTRAINT "LikePost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikePostToPost" ADD CONSTRAINT "_LikePostToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "LikePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikePostToPost" ADD CONSTRAINT "_LikePostToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
