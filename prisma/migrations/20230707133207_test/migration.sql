-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "salaire" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "dateDebut" TEXT NOT NULL DEFAULT '',
    "dateFin" TEXT NOT NULL DEFAULT '',
    "scenario" TEXT NOT NULL DEFAULT '',
    "service" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Employee" ("dateDebut", "dateFin", "id", "nom", "salaire", "scenario", "type") SELECT "dateDebut", "dateFin", "id", "nom", "salaire", "scenario", "type" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
