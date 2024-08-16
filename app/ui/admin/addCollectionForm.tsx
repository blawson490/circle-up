"use client"

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/ui/dialog';
import { Button } from '@/app/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/ui/form';
import { Input } from '@/app/ui/input';
import { Textarea } from '@/app/ui/textArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/ui/select';
import { createCollection } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { colorMap } from '@/utils/colorMap';
import { iconMap } from '@/utils/iconMap';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

interface AddCollectionFormProps {
  categoryId: number;
}

const AddCollectionForm: React.FC<AddCollectionFormProps> = ({ categoryId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      color: 'gray',
      icon: 'null',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      // Reset scroll position when dialog is closed
      window.scrollTo(0, 0);
    }
  }, [isOpen]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newCollection = {
        title: values.title,
        description: values.description,
        color: values.color,
        icon: values.icon,
        category: {
          connect: { 
            id: categoryId
          }
        },
      };
      await createCollection(newCollection);
      form.reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to create collection:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'link'} className='text-emerald-500 font-semibold'>
          Add Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Collection</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter collection title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter collection description (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(colorMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-2 bg-${value}-500`}></div>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(iconMap).map(([key, Icon]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center">
                            <Icon className="w-4 h-4 mr-2" />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <IconSelect form={form} name={"icon"} /> */}
            <div className='w-full flex flex-row justify-center items-center'>
              <Button className={'w-full'} type="submit">Create Collection</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCollectionForm;