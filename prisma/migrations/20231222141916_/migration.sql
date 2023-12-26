-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SUPER_USER';
