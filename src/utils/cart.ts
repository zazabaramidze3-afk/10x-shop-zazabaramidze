import type { CartItem } from '../types/cart'
import { discountedPrice } from './format'

export function getLineTotal(item: CartItem): number {
    return discountedPrice(item.price, item.discountPercentage) * item.quantity
}

export function getCartCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0)
}

export function getCartSubtotal(items: CartItem[]): number {
    const subtotal = items.reduce((sum, item) => sum + getLineTotal(item), 0)
    return Math.round(subtotal * 100) / 100
}