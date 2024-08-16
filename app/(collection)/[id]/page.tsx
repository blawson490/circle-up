import { getTailwindColor } from '@/utils/colorMap'
import { getCollectionById } from '@/app/lib/actions'
import TopBar from '@/app/ui/topBar'
import DeckCard from '@/app/ui/deckCard'
import Link from 'next/link'

interface CollectionPageProps {
    params: { id: string }
  }
  
  export default async function CollectionPage({ params }: CollectionPageProps) {
    const id = parseInt(params.id, 10)
    const collection = await getCollectionById(id)
  
    if (!collection) {
      return <div>Collection not found</div>
    }

  return (
    <div className="w-full flex h-screen flex-col m-0 px-0 py-0 ">
      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopBar title={collection.title} className={`bg-${getTailwindColor(collection.color)}-500 text-white`} backLink='/' />
        <main className="space-y-8 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-4 py-4 pb-24">
        {collection.decks.length > 0 ? collection?.decks.map((deck) => (
          <Link key={deck.id} href={`/${collection.id}/${deck.id}`}>
            <DeckCard
            key={deck.id}
            deck={{
              id: deck.id,
              title: deck.title,
              description: deck.description || '', 
              date: deck.date || undefined,
              cardCount: deck.cards.length,
            }}
            collectionId={collection.id}
          />
          </Link>
        )): (<div className='w-screen h-h-screen flex flex-row justify-center items-center'>No decks to display.</div>)}
        </main>
      </div>
    </div>
  )
}