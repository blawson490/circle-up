import { getAdminDecks } from '@/app/lib/actions'
import TableDeckCard from '@/app/ui/tableCards/tableDeckCard'
import TopBar from '@/app/ui/topBar';

export default async function AdminDecksPage({ params }: { params: { categoryId: string; collectionId: string } }) {
  const categoryId = parseInt(params.categoryId, 10);
  const collectionId = parseInt(params.collectionId, 10);
  const { collectionName, decks } = await getAdminDecks(collectionId);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar className='bg-white text-gray-900' title='CircleUp Admin' backLink={`/manage/${categoryId}/collections`} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-96">
            <h2 className="text-2xl font-bold mb-6 text-left">{collectionName} Decks</h2>
            <div className="flex flex-col gap-4 max-w-96">
              {decks.map((deck) => (
                <TableDeckCard key={deck.id} deck={deck}/>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}