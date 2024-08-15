// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Category, Collection, Deck, Card } from '@prisma/client'
// import { PlusCircleIcon, SaveIcon } from 'lucide-react'
// import { Input } from '@/app/ui/input'
// import TopBar from '@/app/ui/topBar'
// import { Textarea } from '@/app/ui/textArea'

// type CategoryWithRelations = Category & {
//   collections: (Collection & {
//     decks: (Deck & {
//       cards: Card[]
//     })[]
//   })[]
// }

// type Props = {
//   initialCategory: CategoryWithRelations | null
// }

// export default function CategoryEditorForm({ initialCategory }: Props) {
//   const router = useRouter()
//   const [formData, setFormData] = useState<CategoryWithRelations>(
//     initialCategory || {
//       id: undefined,
//       name: '',
//       collections: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//   )

//   const generateUniqueNumericId = (): number => {
//     return parseInt(`${Date.now()}${Math.floor(Math.random() * 1000)}`, 10);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string, id: number) => {
//     const { name, value } = e.target;
//     setFormData(prev => {
//       if (type === 'category') {
//         return { ...prev, [name]: value };
//       } else if (type === 'collection') {
//         return {
//           ...prev,
//           collections: prev.collections.map(c => 
//             c.id === id ? { ...c, [name]: value } : c
//           )
//         };
//       } else if (type === 'deck') {
//         return {
//           ...prev,
//           collections: prev.collections.map(c => ({
//             ...c,
//             decks: c.decks.map(d => 
//               d.id === id ? { ...d, [name]: value } : d
//             )
//           }))
//         };
//       } else if (type === 'card') {
//         return {
//           ...prev,
//           collections: prev.collections.map(c => ({
//             ...c,
//             decks: c.decks.map(d => ({
//               ...d,
//               cards: d.cards.map(card => 
//                 card.id === id ? { ...card, [name]: value } : card
//               )
//             }))
//           }))
//         };
//       }
//       return prev;
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch('/api/category', {
//         method: initialCategory ? 'PUT' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       })
//       if (response.ok) {
//         router.push('/admin/categories')
//       } else {
//         throw new Error('Failed to save category')
//       }
//     } catch (error) {
//       console.error('Error saving category:', error)
//     }
//   }

//   const addCollection = () => {
//     setFormData((prev: CategoryWithRelations) => ({
//       ...prev,
//       collections: [
//         ...prev.collections,
//         {
//           id: Date.now(),
//           title: '',
//           description: null,
//           color: null,
//           icon: null,
//           categoryId: prev.id || 0, 
//           decks: [],
//           createdAt: new Date(),
//           updatedAt: new Date()
//         } as Collection
//       ]
//     }));
//   };

//   const addDeck = (collectionId: number) => {
//     setFormData((prev: CategoryWithRelations) => ({
//       ...prev,
//       collections: prev.collections.map(c => 
//         c.id === collectionId
//           ? {
//               ...c,
//               decks: [
//                 ...c.decks,
//                 {
//                   id: Date.now(),
//                   title: '',
//                   description: null,
//                   date: null,
//                   collectionId: collectionId,
//                   cards: [],
//                   createdAt: new Date(),
//                   updatedAt: new Date()
//                 } as Deck
//               ]
//             }
//           : c
//       )
//     }));
//   };

//   const addCard = (collectionId: number, deckId: number) => {
//     setFormData((prev: CategoryWithRelations) => ({
//       ...prev,
//       collections: prev.collections.map(c => 
//         c.id === collectionId
//           ? {
//               ...c,
//               decks: c.decks.map(d => 
//                 d.id === deckId
//                   ? {
//                       ...d,
//                       cards: [
//                         ...d.cards,
//                         {
//                           id: Date.now(),
//                           text: '',
//                           deckId: deckId,
//                           createdAt: new Date(),
//                           updatedAt: new Date()
//                         } as Card
//                       ]
//                     }
//                   : d
//               )
//             }
//           : c
//       )
//     }));
//   };

//   const isLastCardEmpty = (collectionId: number, deckId: number) => {
//     const collection = formData.collections.find(c => c.id === collectionId);
//     const deck = collection?.decks.find(d => d.id === deckId);
//     if (!deck || deck.cards.length === 0) return false; 
//     const lastCard = deck.cards[deck.cards.length - 1];
//     return lastCard.text.trim() === '';
//   };

//   const isLastDeckEmpty = (collectionId: number) => {
//     const collection = formData.collections.find(c => c.id === collectionId);
//     if (!collection || collection.decks.length === 0) return false; // Allow adding a deck if the collection is empty
//     const lastDeck = collection.decks[collection.decks.length - 1];
//     return lastDeck.title.trim() === '';
//   };

//   const isLastCollectionEmpty = () => {
//     const lastCollection = formData.collections[formData.collections.length - 1];
//     return !lastCollection || lastCollection.title.trim() === '';
//   };

//   return (
//     <form onSubmit={handleSubmit} className="h-screen flex flex-col overflow-hidden">
//       <TopBar title={`${initialCategory ? 'Edit' : 'Create'} Category`} backLink='/manage' />
//       <div className='flex-1 overflow-x-hidden overflow-y-auto'>
//         <div className='container mx-auto p-6 space-y-8'>
//           <div className="space-y-4">
//             <label className="block">
//               <span className="text-gray-700 font-semibold">Category Name</span>
//               <Input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={(e) => handleChange(e, 'category')}
//                 placeholder="Enter category name"
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               />
//             </label>

//             <div className="space-y-6">
//               {formData.collections.map((collection) => (
//                 <div key={collection.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
//                   <span className="text-gray-700 font-semibold">Collection</span>
//                   <Input
//                     type="text"
//                     name="title"
//                     value={collection.title}
//                     onChange={(e) => handleChange(e, 'collection', collection.id)}
//                     placeholder="Collection Title"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
                  
//                   <div className="mt-4 space-y-4">
//                     {collection.decks.map((deck) => (
//                       <div key={deck.id} className="p-3 bg-gray-50 rounded-md">
//                         <span className="text-gray-700 font-semibold">Deck</span>
//                         <Input
//                           type="text"
//                           name="title"
//                           value={deck.title}
//                           onChange={(e) => handleChange(e, 'deck', deck.id)}
//                           placeholder="Deck Title"
//                           className="w-full p-2 border border-gray-300 rounded-md"
//                         />
//                         <div className='py-3'>
//                         <span className="text-gray-700 font-semibold">Cards</span>
//                         <div className="mt-2 space-y-2">
//                           {deck.cards.map((card) => (
//                             <Textarea
//                               key={card.id}
//                               name="text"
//                               value={card.text}
//                               onChange={(e) => handleChange(e, 'card', card.id)}
//                               placeholder="Card Text"
//                               className="w-full p-2 border border-gray-200 rounded-md"
//                             />
//                           ))}
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => addCard(collection.id, deck.id)}
//                           disabled={isLastCardEmpty(collection.id, deck.id)}
//                           className={`mt-2 flex items-center text-sm ${
//                             isLastCardEmpty(collection.id, deck.id)
//                               ? 'text-gray-400 cursor-not-allowed'
//                               : 'text-indigo-600 hover:text-indigo-800'
//                           }`}
//                         >
//                           <PlusCircleIcon className="w-4 h-4 mr-1" />
//                           Add Card
//                         </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => addDeck(collection.id)}
//                     disabled={isLastDeckEmpty(collection.id)}
//                     className={`mt-4 flex items-center text-sm ${
//                       isLastDeckEmpty(collection.id)
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-indigo-600 hover:text-indigo-800'
//                     }`}
//                   >
//                     <PlusCircleIcon className="w-4 h-4 mr-1" />
//                     Add Deck
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <button
//               type="button"
//               onClick={addCollection}
//               disabled={isLastCollectionEmpty()}
//               className={`flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
//                 isLastCollectionEmpty()
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
//               }`}
//             >
//               <PlusCircleIcon className="w-5 h-5 mr-2" />
//               Add Collection
//             </button>
//           </div>
          
//           <button
//             type="submit"
//             className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//           >
//             <SaveIcon className="w-5 h-5 mr-2" />
//             Save Category
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }