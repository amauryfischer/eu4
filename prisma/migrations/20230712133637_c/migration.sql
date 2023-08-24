/*
  Warnings:

  - Added the required column `type` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `details` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Planet" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "details",
ADD COLUMN     "details" JSONB NOT NULL;
