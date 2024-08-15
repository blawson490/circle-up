"use client"
import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronRight, ChevronUp, MoreVertical } from "lucide-react";
import { Deck } from "@/app/lib/definitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown_menu"
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
 } from "../alertDialog";
import { deleteAdminCard } from "@/app/lib/actions";



export default function TableDeckCard({ deck }: { deck: Deck }) {
  const [isOpen, setIsOpen] = useState(true);
  const [showingCards, setShowingCards] = useState(true);

  return (
    <div className="flex flex-col bg-white w-full rounded shadow-lg sm:rounded-md gap-2 max-w-96">
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-col">
          <p className="text-lg text-slate-900 font-semibold">{deck.title}</p>
          <p className="text-sm text-black font-medium">{deck.description}</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-6 w-6 bg-sky-100 flex items-center justify-center rounded"
        >
          {isOpen ? <ChevronUp className="w-4 h-4 text-sky-500" /> : <ChevronDown className="w-4 h-4 text-sky-500" />}
        </button>
      </div>
      {isOpen && (
        <>
          <div className="grid grid-cols-2 gap-2 px-2">
            {deck.date != undefined && (
              <div className="col-span-2 flex flex-row gap-1">
              <p className="text-sm text-gray-500">Date:</p>
              <p className="text-sm text-black font-medium">{`${deck.date}`}</p>
            </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Collection:</p>
              <p className="text-sm text-black font-medium">{deck.collection.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Card Count:</p>
              <p className="text-sm text-black font-medium">{deck.cards.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At:</p>
              <p className="text-sm text-black font-medium">{deck.createdAt.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Updated At:</p>
              <p className="text-sm text-black font-medium">{deck.updatedAt.toLocaleDateString()}</p>
            </div>
            <div className="col-span-2 flex flex-row gap-1">
              <p className="text-sm text-gray-500">ID:</p>
              <p className="text-sm text-black font-medium">{deck.id}</p>
            </div>
          </div>

          <div className="w-full bg-gray-50 flex flex-col justify-between items-center border">
            <div className="w-full bg-gray-50 flex flex-row justify-between items-center p-2 pl-4">
              <p className="text-xs text-gray-500 uppercase font-semibold">Cards</p>
              <button
                  className="h-6 w-6 bg-sky-100 flex items-center justify-center rounded"
                  onClick={() => setShowingCards(!showingCards)}>
                  {showingCards ? <ChevronUp className="w-4 h-4 text-sky-500" /> :  <ChevronDown className="w-4 h-4 text-sky-500" /> }
              </button>
            </div>
            {showingCards && (
              <div className="w-full p-2">
                {deck.cards.map((card) => (
                  <div key={card.id} className="bg-white rounded-md shadow-sm p-3 mb-2 flex justify-between items-center">
                    <p className="text-xs text-gray-700 flex-grow">{card.text}</p>
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger><MoreVertical className="w-4 h-4 text-gray-400" /></DropdownMenuTrigger>
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
                          <AlertDialogAction onClick={() => deleteAdminCard(card.id)} variant="destructive">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full flex flex-row justify-end px-2 pb-2 gap-4 cursor-pointer">
            <div className="rounded-full bg-red-300/30 px-4 py-2">
              <p className="text-red-500 font-bold text-sm">Delete</p>
            </div>
            <div className="rounded-full bg-sky-300/30 px-4 py-2 cursor-pointer">
              <p className="text-sky-500 font-bold text-sm">Edit</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}