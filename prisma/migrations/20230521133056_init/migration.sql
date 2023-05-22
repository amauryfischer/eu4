-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Charge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "montant" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "frequency" TEXT NOT NULL DEFAULT '',
    "dateDebut" TEXT NOT NULL DEFAULT '',
    "dateFin" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Charge" ("frequency", "id", "montant", "nom", "type") SELECT "frequency", "id", "montant", "nom", "type" FROM "Charge";
DROP TABLE "Charge";
ALTER TABLE "new_Charge" RENAME TO "Charge";
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "salaire" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "dateDebut" TEXT NOT NULL DEFAULT '',
    "dateFin" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Employee" ("id", "nom", "salaire", "type") SELECT "id", "nom", "salaire", "type" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
