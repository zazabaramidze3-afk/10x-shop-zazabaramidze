import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from './CartContext'
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
    const [items, setItems] = useState<CartItem[]>(loadCart)
    
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items])
    
    const addItem = (newItem: CartItem): void => {
        setItems((prevItems) => {
            const existing = prevItems.find((item) => item.productId === newItem.productId)

            // ახალი პროდუქტია: ვამატებთ ახალ ხაზს
            if (!existing) {
                return [...prevItems, newItem]
            }

            // უკვე არსებობს: ვზრდით რაოდენობას, მაგრამ stock-ს არ ვცდებით
            return prevItems.map((item) =>
                item.productId === newItem.productId
                    ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.stock) }
                    : item
            )
        })
    }

    const removeItem = (productId: number): void => {
        setItems((prevItems) => prevItems.filter((item) => item.productId !== productId))
    }

    const updateQuantity = (productId: number, quantity: number): void => {
        // 1-ზე ნაკლები რაოდენობა = პროდუქტის წაშლა
        if (quantity < 1) {
            removeItem(productId)
            return
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: Math.min(quantity, item.stock) }
                    : item
            )
        )
    }

    const clearCart = (): void => {
        setItems([])
    }

    const value: CartContextValue = { items, addItem, removeItem, updateQuantity, clearCart }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
