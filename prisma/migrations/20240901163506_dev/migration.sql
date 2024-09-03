-- AlterTable
ALTER TABLE "User" ADD COLUMN     "research" TEXT[] DEFAULT ARRAY[]::TEXT[];
