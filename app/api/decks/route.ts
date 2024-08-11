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

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.decks);
  } catch (error) {
    console.error('Error fetching decks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newDeck = await request.json();
    const data = await readData();
    
    const maxId = Math.max(...data.decks.map((deck: Deck) => deck.id), 0);
    const deckWithId = { ...newDeck, id: maxId + 1, cards: [] };
    
    data.decks.push(deckWithId);
    await writeData(data);
    
    return NextResponse.json(deckWithId, { status: 201 });
  } catch (error) {
    console.error('Error creating deck:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}