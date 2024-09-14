/*
  Warnings:

  - Added the required column `fuel` to the `Fleet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fleet" ADD COLUMN     "fuel" INTEGER NOT NULL;
