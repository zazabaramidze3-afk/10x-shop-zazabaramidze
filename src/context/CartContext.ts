import { createContext } from 'react'
import type { CartItem } from '../types/cart'

export interface CartContextValue {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)