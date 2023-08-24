/*
  Warnings:

  - Added the required column `resourcesId` to the `Planet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Planet" ADD COLUMN     "resourcesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "Resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
