import type { CartItem } from '../types/cart'
import type { SortOption } from '../types/product'

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

const sortOptions: readonly SortOption[] = ['default', 'price-asc', 'price-desc', 'rating-desc']

export const isSortOption = (value: string): value is SortOption => {
    return sortOptions.includes(value as SortOption)
}