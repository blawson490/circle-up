"use client"
import { Card } from "@/app/app/lib/definitions";
import { useState } from "react";
import { Input } from "../../../../ui/input";
import { Button } from "@/app/app/ui/components/button";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";



export default function CardItem({ card, onEdit, onDelete }: { card: Card; onEdit: (text: string) => void; onDelete: () => void }) {
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
  