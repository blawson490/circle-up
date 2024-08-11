import { Deck } from '@/app/app/lib/definitions';

interface DeckListProps {
  decks: Deck[];
  onSelect: (deck: Deck) => void;
  onDelete: (id: number) => void;
}

export default function DeckList({ decks, onSelect, onDelete }: DeckListProps) {
  return (
    <ul className="space-y-2">
      {decks.map((deck) => (
        <li key={deck.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
          <span className="font-semibold">{deck.name}</span>
          <div>
            <button
              onClick={() => onSelect(deck)}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(deck.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}