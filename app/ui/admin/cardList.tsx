"use client"
import React, { useState } from 'react';
import { X, Check, Plus, Pencil } from 'lucide-react';
import { Input } from '@/app/ui/input';
import { Button } from '@/app/ui/button';

interface Card {
  id: number;
  text: string;
  deckId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CardListProps {
  deckId: number;
  initialCards: Card[];
  onCardsChange: (deckId: number, cards: Card[]) => void;
}

const CardList: React.FC<CardListProps> = ({ deckId, initialCards, onCardsChange }) => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [newCardText, setNewCardText] = useState('');

  const addCard = () => {
    if (newCardText.trim()) {
      const newCard: Card = {
        id: Date.now(),
        text: newCardText.trim(),
        deckId: deckId, 
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const updatedCards = [...cards, newCard];
      setCards(updatedCards);
      onCardsChange(deckId, updatedCards);
      setNewCardText('');
    }
  };

  const removeCard = (id: number) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
    onCardsChange(deckId, updatedCards);
  };

  const startEditing = (id: number) => {
    setEditingCard(id);
    const card = cards.find((card) => card.id === id);
    if (card) {
      setOriginalText(card.text);
    } else {
      console.error(`Card not found with id ${id}`);
    }
  };

  const updateCardText = (id: number, newText: string) => {
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, text: newText } : card
    );
    setCards(updatedCards);
  };

  const saveEdit = (id: number, newText: string) => {
    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, text: newText, updatedAt: new Date() } : card
    );
    setCards(updatedCards);
    onCardsChange(deckId, updatedCards);
    setEditingCard(null);
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === editingCard ? { ...card, text: originalText ?? card.text } : card
      )
    );
    setOriginalText(null);
  };

  return (
    <div className="space-y-4">
      {cards.map(card => (
        <div key={card.id} className="flex items-center space-x-2 bg-white p-2 rounded-md shadow">
          {editingCard === card.id ? (
            <>
              <Input
                value={card.text}
                onChange={(e) => updateCardText(card.id, e.target.value)}
                className="flex-grow"
              />
              <Button onClick={() => saveEdit(card.id, card.text)} size="icon">
                <Check className="h-4 w-4" />
              </Button>
              <Button onClick={cancelEdit} size="icon" variant="outline">
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <span className="flex-grow">{card.text}</span>
              <Button onClick={() => startEditing(card.id)} size="icon" variant="ghost">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button onClick={() => removeCard(card.id)} size="icon" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <Input
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="Enter new card text"
          className="flex-grow"
        />
        <Button onClick={addCard} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CardList;