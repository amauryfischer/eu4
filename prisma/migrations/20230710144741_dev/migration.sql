/*
  Warnings:

  - You are about to drop the column `systemPositionId` on the `Fleet` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `Pirate` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `resourcesId` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the `ModuleString` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemPosition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `position` to the `Asteroid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resources` to the `Asteroid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargo` to the `Fleet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `systemPosition` to the `Fleet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Pirate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resources` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modules` to the `Ship` table without a default value. This is not possible if the table is not empty.
  - Made the column `fleetId` on table `Ship` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Asteroid" DROP CONSTRAINT "Asteroid_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Fleet" DROP CONSTRAINT "Fleet_resourcesId_fkey";

-- DropForeignKey
ALTER TABLE "Fleet" DROP CONSTRAINT "Fleet_systemPositionId_fkey";

-- DropForeignKey
ALTER TABLE "Fleet" DROP CONSTRAINT "Fleet_userId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleString" DROP CONSTRAINT "ModuleString_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Pirate" DROP CONSTRAINT "Pirate_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Planet" DROP CONSTRAINT "Planet_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Planet" DROP CONSTRAINT "Planet_resourcesId_fkey";

-- DropForeignKey
ALTER TABLE "Planet" DROP CONSTRAINT "Planet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Resources" DROP CONSTRAINT "Resources_asteroidId_fkey";

-- DropForeignKey
ALTER TABLE "Ship" DROP CONSTRAINT "Ship_fleetId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Asteroid" ADD COLUMN     "position" JSONB NOT NULL,
ADD COLUMN     "resources" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Fleet" DROP COLUMN "systemPositionId",
ADD COLUMN     "cargo" JSONB NOT NULL,
ADD COLUMN     "systemPosition" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Pirate" DROP COLUMN "positionId",
ADD COLUMN     "position" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Planet" DROP COLUMN "positionId",
DROP COLUMN "resourcesId",
ADD COLUMN     "position" JSONB NOT NULL,
ADD COLUMN     "resources" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Ship" ADD COLUMN     "modules" JSONB NOT NULL,
ALTER COLUMN "fleetId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "ModuleString";

-- DropTable
DROP TABLE "Resources";

-- DropTable
DROP TABLE "SystemPosition";
