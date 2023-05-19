/*
  Warnings:

  - You are about to drop the column `Nom` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Salaire` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `nom` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaire` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "salaire" INTEGER NOT NULL
);
INSERT INTO "new_Employee" ("id") SELECT "id" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
