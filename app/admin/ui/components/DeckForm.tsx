import { useState } from 'react';
import { Deck } from '@/app/app/lib/definitions';

interface DeckFormProps {
  onSubmit: (deck: Omit<Deck, 'id' | 'cards'>) => void;
}

export default function DeckForm({ onSubmit }: DeckFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, color, icon });
    setName('');
    setDescription('');
    setColor('');
    setIcon('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Deck Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="Icon"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Add Deck
      </button>
    </form>
  );
}