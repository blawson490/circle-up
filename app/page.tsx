import { getTailwindColor } from '@/utils/colorMap'
import { getIconComponent } from '@/utils/iconMap'
import TopBar from './ui/topBar'
import Link from 'next/link'
import { getCategories } from './lib/actions'
import CollectionTile from './ui/collectionTile'
import PageViewTracker from './ui/analytics/utils/PageViewTracker'


export default async function Home() {
  const categories = await getCategories()

  return (
    <div className="w-full flex h-screen flex-col m-0 px-0 py-0">
      <PageViewTracker path={`/`} isSSR={true} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopBar title="CircleUp Decks" className='bg-white' />
        <main className="space-y-8 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-4 py-4 pb-24">
        {categories.map((category) => (
          <section key={category.id}>
            <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
              {category.collections.map((collection) => {
                const IconComponent = getIconComponent(collection.icon)
                const bgColor = getTailwindColor(collection.color)
                return (
                  <Link key={collection.id} href={`/${collection.id}`}>
                    <CollectionTile name={collection.title} className={`bg-${bgColor}-500`}>
                      <IconComponent className="size-20"/>
                    </CollectionTile>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
        </main>
      </div>
    </div>
  )
}