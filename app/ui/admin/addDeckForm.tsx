"use client"

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/ui/dialog';
import { Button } from '@/app/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/ui/form';
import { Input } from '@/app/ui/input';
import { Textarea } from '@/app/ui/textArea';
import { addDeck } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';

// Define the schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
  date: z.date().optional(),
  includeDate: z.boolean().default(false),
  cards: z.array(
    z.object({
      text: z.string().min(1, 'Card text is required'),
    })
  ).min(1, 'At least one card is required'),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

interface AddDeckFormProps {
  collection: {
    id: number;
    title: string;
    color: string | null;
  };
}

const AddDeckForm: React.FC<AddDeckFormProps> = ({ collection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date: undefined,
      includeDate: false,
      cards: [{ text: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const newDeck = {
        title: values.title,
        description: values.description,
        date: values.includeDate ? values.date : undefined,
        collectionId: collection.id,
        cards: values.cards,
      };
      await addDeck(newDeck);
      form.reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to create deck:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`rounded-lg px-3 py-1 bg-${collection.color || 'gray'}-500 text-white text-xs`}>
          New Deck
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Deck to {collection.title}</DialogTitle>
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
                    <Input placeholder="Enter deck title" {...field} />
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
                    <Textarea placeholder="Enter deck description (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeDate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Include Date</FormLabel>
                </FormItem>
              )}
            />
            {form.watch('includeDate') && (
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} 
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className='flex flex-col gap-2'>
              <FormLabel>Cards</FormLabel>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`cards.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input placeholder="Enter card text" {...field} />
                          <Button type="button" variant='destructive' onClick={() => remove(index)}>
                            <XIcon className='w-4 h-4' />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button className='w-full' type="button" onClick={() => append({ text: '' })}>Add Card</Button>
            </div>
            <div className='w-full flex flex-row justify-end'>
              <Button type="submit">Create Deck</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeckForm;