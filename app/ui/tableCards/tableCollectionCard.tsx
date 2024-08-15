"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { Collection } from "@/app/lib/definitions";
import { getIconComponent } from "@/utils/iconMap";
import Link from "next/link";

export default function TableCollectionCard({ collection } : {collection: Collection}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const IconComponent = getIconComponent(collection.icon)
  return (
    <div className="flex flex-col bg-white w-full rounded shadow-lg sm:rounded-md gap-2 max-w-96">
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-col">
            <div className="flex flex-row">
                {/* Include Color and Icon here */}
                <p className="text-lg text-slate-900 font-semibold">{collection.title}</p>
            </div>
          <p className="text-sm text-black font-medium">{collection.description}</p>
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
            <div>
                <p className="text-sm text-gray-500">Color:</p>
                <div className={`w-6 h-6 bg-${collection.color}-500 rounded-sm pl-1`}/>
            </div>
            <div>
                <p className="text-sm text-gray-500">Icon:</p>
                <IconComponent className={`w-6 h-6 text-${collection.color}-500`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Category:</p>
              <p className="text-sm text-black font-medium">{collection.category.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Deck Count:</p>
              <p className="text-sm text-black font-medium">{collection.decks.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At:</p>
              <p className="text-sm text-black font-medium">{collection.createdAt.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Updated At:</p>
              <p className="text-sm text-black font-medium">{collection.updatedAt.toLocaleDateString()}</p>
            </div>
            <div className="col-span-2 flex flex-row gap-1">
              <p className="text-sm text-gray-500">ID:</p>
              <p className="text-sm text-black font-medium">{collection.id}</p>
            </div>
          </div>

          <Link href={`/manage/${collection.categoryId}/collections/${collection.id}/decks`} className="w-full bg-gray-50 flex flex-row justify-between items-center p-2 pl-4 border cursor-pointer">
            <p className="text-xs text-gray-500 uppercase font-semibold">Decks</p>
            <ChevronRight className="w-4 h-4 text-sky-500" />
          </Link>

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