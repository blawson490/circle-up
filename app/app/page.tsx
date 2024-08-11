'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
// import { AcademicCapIcon, ArrowPathIcon, BanknotesIcon, Battery50Icon, BeakerIcon, BoltSlashIcon, BriefcaseIcon, CakeIcon, CalendarDaysIcon, DevicePhoneMobileIcon, FaceSmileIcon, FingerPrintIcon } from "@heroicons/react/24/outline";
import Deck from "./ui/deck/deck";
import TopBar from "./ui/topbar/topbar";
import Link from "next/link";
import { Deck as DeckType } from '@/app/app/lib/definitions'
import { ScrollArea } from './ui/scrollarea';

// const icons = [
//   AcademicCapIcon, ArrowPathIcon, BanknotesIcon, Battery50Icon, BeakerIcon, BoltSlashIcon, 
//   BriefcaseIcon, CakeIcon, CalendarDaysIcon, DevicePhoneMobileIcon, FaceSmileIcon, FingerPrintIcon
// ];

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
  HandThumbUpIcon
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
  'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-teal-500', 'bg-sky-500', 'bg-blue-500',
  'bg-violet-500', 'bg-purple-500', 'bg-indigo-500', 'bg-green-500', 'bg-amber-500', 'bg-fuchsia-500'
];

export default function App() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch('/api/decks');
        if (!response.ok) {
          throw new Error('Failed to fetch decks');
        }
        const data: DeckType[] = await response.json();
        setDecks(data);
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };

    fetchDecks();
  }, []);

  useLayoutEffect(() => {
    const topBarHeight = 56;
    const screenHeight = window.innerHeight;
    const remainingHeight = screenHeight - topBarHeight;
    setHeight(remainingHeight);
  }, []);


  // Shuffle the icons and colors arrays
  // const shuffledIcons = [...icons].sort(() => Math.random() - 0.5);
  const shuffledColors = [...colors].sort(() => Math.random() - 0.5);

  return (
    <div>
      <TopBar title="CircleUp Decks" className='bg-white' />
      <div className='w-full h-full'>
      <ScrollArea ref={containerRef} style={{ height: `${height}px` }} className="rounded-none">
      <div className="grid grid-cols-2 gap-4 p-4 h-auto w-full">
        {decks.map((deck, index) => {
          const Icon = icons[deck.icon]
          // const color = shuffledColors[index % shuffledColors.length];
          return (
            <Link key={deck.id} href={`/app/deck/${deck.id}`}>
              <Deck name={deck.name} className={deck.color}>
                <Icon className="size-20"/>
              </Deck>
            </Link>
          );
        })}
      </div>
      </ScrollArea>
      </div>
    </div>
  );
}