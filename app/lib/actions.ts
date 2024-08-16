'use server'

import { PrismaClient } from '@prisma/client'
import { Category, Collection, Deck, Card } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient()

export async function getCategories() {
  return await prisma.category.findMany({
    include: { collections: true },
  })
}

export async function getCollectionById(id: number) {
  return await prisma.collection.findUnique({
    where: { id },
    include: {
      category: true,
      decks: {
        include: {
          cards: true,
        }
      }
    }
  })
}

export async function getDeckById(deckId: number) {
  return await prisma.deck.findUnique({
    where: { id: deckId },
    include: {
      cards: true,
      collection: {
        select: {
          id: true,
          color: true
        }
      }
    }
  });
}

export async function createCategory(name: string) {
  let newCategory;

  try {
    newCategory = await prisma.category.create({
      data: { name },
    });
  } catch (error) {
    console.error('Failed to create category:', error);
    return { success: false, error: 'Failed to create category' };
  }

  // Revalidate path outside of try-catch
  revalidatePath('/admin');
  revalidatePath('/')

  return { success: true, data: newCategory };
}

export async function createCollection(data: any) {
  let newCollection;

  try {
    newCollection = await prisma.collection.create({
      data: {
        title: data.title,
        description: data.description,
        color: data.color,
        icon: data.icon,
        category: {
          connect: { id: data.category.connect.id }
        }
      }
    });
  } catch (error) {
    console.error('Failed to create collection:', error);
    return { success: false, error: 'Failed to create collection' };
  }

  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true, data: newCollection };
}

// Admin Actions

// READ
export async function getAdminCategories(): Promise<Category[]> {
  const prismaCategories = await prisma.category.findMany({
    include: { 
      collections: true
    }
  });

  const categories: Category[] = prismaCategories.map(prismaCategory => {
    const category: Category = {
      id: prismaCategory.id,
      name: prismaCategory.name,
      collections: [],
      createdAt: prismaCategory.createdAt,
      updatedAt: prismaCategory.updatedAt
    };

    category.collections = prismaCategory.collections.map(prismaCollection => {
      const collection: Collection = {
        id: prismaCollection.id,
        title: prismaCollection.title,
        description: prismaCollection.description ?? undefined,
        color: prismaCollection.color ?? '',
        icon: prismaCollection.icon ?? '',
        categoryId: prismaCollection.categoryId,
        category: category,  // Circular reference
        decks: [],  // Empty array as requested
        createdAt: prismaCollection.createdAt,
        updatedAt: prismaCollection.updatedAt
      };
      return collection;
    });

    return category;
  });

  return categories;
}

interface AdminCollectionsResult {
  categoryName: string;
  collections: Collection[];
}

export async function getAdminCollections(categoryId: number): Promise<AdminCollectionsResult> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      collections: {
        include: {
          decks: true
        }
      }
    }
  });

  if (!category) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  const collections: Collection[] = category.collections.map(prismaCollection => {
    const collection: Collection = {
      id: prismaCollection.id,
      title: prismaCollection.title,
      description: prismaCollection.description ?? undefined,
      color: prismaCollection.color ?? '',
      icon: prismaCollection.icon ?? '',
      categoryId: prismaCollection.categoryId,
      category: {
        id: category.id,
        name: category.name,
        collections: [],  // We don't need to populate this to avoid circular references
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      },
      decks: prismaCollection.decks.map(prismaDeck => ({
        id: prismaDeck.id,
        title: prismaDeck.title,
        description: prismaDeck.description ?? undefined,
        date: prismaDeck.date ?? undefined,
        collectionId: prismaDeck.collectionId,
        collection: {} as Collection,  // We'll set this to an empty object to avoid circular references
        cards: [],  // We're not fetching cards in this query
        createdAt: prismaDeck.createdAt,
        updatedAt: prismaDeck.updatedAt
      })),
      createdAt: prismaCollection.createdAt,
      updatedAt: prismaCollection.updatedAt
    };

    // Set the collection reference for each deck
    collection.decks.forEach(deck => {
      deck.collection = collection;
    });

    return collection;
  });

  return {
    categoryName: category.name,
    collections: collections
  };
}

interface AdminDecksResult {
  collectionName: string;
  decks: Deck[];
}

