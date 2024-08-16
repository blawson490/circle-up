import { deleteAdminDeck, getDeckById, updateDeckCards } from '@/app/lib/actions'
import TopBar from '@/app/ui/topBar'
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
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import CardList from '@/app/ui/admin/cardList'
import { Card } from '@/app/lib/definitions'

interface DeckPageProps {
  params: { collectionId: string; deckId: string }
}

export default async function DeckEditPage({ params }: DeckPageProps) {
  const collectionId = parseInt(params.collectionId, 10)
  const deckId = parseInt(params.deckId, 10)

  let deck;

  try {
    deck = await getDeckById(deckId)
  } catch (error) {
    console.error('Error fetching deck:', error)
    return <div>Error: Failed to fetch deck. Please try again later.</div>
  }

  if (!deck) {
    console.error('Deck not found')
    return <div>Deck not found</div>
  }

  async function deleteDeck() {
    'use server'
    try {
      await deleteAdminDeck(deckId)
    } catch (error) {
      console.error('Failed to delete deck:', error)
      // You might want to throw an error here or handle it differently
      return { error: 'Failed to delete deck' }
    }

    // These need to be outside the try-catch block
    revalidatePath(`/dashboard/edit/collection/${collectionId}`)
    redirect(`/dashboard/edit/collection/${collectionId}`)
  }

  async function handleCardsChange(deckId: number, newCards: Card[]) {
    'use server'
    try {
      const updatedDeck = await updateDeckCards(deckId, newCards)
      revalidatePath(`/dashboard/edit/collection/${updatedDeck.collectionId}/deck/${deckId}`)
      return { success: true, deck: updatedDeck }
    } catch (error) {
      console.error('Failed to update cards:', error)
      return { error: 'Failed to update cards' }
    }
  }

  return (
    <div className="w-full flex h-screen flex-col m-0 px-0 py-0">
      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopBar 
          title={deck.title} 
          className={`bg-${deck.collection.color}-500 text-white`}
          backLink={`/dashboard/edit/collection/${collectionId}`}
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
                    This action cannot be undone. This will permanently delete this deck and all its cards from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <form action={deleteDeck}>
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
              <p className='text-4xl font-bold pt-2'>{deck.title}</p>
              <p className='text-md pt-2'>{deck.description}</p>
              <div className='grid grid-rows-2 p-2'>
                <p className='text-sm text-gray-500'>Created</p>
                <p className='text-gray-950 font-semibold'>{new Date(deck.createdAt).toLocaleDateString()}</p>
              </div>
              <hr className='border border-gray-300'/>
            </div>
             
            <div className='flex flex-col gap-2'>
                <p className='pl-1 text-2xl font-bold'>Cards</p>
                {/* @ts-ignore  */}
                <CardList deckId={deck.id} initialCards={deck.cards} onCardsChange={handleCardsChange} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}