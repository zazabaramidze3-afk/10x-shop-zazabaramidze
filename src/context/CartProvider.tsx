import { useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'
import type { CartContextValue } from './CartContext'
import type { CartItem } from '../types/cart'

interface CartProviderProps {
    children: ReactNode
}

const STORAGE_KEY = 'shop_cart'

const loadCart = (): CartItem[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === null) {
            return []
        }

        const parsed: unknown = JSON.parse(saved)
        return Array.isArray(parsed) ? (parsed as CartItem[]) : []
    } catch {
        return []
    }
}

const CartProvider = ({ children }: CartProviderProps) => {
    // reducer იღებს მიმდინარე items-ს და action-ს, საწყისი მნიშვნელობა localStorage-იდან მოდის
    const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items])

    const addItem = (newItem: CartItem): void => {
        dispatch({ type: 'add', item: newItem })
    }

    const removeItem = (productId: number): void => {
        dispatch({ type: 'remove', productId })
    }

    const updateQuantity = (productId: number, quantity: number): void => {
        dispatch({ type: 'setQuantity', productId, quantity })
    }

    const clearCart = (): void => {
        dispatch({ type: 'clear' })
    }

    const value: CartContextValue = { items, addItem, removeItem, updateQuantity, clearCart }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
