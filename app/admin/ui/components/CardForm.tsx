import { useState } from 'react';
import { Card } from '@/app/app/lib/definitions';

interface CardFormProps {
  onSubmit: (card: Omit<Card, 'id'>) => void;
}

export default function CardForm({ onSubmit }: CardFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Card Text"
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Add Card
      </button>
    </form>
  );
}