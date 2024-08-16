import Link from "next/link";

interface DeckCardProps {
    deck: { id: number, title: string, description: string, date?: Date, cardCount: number},
    collectionId: number
  }
  

  export default function DeckCard({ deck, collectionId }: DeckCardProps) {
    return (
            <div
                className={`bg-white flex flex-col rounded-lg overflow-hidden shadow-lg w-full cursor-pointer`}
                >
                <div className="p-4 flex-1">
                  <h2 className="text-lg font-bold">{deck.title}</h2>
                  <p className="text-sm font-light text-gray-500">{deck.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600">
                      {deck.cardCount} cards
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {deck.date ? new Date(deck.date).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
            </div>
    );
  }