export async function getAdminDecks(collectionId: number): Promise<AdminDecksResult> {
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      decks: {
        include: {
          cards: true
        }
      }
    }
  });

  if (!collection) {
    throw new Error(`Collection with ID ${collectionId} not found`);
  }

  // @ts-ignore 
  const decks: Deck[] = collection.decks.map(prismaDeck => ({
    id: prismaDeck.id,
    title: prismaDeck.title,
    description: prismaDeck.description ?? undefined,
    date: prismaDeck.date ?? undefined,
    collectionId: prismaDeck.collectionId,
    collection: {
      id: collection.id,
      title: collection.title,
      // We don't need to populate other fields to avoid circular references
    },
    cards: prismaDeck.cards.map(prismaCard => ({
      id: prismaCard.id,
      text: prismaCard.text,
      deckId: prismaCard.deckId,
      deck: {} as Deck,  // We'll set this to an empty object to avoid circular references
      createdAt: prismaCard.createdAt,
      updatedAt: prismaCard.updatedAt
    })),
    createdAt: prismaDeck.createdAt,
    updatedAt: prismaDeck.updatedAt
  }));

  // Set the deck reference for each card
  decks.forEach(deck => {
    deck.cards.forEach(card => {
      card.deck = deck;
    });
  });

  return {
    collectionName: collection.title,
    decks: decks
  };
}

// DELETE
export async function deleteAdminCategory(categoryId: number): Promise<void> {
  try {
    // Delete the category and all related collections, decks, and cards
    await prisma.category.delete({
      where: { id: categoryId },
      include: {
        collections: {
          include: {
            decks: {
              include: {
                cards: true
              }
            }
          }
        }
      }
    });
    revalidatePath("/manage");
  } catch (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error);
    throw new Error(`Failed to delete category with ID ${categoryId}`);
  }
}

export async function deleteAdminCollection(collectionId: number): Promise<void> {
  try {
    // Delete the collection and all related decks and cards
    await prisma.collection.delete({
      where: { id: collectionId },
      include: {
        decks: {
          include: {
            cards: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error deleting collection with ID ${collectionId}:`, error);
    throw new Error(`Failed to delete collection with ID ${collectionId}`);
  }
}

export async function deleteAdminDeck(deckId: number): Promise<void> {
  try {
    // Delete the deck and all related cards
    await prisma.deck.delete({
      where: { id: deckId },
      include: {
        cards: true
      }
    });
  } catch (error) {
    console.error(`Error deleting deck with ID ${deckId}:`, error);
    throw new Error(`Failed to delete deck with ID ${deckId}`);
  }
}

export async function deleteAdminCard(cardId: number): Promise<void> {
  try {
    await prisma.card.delete({
      where: { id: cardId }
    });
  } catch (error) {
    console.error(`Error deleting card with ID ${cardId}:`, error);
    throw new Error(`Failed to delete card with ID ${cardId}`);
  }
}

export async function addDeck(data: {
  title: string
  description?: string
  date?: Date
  collectionId: number
  cards: { text: string }[]
}) {
  return await prisma.deck.create({
    data: {
      title: data.title,
      description: data.description,
      date: data.date,
      collectionId: data.collectionId,
      cards: {
        create: data.cards
      }
    },
    include: {
      cards: true
    }
  })
}

export async function updateDeckCards(deckId: number, newCards: Card[]) {
  try {
    const updatedDeck = await prisma.$transaction(async (prisma) => {
      // Fetch current cards
      const currentCards = await prisma.card.findMany({
        where: { deckId: deckId },
      });

      // Prepare operations
      const operations = [];

      // Update existing cards and create new ones
      for (const card of newCards) {
        if (card.id && currentCards.find(c => c.id === card.id)) {
          // Update existing card
          operations.push(
            prisma.card.update({
              where: { id: card.id },
              data: { text: card.text, updatedAt: new Date() },
            })
          );
        } else {
          // Create new card
          operations.push(
            prisma.card.create({
              data: {
                text: card.text,
                deckId: deckId,
              },
            })
          );
        }
      }

      // Delete cards that are no longer present
      const newCardIds = newCards.map(card => card.id).filter(Boolean);
      const cardsToDelete = currentCards.filter(card => !newCardIds.includes(card.id));
      
      operations.push(
        ...cardsToDelete.map(card => 
          prisma.card.delete({
            where: { id: card.id },
          })
        )
      );

      // Execute all operations
      await Promise.all(operations);

      // Fetch and return the updated deck
      return await prisma.deck.findUnique({
        where: { id: deckId },
        include: { cards: true },
      });
    });

    if (!updatedDeck) {
      throw new Error('Deck not found after update');
    }

    return updatedDeck;
  } catch (error) {
    console.error('Failed to update deck cards:', error);
    throw error;  // Re-throw the error so it can be handled by the caller
  }
}