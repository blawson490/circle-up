"use client"
import React, { useState } from 'react';
import { ChevronRight, Plus, Trash2, Book, Coffee, Users, Brain, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/app/ui/components/card';
import { Button } from '@/app/app/ui/components/button'; 
import { Input } from '@/app/admin/ui/components/input';

const iconComponents = {
    Book, Coffee, Users, Brain, Heart, Star
  };
  
  const colors = [
    'bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'
  ];
  
  const mockData = {
    collections: [
      { id: 1, name: 'Ice Breakers', decks: [
        { id: 1, name: 'Getting to Know You', color: 'bg-blue-200', icon: 'Users', cards: [
          { id: 1, question: "What's your favorite book?" },
          { id: 2, question: 'If you could have dinner with anyone, who would it be?' },
        ]},
        { id: 2, name: 'Fun Facts', color: 'bg-green-200', icon: 'Coffee', cards: [
          { id: 3, question: "What's the most interesting place you've visited?" },
          { id: 4, question: "What's a skill you'd like to learn?" },
        ]},
      ]},
      { id: 2, name: 'Deep Discussions', decks: [
        { id: 3, name: 'Philosophy', color: 'bg-purple-200', icon: 'Brain', cards: [
          { id: 5, question: 'What does it mean to live a good life?' },
          { id: 6, question: 'How do you define happiness?' },
        ]},
        { id: 4, name: 'Personal Growth', color: 'bg-yellow-200', icon: 'Heart', cards: [
          { id: 7, question: "What's a personal goal you're working towards?" },
          { id: 8, question: 'How do you handle stress and anxiety?' },
        ]},
      ]},
    ]
  };

  const Dashboard = () => {
    const [data, setData] = useState(mockData);
    const [expandedCollection, setExpandedCollection] = useState(null);
    const [expandedDeck, setExpandedDeck] = useState(null);
  
    const addCollection = () => {
      const newCollection = { id: Date.now(), name: 'New Collection', decks: [] };
      setData({ ...data, collections: [...data.collections, newCollection] });
    };
  
    const addDeck = (collectionId) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomIcon = Object.keys(iconComponents)[Math.floor(Math.random() * Object.keys(iconComponents).length)];
      const newDeck = { id: Date.now(), name: 'New Deck', color: randomColor, icon: randomIcon, cards: [] };
      const updatedCollections = data.collections.map(collection => 
        collection.id === collectionId 
          ? { ...collection, decks: [...collection.decks, newDeck] }
          : collection
      );
      setData({ ...data, collections: updatedCollections });
    };
  
    const addCard = (collectionId, deckId) => {
      const newCard = { id: Date.now(), question: 'New Question' };
      const updatedCollections = data.collections.map(collection => 
        collection.id === collectionId
          ? {
              ...collection,
              decks: collection.decks.map(deck =>
                deck.id === deckId
                  ? { ...deck, cards: [...deck.cards, newCard] }
                  : deck
              )
            }
          : collection
      );
      setData({ ...data, collections: updatedCollections });
    };
  
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">CircleUp Admin Dashboard</h1>
        <div className="space-y-4">
          {data.collections.map(collection => (
            <Card key={collection.id} className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {collection.name}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setExpandedCollection(expandedCollection === collection.id ? null : collection.id)}>
                  <ChevronRight className={`h-4 w-4 transition-transform ${expandedCollection === collection.id ? 'transform rotate-90' : ''}`} />
                </Button>
              </CardHeader>
              {expandedCollection === collection.id && (
                <CardContent>
                  <div className="space-y-2">
                    {collection.decks.map(deck => {
                      const IconComponent = iconComponents[deck.icon];
                      return (
                        <Card key={deck.id} className={`w-full ${deck.color}`}>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                              {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                              {deck.name}
                            </CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => setExpandedDeck(expandedDeck === deck.id ? null : deck.id)}>
                              <ChevronRight className={`h-4 w-4 transition-transform ${expandedDeck === deck.id ? 'transform rotate-90' : ''}`} />
                            </Button>
                          </CardHeader>
                          {expandedDeck === deck.id && (
                            <CardContent>
                              <div className="space-y-2">
                                {deck.cards.map(card => (
                                  <div key={card.id} className="flex items-center justify-between">
                                    <Input value={card.question} className="flex-grow mr-2" />
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button onClick={() => addCard(collection.id, deck.id)} variant="outline" size="sm" className="w-full">
                                  <Plus className="h-4 w-4 mr-2" /> Add Card
                                </Button>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                    <Button onClick={() => addDeck(collection.id)} variant="outline" size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add Deck
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
          <Button onClick={addCollection} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Collection
          </Button>
        </div>
      </div>
    );
  };
  
  export default Dashboard;