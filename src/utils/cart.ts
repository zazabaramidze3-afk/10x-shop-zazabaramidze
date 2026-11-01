import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'
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

export function createCartItem(product: Product): CartItem {
    return {
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        quantity: 1,
    }
}

export function getQuantityInCart(items: CartItem[], productId: number): number {
    return items.find((item) => item.productId === productId)?.quantity ?? 0
}
