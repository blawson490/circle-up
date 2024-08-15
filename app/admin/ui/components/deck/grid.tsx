import { fetchAllDecks } from "@/app/admin/lib/actions";
import { Card, Deck } from "@/app/lib/definitions";
import DeckTile from "../../../../ui/admin/DeckTile";

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

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../ui/Dialog";
import { Button } from "@/app/ui/button";
// import { ScrollArea } from "@/app/app/ui/scrollarea";
import { Input } from "../../../../ui/input";
import { Textarea } from "../../../../ui/textArea";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import CardItem from "./CardItem";
import DeckEditDialog from "./DeckEditDialog";
  

  const colors = [
    'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500',
    'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-gray-500'
  ];

export default async function DeckGrid({ decks }: { decks: Deck[]}) {
      if (decks.length === 0) {
        return <p className="text-center text-gray-500">No decks found.</p>;
      }
  
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mt-4">
          {decks.map((deck: Deck) => {
            const Icon = icons[deck.icon as keyof typeof icons];
            return (
              <Dialog key={deck.id}>
                <DialogTrigger asChild>
                  <DeckTile
                    key={deck.id}
                    name={deck.name}
                    color={deck.color}
                  >
                    <Icon className="size-14 sm:size-20" />
                  </DeckTile>
                </DialogTrigger>
                {/* <DialogContent className="min-w-full">
                  <DialogHeader>
                    <DialogTitle>Edit Deck</DialogTitle>
                    <DialogDescription>
                      Make changes to the deck here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader> */}

                  {/* Deck Content */}
                  <DeckEditDialog deck={deck}/>

                  {/* <DialogFooter className="flex flex-col md:flex-row gap-2 md:gap-1">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="default">Save</Button>
                  </DialogFooter>
                </DialogContent> */}
              </Dialog>
            )})}
        </div>
      );
  };