import { PencilIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function DeckTile({ name, className, children }: { name: string; className: string; children?: React.ReactNode }) {
    return (
      <div className={`${className} rounded-xl overflow-hidden w-full aspect-square relative group`}>
        <div className="p-4 text-white h-full w-full">
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div className="absolute bottom-0 right-0 p-4 text-white">
          {children}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white rounded-full p-3">
            <PencilIcon className="h-10 w-10 text-emerald-700" />
          </div>
        </div>
      </div>
    );
  };