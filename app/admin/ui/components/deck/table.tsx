"use client";
import { Deck, Card } from "@/app/app/lib/definitions";
import { ScrollArea } from "@/app/app/ui/scrollarea";
import clsx from "clsx";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CheckCircleIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../ui/Dialog";
import { fetchAllDecks } from "@/app/admin/lib/actions";

export default async function DeckTable() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
    const [deckListHeight, setDeckListHeight] = useState(0);
    const [editingCard, setEditingCard] = useState<Card | null>(null);
    const [editingCardText, setEditingCardText] = useState("");
  
    useEffect(() => {
      fetchDecks();
    }, []);
  
    const fetchDecks = async () => {
      const response = await fetch('/api/decks');
      const data = await response.json();
      setDecks(data);
    };

    
    // const decks = await fetchAllDecks();

    const handleRowClick = (deck: Deck) => {
        setSelectedDeck(selectedDeck?.id === deck.id ? null : deck);
    };

    const handleEditCardClick = (card: Card) => {
        setEditingCardText(card.text);
        setEditingCard(card);
    }
    
    const handleSaveCardClick = (card: Card) => {
        const updatedDecks = decks.map((deck) => {
            if (deck.cards.some((c) => c.id === card.id)) {
                return {
                    ...deck,
                    cards: deck.cards.map((c) => c.id === card.id ? { ...c, text: editingCardText } : c),
                };
            }
            return deck;
        });
        setDecks(updatedDecks);
        setEditingCardText("");
        setEditingCard(null);
    }
    
    const handleCancelClick = () => {
        setEditingCardText("");
        setEditingCard(null);
    }

    useLayoutEffect(() => {
        const topBarHeight = 200;
        const screenHeight = window.innerHeight;
        const remainingDecksHeight = screenHeight - topBarHeight;
    
        setDeckListHeight(remainingDecksHeight);
    }, []);
  
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col" style={{ height: `${deckListHeight}px` }}>
            <Dialog>
            <ScrollArea className="flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-20">
                    <tr>
                        {['Deck', 'Description', 'Card Count', 'Actions'].map((header) => (
                            <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {decks.map((deck) => (
                            <React.Fragment key={deck.id}>
                                <tr
                                    className={clsx(
                                        'transition-colors hover:bg-gray-50 cursor-pointer',
                                        { 'bg-blue-50 sticky top-12 z-10': deck.id === selectedDeck?.id }
                                    )}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <ChevronRightIcon 
                                                className={clsx(`w-5 h-5 mr-5`, { 'rotate-90': selectedDeck?.id === deck.id })}
                                                onClick={() => handleRowClick(deck)}/>
                                            <div className={`w-4 h-4 rounded-full ${deck.color} mr-3`}></div>
                                            <div className="text-sm font-medium text-gray-900">{deck.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{deck.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{deck.cards.length}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <DialogTrigger asChild>
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        </DialogTrigger>
                                        <button className="text-red-600 hover:text-red-900">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                    </tr>
                                {deck.id === selectedDeck?.id && (
                                    <tr>
                                        <td colSpan={4} className="px-6 pt-2 pb-4">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex flex-row w-full justify-between">
                                                    <h3 className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cards in {deck.name}</h3>
                                                    <div className=" rounded-full text-emerald-700 flex justify-center items-center px-4 text-xs font-semibold cursor-pointer">
                                                        Create New Card
                                                    </div>
                                                </div>
                                                <ul className="space-y-2">
                                                    {deck.cards.map((card) => (
                                                        <li key={card.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                                                            {editingCard === null ? (
    <>
        <span className="text-sm text-gray-700">{card.text}</span>
        <div>
            <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleEditCardClick(card)}>
                <PencilIcon className="h-4 w-4" />
            </button>
            <button className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-4 w-4" />
            </button>
        </div>
    </>
) : editingCard.id === card.id ? (
    <div className="flex flex-row gap-4 w-full">
        <input
            type="text"
            value={editingCardText}
            onChange={(e) => setEditingCardText(e.target.value)}
            className="border p-1 w-full text-sm"
        />
        <div className="flex flex-row gap-1">
            <button className="text-green-600 hover:text-green-900 mr-2" onClick={() => handleSaveCardClick(card)}>
                <CheckCircleIcon className="h-5 w-5" />
            </button>
            <button className="text-red-600 hover:text-red-900" onClick={() => handleCancelClick()}>
                <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
    </div>
) : editingCard.id != card.id ? (
    <>
        <span className="text-sm text-gray-700">{card.text}</span>
        <div>
            <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleEditCardClick(card)}>
                <PencilIcon className="h-4 w-4" />
            </button>
            <button className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-4 w-4" />
            </button>
        </div>
    </>
) : null }
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </ScrollArea>
            <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <h3 className="sr-only">
              Link
            </h3>
            <p>
                https://ui.shadcn.com/docs/installation
            </p>
          </div>
          <button type="submit" className="px-3">
            <span className="sr-only">Copy</span>
            {/* <Copy className="h-4 w-4" /> */}
          </button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <button type="button">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
            </Dialog>
        </div>
    );
}