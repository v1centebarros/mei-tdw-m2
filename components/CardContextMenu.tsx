import React, { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { Card } from "@/lib/types/card";
import { Euro, Heart, Package } from "lucide-react";
import { useCardActions } from "@/lib/hooks/useCardActions";

export default function CardContextMenu({ card, children }: Readonly<{ card: Card, children: ReactNode }>) {

  const {
    isFavorite, isWantToBuy, isOwned, handleFavoriteClick, handleWantToBuyClick, handleOwnedClick
  } = useCardActions(card);

  return (<ContextMenu>
    <ContextMenuTrigger>{children}</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuCheckboxItem checked={!!isFavorite} onClick={handleFavoriteClick}>
        Favorite
        <ContextMenuShortcut><Heart size={16} strokeWidth={1} /></ContextMenuShortcut>
      </ContextMenuCheckboxItem>

      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked={!!isWantToBuy} onClick={handleWantToBuyClick}>
        Want to Buy
        <ContextMenuShortcut><Euro size={16} strokeWidth={1} /></ContextMenuShortcut>
      </ContextMenuCheckboxItem>

      <ContextMenuSeparator />

      <ContextMenuCheckboxItem checked={!!isOwned} onClick={handleOwnedClick}>
        Owned
        <ContextMenuShortcut><Package size={16} strokeWidth={1} /></ContextMenuShortcut>
      </ContextMenuCheckboxItem>
    </ContextMenuContent>
  </ContextMenu>);


}