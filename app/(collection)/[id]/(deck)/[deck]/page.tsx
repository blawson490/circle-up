import { Card, CardContent } from "@/app/ui/card"
import Carousel from "@/app/ui/carousel";
import TopBar from "@/app/ui/topBar";
import { getDeckById } from "@/app/lib/actions";
import { notFound } from 'next/navigation';
import PageViewTracker from "@/app/ui/analytics/utils/PageViewTracker";

export default async function DeckPage({ params }: { params: { id: string, deck: string } }) {
  const deckId = parseInt(params.deck);
  
  if (isNaN(deckId)) {
    notFound();
  }

  const deck = await getDeckById(deckId);

  if (!deck) {
    notFound();
  }

  const { collection } = deck;

  return (
    <div className="h-screen relative flex flex-col bg-gray-100">
      <PageViewTracker path={`/${deck.collectionId}/${deckId}`} isSSR={true} />
      <TopBar 
        title={deck.title} 
        className={`bg-${collection.color}-500 text-white`} 
        backLink={`/${collection.id}`}
      />
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