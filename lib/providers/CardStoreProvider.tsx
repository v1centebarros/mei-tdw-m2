// src/providers/card-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type CardStore,
  createCardStore,
  initCardStore,
} from '@/lib/stores/cardStore'

export type CardStoreApi = ReturnType<typeof createCardStore>

export const CardStoreContext = createContext<CardStoreApi | undefined>(
  undefined,
)

export interface CardStoreProviderProps {
  children: ReactNode
}

export const CardStoreProvider = ({
                                    children,
                                  }: CardStoreProviderProps) => {
  const storeRef = useRef<CardStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createCardStore(initCardStore())
  }

  return (
    <CardStoreContext.Provider value={storeRef.current}>
      {children}
    </CardStoreContext.Provider>
  )
}

export const useCardStore = <T,>(
  selector: (store: CardStore) => T,
): T => {
  const cardStoreContext = useContext(CardStoreContext)

  if (!cardStoreContext) {
    throw new Error(`useCardStore must be used within CardStoreProvider`)
  }

  return useStore(cardStoreContext, selector)
}
