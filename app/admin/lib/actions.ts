import path from "path";
import { promises as fs } from 'fs';
import { Deck, Card } from "@/app/app/lib/definitions";

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function fetchAllDecks(){
  try {
        const jsonData = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(jsonData);
        const decks = data.decks as Deck[];
        return decks;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error reading decks: ${error.message}`);
    } else {
      console.error('Unknown error');
    }
    return []; 
  }
}

export async function fetchFilteredDecks(query: string) {
  try {
    const jsonData = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(jsonData);
    const decks = data.decks as Deck[];

    if (!query) {
      return decks; // Return all decks if no query is provided
    }

    const lowercaseQuery = query.toLowerCase();

    const filteredDecks = decks.filter(deck => {
      // Check deck attributes
      if (
        deck.name.toLowerCase().includes(lowercaseQuery) ||
        deck.description.toLowerCase().includes(lowercaseQuery) ||
        deck.color.toLowerCase().includes(lowercaseQuery) ||
        deck.icon.toLowerCase().includes(lowercaseQuery)
      ) {
        return true;
      }

      // Check card attributes
      if (deck.cards && deck.cards.length > 0) {
        return deck.cards.some(card =>
          card.text.toLowerCase().includes(lowercaseQuery)
        );
      }

      return false;
    });

    return filteredDecks;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error reading decks: ${error.message}`);
    } else {
      console.error('Unknown error');
    }
    return [];
  }
}