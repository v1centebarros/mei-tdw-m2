"use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { CardSearch } from "@/components/CardSearch";
// import { DeckCard } from "@/components/DeckCard";
// import { DeckStats } from "@/components/DeckStats";
// import { Spinner } from "@/components/ui/spinner";
// import { Button } from "@/components/ui/button";
// import { cardCompareOptions } from "@/lib/hooks/useCards";
// import { Card } from "@/lib/types/card";
// import Container from "@/components/Container";
// import { useDeckStore } from "@/lib/providers/DeckStoreProvider";
// import { Deck } from "@/lib/types/deck";

export default function Page() {
  // const [selectedCard, setSelectedCard] = useState<string>("");
  // const [currentDeckName, setCurrentDeckName] = useState<string>("");
  //
  // const { data: card, isLoading } = useQuery(
  //   cardCompareOptions(selectedCard)
  // );
  //
  // const {currentDeck, addDeck, setCurrentDeck} = useDeckStore((state) => state)
  //
  // const handleCardSelect = (cardName: string) => setSelectedCard(cardName);
  //
  //
  // const addCardToDeck = (card: Card) => {
  //   setCurrentDeck((prevDeck) => {
  //     const updatedDeck = { ...prevDeck };
  //     if (updatedDeck[card.id]) {
  //       updatedDeck[card.id].quantity += 1;
  //     } else {
  //       updatedDeck[card.id] = { card, quantity: 1 };
  //     }
  //     return updatedDeck;
  //   });
  // }
  //
  // const removeCardFromDeck = (cardId: string) => {
  //   setCurrentDeck((prevDeck:Deck) => {
  //     const updatedDeck = { ...prevDeck };
  //     if (updatedDeck[cardId].quantity > 1) {
  //       updatedDeck[cardId].quantity -= 1;
  //     } else {
  //       delete updatedDeck[cardId];
  //     }
  //     return updatedDeck;
  //   }
  //   );
  // }
  //
  // const saveDeck = () => {
  //   if (currentDeckName.trim() === "") {
  //     alert("Please provide a name for the currentDeck before saving.");
  //     return;
  //   }
  //
  //   addDeck({ name: currentDeckName, currentDeck: currentDeck });
  //   setCurrentDeckName("");
  //   alert("Deck saved successfully!");
  // };
  //
  // const loadDeck = (savedDeck: typeof currentDeck) => {
  //   setCurrentDeck(savedDeck);
  // };
  //
  // return (
  //   <Container title={"Deck Builder"}>
  //
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //       <div className="md:col-span-2">
  //         <CardSearch
  //           onCardSelect={handleCardSelect}
  //           placeholder="Search for a card..."
  //         />
  //         {isLoading && <Spinner />}
  //         {card && (
  //           <div className="mt-4">
  //             <h2 className="text-xl font-semibold mb-2">Selected Card</h2>
  //             <DeckCard
  //               card={card}
  //               quantity={currentDeck[card.id]?.quantity || 0}
  //               onAdd={() => addCardToDeck(card)}
  //               onRemove={() => removeCardFromDeck(card.id)}
  //             />
  //           </div>
  //         )}
  //
  //         {/* Deck List */}
  //         <div className="mt-8">
  //           <h2 className="text-2xl font-semibold mb-4">Your Deck</h2>
  //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  //             {Object.values(currentDeck).map(({ card, quantity }) => (
  //               <DeckCard
  //                 key={card.id}
  //                 card={card}
  //                 quantity={quantity}
  //                 onAdd={() => addCardToDeck(card)}
  //                 onRemove={() => removeCardFromDeck(card.id)}
  //               />
  //             ))}
  //           </div>
  //         </div>
  //
  //         {/* Save Deck */}
  //         <div className="mt-4 flex items-center gap-2">
  //           <input
  //             type="text"
  //             value={currentDeckName}
  //             onChange={(e) => setCurrentDeckName(e.target.value)}
  //             placeholder="Enter currentDeck name"
  //             className="border rounded-lg px-2 py-1 flex-grow"
  //           />
  //           <Button
  //             onClick={saveDeck}
  //             className="bg-blue-500 text-white px-4 py-2 rounded"
  //           >
  //             Save Deck
  //           </Button>
  //         </div>
  //       </div>
  //
  //       {/* Sidebar */}
  //       <div>
  //         <DeckStats currentDeck={currentDeck} />
  //         <div className="mt-4">
  //           <h2 className="text-xl font-bold mb-2">Saved Decks</h2>
  //           {savedDecks.length === 0 ? (
  //             <p className="text-gray-500">No saved decks.</p>
  //           ) : (
  //             <ul className="space-y-2">
  //               {savedDecks.map((saved, index) => (
  //                 <li
  //                   key={index}
  //                   className="p-2 border rounded-lg cursor-pointer hover:bg-gray-200"
  //                   onClick={() => loadDeck(saved.currentDeck)}
  //                 >
  //                   {saved.name}
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </Container>
  return (
    <p>Hello</p>
  );
}