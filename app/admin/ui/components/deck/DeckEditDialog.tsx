'use client';

import React, { useState } from 'react';
import { Deck, Card } from "@/app/app/lib/definitions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import { Button } from "@/app/app/ui/components/button";
import { ScrollArea } from "@/app/app/ui/scrollarea";
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Input } from '../input';
import { Textarea } from '../textArea';


import {
    FaceSmileIcon,
    HandRaisedIcon,
    ChatBubbleLeftEllipsisIcon,
    LightBulbIcon,
    AcademicCapIcon,
    RocketLaunchIcon,
    HomeIcon,
    FireIcon,
    HeartIcon,
    HandThumbUpIcon,
    XMarkIcon,
    PlusIcon,
    PencilIcon
  } from "@heroicons/react/24/outline";

  const icons = {
    FaceSmileIcon: FaceSmileIcon,
  HandRaisedIcon: HandRaisedIcon,
  ChatBubbleLeftEllipsisIcon: ChatBubbleLeftEllipsisIcon,
  LightBulbIcon: LightBulbIcon,
  AcademicCapIcon: AcademicCapIcon,
  RocketLaunchIcon: RocketLaunchIcon,
  HomeIcon: HomeIcon,
  FireIcon: FireIcon,
  HeartIcon: HeartIcon,
  HandThumbUpIcon: HandThumbUpIcon
  };

const colors = [
  'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500',
  'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-gray-500'
];

function CardItem({ card, onEdit, onDelete }: { card: Card; onEdit: (text: string) => void; onDelete: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(card.text);

  const handleSave = () => {
    onEdit(text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-md">
      {isEditing ? (
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 mr-2"
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <p className="flex-1 mr-2">{card.text}</p>
      )}
      <div className="flex space-x-1">
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function DeckEditDialog({ deck: initialDeck }: { deck: Deck; }) {
  const [deck, setDeck] = useState(initialDeck);

  const updateDeck = (updates: Partial<Deck>) => {
    setDeck(prev => ({ ...prev, ...updates }));
  };

  const Icon = icons[deck.icon as keyof typeof icons];

  return (
    <DialogContent className="w-full max-w-3xl">
      <DialogHeader>
        <DialogTitle>Edit Deck</DialogTitle>
        <DialogDescription>
          Make changes to the deck here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col w-full space-y-4">
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={`p-2 ${deck.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(icons).map(([name, IconComponent]) => (
                  <Button
                    key={name}
                    variant="outline"
                    className="p-2"
                    onClick={() => updateDeck({ icon: name })}
                  >
                    <IconComponent className="h-6 w-6" />
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    className={`w-full h-8 ${color}`}
                    onClick={() => updateDeck({ color })}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Input
            value={deck.name}
            placeholder="Deck Name"
            className="flex-1"
            onChange={(e) => updateDeck({ name: e.target.value })}
          />
        </div>
        <Textarea
          value={deck.description}
          placeholder="Deck Description"
          className="min-h-[100px]"
          onChange={(e) => updateDeck({ description: e.target.value })}
        />
        <div>
          <h3 className="text-sm font-semibold mb-2">Cards</h3>
          <ScrollArea className="h-[200px] border rounded-md p-2">
            {deck.cards.map((card, index) => (
              <CardItem
                key={index}
                card={card}
                onEdit={(text) => {
                  const newCards = [...deck.cards];
                  newCards[index] = { ...card, text };
                  updateDeck({ cards: newCards });
                }}
                onDelete={() => {
                  const newCards = deck.cards.filter((_, i) => i !== index);
                  updateDeck({ cards: newCards });
                }}
              />
            ))}
          </ScrollArea>
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={() => {
              const newCards = [...deck.cards, { id: Date.now(), text: 'New Card' }];
              updateDeck({ cards: newCards });
            }}
          >
            <PlusIcon className="h-4 w-4 mr-2" /> Add Card
          </Button>
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary">Cancel</Button>
        <Button variant="default">Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}