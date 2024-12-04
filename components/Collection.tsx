"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardContextMenu from "@/components/CardContextMenu";
import { Card } from "@/components/Card";
import { useCardStore } from "@/lib/providers/CardStoreProvider";

export function Collection() {
  const { favoriteCards, wantToBuyCards, ownedCards } = useCardStore(
    (state) => state,
  );
  return (
    <Drawer>
      <DrawerTrigger className={"underline-offset-2 hover:underline"}>
        Collection
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={"mx-auto justify-items-center"}>
          <DrawerTitle className={"text-4xl"}>Collection</DrawerTitle>
          <DrawerDescription>
            You can check your favorite, want to buy, and owned cards here.
          </DrawerDescription>
        </DrawerHeader>
        <Tabs defaultValue="favorites" className="w-full justify-items-center">
          <TabsList>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="wantToBuy">Want to Buy</TabsTrigger>
            <TabsTrigger value="owned">Owned</TabsTrigger>
          </TabsList>
          <TabsContent value="favorites">
            <div className={"flex flex-row gap-2"}>
              {favoriteCards.length > 0 ? (
                favoriteCards.map((card) => (
                  <CardContextMenu card={card} key={card.id}>
                    <Card card={card} key={card.id} />
                  </CardContextMenu>
                ))
              ) : (
                <p>No favorite cards found</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="wantToBuy">
            <div className={"flex flex-row gap-2"}>
              {wantToBuyCards.length > 0 ? (
                wantToBuyCards.map((card) => (
                  <CardContextMenu card={card} key={card.id}>
                    <Card card={card} key={card.id} />
                  </CardContextMenu>
                ))
              ) : (
                <p>No cards in want to buy list</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="owned">
            <div className={"flex flex-row gap-2 overflow-x-auto"}>
              {ownedCards.length > 0 ? (
                ownedCards.map((card) => (
                  <CardContextMenu card={card} key={card.id}>
                    <Card card={card} key={card.id} />
                  </CardContextMenu>
                ))
              ) : (
                <p>No owned cards found</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
