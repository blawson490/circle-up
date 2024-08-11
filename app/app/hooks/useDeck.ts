import { useState, useEffect } from 'react';
import { Deck } from '@/app/app/lib/definitions';

export function useDeck(id: number) {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch(`/api/decks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch deck');
        }
        const data = await response.json();
        setDeck(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeck();
  }, [id]);

  return { deck, isLoading, error };
}