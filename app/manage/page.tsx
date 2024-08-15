import { getAdminCategories } from '@/app/lib/actions'
import TableCategoryCard from '@/app/ui/tableCards/tableCategoryCard'
import TopBar from '../ui/topBar'

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories()

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar className='bg-white text-gray-900' title='CircleUp Admin' />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-96">
            <h2 className="text-2xl font-bold mb-6 text-left">Categories</h2>
            <div className="flex flex-col gap-4 max-w-96">
              {categories.map((category) => (
                <TableCategoryCard key={category.id} category={category}/>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}