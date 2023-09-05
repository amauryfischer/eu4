/*
  Warnings:

  - Made the column `fleetId` on table `Ship` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ship" ADD COLUMN     "shipIds" TEXT[],
ALTER COLUMN "fleetId" SET NOT NULL;
