/*
  Warnings:

  - You are about to drop the column `schedule` on the `Club` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "imageUrl" TEXT,
    "hasParking" BOOLEAN NOT NULL DEFAULT false,
    "hasShower" BOOLEAN NOT NULL DEFAULT false,
    "hasStore" BOOLEAN NOT NULL DEFAULT false,
    "hasTrainer" BOOLEAN NOT NULL DEFAULT false,
    "priceMonthly" INTEGER,
    "level" TEXT,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "capacity" INTEGER,
    "currentMembers" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Club" ("address", "createdAt", "description", "email", "facebook", "hasParking", "hasShower", "hasStore", "hasTrainer", "id", "imageUrl", "instagram", "latitude", "longitude", "name", "phone", "priceMonthly", "sport", "updatedAt", "website") SELECT "address", "createdAt", "description", "email", "facebook", "hasParking", "hasShower", "hasStore", "hasTrainer", "id", "imageUrl", "instagram", "latitude", "longitude", "name", "phone", "priceMonthly", "sport", "updatedAt", "website" FROM "Club";
DROP TABLE "Club";
ALTER TABLE "new_Club" RENAME TO "Club";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
