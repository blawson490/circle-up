import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

import { Deck } from "@/app/app/lib/definitions";
import { Button } from '@/app/app/ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { ScrollArea } from '@/app/app/ui/scrollarea';
import { Input } from '../../../../ui/input';
import { colors } from '@/app/lib/definitions';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface DeckCustomizerPopoverProps {
    deck: Deck;
    updateDeck: (updates: Partial<Deck>) => void;
    icons: Record<string, IconType>;
  }

const DeckCustomizerPopover: React.FC<DeckCustomizerPopoverProps> = ({ deck, updateDeck, icons }) => {
  const [activeTab, setActiveTab] = useState("icons");
  const [searchTerm, setSearchTerm] = useState("");
  const Icon = icons[deck.icon as keyof typeof icons];

  const filteredIcons = Object.entries(icons).filter(([name]) => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredColors = colors.filter((color) => 
    color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`p-2 ${deck.color}`}>
          <Icon className="h-8 w-8 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue="icons" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="my-2"
          />
          <TabsContent value="icons">
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-3 gap-2">
                {filteredIcons.map(([name, IconComponent]) => (
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
            </ScrollArea>
          </TabsContent>
          <TabsContent value="colors">
            <ScrollArea className="h-[200px]">
                <div className="grid grid-cols-5 gap-1">
                    {filteredColors.map((color) => (
                        <Button
                            key={color}
                            variant="outline"
                            className={`w-full h-6 w-6 ${color}`}
                            onClick={() => updateDeck({ color })}
                        />
                    ))}
                </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default DeckCustomizerPopover;