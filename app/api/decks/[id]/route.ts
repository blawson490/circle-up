import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Deck } from '@/app/app/lib/definitions';

const dataFilePath = path.join(process.cwd(), 'data.json');

async function readData() {
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

async function writeData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readData();
    const deckId = parseInt(params.id);
    const deck = data.decks.find((d: Deck) => d.id === deckId);
    
    if (!deck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }
    
    return NextResponse.json(deck);
  } catch (error) {
    console.error('Error fetching deck:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedDeck = await request.json();
    const data = await readData();
    const deckId = parseInt(params.id);
    const deckIndex = data.decks.findIndex((d: Deck) => d.id === deckId);
    
    if (deckIndex === -1) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }
    
    data.decks[deckIndex] = { ...data.decks[deckIndex], ...updatedDeck };
    await writeData(data);
    
    return NextResponse.json(data.decks[deckIndex]);
  } catch (error) {
    console.error('Error updating deck:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readData();
    const deckId = parseInt(params.id);
    const deckIndex = data.decks.findIndex((d: Deck) => d.id === deckId);
    
    if (deckIndex === -1) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }
    
    data.decks.splice(deckIndex, 1);
    await writeData(data);
    
    return NextResponse.json({ message: 'Deck deleted successfully' });
  } catch (error) {
    console.error('Error deleting deck:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}