import { getTailwindColor } from '@/utils/colorMap'
import { deleteAdminCollection, getCollectionById } from '@/app/lib/actions'
import TopBar from '@/app/ui/topBar'
import DeckCard from '@/app/ui/deckCard'
import { getIconComponent } from '@/utils/iconMap'
import { AlertTriangle, MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/ui/dropdown_menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/ui/alertDialog'
import Link from 'next/link'

interface CollectionPageProps {
    params: { id: string }
  }
  
  export default async function CollectionEditPage({ params }: CollectionPageProps) {
    const id = parseInt(params.id, 10)
    const collection = await getCollectionById(id)
    const IconComponent = getIconComponent(collection.icon)
  
    if (!collection) {
      return <div>Collection not found</div>
    }

  return (
    <div className="w-full flex h-screen flex-col m-0 px-0 py-0 ">
      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopBar 
          title={collection.title} 
          className={`bg-${getTailwindColor(collection.color)}-500 text-white`} 
          backLink='/dashboard'
          rightSideComponent={
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className='h-6 w-6 text-white' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <AlertDialogTrigger className="w-full">
                    <DropdownMenuItem className="text-red-500 font-semibold focus:text-red-500 focus:font-semibold w-full">Delete</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex flex-row gap-2"><AlertTriangle className="text-red-500"/>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this card from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
            </AlertDialog>
          }
         />
        <main className="space-y-8 flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-gray-50 px-4 py-4 pb-24 items-center">
          <div className='flex flex-col justify-center w-full max-w-3xl'>
            <div className='flex flex-col justify-start w-full py-6'>
              <IconComponent className={`text-${collection.color}-500 size-24 aspect-square hover:shadow-md p-2 rounded-lg hover:bg-white cursor-pointer`} />
              <p className='text-4xl font-bold pt-2 hover:shadow-md p-2 rounded-lg hover:bg-white cursor-pointer'>{collection.title}</p>
              <p className='text-md pt-2 hover:shadow-md p-2 rounded-lg hover:bg-white cursor-pointer'>{collection.description}</p>
              <div className='grid grid-rows-2 p-2'>
                <p className='text-sm text-gray-500 cursor-default'>Category</p>
                <p className='text-gray-950 font-semibold cursor-default'>{collection.category.name}</p>
              </div>
              <hr className='border border-gray-300'/>
            </div>
            
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row justify-between'>
                <p className='pl-1 text-2xl font-bold'>Decks</p>
                <button className={`rounded-lg px-3 py-1 bg-${collection.color}-500 text-white text-xs`}>New Deck</button>
              </div>
              <div className='flex flex-col gap-4'>
            {collection?.decks.map((deck) => (
              <Link key={deck.id} href={`dashboard/edit/collection/${collection.id}/deck/${deck.id}`}>
                  <DeckCard
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
            ))}
            </div>
            </div>
        </div>
        </main>
      </div>
    </div>
  )
}