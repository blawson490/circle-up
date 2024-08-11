import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Deck, Card } from '@/app/app/lib/definitions';

const dataFilePath = path.join(process.cwd(), 'data.json');

async function readData() {
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

async function writeData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const newCard = await request.json();
    const data = await readData();
    const deckId = parseInt(params.id);
    const deckIndex = data.decks.findIndex((d: Deck) => d.id === deckId);
    
    if (deckIndex === -1) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }
    
    const maxCardId = Math.max(...data.decks[deckIndex].cards.map((card: Card) => card.id), 0);
    const cardWithId = { ...newCard, id: maxCardId + 1 };
    
    data.decks[deckIndex].cards.push(cardWithId);
    await writeData(data);
    
    return NextResponse.json(cardWithId, { status: 201 });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}