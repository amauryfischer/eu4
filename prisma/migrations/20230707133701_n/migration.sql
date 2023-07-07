-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Charge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "montant" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "frequency" TEXT NOT NULL DEFAULT '',
    "dateDebut" TEXT NOT NULL DEFAULT '',
    "dateFin" TEXT NOT NULL DEFAULT '',
    "scenario" TEXT NOT NULL DEFAULT '',
    "service" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Charge" ("dateDebut", "dateFin", "frequency", "id", "montant", "nom", "scenario", "type") SELECT "dateDebut", "dateFin", "frequency", "id", "montant", "nom", "scenario", "type" FROM "Charge";
DROP TABLE "Charge";
ALTER TABLE "new_Charge" RENAME TO "Charge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
