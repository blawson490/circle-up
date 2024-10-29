// app/collections/[id]/page.tsx
import { getTailwindColor } from "@/utils/colorMap";
import { getCollectionById } from "@/app/lib/actions";
import TopBar from "@/app/ui/topBar";
import DeckCard from "@/app/ui/deckCard";
import Link from "next/link";
import PageViewTracker from "@/app/ui/analytics/utils/PageViewTracker";

interface CollectionPageProps {
  params: { id: string };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const id = parseInt(params.id, 10);
  const collection = await getCollectionById(id);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="w-full flex h-screen flex-col m-0 px-0 py-0 ">
      <PageViewTracker path={`/${id}`} isSSR={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title={collection.title}
          className={`bg-${getTailwindColor(collection.color)}-500 text-white`}
          backLink="/"
          rightSideComponent={
            // Sort button asc/desc defaulting to desc
            null
          }
        />
        <main className="flex flex-col space-y-4 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-4 py-8 pb-40">
          {collection.decks.length > 0 ? (
            collection.decks
              .slice() // Creates a shallow copy so original array remains unchanged
              .sort((a, b) => {
                // If `a.date` is undefined and `b.date` is defined, `a` should come first
                if (a.date === undefined && b.date !== undefined) return -1;
                // If `b.date` is undefined and `a.date` is defined, `b` should come first
                if (b.date === undefined && a.date !== undefined) return 1;
                // If both dates are defined, sort them in descending order
                if (a.date && b.date)
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
                // If both are undefined, consider them equal
                return 0;
              })
              .map((deck) => (
                <Link key={deck.id} href={`/${collection.id}/${deck.id}`}>
                  <DeckCard
                    key={deck.id}
                    deck={{
                      id: deck.id,
                      title: deck.title,
                      description: deck.description || "",
                      date: deck.date || undefined,
                      cardCount: deck.cards.length,
                    }}
                    collectionId={collection.id}
                  />
                </Link>
              ))
          ) : (
            <div className="w-screen h-screen flex flex-row justify-center items-center">
              No decks to display.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
