"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/ui/dialog';
import { Button } from '@/app/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/ui/form';
import { Input } from '@/app/ui/input';
import { createCategory } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { PlusIcon } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name must be 100 characters or less'),
});

const AddCategoryForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createCategory(values.name);
      form.reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
      <Button variant={'link'} className='text-emerald-500 font-semibold'>
          <PlusIcon className='w-6 h-6' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Category
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryForm;