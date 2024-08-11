import fs from 'fs/promises';
import path from 'path';
import { Deck } from '../definitions';

export async function getDeckById(id: number): Promise<Deck | null> {
  try {
    const filePath = path.join(process.cwd(), 'data.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const decks: Deck[] = JSON.parse(jsonData);
    
    const deck = decks.find(deck => deck.id === id);
    return deck || null;
  } catch (error) {
    console.error('Error reading deck data:', error);
    return null;
  }
}