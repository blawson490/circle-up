import React from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/app/ui/alertDialog';
import { AlertTriangle, TrashIcon } from 'lucide-react';
import { Button } from '@/app/ui/button';

interface DeleteCategoryButtonProps {
  categoryId: number;
  deleteCategory: (id: number) => Promise<void>;
}

const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({ categoryId, deleteCategory }) => {
  const handleDelete = async () => {
    await deleteCategory(categoryId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><TrashIcon className='w-10 h-10 text-white' /></Button>
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
          {/* <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction> */}
          <form action={handleDelete}>
            <AlertDialogAction type="submit" variant="destructive">Delete</AlertDialogAction>
           </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryButton;