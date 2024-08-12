import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DeckTable from "../ui/components/deck/table";

export default function decksPage() {
    return (
        <div className="flex flex-col p-4 m-8 rounded-xl border">
            <h2 className="text-2xl font-semibold">Decks</h2>
            <div className="flex flex-col gap-2 md:flex-row justify-between my-5">
                <div className="flex flex-row border rounded-full w-full md:w-1/3 py-1 px-3 text-sm text-gray-500 gap-1 items-center">
                <MagnifyingGlassIcon className="w-4 h-4"/>
                    Search Decks
                </div>
                <div className="text-white rounded-full bg-emerald-700 flex justify-center items-center p-2 px-4 text-sm">
                    Create Deck
                </div>
            </div>
            <DeckTable />
        </div>
    )
}