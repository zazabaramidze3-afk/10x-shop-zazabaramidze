import type { CartItem } from '../types/cart'

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null
}

export const isCartItem = (value: unknown): value is CartItem => {
    if (!isRecord(value)) {
        return false
    }
    return (
        typeof value.productId === 'number' &&
        typeof value.title === 'string' &&
        typeof value.thumbnail === 'string' &&
        typeof value.price === 'number' &&
        typeof value.discountPercentage === 'number' &&
        typeof value.stock === 'number' &&
        typeof value.quantity === 'number'
    )
}