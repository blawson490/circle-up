import { useState } from 'react';
import { Card } from '@/app/app/lib/definitions';

interface CardListProps {
  cards: Card[];
  onUpdate: (card: Card) => void;
  onDelete: (id: number) => void;
}

export default function CardList({ cards, onUpdate, onDelete }: CardListProps) {
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const handleEdit = (card: Card) => {
    setEditingCard(card);
  };

  const handleSave = () => {
    if (editingCard) {
      onUpdate(editingCard);
      setEditingCard(null);
    }
  };

  return (
    <ul className="space-y-2">
      {cards.map((card) => (
        <li key={card.id} className="bg-white p-2 rounded shadow">
          {editingCard?.id === card.id ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editingCard.text}
                onChange={(e) => setEditingCard({ ...editingCard, text: e.target.value })}
                className="flex-grow p-1 border rounded mr-2"
              />
              <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>{card.text}</span>
              <div className='flex flex-row'>
                <button
                  onClick={() => handleEdit(card)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(card.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}