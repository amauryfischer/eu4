/*
  Warnings:

  - You are about to drop the `ScheduledJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Ship" ADD COLUMN     "planetId" TEXT;

-- DropTable
DROP TABLE "ScheduledJob";
