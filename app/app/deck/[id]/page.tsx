'use client';
import { useDeck } from "@/app/app/hooks/useDeck";
import TopBar from "../../ui/topbar/topbar";
import { Card, CardContent } from "@/app/app/ui/components/card"
import Carousel from "../../ui/cards/carousel";
import { useEffect } from "react";

export default function DeckPage({ params }: { params: { id: string } }) {
  const deckId = parseInt(params.id);
  const { deck, isLoading, error } = useDeck(deckId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!deck) return <div>Deck not found</div>;

  if(!isLoading && deck) {
  return (
        <div className="h-screen relative flex flex-col bg-gray-100">
          <TopBar title={deck.name} className={`${deck.color} text-white`} backLink={'/app/'}/>
          <div className="flex flex-grow h-full overflow-hidden items-center justify-center my-4">
            <Carousel>
              {deck.cards.map((card) => (
                <div key={card.id} className="w-full h-[90%] py-8 px-4 flex items-center justify-center">
                  <Card className="w-full h-full">
                    <CardContent className="flex items-center justify-center p-6 h-full">
                      <span className="text-xl font-semibold">{card.text}</span>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      );
    }
    }