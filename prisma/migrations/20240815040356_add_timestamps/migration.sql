-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "deckId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("createdAt", "deckId", "id", "text", "updatedAt") SELECT "createdAt", "deckId", "id", "text", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Category";
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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Collection_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Collection" ("categoryId", "color", "createdAt", "description", "icon", "id", "title", "updatedAt") SELECT "categoryId", "color", "createdAt", "description", "icon", "id", "title", "updatedAt" FROM "Collection";
DROP TABLE "Collection";
ALTER TABLE "new_Collection" RENAME TO "Collection";
CREATE TABLE "new_Deck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME,
    "collectionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deck_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deck" ("collectionId", "createdAt", "date", "description", "id", "title", "updatedAt") SELECT "collectionId", "createdAt", "date", "description", "id", "title", "updatedAt" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
