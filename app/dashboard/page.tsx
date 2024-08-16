import { getTailwindColor } from '@/utils/colorMap'
import { getIconComponent } from '@/utils/iconMap'
import TopBar from '@/app/ui/topBar'
import Link from 'next/link'
import { deleteAdminCategory, getCategories } from '@/app/lib/actions'
import DeckTile from '@/app/ui/admin/DeckTile'
import AddCollectionForm from '../ui/admin/addCollectionForm'
import AddCategoryForm from '../ui/admin/addCategoryForm'
import { revalidatePath } from 'next/cache'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/app/ui/alertDialog';
import { AlertTriangle, TrashIcon } from 'lucide-react';
import { Button } from '@/app/ui/button';

export default async function Home() {
  const categories = await getCategories()

  async function deleteCategory(formData: FormData) {
    'use server'
    const id = formData.get('id')
    if (typeof id !== 'string') {
      throw new Error('Invalid category ID')
    }
    const categoryId = parseInt(id, 10)
    if (isNaN(categoryId)) {
      throw new Error('Invalid category ID')
    }
    try {
      await deleteAdminCategory(categoryId)
    } catch (error) {
      console.error('Failed to delete category:', error)
      throw new Error('Failed to delete category')
    }
    revalidatePath(`/dashboard`)
  }

  return (
    <div className="w-full flex h-screen flex-col m-0 px-0 py-0">
      <div className='flex-1 flex flex-col overflow-hidden'>
        <TopBar title="CircleUp Decks" className='bg-white' rightSideComponent={<AddCategoryForm />} />
        <main className="space-y-8 flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-4 py-4 pb-24">
          {categories.map((category) => (
            <section key={category.id}>
              <div className='flex flex-row justify-between'>
                <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
                <AddCollectionForm categoryId={category.id} />
              </div>
              {category.collections.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                  {category.collections.map((collection) => {
                    const IconComponent = getIconComponent(collection.icon)
                    const bgColor = getTailwindColor(collection.color)
                    return (
                      <Link key={collection.id} href={`dashboard/edit/collection/${collection.id}`}>
                        <DeckTile name={collection.title} className={`bg-${bgColor}-500`}>
                          <IconComponent className="size-20"/>
                        </DeckTile>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className='rounded-xl overflow-hidden w-full h-full aspect-square relative group'
                      >
                        <TrashIcon className='w-10 h-10 text-white' />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex flex-row gap-2">
                          <AlertTriangle className="text-red-500"/>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this category from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={deleteCategory}>
                          <input type="hidden" name="id" value={category.id} />
                          <AlertDialogAction type="submit" variant="destructive">Delete</AlertDialogAction>
                        </form>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}