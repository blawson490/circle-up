-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "deckId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("id", "text", "deckId", "createdAt", "updatedAt") 
SELECT "id", "text", "deckId", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";

CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Category" ("id", "name", "createdAt", "updatedAt") 
SELECT "id", "name", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";

CREATE TABLE "new_Collection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Collection_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Collection" ("id", "title", "description", "color", "icon", "categoryId", "createdAt", "updatedAt") 
SELECT "id", "title", "description", "color", "icon", "categoryId", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Collection";
DROP TABLE "Collection";
ALTER TABLE "new_Collection" RENAME TO "Collection";

CREATE TABLE "new_Deck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME,
    "collectionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Deck_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deck" ("id", "title", "description", "date", "collectionId", "createdAt", "updatedAt") 
SELECT "id", "title", "description", "date", "collectionId", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";

PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;