import type { CartItem } from './cart'

export interface ShippingInfo {
    fullName: string
    email: string
    address: string
    city: string
}

export interface OrderSummary {
    items: CartItem[]    
    shipping: ShippingInfo
    total: number
    placedAt: string
}