import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DeckTable from "../ui/components/deck/table";
import { fetchAllDecks, fetchFilteredDecks } from "../lib/actions";
import DeckGrid from "../ui/components/deck/grid";
import { Suspense } from "react";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "../ui/components/deck/tabs";
import Search from "../ui/components/search";

export default async function DecksPage({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
    };
  }) {
    const query = searchParams?.query || '';

      const decks = await fetchFilteredDecks(query);
    return (
        <Tabs defaultValue="grid" className="w-full">
            <div className="flex flex-col p-0 sm:p-4 m-8 rounded-none sm:rounded-xl sm:border">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-1 justify-between">
                    <h2 className="text-2xl font-semibold">Decks</h2>
                    <div className="w-full sm:w-[300px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="grid">Grid</TabsTrigger>
                            <TabsTrigger value="table">Table</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row justify-between my-5">
                    <Search placeholder="Search Decks & Cards..." />
                    <div className="text-white rounded-full bg-emerald-700 flex justify-center items-center p-2 px-4 text-sm">
                        Create Deck
                    </div>
                </div>
                <TabsContent value="grid">
                    <Suspense>
                        <DeckGrid decks={decks}/>
                    </Suspense>
                </TabsContent>
                <TabsContent value="table">
                    <Suspense>
                        <DeckTable />
                    </Suspense>
                </TabsContent>
                
            </div>
        </Tabs>
    )
}