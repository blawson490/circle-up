'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Deck, Card } from '@/app/app/lib/definitions';
import DeckList from '@/app/admin/ui/components/DeckList';
import DeckForm from '@/app/admin/ui/components/DeckForm';
import CardList from '@/app/admin/ui/components/CardList';
import CardForm from '@/app/admin/ui/components/CardForm';
import { ScrollArea } from '../app/ui/scrollarea';

export default function AdminPanel() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const containerRef = useRef(null);
  const [deckListHeight, setDeckListHeight] = useState(0);
  const [cardListHeight, setCardListHeight] = useState(0);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    const response = await fetch('/api/decks');
    const data = await response.json();
    setDecks(data);
  };

  const handleDeckSelect = (deck: Deck) => {
    setSelectedDeck(deck);
  };

  const handleDeckCreate = async (newDeck: Omit<Deck, 'id' | 'cards'>) => {
    const response = await fetch('/api/decks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDeck),
    });
    if (response.ok) {
      fetchDecks();
    }
  };

  const handleDeckUpdate = async (updatedDeck: Deck) => {
    const response = await fetch(`/api/decks/${updatedDeck.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDeck),
    });
    if (response.ok) {
      fetchDecks();
      setSelectedDeck(updatedDeck);
    }
  };

  const handleDeckDelete = async (deckId: number) => {
    const response = await fetch(`/api/decks/${deckId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchDecks();
      setSelectedDeck(null);
    }
  };

  const handleCardCreate = async (newCard: Omit<Card, 'id'>) => {
    if (selectedDeck) {
      const response = await fetch(`/api/decks/${selectedDeck.id}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });
      if (response.ok) {
        const updatedDeck = await response.json();
        setSelectedDeck(updatedDeck);
        fetchDecks();
      }
    }
  };

  const handleCardUpdate = async (updatedCard: Card) => {
    if (selectedDeck) {
      const response = await fetch(`/api/decks/${selectedDeck.id}/cards/${updatedCard.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCard),
      });
      if (response.ok) {
        const updatedDeck = await response.json();
        setSelectedDeck(updatedDeck);
        fetchDecks();
      }
    }
  };

  const handleCardDelete = async (cardId: number) => {
    if (selectedDeck) {
      const response = await fetch(`/api/decks/${selectedDeck.id}/cards/${cardId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedDeck = await response.json();
        setSelectedDeck(updatedDeck);
        fetchDecks();
      }
    }
  };

  useLayoutEffect(() => {
    const topBarHeight = 50;
    const deckFormHeight = 350;
    const cardFormHeight = 165;
    const screenHeight = window.innerHeight;
    const remainingDecksHeight = screenHeight - (topBarHeight + deckFormHeight);
    const remainingCardsHeight = screenHeight - (topBarHeight + cardFormHeight);

    setDeckListHeight(remainingDecksHeight);
    setCardListHeight(remainingCardsHeight);
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CircleUp Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        <div className='flex flex-col gap-4'>
          <h2 className="text-2xl font-semibold">Decks</h2>
          <DeckForm onSubmit={handleDeckCreate} />
          <ScrollArea ref={containerRef} style={{ height: `${deckListHeight}px` }} className="rounded-none">
            <DeckList
                decks={decks}
                onSelect={handleDeckSelect}
                onDelete={handleDeckDelete}
            />    
          </ScrollArea>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Cards</h2>
          {selectedDeck ? (
            <>
              <CardForm onSubmit={handleCardCreate} />
              <ScrollArea ref={containerRef} style={{ height: `${cardListHeight}px` }} className="rounded-none">
              <CardList
                cards={selectedDeck.cards}
                onUpdate={handleCardUpdate}
                onDelete={handleCardDelete}
              />
              </ScrollArea>
            </>
          ) : (
            <p>Select a deck to manage cards</p>
          )}
        </div>
      </div>
    </div>
  );
}