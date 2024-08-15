import { getAdminCollections } from '@/app/lib/actions'
import TableCollectionCard from '@/app/ui/tableCards/tableCollectionCard'
import TopBar from '@/app/ui/topBar';

export default async function AdminCollectionsPage({ params }: { params: { categoryId: string } }) {
  const categoryId = parseInt(params.categoryId, 10);
  const { categoryName, collections } = await getAdminCollections(categoryId);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar className='bg-white text-gray-900' title='CircleUp Admin' backLink='/manage' />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-96">
            <h2 className="text-2xl font-bold mb-6 text-left">{categoryName} Collections</h2>
            <div className="flex flex-col gap-4 max-w-96">
              {collections.map((collection) => (
                <TableCollectionCard key={collection.id} collection={collection}/>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}