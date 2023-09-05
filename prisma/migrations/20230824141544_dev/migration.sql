/*
  Warnings:

  - You are about to drop the column `resourcesId` on the `Fleet` table. All the data in the column will be lost.
  - You are about to drop the column `systemPosition` on the `Fleet` table. All the data in the column will be lost.
  - You are about to drop the column `shipIds` on the `Ship` table. All the data in the column will be lost.
  - Added the required column `position` to the `Fleet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fleet" DROP COLUMN "resourcesId",
DROP COLUMN "systemPosition",
ADD COLUMN     "position" JSONB NOT NULL,
ADD COLUMN     "shipIds" TEXT[];

-- AlterTable
ALTER TABLE "Ship" DROP COLUMN "shipIds";
