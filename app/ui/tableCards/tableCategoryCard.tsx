"use client";
import { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { Category } from "../../lib/definitions";
import Link from "next/link";
import {   
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from "../alertDialog";
import { Button, buttonVariants } from "../button";
import { deleteAdminCategory } from "@/app/lib/actions";
export default function TableCategoryCard({ category } : {category: Category}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-white w-full rounded shadow-lg sm:rounded-md gap-2 max-w-96">
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-col">
          <p className="text-lg text-slate-900 font-semibold">{category.name}</p>
          <p className="text-sm text-black font-medium">{category.collections.length} Collection(s)</p>
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
              <p className="text-sm text-gray-500">Created At:</p>
              <p className="text-sm text-black font-medium">{category.createdAt.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Updated At:</p>
              <p className="text-sm text-black font-medium">{category.updatedAt.toLocaleDateString()}</p>
            </div>
            <div className="col-span-2 flex flex-row gap-1">
              <p className="text-sm text-gray-500">ID:</p>
              <p className="text-sm text-black font-medium">{category.id}</p>
            </div>
          </div>

          <Link href={`/manage/${category.id}/collections`} className="w-full bg-gray-50 flex flex-row justify-between items-center p-2 pl-4 border cursor-pointer">
            <p className="text-xs text-gray-500 uppercase font-semibold">Collections</p>
            <ChevronRight className="w-4 h-4 text-sky-500" />
          </Link>
          <AlertDialog>
            <div className="w-full flex flex-row justify-end px-2 pb-2 gap-4">
              <AlertDialogTrigger>
                <div className="rounded-full bg-red-300/30 px-4 py-2 cursor-pointer">
                  <p className="text-red-500 font-bold text-sm">Delete</p>
                </div>
              </AlertDialogTrigger>
              <div className="rounded-full bg-sky-300/30 px-4 py-2 cursor-pointer">
                <p className="text-sky-500 font-bold text-sm">Edit</p>
                </div>
            </div>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex flex-row gap-2"><AlertTriangle className="text-red-500"/>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {category.name} and {category.collections.length} Collection(s) as well as their decks and card from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteAdminCategory(category.id)} variant="destructive">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}