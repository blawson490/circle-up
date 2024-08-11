export type Deck = {
    id: number;
    name: string;
    description: string;
    color: string;
    icon: string;
    cards: Card[];
}

export type Card = {
    id: number;
    text: string;
}