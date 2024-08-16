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
import { Dialog, DialogTrigger } from '@/app/ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
import AddDeckForm from '@/app/ui/admin/addDeckForm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface CollectionPageProps {
    params: { collectionId: string }
  }
  
  export default async function CollectionEditPage({ params }: CollectionPageProps) {
    const id = parseInt(params.collectionId, 10)
    const collection = await getCollectionById(id)
    const IconComponent = collection ? getIconComponent(collection.icon) : null;
  
    if (!collection) {
      return <div>Collection not found</div>
    }

    async function deleteCollection() {
      'use server'
      try {
        await deleteAdminCollection(id)
      } catch (error) {
        console.error('Failed to delete deck:', error)
        // You might want to throw an error here or handle it differently
        return { error: 'Failed to delete deck' }
      }
  
      // These need to be outside the try-catch block
      revalidatePath(`/admin`)
      revalidatePath(`/`)
      redirect(`/admin`)
    }

  return (
    <div className="w-full flex h-screen flex-col m-0 px-0 py-0 ">
      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopBar 
          title={collection.title} 
          className={`bg-${getTailwindColor(collection.color)}-500 text-white`} 
          backLink='/admin'
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
                            This action cannot be undone. This will permanently delete this Collection from our servers. All Decks and Cards in this category will be deleted forever.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <form action={deleteCollection}>
                            <AlertDialogAction type="submit" variant="destructive">Delete</AlertDialogAction>
                          </form>
                        </AlertDialogFooter>
                      </AlertDialogContent>
            </AlertDialog>
          }
         />
        <main className="space-y-8 flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-gray-50 px-4 py-4 pb-24 items-center">
          <div className='flex flex-col justify-center w-full max-w-3xl'>
            <div className='flex flex-col justify-start w-full py-6'>
            {IconComponent && 
              <IconComponent className={`text-${collection.color}-500 size-24 aspect-square p-2 rounded-lg`} />}
              <p className='text-4xl font-bold pt-2 p-2 rounded-lg  '>{collection.title}</p>
              <p className='text-md pt-2 p-2 rounded-lg '>{collection.description}</p>
              <div className='grid grid-rows-2 p-2'>
                <p className='text-sm text-gray-500 cursor-default'>Category</p>
                <p className='text-gray-950 font-semibold cursor-default'>{collection.category.name}</p>
              </div>
              <hr className='border border-gray-300'/>
            </div>
            
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row justify-between'>
                <p className='pl-1 text-2xl font-bold'>Decks</p>
                <AddDeckForm
                  collection={{
                    id: collection.id,
                    title: collection.title,
                    color: collection.color,
                  }}
                />
              </div>
              <div className='flex flex-col gap-4'>
            {collection?.decks.map((deck) => (
              <Link key={deck.id} href={`/admin/edit/collection/${collection.id}/deck/${deck.id}`}>
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